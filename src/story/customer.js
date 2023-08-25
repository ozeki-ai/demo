import shared from "../shared"

function markSection(story, id, success) {
  let section
  if (section = story.sections.find((s) => s.id === id)) {
    if (success === true) {
      section.klass = "border-r-12 pr-4 border-green-500"
    } else if (success === false) {
      section.klass = "border-r-12 pr-4 border-red-500"
    } else {
      section.klass = "border-r-12 pr-4 border-yellow-500"
    }
  }
}

export default function story() {
  return {
    title: "MUTUAL NON-DISCLOSURE AGREEMENT",

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
          { re: /\b(yes|y|yup)\b/i, answer: "yes", next: "preamble-yes" },
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
          { re: /\b(yes|y|yup)\b/i, answer: "yes", next: "purpose-yes" },
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
          { re: /\b(yes|y|yup)\b/i, answer: "yes", next: "term-yes" },
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
        show: true,
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
