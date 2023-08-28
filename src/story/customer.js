import shared from "../shared"
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
  return {
    document: nda,

    revealed: {
      preamble: true,
      purpose: true,
      therefore: true,
      term: true,
    },

    values: {
      agreementDate: shared.TODAY,
      companyName: shared.COMPANY_NAME,
      companyAddress: shared.COMPANY_ADDRESS,
      counterpartyName: shared.COUNTERPARTY_NAME,
      counterpartyIncorporationState: shared.COUNTERPARTY_INCORPORATION_STATE,
      counterpartyAddress: shared.COUNTERPARTY_ADDRESS,
      businessPurpose: shared.GENERIC_BUSINESS_PURPOSE,
      term: shared.ONE_YEAR_TERM,
    },

    script: [
      {
        type: "chat",
        content: `Please review this mutual NDA between your company <b>${shared.COUNTERPARTY_NAME}</b> and supplier <b>${shared.COMPANY_NAME}</b>`
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
        matches: [
          { re: /\b(yes|y|yup|sure)\b/i, answer: "yes", next: "preamble-yes" },
          { re: /\b(no|n|nope)\b/i, answer: "no",  next: "preamble-no" },
        ]
      },
      {
        label: "preamble-yes",
        type: "value",
        id: "preambleAccepted",
        value: true
      },
      {
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
        type: "answer"
      },
      {
        type: "value",
        id: "preambleRejected",
        value: (story) => story.lastAnswer,
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
        matches: [
          { re: /\b(yes|y|yup|sure)\b/i, answer: "yes", next: "purpose-yes" },
          { re: /\b(no|n|nope)\b/i, answer: "no",  next: "purpose-no" },
        ]
      },
      {
        label: "purpose-yes",
        type: "value",
        id: "purposeAccepted",
        value: true
      },
      {
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
        type: "answer"
      },
      {
        type: "value",
        id: "purposeRejected",
        value: (story) => story.lastAnswer,
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
        matches: [
          { re: /\b(yes|y|yup|sure)\b/i, answer: "yes", next: "term-yes" },
          { re: /\b(no|n|nope)\b/i, answer: "no",  next: "term-no" },
        ]
      },
      {
        label: "term-yes",
        type: "value",
        id: "termAccepted",
        value: true,
      },
      {
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
        type: "answer"
      },
      {
        type: "value",
        id: "termRejected",
        value: (story) => story.lastAnswer,
        next: "conclusion",
      },
      {
        label: "conclusion",
        type: "value",
        id: "conclusion",
        value: (story) => {
          const {preambleAccepted, purposeAccepted, termAccepted, preambleRejected, purposeRejected, termRejected } = story.values
          if (preambleAccepted && purposeAccepted && termAccepted) {
            return `
              <b>Thank you for accepting this agreement</b>.
              This is normally where we'd have you sign something, but since this is just a demo we'll leave it here.
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
              <p>But don't worry, our team will consider your reasons and get back to you as soon as possible.</p>
            `
          }
        }
      },
      {
        type: "chat",
        content: (story) => story.values.conclusion,
        chatter: false
      },

    ],

  }
}
