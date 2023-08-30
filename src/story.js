import {reactive, nextTick}  from "vue"
import {store, saveStrategy} from "./store"

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
    this.document  = config.document || { sections: [] }
    this.revealed  = config.revealed || {}
    this.classes   = config.classes  || {}
    this.messages  = []
    this.highlight = null
    this.marked    = null
    this.answering = false
  }

  run(index) {
    this.index = index || 0
    this.command = this.script[this.index]
    this.answering = false
    if (this.command) {
      switch (this.command.type) {
        case "chat":
          this.performChat(this.command)
          break;
        case "goto":
          this.goto(this.command)
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
        case "value":
          this.setValue(this.command)
          break;
        case "reveal":
          this.revealSection(this.command)
          break;
        case "scroll":
          this.scrollDocument(this.command)
          break;
        case "exec":
          this.executeCustomCommand(this.command)
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
    const content = (command.content instanceof Function ? command.content(this) : command.content)
    if (command.chatter === false) {
      this.pushRobotMessage(content, command.avatar)
      this.next()
    } else {
      const words = content.split(" ")
      if (!command.append) {
        const firstWord = words.shift()
        this.pushRobotMessage(firstWord, command.avatar)
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
  }

  goto(command) {
    if (command.goto instanceof Function) {
      this.next(command.goto(this))
    }
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
    } else if (Array.isArray(this.command.matches)) {
      match = this.command.matches.find((match) => {
        if (match.re) {
          return match.re.test(answer)
        } else {
          return false
        }
      })
    } else {
      match = { answer: answer }
    }
    if (match) {
      store[this.command.key || "last"] = match.hasOwnProperty("answer") ? match.answer : answer
      this.pushUserMessage(answer)
      this.next(match.next)
    } else {
      this.pushUserMessage(answer)
      this.pushRobotMessage("Sorry, I don't understand that answer")
    }
  }

  saveStrategy(command) {
    const section = this.document.sections.find((s) => s.id === command.section)
    section.strategy = section.strategy || []
    const rule = (command.content instanceof Function ? command.content(this) : command.content)
    saveStrategy(command.section, rule)
    this.next()
  }

  setValue(command) {
    if (command.value instanceof Function) {
      store[command.id] = command.value(this)
    } else {
      store[command.id] = command.value
    }
    this.next()
  }

  revealSection(command) {
    const section = this.document.sections.find((s) => s.id === command.section)
    if (section) {
      const container = document.getElementById("document-view")
      const dom = document.getElementById(`section-${section.id}`)
      this.revealed[section.id] = true
      nextTick(() => {
        container.scrollTo({
          top: dom.offsetTop - 100,
          behavior: "smooth"
        })
        this.next()
      })
    } else {
      this.next()
    }
  }

  scrollDocument(command) {
    const container = document.getElementById("document-view")
    nextTick(() => {
      container.scrollTo({
        top: 0,
        behavior: "smooth"
      })
      this.next()
    })
  }

  executeCustomCommand(command) {
    const target = command.exec(this)
    this.next(target)
  }

  pushRobotMessage(content, forceRobotAvatar) {
    const firstMessage = this.messages.length === 0
    const previousMessage = this.messages[this.messages.length-1]
    const previousMessageWasFromUser = previousMessage && previousMessage.user && previousMessage.content.length
    const showRobotAvatar = firstMessage || forceRobotAvatar || previousMessageWasFromUser || false
    return this.messages.push({content: content, avatar: showRobotAvatar})
  }

  pushUserMessage(content) {
    return this.messages.push({content: content, user: true})
  }
}

//-------------------------------------------------------------------------------------------------

export { run }
