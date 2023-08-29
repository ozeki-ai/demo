import {useRouter} from "vue-router"
import store from "../store"
import nda from "../document/nda"

function markSection(story, id, success) {
  let section
  if (section = story.document.sections.find((s) => s.id === id)) {
    if (success === true) {
      story.classes[section.id] = "border-r-12 pr-4 border-green-500"
    } else if (success === false) {
      story.classes[section.id] = "border-r-12 pr-4 border-red-500"
    } else {
      story.classes[section.id] = "border-r-12 pr-4 border-yellow-500"
    }
  }
}

export default function story() {
  const router = useRouter()
  return {
    document: nda,

    revealed: {
      preamble: true,
      purpose: true,
      therefore: true,
      term: true,
    },

    script: [
      {
        type: "exec",
        exec: (story) => {
          store.preambleAccepted = null
          store.preambleRejected = null
          store.purposeAccepted = null
          store.purposeRejected = null
          store.termAccepted = null
          store.termRejected = null
          store.conclusion = null
          store.contractAccepted = null
          store.contractRejected = null
        }
      },
      {
        type: "chat",
        content: (story) => `Please review this mutual NDA between your company <b>${store.counterpartyName}</b> and supplier <b>${store.COMPANY_NAME}</b>`
      },
      {
        label: "start-preamble",
        type: "exec",
        exec: (story) => markSection(story, "preamble")
      },
      {
        type: "chat",
        content: "Do you accept the <b>preamble</b> of this agreement?",
      },
      {
        type: "answer",
        key: "preambleAccepted",
        matches: [
          { re: /\b(yes|y|yup|sure)\b/i, answer: true  },
          { re: /\b(no|n|nope)\b/i,      answer: false },
        ]
      },
      {
        type: "goto",
        goto: (story) => {
          if (store.preambleAccepted) {
            return "preamble-yes"
          } else {
            return "preamble-no"
          }
        }
      },
      {
        label: "preamble-yes",
        type: "exec",
        exec: (story) => markSection(story, "preamble", true)
      },
      {
        type: "chat",
        content: "<b>Preamble</b> accepted",
        next: "start-purpose"
      },
      {
        label: "preamble-no",
        type: "exec",
        exec: (story) => markSection(story, "preamble", false)
      },
      {
        type: "chat",
        content: "<b>Preamble</b> rejected. Can you tell us the reason?"
      },
      {
        type: "answer",
        key: "preambleRejected",
        next: "start-purpose",
      },
      {
        label: "start-purpose",
        type: "exec",
        exec: (story) => markSection(story, "purpose")
      },
      {
        type: "chat",
        content: "Do you accept the <b>purpose</b> of this agreement?",
      },
      {
        type: "answer",
        key: "purposeAccepted",
        matches: [
          { re: /\b(yes|y|yup|sure)\b/i, answer: true  },
          { re: /\b(no|n|nope)\b/i,      answer: false },
        ]
      },
      {
        type: "goto",
        goto: (story) => {
          if (store.purposeAccepted) {
            return "purpose-yes"
          } else {
            return "purpose-no"
          }
        }
      },
      {
        label: "purpose-yes",
        type: "exec",
        exec: (story) => markSection(story, "purpose", true)
      },
      {
        type: "chat",
        content: "<b>Purpose</b> accepted",
        next: "start-term"
      },
      {
        label: "purpose-no",
        type: "exec",
        exec: (story) => markSection(story, "purpose", false)
      },
      {
        type: "chat",
        content: "<b>Purpose</b> rejected. Can you tell us the reason?"
      },
      {
        type: "answer",
        key: "purposeRejected",
        next: "start-term",
      },
      {
        label: "start-term",
        type: "exec",
        exec: (story) => markSection(story, "term")
      },
      {
        type: "chat",
        content: "Do you accept the <b>term and duration</b> of this agreement?",
      },
      {
        type: "reveal",
        section: "term",
      },
      {
        type: "answer",
        key: "termAccepted",
        matches: [
          { re: /\b(yes|y|yup|sure)\b/i, answer: true  },
          { re: /\b(no|n|nope)\b/i,      answer: false },
        ]
      },
      {
        type: "goto",
        goto: (story) => {
          if (store.termAccepted) {
            return "term-yes"
          } else {
            return "term-no"
          }
        }
      },
      {
        label: "term-yes",
        type: "exec",
        exec: (story) => markSection(story, "term", true)
      },
      {
        type: "chat",
        content: "<b>Term</b> accepted",
        next: "conclusion"
      },
      {
        label: "term-no",
        type: "exec",
        exec: (story) => markSection(story, "term", false)
      },
      {
        type: "chat",
        content: "<b>Term</b> rejected. Can you tell us the reason?"
      },
      {
        type: "answer",
        key: "termRejected",
        next: "conclusion",
      },
      {
        label: "conclusion",
        type: "value",
        id: "conclusion",
        value: (story) => {
          const preambleAccepted = store.preambleAccepted
          const purposeAccepted  = store.purposeAccepted
          const termAccepted     = store.termAccepted
          const preambleRejected = store.preambleRejected
          const purposeRejected  = store.purposeRejected
          const termRejected     = store.termRejected
          if (preambleAccepted && purposeAccepted && termAccepted) {
            return `
              <b>Thank you for accepting this agreement</b>.
              This is normally where we'd have you sign something, but since this is just a demo we'll leave it here (ok to continue)...
            `
          } else {
            const items = []
            if (preambleAccepted) {
              items.push("<li>Preamble accepted</li>")
            } else {
              items.push(`<li>Preamble rejected: <em>"${preambleRejected}"</em></li>`)
            }
            if (purposeAccepted) {
              items.push("<li>Purpose accepted</li>")
            } else {
              items.push(`<li>Purpose rejected: <em>"${purposeRejected}"</em></li>`)
            }
            if (termAccepted) {
              items.push("<li>Term accepted</li>")
            } else {
              items.push(`<li>Term rejected: <em>"${termRejected}"</em></li>`)
            }
            return `
              <p><b>It looks like we couldn't agree on terms.</b></p>
              <ul>${items.join("")}</ul>
              <p>But don't worry, our team will consider your reasons and get back to you as soon as possible (ok to continue)...</p>
            `
          }
        }
      },
      {
        type: "chat",
        content: (story) => store.conclusion,
        chatter: false
      },
      {
        type: "exec",
        exec: (story) => {
          store.contractAccepted = store.preambleAccepted && store.purposeAccepted && store.termAccepted
          store.contractRejected = store.preambleRejected || store.purposeRejected || store.termRejected
        }
      },
      {
        type: "answer",
      },
      {
        type: "exec",
        exec: (story) => {
          router.push({name: "customer-dashboard"})
        }
      }
    ],

  }
}
