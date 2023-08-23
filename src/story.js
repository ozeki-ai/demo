import {reactive} from "vue"

function run(storyFn) {
  const story = reactive(new Story(storyFn()))
  story.step()
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
    this.index     = -1
  }

  step() {
    setTimeout(() => {
      this.index = this.index + 1
      this.answering = false
      if (this.index < this.script.length) {
        const command = this.script[this.index]
        switch (command.type) {
          case "chat":
            this.performChat(command)
            break;
          case "highlight":
            this.performHighlight(command)
            break;
          case "answer":
            this.collectAnswer(command)
            break;
        }
      }
    }, 250)
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
    this.messages.push({content: `TODO: HANDLE ANSWER: ${answer}`})
    this.answering = false
  }

}

//-------------------------------------------------------------------------------------------------

export { run }
