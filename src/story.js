import {ref} from "vue"

function run(storyFn) {
  const story = ref(storyFn())
  story.value.messages  = []
  story.value.highlight = null
  story.value.waiting   = false
  step(story)
  return story
}

function step(story) {
  setTimeout(() => {
    const command = story.value.script.shift()
    if (command) {
      switch (command.type) {
        case "chat":
          chatter(story, command.content)
          break;

        case "highlight":
          story.value.highlight = command.id
          step(story)
          break;

        case "wait":
          story.value.waiting = true
          break;
      }
    }
  }, 500)
}

function chatter(story, content) {
  const words = content.split(" ")
  const index = story.value.messages.push({ai: true, content: words.shift()}) - 1
  const timer = setInterval(() => {
    const word = words.shift()
    story.value.messages[index].content += " " + word
    if (words.length === 0) {
      clearInterval(timer)
      step(story)
    }
  }, 50)
}

export { run }