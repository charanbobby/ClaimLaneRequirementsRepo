# ClaimLane Transactional Email UX Brief

**Owner:** Charan
**Audience:** UX Lead and UX Lead's Manager (for scoping), then the UX designer assigned
**Status:** Draft for review
**Date:** 2026-04-17

---

## 1. Why this brief exists

ClaimLane currently sends around a dozen transactional emails across the claim, return, and warranty lifecycle. Copy and layout were written by the product and dev team as we built each workflow, not by a UX or content designer. Before we ship to more clients and add the US warehouse and third-party vendor flows, we want to:

1. Tighten the **copy** so every email tells the recipient clearly *what happened*, *what they need to do*, and *by when*.
2. Align the **visual treatment** with ClaimLane's brand and make the templates consistent with each other.
3. Agree on who owns which part of the pipeline (UX vs. dev).

A sample of the current state is attached separately. Please review before the kickoff.

---

## 2. Email inventory

Every outbound email the ClaimLane system produces, split by audience so UX scoping is obvious.

Client-facing emails are the priority. They carry the brand, set the customer's expectations, and are what most recipients judge the product by. Vendor-facing emails are operational: they need correct data and clean layout but do not require the same depth of copy and design investment.

Internal CX notifications are deliberately excluded from this list. CX operates inside the ClaimLane portal and should not receive system-triggered emails. See section 2d for the gap this creates against FR-32.

### 2a. Client-facing emails, HIGH UX priority (8 confirmed)

These go to the end customer. Full design-system and copywriting treatment expected.

C0 is the first thing the customer sees after submitting a request, so it has outsized impact on trust and perceived responsiveness. Sample PDF of the current C0 is in `drafts/Silk & Snow Mail - Receipt.pdf` and is referenced throughout section 5.

| # | Template | Trigger | Must contain | Primary CTA | Source |
|---|----------|---------|--------------|-------------|--------|
| C0 | Request received (receipt) | Customer submits any new ticket (return, warranty, third-party pickup) | Customer name, request #, SLA ("we aim to respond within 2 business days"), link back to the request, support contact | View request, reply to add details | Current production email (`drafts/Silk & Snow Mail - Receipt.pdf`). **Not listed in FR-32; BRD gap to patch.** |
| C1 | Unboxed mattress: vendor assigned | Logistics Manager assigns donation-pickup partner | Customer name, mattress model and size, partner name, pickup window | Await pickup | FR-32, Appendix E.1, TC-OP11 |
| C2 | Unboxed mattress: vendor changed | Logistics Manager reassigns to a different donation-pickup partner | New vendor name, updated pickup window | Confirm receipt | FR-32, US-11.1 #5, TC-OP12 |
| C3 | Furniture return: approved | CX approves furniture return after photo and charge review | Order #, approved charges, return label, pickup or drop-off instructions, destination warehouse (Caledonia or US) | Print label, schedule pickup | FR-32, US-11.1 #6, TC-CX01, TC-CX02 |
| C4 | Furniture return: declined | CX declines furniture return | Reason for decline, how to dispute | Contact CX | FR-32, US-11.1 #6, TC-CX02 |
| C5 | Warranty claim: declined | CX declines warranty claim | Claim ID, reason, warranty period, next steps | Contact CX if disputed | FR-32, US-11.1 #3, WF-052D, TC-CX05 |
| C6 | Self-donation instructions | Logistics Manager selects "Self-Donation" (no donation partner available) | Donation instructions, CX contact, proof-of-donation photo requirement | Donate, photograph, contact CX | FR-38, WF-130, TC-OP15 |
| C7 | Refund outcome notification | Item received, refund decision made (auto or manual-review) | Refund amount, order #, method, expected timeline | Watch bank account | US-10.1 #7, WF-089, BR-21 |

#### Return-label attachment logic (applies to C0 and C3)

The return label is a FedEx PNG attachment (example: `Label_1355117_0.png`). Whether it is attached depends on the flow:

| Flow | Receipt email (C0) includes label? | Later email includes label? |
|---|---|---|
| Standard mailable return (boxed mattress, accessory, bedding, most eligible items) | **Yes.** Label auto-generates at submission. | N/A |
| Furniture return | No. Label not generated until CX approves. | **Yes, attached to C3** (approval email). |
| Warranty claim | No. | No label via ClaimLane. If CX adds courier pickup later (FR-35), label includes "(Defective)" text; delivery path for that label is a PM question. |
| Unboxed mattress | No. Donation partner handles pickup; no customer-printed label. | No. |
| Third-party pickup (TSC, EQ3) | No. Vendor handles pickup; no customer-printed label. | No. |

UX implications:
- C0 needs **two variants**: with label block and without. When the label is attached, the email body should reference it explicitly and give next-step instructions (print, attach to package, drop off). When the label is not attached, the body should set expectations ("we'll send your next steps once our team has reviewed").
- C3 always has a label and needs clear print-and-ship instructions in the body.
- Consider embedding the label as an inline preview image in the body (in addition to the PNG attachment) so mobile users do not miss it.

### 2b. Vendor-facing emails, LOW UX priority (5 confirmed)

These go to **donation-pickup partners** (unboxed mattress network) or **third-party logistics vendors** (TSC, EQ3). Content is operational: order details, address, instructions to act.

Recommendation: reuse the design system header and footer, keep the body as a clean data table, skip the full copywriting pass. A ClaimLane dev team template from a shared skeleton is probably sufficient. Flag this to UX's manager as light-touch work so it does not compete with the client-facing scope.

| # | Template | Recipient type | Must contain | Primary CTA | Source |
|---|----------|----------------|--------------|-------------|--------|
| V1 | Unboxed mattress: vendor assigned | Donation-pickup partner | Order #, customer name, phone, email, address, province, country, mattress type and size, qty, date | Schedule pickup | FR-32, Appendix E.2, TC-OP11 |
| V2 | Unboxed mattress: new-vendor assignment (on reassignment) | New donation-pickup partner | Same payload as V1 | Schedule pickup | FR-32, US-11.1 #5, TC-OP12 |
| V3 | Third-party pickup: ticket created | Third-party logistics vendor | Order #, customer address and contact, item details (no customer photos per FR-20) | Schedule pickup | FR-32, FR-48, US-11.1 #1, TC-OP14 |
| V4 | Third-party pickup: completed | Third-party logistics vendor | Order #, confirmation of receipt | Close job | FR-32, US-11.1 #2, WF-015, TC-OP14 |
| V5 | Unboxed mattress: old-vendor stand-down | Previous donation-pickup partner | Order #, customer name, "job reassigned, please stand down" | Remove from queue | TC-OP12 |

### 2c. Out of scope for ClaimLane UX, system-of-record is elsewhere (1 decision)

| # | Template | Why out of scope | Scoping question for PM |
|---|----------|------------------|-------------------------|
| X1 | Warranty replacement order: shipped | Sent by WooCommerce's default order-notification system, not by ClaimLane. TC-CX05 step 8 explicitly says "Customer notified via WooCommerce." | Do we want to suppress the WooCommerce default and send a branded ClaimLane equivalent? If yes, this becomes an additional client-facing template. |

### 2d. Deliberately excluded (for reference, and one BRD gap to patch)

So the UX team does not chase these:

- **CX internal "new ticket" alerts** (FR-32 currently reads "notify CX and vendor via FR-48" for third-party pickup): CX operates entirely inside the ClaimLane portal, so internal notifications should be in-portal alerts or queue entries, not email. **Gap to patch: FR-32 needs rewording so "notify CX" is unambiguously in-portal, not an email trigger.** The vendor half of that same FR-32 trigger stays as email (captured as V3 above).
- **In-flow UI notifications** (e.g., "customer is notified of shipping charges," WF-073A, US-4.1): these render in the portal during the return flow, not in email.
- **US warehouse to Internal Ops emails** (WF-134, FR-37, BR-28): warehouse staff manually email Internal Ops. Not system-generated. No template.
- **Admin product-removal email** (US-12.2): manual email from admin to sysadmin. No template.
- **SMS, push, in-app**: not supported today.

---

## 3. What we want from UX

Rough effort by template type, for the UX lead to validate:

- **System design work (one-time):** a reusable email design system covering header, footer, typography scale, button styles, status badges (approved, declined, info), mobile breakpoints, light and dark handling. Everything else composes from this.
- **Per-template work (13 templates + 1 variant):** 8 client-facing plus 5 vendor-facing (lighter touch). Note C0 (request received) needs two variants: one with the return label block and one without, per the label-attachment logic in section 2a. Layout, component usage, final copy, reviewed against brand voice.
- **Copy authoring is owned by UX.** We want the UX team to write the final customer-facing and vendor-facing copy, not just design the containers. Subject lines, body text, CTA labels, and microcopy (footer, legal) all come from UX. If UX's in-house resources do not cover copywriting, flag that at the kickoff so we can bring a content designer or copywriter into scope.
- **Edge cases:** US-warehouse variant of C3 (different destination) and of C7 (different refund timeline); bilingual EN and FR-CA version for Canadian customers if in scope. Please confirm.

Deliverables we'd like back:

1. **Final copy** for all 13 templates in a shared doc (Google Doc or Notion), with variables shown as `{{order_number}}` so the ClaimLane dev team can paste directly into template config.
2. Figma file with the design system plus all 13 templates (and the C0 label-attached variant) at desktop and mobile widths.
3. A short style guide (voice, tone, do and don't) so future templates stay consistent.

---

## 4. The scoping question for UX's manager

The core question: **how deep should UX go?** Two options, with my recommendation.

### Option A (recommended): UX designs in Figma, ClaimLane dev team builds HTML

- UX: design system, Figma mocks, final copy.
- ClaimLane dev team: build MJML or HTML templates that match the Figma, hook into the template engine, handle variables and retry logic.
- **Pros:** clean separation. UX does not need email-HTML expertise (Outlook rendering quirks are nasty). The ClaimLane dev team keeps control of the config pipeline.
- **Cons:** slight translation loss between Figma and final HTML. Needs a QA pass against rendered emails.

### Option B: ClaimLane dev team writes HTML, UX reviews

- UX: copy, style guide, annotated screenshots. No Figma mocks.
- ClaimLane dev team: writes all HTML from scratch against the style guide.
- **Pros:** fastest path.
- **Cons:** we end up with what we have today: inconsistent, dev-driven visuals. Defeats the purpose of bringing UX in.

**Recommendation: Option A.** It matches how the rest of the product is designed, keeps UX focused on their strengths (system, copy, visuals), and lets the ClaimLane dev team own the plumbing (variables, retries, template-config API per US-11.1). Budget a QA round where UX reviews the rendered emails in Litmus or Email on Acid before we ship.

**What I'd ask UX's manager to confirm:**

- Is this work roughly 1 to 2 sprints of a designer's time, or larger?
- Does UX's in-house scope cover copywriting, or do we need a content designer or copywriter added?
- Is bilingual (FR-CA) in scope for v1, or a fast-follow?
- Who owns the post-launch review of open and CTR data: UX or product?

---

## 5. Cosmetic and copy recommendations on the current C0 template

Based on the production sample in `drafts/Silk & Snow Mail - Receipt.pdf` (customer receipt sent on ticket creation, request #1355117). These are specific to C0 but several points generalise across the set.

### Subject line

- **Current:** "Receipt"
- **Problem:** too vague. Reads like a purchase receipt, not a return/claim confirmation. No request number in the subject, so customers cannot search for it later.
- **Recommend:** "Return request #{{request_number}} received, we'll be in touch" or a variant that leads with the state change and the number.

### Sender identity

- **Current:** From `Silk & Snow <do-not-reply@claimlane.com>`, Reply-To `hello@silkandsnow.com`.
- **Problem:** the visible "from" domain is `claimlane.com`. Customers see an unfamiliar brand, which hurts deliverability (more likely to hit promotions or spam) and brand trust. Reply-To partially compensates but many clients surface the from address.
- **Recommend:** infrastructure task, send from a client-branded subdomain (e.g., `returns.silkandsnow.com`) with proper DKIM and SPF. This is a dev and DevOps item, flag it so UX knows the final from address may differ from what they see in dev.

### Visual hierarchy

- **Current:** oversized `silk&snow` logo dominates the top of the email. The request number (#1355117), which is the single most important reference item, is buried three paragraphs down as inline prose.
- **Recommend:** shrink the logo to brand-header size. Lift the request number into a prominent reference block near the top ("Your request: #1355117") so it survives scanning and mobile preview.

### CTA

- **Current:** "Go to request" rendered as faint grey underlined text. Visually reads like a disabled control, not an action.
- **Recommend:** proper button component (brand fill, adequate padding, bold label, no underline). Verb-led label: "View my request" or "Reply with more details". One primary CTA per email.

### Body copy

- **Current:**
  > We have received your request.
  > We will send you a message as soon as we have news about your request.
  > If you click on the link below you can send us a message.
  > We aim to respond within 2 business days.
  > Your request number is #1355117

- **Problems:** vague ("your request" never specifies what kind), filler sentences, awkward phrasing ("if you click on the link below you can send us a message"), no warmth.
- **Recommend sample rewrite:**
  > Hi {{first_name}}, thanks for reaching out. We have your {{request_type}} request and our team will review it within **2 business days**. We'll email you as soon as there's an update. Need to add photos or details? Reply to this email or open your request below.

### Label attachment (the big one)

- **Current:** return label is attached as a separate PNG (`Label_1355117_0.png`). The email body does not mention that a label is attached, does not preview it, does not tell the customer what to do with it.
- **Problems:** mobile clients collapse attachments by default. Customers who do find the PNG may not know to print it, attach it to the parcel, or where to drop it off. Support tickets for "I didn't get my label" are very likely.
- **Recommend:**
  - Add an inline preview image of the label in the email body (separate from the attachment).
  - Add a numbered "What to do next" block: 1) print the label, 2) attach to the package, 3) drop off at FedEx. Include a link to find a FedEx location.
  - When the label is **not** attached (furniture, warranty, unboxed mattress, third-party flows), the body should say so explicitly: "We'll send your return label once our team has reviewed your request." Never leave the customer wondering whether they missed an attachment.

### Footer

- **Current:** only `hello@silkandsnow.com` link. No company address, no phone, no legal footer.
- **Recommend:** add sender's legal business name and physical address (required in many jurisdictions for commercial email, even transactional). Include a single "Need help? Reply to this email or visit our help centre" line. Transactional emails do not need unsubscribe, so skip that.

### Tone

- **Current:** procedural, generic. Could be from any SaaS.
- **Recommend:** align with Silk & Snow's brand voice (reassuring, calm, sleep-adjacent). Not chatty, but warm. Set this in the style guide so future templates stay consistent.

### Accessibility and technical

- Body text should be 14px minimum.
- All images (including the logo and any embedded label preview) need alt text.
- Contrast on the CTA button needs to meet WCAG AA.
- Test with images blocked (Outlook default): the email must still tell the customer what was received and what happens next.
- Add a preview-text line (the snippet shown in the inbox list) that matches the subject: "Your request #{{request_number}} is in our queue."

---

## 6. Open questions for the kickoff

1. Brand assets: do we have an up-to-date logo lockup, brand palette, and type ramp, or does UX need to establish these?
2. Sender identity: is every email from `claims@claimlane.com`, or do vendor-facing emails come from a different address?
3. Reply handling: where do customer replies go today? CX inbox? A ticket-creating address?
4. Analytics: are we instrumented to measure open and CTR per template? If not, should we add this as part of the rollout?
5. Bilingual scope: is FR-CA required at launch?

---

## Appendix: source docs referenced

- `brd/functional-requirements.md` (FR-24, FR-32, FR-38, FR-48)
- `brd/appendices.md` (E.1, E.2)
- `brd/process-high-level.md` (WF-015, WF-052D, WF-056, WF-062, WF-067A, WF-089, WF-130, WF-134)
- `brd/business-rules.md` (BR-21)
- `brd/epics-user-stories.md` (US-10.1, US-11.1)
- `brd/e2e-test-cases.md` (TC-CX01, TC-CX02, TC-CX05, TC-OP11, TC-OP12, TC-OP14, TC-OP15)

---

## Discussion

<div class="giscus-placeholder"></div>
