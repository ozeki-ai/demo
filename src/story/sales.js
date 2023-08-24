import shared from "../shared"

export default function story() {
  return {
    title: "MUTUAL NON-DISCLOSURE AGREEMENT",

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

    sections: [
      {
        id: "preamble",
        show: true,
        content: [
          `This mutual nondisclosure agreement is entered into on `,
          { id: "agreementDate", type: "date" },
          ` (the <b>"Effective Date"</b>), between `,
          { id: "companyName", type: "text" },
          ` a Delaware corporation whose principal address is `,
          { id: "companyAddress", type: "address" },
          ` and `,
          { id: "counterpartyName", type: "text" },
          `, an entity organized under the laws of `,
          { id: "counterpartyIncorporationState", type: "state" },
          ` whose principal address is `,
          { id: "counterpartyAddress", type: "address" },
          ` (each, a <b>"Party"</b>).`,
        ]
      },
      {
        id: "purpose",
        show: true,
        content: [
          `The parties wish to explore `,
          { id: "businessPurpose", type: "purpose" },
          ` (<b>"Purpose"</b>) and, in connection with the Purpose, may disclose to each other certain confidential technical and business information that the disclosing party desires the receiving party to treat as confidential.`,
        ],
      },
      {
        show: true,
        content: [
          `The parties therefore agree as follows:`
        ]
      },
      {
        id: "unda",
        number: 1,
        title: "UNIVERSAL NDA",
        content: [
          `<b>Universal NDA</b>. The Parties acknowledge and agree that, where noted,
           the clauses of this NDA are consistent with the terms of the so-called
           Universal NDA as of the Effective Date. The Parties agree that they will
           not seek to enforce the terms of this agreement in a materially
           different from manner those contained in the Universal NDA as of the
           Effective Date. The Universal NDA is available at:
           <a target="_other" href="https://github.com/bitmovin/unda">https://github.com/bitmovin/unda</a>.`,
        ]
      },
      {
        id: "confidential-information",
        number: 2,
        title: "CONFIDENTIAL INFORMATION",
        content: [
          `Each party (in such capacity, a “<b>Disclosing Party</b>”) may disclose
           certain of its confidential and proprietary information to the other
           party (in such capacity, a “<b>Receiving Party</b>”). [“<b>Confidential
           Information</b>” means any information disclosed by either party to the
           other party, either directly or indirectly, in writing, orally, or by
           inspection of tangible objects that (a) the Disclosing Party identifies
           as confidential or proprietary, or (b) that reasonably appears to be
           confidential or proprietary because of legends or other markings, the
           circumstances of disclosure, or the nature of the information itself.]
           [Confidential Information includes, but is not limited
           to,[<em>definitionOfConfidentialInformation</em>].] Confidential Information may
           also include third party confidential or proprietary information
           disclosed to the Receiving Party.`
        ]
      },
      {
        id: "exclusions",
        number: 3,
        title: "EXCLUSIONS",
        content: [`
          <p>
            The obligations and restrictions of this agreement do not apply to that
            part of the Confidential Information that:
          </p>
          <ul>
            <li>was or becomes generally known to the public other than as a result of a disclosure by the Receiving Party in violation of this agreement;</li>
            <li>was known, without restriction as to use or disclosure, by the Receiving Party prior to receiving such information from the Disclosing Party;</li>
            <li>is rightfully acquired by the Receiving Party from a third party who has the right to disclose it and who provides it without restriction as to use or disclosure;</li>
            <li>is independently developed by the Receiving Party without access to any Confidential Information of the Disclosing Party; or</li>
            <li>is requested or legally compelled (by valid and effective subpoena or order issued by either a court of competent jurisdiction), or is required by a regulatory body, to be disclosed. However, unless prohibited by force of law, the Receiving Party shall:</li>
            <li>
              <ul>
                <li>provide the Disclosing Party with prompt notice of any such request or requirement before disclosure so that the Disclosing Party may seek an appropriate protective order or other appropriate remedy; and</li>
                <li>provide reasonable assistance to the Disclosing Party in obtaining any such protective order.</li>
              </ul>
            </li>
          </ul>
          <p>
            If the Receiving Party is nonetheless legally compelled or otherwise
            required to disclose, the Receiving Party will furnish only that portion
            of the Confidential Information that is legally required and shall make
            reasonable efforts to obtain reliable assurance that confidential
            treatment will be accorded any part of the Confidential Information so
            disclosed.
          </p>`
        ]
      },
      {
        id: "confidentiality-obligation",
        number: 4,
        title: "OBLIGATION TO MAINTAIN CONFIDENTIALITY",
        content: [`
          <ul>
            <li>
              <b>Confidentiality.</b> The Receiving Party shall keep the Confidential
              Information confidential. Except as otherwise required by law, the
              Receiving Party may not:
              <ul>
                <li>
                  disclose any Confidential Information to any person or entity other than
                  a Receiving Party’s Representatives, [which includes only its employees,
                  agents, officers, and advisors which includes only
                  [representativesDefined],] who needs to know the Confidential
                  Information for the Purpose, provided such representative is bound to
                  confidentiality obligations no less protective than this agreement and
                  the Receiving Party remains responsible for compliance by any such
                  Representative with the terms of this agreement;
                </li>
                <li>
                  disclose any Confidential Information to a third party without the
                  Disclosing Party’s prior written authorization; or
                </li>
                <li>
                  use the Confidential Information other than for the Purpose.
                </li>
              </ul>
            </li>
            <li>
              <b>No Reverse Engineering.</b> The Receiving Party may not reverse
              engineer, disassemble, or decompile any prototypes, software, or other
              tangible objects that embody the Disclosing Party’s Confidential
              Information and that are provided to the Receiving Party under this
              agreement.
            </li>
          </ul>`
        ]
      },
      {
        id: "term",
        number: 5,
        title: "TERM AND DURATION",
        content: [
          "This Agreement will commence on the date first set forth above and will remain in effect for ",
          { id: "term", type: "term" },
          ` (“<b>Term</b>”). `,
          `[The Receiving Party’s
            confidentiality obligations under this Agreement will survive
            indefinitely or until all Confidential Information disclosed during the
            Term becomes publicly known and made generally available through no
            action or inaction of the Receiving Party or Receiving Party’s
            Representatives.]`
        ]
      },
      {
        id: "return-of-property",
        number: 6,
        title: "RETURN OF PROPERTY",
        content: [`
          All documents and other tangible objects containing or representing
          Confidential Information that have been disclosed by either party to the
          other party, and all copies in the possession of the other party, are
          and will remain the property of the Disclosing Party. At the Disclosing
          Party’s request, the Receiving Party shall promptly return or destroy
          all of those documents or objects.`
        ]
      },
      {
        id: "obligation",
        number: 7,
        title: "NO OBLIGATION",
        content: [`
          Nothing in this agreement obligates either party to proceed with any
          transaction between them, and each party reserves the right, in its sole
          discretion, to terminate the discussions contemplated by this agreement
          concerning the business opportunity, if any, and to cease further
          disclosures, communications, or other activities under this agreement on
          written notice to the other party. Any commitment to proceed with a
          transaction will be set forth in a separate agreement signed by the
          parties.`
        ]
      },
      {
        id: "warranties",
        number: 8,
        title: "NO WARRANTY",
        content: [`
          ALL CONFIDENTIAL INFORMATION IS PROVIDED “AS IS.” NEITHER PARTY MAKES
          ANY WARRANTIES, EXPRESS, IMPLIED, OR OTHERWISE, REGARDING THE ACCURACY,
          COMPLETENESS, OR PERFORMANCE OF ANY SUCH INFORMATION.`
        ]
      },
      {
        id: "remedies",
        number: 9,
        title: "REMEDIES",
        content: [`
          Each party agrees that its obligations hereunder are necessary and
          reasonable in order to protect the disclosing party and the disclosing
          party’s business, and expressly agrees that monetary damages may be
          inadequate to compensate the disclosing party for any breach by the
          receiving party of any covenants and agreements set forth herein.
          Accordingly, each party agrees and acknowledges that any such violation
          or threatened violation may cause irreparable injury to the disclosing
          party and that, in addition to any other remedies that may be available,
          in law, in equity or otherwise, the disclosing party shall be entitled
          to seek injunctive relief against the threatened breach of this
          Agreement or the continuation of any such breach, without the necessity
          of proving actual damages or posting bond in order to obtain a
          preliminary injunction. However, this shall not modify or abridge a
          moving party’s obligation to demonstrate harm in order to obtain a
          permanent injunction.`
        ]
      },
      {
        id: "misc",
        number: 10,
        title: "MISCELLANEOUS",
        content: [`
          <ul>
            <li>
              <b>Choice of Law.</b> The laws of the state of [<em>choiceOfLaw</em>] govern this agreement (without giving effect to its conflicts of law principles).
            </li>
            <li>
              <b>Venue.</b> [Any suit to enforce this Agreement shall be brought
              exclusively in [<em>venue</em>] and the Parties hereby submit to the personal
              jurisdiction of such courts and waive any venue objection.] [The Parties
              irrevocably agree suit to enforce this Agreement shall be brought
              exclusively in the jurisdiction where the initial defendant in such
              action resides and waive any venue objection.]
            </li>
          </ul>`
        ]
      }
    ],
  }
}
