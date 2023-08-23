import {ref} from "vue"

function run(storyFn) {
  const story = ref(storyFn())
  story.value.messages  = []
  story.value.highlight = null
  story.value.answering = false
  step(story)
  return story
}

function step(story) {
  setTimeout(() => {
    const command = story.value.script.shift()
    if (command) {
      switch (command.type) {
        case "chat":
          chatter(story, command)
          break;

        case "highlight":
          story.value.highlight = command.id
          step(story)
          break;

        case "answer":
          story.value.answering = true
          break;
      }
    }
  }, 500)
}

function chatter(story, command) {
  const words = command.content.split(" ")
  const index = story.value.messages.push({content: words.shift()}) - 1
  const timer = setInterval(() => {
    const word = words.shift()
    story.value.messages[index].content += " " + word
    if (words.length === 0) {
      clearInterval(timer)
      step(story)
    }
  }, 30)
}

export { run }
