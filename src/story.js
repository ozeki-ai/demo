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
      this.index   = index || 0
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

  step(n) {
    const next = this.index + (n || this.command.step || 1)
    this.run(next)
  }


  performChat(command) {
    const words = command.content.split(" ")
    const index = this.messages.push({content: words.shift()}) - 1
    const timer = setInterval(() => {
      const word = words.shift()
      this.messages[index].content += " " + word
      if (words.length === 0) {
        clearInterval(timer)
        this.step()
      }
    }, 30)
  }

  performHighlight(command) {
    this.highlight = command.id
    this.step()
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
      this.step(match.step)
    } else {
      this.messages.push({user: true, content: answer})
      this.messages.push({content: "Sorry, I don't understand that answer"})
    }
  }

}

//-------------------------------------------------------------------------------------------------

export { run }
