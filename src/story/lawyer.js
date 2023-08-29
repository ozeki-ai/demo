import parse from "../util/parse"
import store from "../store"
import nda from "../document/nda"

export default function story() {
  return {
    document: nda,
    revealed: {
      preamble: true,
      purpose: true,
      therefore: true,
    },
    script: [
      {
        type: "chat",
        content: "Ok, let's define your mutual NDA playbook together..."
      },
      {
        type: "highlight",
        id: "businessPurpose"
      },
      {
        type: "chat",
        content: `
          The <b>business purpose</b> clause restricts the use of the disclosed confidential information to uses within the purpose.
          A generic description would be
          <em>"${store.GENERIC_BUSINESS_PURPOSE}"</em>.
        ` 
      },
      {
        type: "chat",
        content: "Do you wish to allow NDAs with the generic description?",
      },
      {
        label: "generic-business-purpose",
        type: "answer",
        key: "allowGenericBusinessPurpose",
        matches: [
          { re: /\b(yes|y|yup|sure)\b/i, answer: true  },
          { re: /\b(no|n|nope)\b/i,      answer: false },
        ]
      },
      {
        type: "goto",
        goto: (story) => {
          if (store.allowGenericBusinessPurpose) {
            return "generic-business-purpose-yes"
          } else {
            return "generic-business-purpose-no"
          }
        }
      },
      {
        label: "generic-business-purpose-yes",
        type: "strategy",
        section: "purpose",
        content: `Allow generic [<em>businessPurpose</em>] <em>"${store.GENERIC_BUSINESS_PURPOSE}"`,
      },
      {
        type: "chat",
        content: `Great, we will allow the generic description for <b>businessPurpose</b>.`,
        next: "specific-business-purpose"
      },
      {
        label: "generic-business-purpose-no",
        type: "strategy",
        section: "purpose",
        content: `Disallow generic [<em>businessPurpose</em>]`,
      },
      {
        type: "chat",
        content: "Ok, we won't allow the generic description for <b>businessPurpose</b>",
        next: "specific-business-purpose"
      },
      {
        label: "specific-business-purpose",
        type: "chat",
        content: "Do you also want to add a specific <b>businessPurpose</b>?"
      },
      {
        type: "answer",
        key: "allowSpecificBusinessPurpose",
        matches: [
          { re: /\b(yes|y|yup|sure)\b/i, answer: true  },
          { re: /\b(no|n|nope)\b/i,      answer: false },
        ]
      },
      {
        type: "goto",
        goto: (story) => {
          if (store.allowSpecificBusinessPurpose) {
            return "specific-business-purpose-yes"
          } else {
            return "specific-business-purpose-no"
          }
        }
      },
      {
        label: "specific-business-purpose-yes",
        type: "chat",
        content: `What is the specific <b>businessPurpose</b>?`,
      },
      {
        type: "answer",
        key: "specificBusinessPurpose",
      },
      {
        type: "strategy",
        section: "purpose",
        content: (story) => `Allow specific [<em>businessPurpose</em>] <em>"${store.specificBusinessPurpose}"</em>`,
        next: "complete-purpose"
      },
      {
        label: "specific-business-purpose-no",
        type: "strategy",
        section: "purpose",
        content: "Disallow specific [<em>businessPurpose</em>]",
      },
      {
        type: "chat",
        content: "Ok, we won't add any specific descriptions for <b>businessPurpose</b>",
        next: "complete-purpose"
      },
      {
        label: "complete-purpose",
        type: "highlight",
        id: "none"
      },
      {
        type: "chat",
        content: "Since this is just a demo, we can skip forward past some of these clauses. Let me know when you are ready to continue...",
      },
      {
        type: "answer",
      },
      {
        type: "chat",
        content: "Let's skip ahead to the <b>terms and duration</b>."
      },
      {
        label: "reveal-term",
        type: "reveal",
        section: "term",
      },
      {
        type: "highlight",
        id: "term"
      },
      {
        type: "chat",
        content: "The <b>term</b> dictates the length of the agreement and how long you may convey confidential information. It does not necessarily dictate how long the confidential information will be protected after the agreement.",
        avatar: true,
      },
      {
        type: "chat",
        content: "How long do you want the term to last?",
      },
      {
        type: "answer",
        key: "allowedTerms",
        matches: (answer) => {
          const { low, high, duration } = parse.range(answer)
          const allowedTerms = []
          for (let n = low ; n <= high ; n++) {
            allowedTerms.push({ length: n, duration: duration, label: `${n} ${n === 1 ? duration : duration + "s"}`})
          }
          return { answer: allowedTerms }
        }
      },
      {
        type: "strategy",
        section: "term",
        content: (story) => {
          return `Allowed Term Options:<ul>${store.allowedTerms.map(({label}) => `<li>${label}</li>`).join("")}</ul>`
        }
      },
      {
        type: "chat",
        content: "Great, we've added the allowed terms to the applied strategy"
      },
      {
        type: "highlight",
        id: "none"
      },
      {
        type: "chat",
        content: "Again, since this is just a demo, we can skip forward past the remaining clauses. Let me know when you are ready to continue...",
      },
      {
        type: "answer",
      },
      {
        type: "chat",
        content: "<b>Congratulations</b>, that completes the definition for your mutual NDA playbook.",
      },
      {
        type: "chat",
        content: `Now switch user to <b>Sam Sales</b> and see what it's like to generate a contract using a playbook.`,
      },
      {
        type: "scroll",
        to: "top"
      },
      {
        type: "exec",
        exec: (story) => {
          store.playbookCompleted = true
        }
      },
    ],
  }
}
