import {ref} from "vue"

function run(storyFn) {
  const story = ref(storyFn())
  story.value.messages = []
  step(story)
  return story
}

function step(story) {
  const command = story.value.script.shift()
  if (command) {
    switch (command.type) {
      case "chat":
        chatter(story, command.content)
        break;

      case "highlight":
        console.log("HIGHLIGHT", command)
        break;

      case "wait":
        console.log("WAIT", command)
        break;
    }
  }
}

function chatter(story, content) {
  const words = content.split(" ")
  const index = story.value.messages.push({ai: true, content: words.shift()}) - 1
  const timer = setInterval(() => {
    const word = words.shift()
    story.value.messages[index].content += " " + word
    if (words.length === 0) {
      clearInterval(timer)
    }
  }, 100)
}

export { run }
