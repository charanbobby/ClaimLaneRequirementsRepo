# ClaimLane Transactional Email UX Brief

Every outbound email the ClaimLane system produces, split by audience.

Client-facing emails are the priority. They carry the brand, set the customer's expectations, and are what most recipients judge the product by. Vendor-facing emails are operational: they need correct data and clean layout but do not require the same depth of copy and design investment.

---

## Client-facing emails (8 confirmed)

These go to the end customer.

C0 is the first thing the customer sees after submitting a request, so it has outsized impact on trust and perceived responsiveness.

| # | Template | Trigger | Must contain | Primary CTA | Source |
|---|----------|---------|--------------|-------------|--------|
| C0 | Request received (receipt) | Customer submits any new ticket (return, warranty, third-party pickup) | Customer name, request #, SLA ("we aim to respond within 2 business days"), link back to the request, support contact | View request, reply to add details | Current production email. **Not listed in FR-32; BRD gap to patch.** |
| C1 | Unboxed mattress: vendor assigned | Logistics Manager assigns donation-pickup partner | Customer name, mattress model and size, partner name, pickup window | Await pickup | FR-32, Appendix E.1, TC-OP11 |
| C2 | Unboxed mattress: vendor changed | Logistics Manager reassigns to a different donation-pickup partner | New vendor name, updated pickup window | Confirm receipt | FR-32, US-11.1 #5, TC-OP12 |
| C3 | Furniture return: approved | CX approves furniture return after photo and charge review | Order #, approved charges, return label, pickup or drop-off instructions, destination warehouse (Caledonia or US) | Print label, schedule pickup | FR-32, US-11.1 #6, TC-CX01, TC-CX02 |
| C4 | Furniture return: declined | CX declines furniture return | Reason for decline, how to dispute | Contact CX | FR-32, US-11.1 #6, TC-CX02 |
| C5 | Warranty claim: declined | CX declines warranty claim | Claim ID, reason, warranty period, next steps | Contact CX if disputed | FR-32, US-11.1 #3, WF-052D, TC-CX05 |
| C6 | Self-donation instructions | Logistics Manager selects "Self-Donation" (no donation partner available) | Donation instructions, CX contact, proof-of-donation photo requirement | Donate, photograph, contact CX | FR-38, WF-130, TC-OP15 |
| C7 | Refund outcome notification | Item received, refund decision made (auto or manual-review) | Refund amount, order #, method, expected timeline | Watch bank account | US-10.1 #7, WF-089, BR-21 |

### Return-label attachment logic (applies to C0 and C3)

The return label is a FedEx PNG attachment. Whether it is attached depends on the flow:

| Flow | Receipt email (C0) includes label? | Later email includes label? |
|---|---|---|
| Standard mailable return (boxed mattress, accessory, bedding, most eligible items) | **Yes.** Label auto-generates at submission. | N/A |
| Furniture return | No. Label not generated until CX approves. | **Yes, attached to C3** (approval email). |
| Warranty claim | No. | No label via ClaimLane. If CX adds courier pickup later (FR-35), label includes "(Defective)" text; delivery path for that label is a PM question. |
| Unboxed mattress | No. Donation partner handles pickup; no customer-printed label. | No. |
| Third-party pickup (TSC, EQ3) | No. Vendor handles pickup; no customer-printed label. | No. |

Implications:

- C0 needs **two variants**: with label block and without. When the label is attached, the email body should reference it explicitly and give next-step instructions (print, attach to package, drop off). When the label is not attached, the body should set expectations ("we'll send your next steps once our team has reviewed").
- C3 always has a label and needs clear print-and-ship instructions in the body.
- Consider embedding the label as an inline preview image in the body (in addition to the PNG attachment) so mobile users do not miss it.

---

## Vendor-facing emails (5 confirmed)

These go to **donation-pickup partners** (unboxed mattress network) or **third-party logistics vendors** (TSC, EQ3). Content is operational: order details, address, instructions to act.

| # | Template | Recipient type | Must contain | Primary CTA | Source |
|---|----------|----------------|--------------|-------------|--------|
| V1 | Unboxed mattress: vendor assigned | Donation-pickup partner | Order #, customer name, phone, email, address, province, country, mattress type and size, qty, date | Schedule pickup | FR-32, Appendix E.2, TC-OP11 |
| V2 | Unboxed mattress: new-vendor assignment (on reassignment) | New donation-pickup partner | Same payload as V1 | Schedule pickup | FR-32, US-11.1 #5, TC-OP12 |
| V3 | Third-party pickup: ticket created | Third-party logistics vendor | Order #, customer address and contact, item details (no customer photos per FR-20) | Schedule pickup | FR-32, FR-48, US-11.1 #1, TC-OP14 |
| V4 | Third-party pickup: completed | Third-party logistics vendor | Order #, confirmation of receipt | Close job | FR-32, US-11.1 #2, WF-015, TC-OP14 |
| V5 | Unboxed mattress: old-vendor stand-down | Previous donation-pickup partner | Order #, customer name, "job reassigned, please stand down" | Remove from queue | TC-OP12 |

---

## Out of scope, system-of-record is elsewhere (1 decision)

| # | Template | Why out of scope | Scoping question for PM |
|---|----------|------------------|-------------------------|
| X1 | Warranty replacement order: shipped | Sent by WooCommerce's default order-notification system, not by ClaimLane. TC-CX05 step 8 explicitly says "Customer notified via WooCommerce." | Do we want to suppress the WooCommerce default and send a branded ClaimLane equivalent? If yes, this becomes an additional client-facing template. |

---

## Discussion

<div class="giscus-placeholder"></div>
