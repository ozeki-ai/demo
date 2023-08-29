import {useRouter} from "vue-router"
import store from "../store"
import nda from "../document/nda"

export default function story() {

  const router = useRouter()

  const allowedBusinessPurpose = []
  if (store.allowGenericBusinessPurpose) {
    allowedBusinessPurpose.push({key: "generic", value: store.GENERIC_BUSINESS_PURPOSE})
  }
  if (store.allowSpecificBusinessPurpose) {
    allowedBusinessPurpose.push({key: "specific", value: store.specificBusinessPurpose})
  }

  const allowedTerms = []
  for (let {length, label} of store.allowedTerms) {
    allowedTerms.push({key: length, label: label})
  }

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
          store.contractGenerated = null
          store.agreementDate = null
          store.companyName = null
          store.companyAddress = null
          store.counterpartyName = null
          store.counterpartyIncorporationState = null
          store.counterpartyAddress = null
          store.businessPurpose = null
          store.term = null
        }
      },
      {
        type: "chat",
        content: "Ok, let's generate an NDA for your customer. I will ask you some questions to fill in the blanks in this agreement..."
      },
      {
        type: "highlight",
        id: "agreementDate"
      },
      {
        type: "chat",
        content: `Starting with the <b>agreementDate</b>. <span class='question'>Shall we use today's date ${store.TODAY}?</span>`
      },
      {
        type: "answer",
        key: "agreementDate",
        matches: [
          { re: /\b(yes|y|yup|sure)\b/i, answer: store.TODAY },
        ]
      },
      {
        type: "highlight",
        id: "companyName",
      },
      {
        type: "chat",
        content: `<span class='question'>Shall I use the default <b>companyName</b>?</span>`
      },
      {
        type: "answer",
        key: "companyName",
        matches: [
          { re: /\b(yes|y|yup|sure)\b/i, answer: store.COMPANY_NAME },
        ]
      },
      {
        type: "value",
        id: "companyAddress",
        value: store.COMPANY_ADDRESS
      },
      {
        type: "highlight",
        id: "counterpartyName",
      },
      {
        type: "chat",
        content: `<span class='question'>Who is the counterparty to this agreement?</span>`
      },
      {
        type: "answer",
        key: "counterpartyName",
      },
      {
        type: "highlight",
        id: "counterpartyIncorporationState"
      },
      {
        type: "chat",
        content: "<span class='question'>In which state is the counterparty incorporated?</span>"
      },
      {
        type: "answer",
        key: "counterpartyIncorporationState",
      },
      {
        type: "highlight",
        id: "counterpartyAddress",
      },
      {
        type: "chat",
        content: "<span class='question'>What is the counterparty address?</span>",
      },
      {
        type: "answer",
        key: "counterpartyAddress",
      },
      {
        type: "highlight",
        id: "businessPurpose",
      },
      {
        type: "chat",
        content: "<span class='question'>Please choose one of the following business purposes:</span>"
      },
      {
        type: "chat",
        chatter: false,
        content: (story) => {
          const items = allowedBusinessPurpose.map(({key, value}) => `<ul><b>${key}</b>: ${value}</ul>`)
          return `<ul>${items.join("")}</ul>`
        },
      },
      {
        type: "answer",
        key: "businessPurpose",
        matches: allowedBusinessPurpose.map(({key, value}) => {
          return {
            re: new RegExp(`.*${key}.*`, "gi"),
            answer: value,
          }
        })
      },
      {
        type: "highlight",
        id: "none",
      },
      {
        type: "chat",
        content: "<span class='skip-ahead'>Since this is just a demo, let's skip ahead to the <b>terms and duration</b> (ok to continue)..."
      },
      {
        type: "answer",
      },
      {
        type: "reveal",
        section: "term"
      },
      {
        type: "highlight",
        id: "term"
      },
      {
        type: "chat",
        content: "<span class='question'>Please choose one of the following allowed terms:</span>"
      },
      {
        type: "chat",
        chatter: false,
        content: (story) => {
          const items = allowedTerms.map(({key, label}) => `<li>${label}</li>`)
          return `<ul>${items.join("")}</ul>`
        }
      },
      {
        type: "answer",
        key: "term",
        matches: allowedTerms.map(({key, label}) => {
          return {
            re: new RegExp(`.*${key}.*`, "gi"),
            answer: label,
          }
        })
      },
      {
        type: "chat",
        content: (story) => `You chose a term of ${store.term}.`
      },
      {
        type: "chat",
        content: "<span class='skip-ahead'>Again, since this is just a demo, let's skip the remaining clauses (ok to continue)...</span>"
      },
      {
        type: "answer",
      },
      {
        type: "highlight",
        id: "none",
      },
      {
        type: "chat",
        content: "<b>Congratulations</b>, you have generated your NDA contract.",
      },
      {
        type: "exec",
        exec: (story) => {
          store.contractGenerated = true
        }
      },
      {
        type: "chat",
        content: `Now switch user to <b>Colin Customer</b> and see what it's like to negotiate an Ozeki contract (ok to continue).`,
      },
      {
        type: "answer",
      },
      {
        type: "exec",
        exec: (story) => {
          router.push({name: "sales-dashboard"})
        }
      }
    ],
  }
}
