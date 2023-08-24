import {reactive} from "vue"

function run(storyFn) {
  const story = reactive(new Story(storyFn()))
  story.run()
  return story
}

//-------------------------------------------------------------------------------------------------

class Story {

  constructor(config) {
    this.title     = config.title
    this.script    = config.script
    this.sections  = config.sections
    this.messages  = []
    this.highlight = null
    this.answering = false
  }

  run(index) {
    setTimeout(() => {
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
        }
      }
    }, 250)
  }

  next(target) {
    target = target || this.command.next || 1
    if (typeof target === "string") {
      this.run(this.script.findIndex((s) => s.label === target))
    } else if (typeof target === "number") {
      this.run(this.index + target)
    }
  }

  performChat(command) {
    const words = command.content.split(" ")
    const index = this.messages.push({content: words.shift()}) - 1
    const timer = setInterval(() => {
      const word = words.shift()
      this.messages[index].content += " " + word
      if (words.length === 0) {
        clearInterval(timer)
        this.next()
      }
    }, 30)
  }

  performHighlight(command) {
    this.highlight = command.id
    this.next()
  }

  collectAnswer(command) {
    this.answering = true
  }

  provideAnswer(answer) {
    const match = this.command.matches.find((match) => {
      if (match.re) {
        return match.re.test(answer)
      } else {
        return false
      }
    })
    if (match) {
      this.messages.push({user: true, content: answer})
      this.next(match.next)
    } else {
      this.messages.push({user: true, content: answer})
      this.messages.push({content: "Sorry, I don't understand that answer"})
    }
  }

}

//-------------------------------------------------------------------------------------------------

export { run }
