import {useRouter} from "vue-router"
import parse from "../util/parse"
import store from "../store"
import nda from "../document/nda"

export default function story() {
  const router = useRouter()
  return {
    document: nda,
    revealed: {
      preamble: true,
      purpose: true,
      therefore: true,
    },
    script: [
      {
        type: "exec",
        exec: (story) => {
          store.playbookCompleted = null
          store.allowGenericBusinessPurpose = null
          store.allowSpecificBusinessPurpose = null
          store.specificBusinessPurpose = null
          store.allowedTerms = null
          store.strategy = null
        }
      },
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
        content: "<span class='question'>Do you wish to allow NDAs with the generic description?</span>",
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
        content: `<b>Allow generic</b>: <em>"${store.GENERIC_BUSINESS_PURPOSE}"`,
        next: "specific-business-purpose"
      },
      {
        label: "generic-business-purpose-no",
        type: "strategy",
        section: "purpose",
        content: `Disallow generic [<em>businessPurpose</em>]`,
      },
      {
        label: "specific-business-purpose",
        type: "chat",
        content: "<span class='question'>Do you want to add a more specific <b>businessPurpose</b>?</span>"
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
        content: `<span class='question'>What is the specific <b>businessPurpose</b>?</span>`,
      },
      {
        type: "answer",
        key: "specificBusinessPurpose",
      },
      {
        type: "strategy",
        section: "purpose",
        content: (story) => `<b>Allow specific</b>: <em>"${store.specificBusinessPurpose}"</em>`,
        next: "purpose-preference"
      },
      {
        label: "specific-business-purpose-no",
        type: "strategy",
        section: "purpose",
        content: "Disallow specific [<em>businessPurpose</em>]",
        next: "purpose-preference"
      },
      {
        label: "purpose-preference",
        type: "chat",
        content: "<span class='question'>Which is the preferred business purpose?</span>",
      },
      {
        type: "answer",
        key: "purposePreference"
      },
      {
        type: "strategy",
        section: "purpose",
        content: (story) => `<b>Negotiation Preference</b>: <em>${store.purposePreference}</em>`
      },
      {
        type: "highlight",
        id: "none"
      },
      {
        type: "chat",
        content: "<span class='skip-ahead'>Since this is just a demo, let's skip ahead to the <b>terms and duration</b> (ok to continue).</span>",
      },
      {
        type: "answer"
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
      },
      {
        type: "chat",
        content: "<span class='question'>How long do you want the term to last?</span>",
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
        content: "<span class='question'>Do you prefer shorter or longer terms?</span>",
      },
      {
        type: "answer",
        key: "termPreference",
      },
      {
        type: "strategy",
        section: "term",
        content: (story) => `<b>Negotiation Preference</b>: <em>prefer ${store.termPreference} terms</em>`,
      },
      {
        type: "chat",
        content: "<span class='skip-ahead'>Again, since this is just a demo, we can skip the remaining clauses (ok to continue)...</span>",
      },
      {
        type: "answer",
      },
      {
        type: "highlight",
        id: "none"
      },
      {
        type: "exec",
        exec: (story) => {
          store.playbookCompleted = true
          router.push({name: "lawyer-dashboard"})
        }
      }
    ]
  }
}
