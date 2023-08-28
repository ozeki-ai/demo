import shared from "../shared"
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
        content: "Ok, let's generate an NDA for your customer. I will ask you some questions to fill in the blanks in this agreement..."
      },
      {
        type: "highlight",
        id: "agreementDate"
      },
      {
        type: "chat",
        content: `Starting with the <b>agreementDate</b>. Shall we use today's date ${shared.TODAY}?`
      },
      {
        type: "answer"
      },
      {
        type: "value",
        id: "agreementDate",
        value: shared.TODAY
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
        type: "answer"
      },
      {
        type: "value",
        id: "companyName",
        value: shared.COMPANY_NAME
      },
      {
        type: "value",
        id: "companyAddress",
        value: shared.COMPANY_ADDRESS
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
      },
      {
        type: "value",
        id: "counterpartyName",
        value: (story) => story.lastAnswer
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
        type: "answer"
      },
      {
        type: "value",
        id: "counterpartyIncorporationState",
        value: (story) => story.lastAnswer
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
        type: "answer"
      },
      {
        type: "value",
        id: "counterpartyAddress",
        value: (story) => story.lastAnswer
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
        content: `
          <ul>
            <li><b>generic</b>: ${shared.GENERIC_BUSINESS_PURPOSE}</li>
            <li><b>specific</b>: ${shared.SPECIFIC_BUSINESS_PURPOSE}</li>
          </ul>
        `
      },
      {
        type: "answer",
        matches: [
          { re: /.*(generic|first|one|1).*/,                  answer: shared.GENERIC_BUSINESS_PURPOSE },
          { re: /.*(specific|second|two|2|selling|widget).*/, answer: shared.SPECIFIC_BUSINESS_PURPOSE },
        ]
      },
      {
        type: "value",
        id: "businessPurpose",
        value: (story) => story.lastAnswer,
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
        content: `
          <ul>
            <li>${shared.ONE_YEAR_TERM}</b></li>
            <li>${shared.TWO_YEAR_TERM}</b></li>
            <li>${shared.THREE_YEAR_TERM}</b></li>
          </ul>
        `
      },
      {
        type: "answer",
        matches: [
          { re: /.*(one|1).*/,   answer: shared.ONE_YEAR_TERM },
          { re: /.*(two|2).*/,   answer: shared.TWO_YEAR_TERM },
          { re: /.*(three|3).*/, answer: shared.THREE_YEAR_TERM },
        ]
      },
      {
        type: "value",
        id: "term",
        value: (story) => story.lastAnswer,
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
      }
    ],
  }
}
