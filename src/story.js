import {ref} from "vue"

function run(storyFn) {
  const story = storyFn()
  story.messages = [
    { user: false, content: "<b>hello</b> world" },
    { user: true,  content: "hi" },
  ]
  return story
}

export { run }
