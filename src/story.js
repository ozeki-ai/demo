import {reactive, nextTick} from "vue"

function run(storyFn) {
  const story = reactive(new Story(storyFn()))
  story.run()
  return story
}

//-------------------------------------------------------------------------------------------------

const CHAT_INTERVAL = 20
const STEP_PAUSE = 100

//-------------------------------------------------------------------------------------------------

class Story {

  constructor(config) {
    this.title     = config.title    || "CONTRACT"
    this.script    = config.script   || []
    this.sections  = config.sections || []
    this.messages  = []
    this.highlight = null
    this.answering = false
  }

  run(index) {
    this.index = index || 0
    this.command = this.script[this.index]
    if (this.command) {
      switch (this.command.type) {
        case "chat":
          this.performChat(this.command)
          break;
        case "highlight":
          this.performHighlight(this.command)
          break;
        case "answer":
          this.collectAnswer(this.command)
          break;
        case "strategy":
          this.saveStrategy(this.command)
          break;
        case "reveal":
          this.revealSection(this.command)
          break;
      }
    }
  }

  next(target) {
    setTimeout(() => { 
      target = target || this.command.next || 1
      if (typeof target === "string") {
        this.run(this.script.findIndex((s) => s.label === target))
      } else if (typeof target === "number") {
        this.run(this.index + target)
      }
    }, this.command.wait || STEP_PAUSE)
  }

  performChat(command) {
    const words = command.content.split(" ")
    if (!command.append) {
      const firstWord = words.shift()
      this.pushRobotMessage(firstWord)
    }
    const index = this.messages.length - 1
    const timer = setInterval(() => {
      const word = words.shift()
      this.messages[index].content += " " + word
      if (words.length === 0) {
        clearInterval(timer)
        this.next()
      }
    }, CHAT_INTERVAL)
  }

  performHighlight(command) {
    this.highlight = command.id
    this.next()
  }

  collectAnswer(command) {
    this.answering = true
  }

  provideAnswer(answer) {
    let match
    if (this.command.matches instanceof Function) {
      match = this.command.matches(answer)
    } else {
      match = this.command.matches.find((match) => {
        if (match.re) {
          return match.re.test(answer)
        } else {
          return false
        }
      })
    }
    if (match) {
      this.lastAnswer = match.answer || answer
      this.pushUserMessage(answer)
      this.next(match.next)
    } else {
      this.pushUserMessage(answer)
      this.pushRobotMessage("Sorry, I don't understand that answer")
    }
  }

  saveStrategy(command) {
    const section = this.sections.find((s) => s.id === command.section)
    section.strategy = section.strategy || []
    if (typeof command.content === "string") {
      section.strategy.push(command.content)
    } else if (command.content instanceof Function) {
      section.strategy.push(command.content(this))
    }
    this.next()
  }

  revealSection(command) {
    const section = this.sections.find((s) => s.id === command.section)
    if (section) {
      const dom = document.getElementById(`section-${section.id}`)
      section.show = true
      nextTick(() => {
        dom.parentElement.parentElement.scrollTo({
          top: dom.offsetTop - 100,
          behavior: "smooth"
        })
      })
    }
    this.next()
  }

  pushRobotMessage(content) {
    const firstMessage = this.messages.length === 0
    const previousMessage = this.messages[this.messages.length-1]
    const previousMessageWasFromUser = previousMessage && previousMessage.user
    const showRobotAvatar = firstMessage || previousMessageWasFromUser || false
    return this.messages.push({content: content, avatar: showRobotAvatar})
  }

  pushUserMessage(content) {
    return this.messages.push({content: content, user: true})
  }
}

//-------------------------------------------------------------------------------------------------

export { run }
