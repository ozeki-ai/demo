function nda() {
  return {
    title: "MUTUAL NON-DISCLOSURE AGREEMENT",
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
          <em>"a business opportunity of mutual interest and benefit"</em>.
        ` 
      },
      {
        type: "chat",
        content: "Do you wish to allow NDAs with the generic description?",
      },
      {
        label: "generic-business-purpose",
        type: "answer",
        matches: [
          { re: /\b(yes|y|yup)\b/i, answer: "yes", next: "generic-business-purpose-yes" },
          { re: /\b(no|n|nope)\b/i, answer: "no",  next: "generic-business-purpose-no" },
        ]
      },
      {
        label: "generic-business-purpose-yes",
        type: "strategy",
        section: "purpose",
        content: `Allow generic [<em>businessPurpose</em>] <em>"a business opportunity of mutual interest and benefit"`,
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
      { type: "answer",
        matches: [
          { re: /\b(yes|y|yup)\b/i, answer: "yes", next: "specific-business-purpose-yes" },
          { re: /\b(no|n|nope)\b/i, answer: "no",  next: "specific-business-purpose-no" },
        ]
      },
      {
        label: "specific-business-purpose-yes",
        type: "chat",
        content: `What is the specific <b>businessPurpose</b>?`,
      },
      {
        type: "answer",
        matches: [
          { re: /.*/i },
        ],
      },
      {
        type: "strategy",
        section: "purpose",
        content: (story) => `Allow specific [<em>businessPurpose</em>] "${story.lastAnswer}"`,
        next: "wrap-up"
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
        next: "wrap-up"
      },
      {
        label: "wrap-up",
        type: "chat",
        content: "Let's wrap up"
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
        number: 1,
        title: "UNIVERSAL NDA",
        content: [`
[loweralpha]
. *Universal NDA*. The Parties acknowledge and agree that, where noted,
the clauses of this NDA are consistent with the terms of the so-called
Universal NDA as of the Effective Date. The Parties agree that they will
not seek to enforce the terms of this agreement in a materially
different from manner those contained in the Universal NDA as of the
Effective Date. The Universal NDA is available at:
https://github.com/bitmovin/unda.

. *Included Clauses.* This agreement contains the following Universal NDA
Clauses: [Business Purpose;][Business Purpose Specifically
Defined;][Business Purpose Excluding;][Confidential
Information;][Confidentiality Information Specific Defined;]Exclusions;
Obligation to Maintain Confidentiality; [Representatives;]
[Representatives Specifically Defined;] Term: [term]; [Duration of
Confidential Information;] Return of Property; No Obligation; No
Warranty; Remedies; Choice of Law: [choiceOfLaw]; and Venue:[venue]
[Where the Defendant Resides.]

. [*Other Clauses.* This Agreement contains clauses beyond those contained
in the Universal NDA.]`
        ]
      },
      {
        number: 2,
        title: "CONFIDENTIAL INFORMATION",
        content: [`
Each party (in such capacity, a “*Disclosing Party*”) may disclose
certain of its confidential and proprietary information to the other
party (in such capacity, a “*Receiving Party*”). [“*Confidential
Information*” means any information disclosed by either party to the
other party, either directly or indirectly, in writing, orally, or by
inspection of tangible objects that (a) the Disclosing Party identifies
as confidential or proprietary, or (b) that reasonably appears to be
confidential or proprietary because of legends or other markings, the
circumstances of disclosure, or the nature of the information itself.]
[Confidential Information includes, but is not limited
to,[definitionOfConfidentialInformation].] Confidential Information may
also include third party confidential or proprietary information
disclosed to the Receiving Party.`
        ]
      },
      {
        number: 3,
        title: "EXCLUSIONS",
        content: [`
The obligations and restrictions of this agreement do not apply to that
part of the Confidential Information that:

[loweralpha]
. was or becomes generally known to the public other than as a result of a
  disclosure by the Receiving Party in violation of this agreement;

. was known, without restriction as to use or disclosure, by the Receiving
  Party prior to receiving such information from the Disclosing Party;

. is rightfully acquired by the Receiving Party from a third party who has
  the right to disclose it and who provides it without restriction as to
  use or disclosure;

. is independently developed by the Receiving Party without access to any
  Confidential Information of the Disclosing Party; or

. is requested or legally compelled (by valid and effective subpoena or
  order issued by either a court of competent jurisdiction), or is
  required by a regulatory body, to be disclosed. However, unless
  prohibited by force of law, the Receiving Party shall:

+
[lowerroman]
.. provide the Disclosing Party with prompt notice of any such request or
   requirement before disclosure so that the Disclosing Party may seek an
   appropriate protective order or other appropriate remedy; and

.. provide reasonable assistance to the Disclosing Party in obtaining any
   such protective order.

If the Receiving Party is nonetheless legally compelled or otherwise
required to disclose, the Receiving Party will furnish only that portion
of the Confidential Information that is legally required and shall make
reasonable efforts to obtain reliable assurance that confidential
treatment will be accorded any part of the Confidential Information so
disclosed.`
        ]
      },
      {
        number: 4,
        title: "OBLIGATION TO MAINTAIN CONFIDENTIALITY",
        content: [`
[loweralpha]
. *Confidentiality.* The Receiving Party shall keep the Confidential
  Information confidential. Except as otherwise required by law, the
  Receiving Party may not:

+
[lowerroman]
.. disclose any Confidential Information to any person or entity other than
   a Receiving Party’s Representatives, [which includes only its employees,
   agents, officers, and advisors which includes only
   [representativesDefined],] who needs to know the Confidential
   Information for the Purpose, provided such representative is bound to
   confidentiality obligations no less protective than this agreement and
   the Receiving Party remains responsible for compliance by any such
   Representative with the terms of this agreement;

.. disclose any Confidential Information to a third party without the
   Disclosing Party’s prior written authorization; or

.. use the Confidential Information other than for the Purpose.

. *No Reverse Engineering.* The Receiving Party may not reverse
  engineer, disassemble, or decompile any prototypes, software, or other
  tangible objects that embody the Disclosing Party’s Confidential
  Information and that are provided to the Receiving Party under this
  agreement.`
        ]
      },
      {
        number: 5,
        title: "TERM AND DURATION",
        content: [`
This Agreement will commence on the date first set forth above and will
remain in effect for [term] years (“*Term*”). [The Receiving Party’s
confidentiality obligations under this Agreement will survive
indefinitely or until all Confidential Information disclosed during the
Term becomes publicly known and made generally available through no
action or inaction of the Receiving Party or Receiving Party’s
Representatives.]`
        ]
      },
      {
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
        number: 8,
        title: "NO WARRANTY",
        content: [`
ALL CONFIDENTIAL INFORMATION IS PROVIDED “AS IS.” NEITHER PARTY MAKES
ANY WARRANTIES, EXPRESS, IMPLIED, OR OTHERWISE, REGARDING THE ACCURACY,
COMPLETENESS, OR PERFORMANCE OF ANY SUCH INFORMATION.`
        ]
      },
      {
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
        number: 10,
        title: "MISCELLANEOUS",
        content: [`
[loweralpha]
. *Choice of Law.* The laws of the state of [choiceOfLaw] govern this
agreement (without giving effect to its conflicts of law principles).

. *Venue.* [Any suit to enforce this Agreement shall be brought
exclusively in [venue] and the Parties hereby submit to the personal
jurisdiction of such courts and waive any venue objection.] [The Parties
irrevocably agree suit to enforce this Agreement shall be brought
exclusively in the jurisdiction where the initial defendant in such
action resides and waive any venue objection.]`
        ]
      }
    ],
  }
}

export default nda
