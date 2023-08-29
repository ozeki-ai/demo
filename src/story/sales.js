import store from "../store"
import nda from "../document/nda"

export default function story() {

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
        content: `Starting with the <b>agreementDate</b>. Shall we use today's date ${store.TODAY}?`
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
        content: `Shall I use the default <b>companyName</b> and <b>companyAddress</b>?`
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
        content: `Who is the counterparty to this agreement?`
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
        content: "In which state is the counterparty incorporated?"
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
        content: "What is the counterparty address?",
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
        content: "Please choose one of the following business purposes:"
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
        content: "Since this is just a demo, I'm going to gloss over a few clauses. Let me know when you are ready to continue..."
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
        content: "Please choose one of the following allowed terms:"
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
        content: "Again, since this is just a demo, I'm going to gloss over the remaining clauses. Let me know when you are ready to continue..."
      },
      {
        type: "answer",
      },
      {
        type: "chat",
        content: "<b>Congratulations</b>, you have generated your NDA contract.",
      },
      {
        type: "chat",
        content: `Now switch user to <b>Colin Customer</b> and see what it's like to negotiate an Ozeki contract.`,
      },
      {
        type: "scroll",
        to: "top"
      },
      {
        type: "exec",
        exec: (story) => {
          store.contractGenerated = true
        }
      },
    ],
  }
}
