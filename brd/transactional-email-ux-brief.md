# Transactional Email UX Brief

**Scope:** This brief defines the **inventory of transactional emails** the ClaimLane portal sends to external recipients (customers and vendors). It is the single source of truth for *which* emails exist and *when* they fire. Copy, layout, and visual design are out of scope for this document.

**Out of scope:** CX notifications. CX operates inside the ClaimLane portal and receives in-portal alerts only (no email templates are designed for CX). Inbound communications (customer donation confirmations, admin-initiated product removal requests, US warehouse status updates to Internal Ops) are also excluded, as those are not system-generated transactional emails.

---

## Email Inventory

| ID | Trigger Event | Recipient(s) | Workflow Ref | Requirement Ref |
| :--- | :--- | :--- | :--- | :--- |
| TXE-01 | Unboxed mattress vendor assigned | Customer, Assigned vendor | WF-059 / WF-065A | FR-32, US-11.1 AC4, Appendix E.1, E.2 |
| TXE-02 | Unboxed mattress vendor changed (reassignment) | New vendor, Previous vendor, Customer | WF-059 / WF-065A | FR-32, US-11.1 AC5, Epic 9 |
| TXE-03 | Furniture return approved by CX | Customer | WF-052 (furniture path) | FR-32, US-11.1 AC6 |
| TXE-04 | Furniture return declined by CX | Customer | WF-052 (furniture path) | FR-32, US-11.1 AC6 |
| TXE-05 | Third-party pickup ticket created (via vendor link) | Third-party vendor | WF-012 / WF-011B | FR-32, FR-48, US-11.1 AC1 |
| TXE-06 | Third-party pickup completed (item collected) | Third-party vendor | WF-089 (third-party context) | FR-32, US-11.1 AC2 |
| TXE-07 | Warranty claim declined by CX | Customer | WF-052D | FR-32, US-11.1 AC3 |

### Notes on recipients

- **TXE-05 — CX is not an email recipient.** FR-32 / FR-48 reference CX being "notified" when a third-party pickup ticket is created; this MUST be delivered as an in-portal alert, not email. See Epic 11 cross-channel handling.
- **TXE-02 — Three recipients.** Reassignment requires notifying the *new* vendor, *previous* vendor (job reassigned), and the customer (updated vendor details). See `epics-user-stories.md` Epic 9 acceptance criteria.

---

## System Requirements (cross-cutting)

These apply to every row in the inventory above. Sourced from US-11.1 acceptance criteria.

1. All emails are logged in ticket history with timestamps.
2. Email templates are configurable without code changes (see NFR-5).
3. Failed email delivery triggers retry logic and alerts the internal team.

---

## Explicit Exclusions

The following communications appear in the BRD but are **not** ClaimLane-generated transactional emails and are therefore not part of this inventory:

| Communication | Why excluded | Reference |
| :--- | :--- | :--- |
| US warehouse → Internal Ops status updates | Offline email, not sent by ClaimLane | FR (offline warehouse flow), NFR-8 |
| Customer donation confirmation to CX | Inbound (customer-initiated call/email) | FR-38, WF-130 |
| Admin product removal request | Inbound (admin-initiated email to sysadmin) | US-12.2 |
| Any CX-facing notification | In-portal alert only (see Scope) | Product convention |

---

## Discussion

<div class="giscus-placeholder"></div>
