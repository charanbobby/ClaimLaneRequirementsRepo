# Deferred Features Backlog (Phase 2 & Future Phase)

## Executive Summary

During **Discussions with ClaimLane & Internal Stakeholders**, three major feature sets were systematically extracted from the Phase 1 BRD and moved to this Phase 2 backlog. This strategic deferral allows the team to focus Phase 1 delivery on core return and warranty flows while preserving complete context for future implementation.

### Deferred Features at a Glance

| Feature | Scope | Business Impact | Technical Complexity |
|---------|-------|-----------------|---------------------|
| **Vendors (Donation/Pickup Partners)** | Portal access for external vendors to update pickup status | Medium - Vendors handle logistics in Phase 1 via manual workaround | High - Requires multi-tenant auth, RBAC, data partitioning |
| **Third-Party Vendor Integration** | Complete workflow for TSC, EQ3, Costco returns | High - No third-party returns supported in Phase 1 | High - Fundamental architecture gap, requires core rebuild |
| **Bundle Refund Logic (Future Phase)** | Automated bundle impact calculations and 50% keep option | Medium - Manual processing workaround in Phase 1 | High - WooCommerce limitations, custom API integration needed |
| **Return Quantity Limits (Future Phase)** | Historical and per-request return limits | Low - No limits in Phase 1 | Low - Order history checks required |

### Why These Features Were Deferred

**1. Vendors (Donation / Pickup Partners)**

- **Rationale:** While vendors will handle physical logistics in Phase 1, portal access for status updates requires secure multi-tenant architecture and robust data partitioning
- **Phase 1 Workaround:** Return Logistics Team manually updates pickup status on behalf of vendors
- **Phase 2 Value:** Reduces internal team workload, improves real-time visibility, enables vendor accountability

**2. Third-Party Vendor Integration (TCS, EQ3, Costco)**

- **Rationale:** Existing Claimlane architecture lacks the logic necessary to support third-party vendor workflows - implementing this would require fundamental rebuild of core processes
- **Phase 1 Workaround:** Third-party vendor returns handled completely outside portal
- **Phase 2 Value:** Expands customer reach, supports retail partnerships, centralizes all return workflows

**3. Refund Logic with Bundle Impact Calculations**

- **Rationale:** WooCommerce core limitations prevent access to bundle data structures; custom logic required to parse bundle relationships and calculate 50% proration
- **Phase 1 Workaround:** All orders with bundles/free items route to manual CX refund processing (BR-26)
- **Phase 2 Value:** Reduces CX workload, improves customer experience, enables automated refunds for bundle orders <$600

### Implementation Approach

**Phase 1 Foundation (Current):**
- Core return flows (mattresses, furniture, accessories)
- Warranty claim processing
- Manual vendor coordination by Return Logistics Team
- Manual bundle refund processing by CX
- Third-party returns redirected to vendor processes

**Phase 2 Enhancements (This Backlog):**
- Vendor portal with secure authentication
- Third-party vendor approval workflows
- WooCommerce bundle API integration
- Automated bundle proration engine

### Business Continuity

All deferred features have **Phase 1 manual workarounds** to ensure zero disruption to customer service:

- **Vendor Status Updates:** Return Logistics Team enters vendor confirmations manually
- **Third-Party Returns:** Customers directed to vendor-specific return processes
- **Bundle Refunds:** CX team manually calculates proration and processes refunds

### Quick Reference

- **Total Features Deferred:** 4 (Phase 2: Vendors, Third-Party | Future Phase: Bundles, Limits)
- **Functional Requirements:** 13 (FR-9, FR-VENDOR-1-5, FR-TP-1-5)
- **User Stories:** 7 (from Epics 4, 8, 11)
- **Business Rules:** 4 (BR-1, BR-15, BR-16, BR-26)
- **Workflow Nodes:** 15+ (WF-004-017, WF-059/065A, WF-070-073)

> [!IMPORTANT]
> **Last Updated:** 2026-02-13
> All items below were systematically extracted from active BRD documents to focus Phase 1 delivery.

---

## 1. Vendors (Donation / Pickup Partners)

### Rationale for Deferral

While vendor partners will handle physical logistics in Phase 1, the ability to update pickup status within the portal is scheduled for Phase 2. This phased approach allows for a more secure rollout of Claimlane access and ensures robust data partitioning across our vendor network.

### Actors

#### DEFERRED: External Partners

| Actor                            | Description                                                                                          |
|----------------------------------|------------------------------------------------------------------------------------------------------|
| Vendors (Donation / Pickup Partners) | External entities tasked with the recovery of oversized items and donations. These partners collect unboxed mattresses, oversized items, or donations and update pickup status within the portal (Phase 2 capability). |

### Functional Requirements

#### FR-VENDOR-1 – Vendor Portal Access
- **ID:** *(Extracted from FR-20, FR-32, FR-38 vendor components)*
- **Description:** Provide vendors with portal access to mark items as "Picked" and update pickup status directly within ClaimLane.
- **Priority:** Phase 2
- **Dependencies:** Secure authentication, role-based access control, multi-vendor data partitioning

#### FR-VENDOR-2 – Vendor Selection & Assignment
- **ID:** *(Extracted from FR-20)*
- **Description:** Enable Return Logistics Manager to manually select donation or pickup vendors for unboxed mattresses and oversized items. System must trigger automated email notifications to vendor and customer upon assignment.
- **Priority:** Phase 2
- **Dependencies:** Vendor database, email integration, notification templates

#### FR-VENDOR-3 – Vendor Change Management
- **ID:** *(Extracted from FR-20, FR-32)*
- **Description:** Support vendor reassignment workflow. When vendor changes, system must:

    - Send updated notification to new vendor
    - Inform previous vendor of reassignment
    - Notify customer with updated vendor details
- **Priority:** Phase 2
- **Dependencies:** FR-VENDOR-1, FR-VENDOR-2, workflow state management

#### FR-VENDOR-4 – Vendor Pickup Confirmation
- **ID:** *(Derived from BR-16)*
- **Description:** Allow vendors to update status to "Picked" for assigned items. Status change must trigger transition to "Received" state to enable downstream refund processing.
- **Priority:** Phase 2
- **Dependencies:** FR-VENDOR-1, status workflow engine, refund trigger logic

#### FR-VENDOR-5 – Vendor Email Triggers
- **ID:** *(Extracted from FR-32)*
- **Description:** Configure specific automated email triggers for vendor workflows:

    - Unboxed Mattress Vendor Assignment
    - Unboxed Mattress Vendor Change (notify new vendor and customer)
- **Priority:** Phase 2
- **Dependencies:** Email service, notification templates, event trigger engine

### User Stories

> Canonical versions of these stories live in `13-epics-user-stories.md` (Epic 8). Below are Phase 2-specific status notes only.

- **US-8.1** — Vendor Selection for Unboxed / Donation Flows. **STATUS:** Self-donate fallback kept in Phase 1. Vendor portal access deferred to Phase 2.
- **US-8.2** — Vendor Change Handling. **STATUS:** Deferred to Phase 2.
- **US-8.3** — Vendor Pickup Confirmation. **STATUS:** Deferred to Phase 2.

### Business Rules

> Canonical rule text lives in `08-business-rules.md`. Below are Phase 2-specific status notes only.

- **BR-16** — Vendor Pickup and Status Updates. **STATUS:** Deferred to Phase 2. Phase 1 uses manual status updates by Return Logistics Team.

### Process Narratives

> Full narrative for Return Logistics Management (WF-059/065A - WF-064/063A) lives in `05-process-high-level.md`, Section 9.

**Phase 2 addition:** Vendor portal access replaces manual status updates. Vendors will mark items as "Picked" directly in portal instead of through Return Logistics Team intermediary.

**Phase 1 Workaround:** Return Logistics Team manually updates pickup status on behalf of vendors.

---

### Dependencies & Risks

#### Dependencies
- Secure multi-tenant authentication system
- Role-based access control (RBAC) for vendor permissions
- Email notification service integration
- Vendor onboarding and training process
- Data partitioning architecture for vendor isolation

#### Risks
- **Vendor Adoption:** External partners may resist using portal; requires change management
- **Data Security:** Vendor access increases attack surface; requires security hardening
- **Support Overhead:** Vendor user support may increase CS workload

---

## 2. Third-Party Vendor Integration (TCS, EQ3, Costco)

### Rationale for Deferral

The existing Claimlane architecture lacks the logic necessary to support TCS and EQ3 workflows. Implementing these features would require a fundamental rebuild of core processes, representing a significant departure from the current product roadmap.

### Actors

#### DEFERRED: Third-Party Vendor Ecosystem

*No specific actors were defined solely for third-party vendors. This feature relies on the general "Vendors" actor (see Section 1) plus third-party-specific business rules.*

### Functional Requirements

#### FR-TP-1 – Third-Party Channel Selection
- **ID:** *(Extracted from FR-1)*
- **Description:** When "Third-Party Vendor" is selected during channel selection, show vendor instructions and block further steps in the portal. Customer must be directed to vendor's own returns process.
- **Priority:** Phase 2
- **Dependencies:** Vendor partnership agreements, vendor-specific instruction content

#### FR-TP-2 – Third-Party Vendor Selection
- **ID:** *(Derived from Epic 11 process flow)*
- **Description:** Customer selects third-party vendor: TSC, EQ3, or Costco.
- **Priority:** Phase 2
- **Dependencies:** Vendor catalog, vendor eligibility rules

#### FR-TP-3 – Third-Party Evidence Collection
- **ID:** *(Derived from Epic 11 process flow)*
- **Description:** Collect vendor-specific evidence requirements:

    - Receipt
    - Photos
    - Law tags
    - Other vendor-specific documentation
- **Priority:** Phase 2
- **Dependencies:** Vendor-specific documentation requirements (WF-017)

#### FR-TP-4 – Third-Party Vendor Notifications
- **ID:** *(Extracted from FR-32)*
- **Description:** Configure automated email triggers for third-party workflows:

    - Third-Party Vendor Ticket Created (WF-008)
    - Third-Party Refund Approval to Vendor (WF-016)
- **Priority:** Phase 2
- **Dependencies:** Email service, vendor email addresses, notification templates

#### FR-TP-5 – Third-Party Pickup Logistics Split
- **ID:** *(Extracted from FR-36)*
- **Description:** When a third-party vendor approves a claim and customer needs pickup assistance (WF-011), offer two pickup types:

    - **Courier Pickup:** CX provides pickup coordination and generates return label (WF-012)
    - **Disposal Pickup:** Log case for Return Logistics Team (WF-011B connects to shared return logistics)
- **Priority:** Phase 2
- **Dependencies:** FR-VENDOR-2, courier integration, disposal vendor network

### User Stories

> Canonical versions of these stories live in `13-epics-user-stories.md`. Below are Phase 2-specific status notes only.

- **US-1.1** — Select Purchase Channel (Third-Party component). **STATUS:** Third-Party component deferred to Phase 2.
- **US-8.4** — Third-Party Pickup Logistics Split. **STATUS:** Deferred to Phase 2.
- **US-11.1** — Automated Email Triggers (criteria 1-2 for third-party). **STATUS:** Criteria 1-2 deferred to Phase 2. Criteria 3-9 kept in Phase 1.

### Business Rules

- **BR-1** — Third-Party Orders: Orders from third-party vendors never proceed through the portal. **STATUS:** Deferred to Phase 2.
- **BR-TP-1** — Third-Party Documentation Requirements: *(Extracted from FR-17)* Collect lot number and detailed description for all claims and require an invoice when the purchase was made through a third-party vendor. **STATUS:** Deferred to Phase 2.

### Process Narratives

> Full narrative for Third-Party Vendor Flow (WF-004 - WF-017) lives in `05-process-high-level.md`, Section C.

**STATUS:** Entire Third-Party Vendor Flow (WF-004 - WF-017) deferred to Phase 2.

### Scope Impact

#### Added to Out-of-Scope

- Third-party vendor claim processing (TSC, EQ3, Costco)
- Third-party vendor approval workflows
- Third-party vendor email notifications
- Third-party pickup logistics coordination

---

### Dependencies & Risks

#### Dependencies
- Vendor partnership agreements and SLAs
- Vendor-specific evidence requirements documentation (WF-017)
- Vendor email integration and notification system
- Legal review of vendor data sharing agreements
- Cross-platform authentication (if vendors use separate portals)

#### Risks
- **Vendor Cooperation:** Third-party vendors may not respond to system notifications
- **Process Divergence:** Each vendor (TSC, EQ3, Costco) may have different requirements
- **Customer Confusion:** Customers may not understand why portal flow stops for third-party vendors
- **Legal Compliance:** Data sharing with third parties requires privacy impact assessment

---

## 3. Future Phase Refund Logic (Bundle Impact Calculations)

### Rationale for Deferral

Due to WooCommerce core limitations regarding bundle structures, implementing automated bundle impact calculations requires **custom logic** to correctly identify bundled items and apply proration. Standard Claimlane/WooCommerce plugins do not support this out-of-the-box. There are too many technical limitations to accommodate this in Phase 1.

### Functional Requirements

> Canonical text for FR-9 and FR-23 lives in `06-functional-requirements.md`. Below are Phase 2-specific notes only.

- **FR-9** — Bundles Handling: Custom implementation to parse WooCommerce bundle data and calculate 50% proration. **STATUS:** Deferred to Phase 2.
- **FR-23** — Refund Processing (Bundle Component): Bundle auto-refund capability requires WF-070-073 implementation. **STATUS:** Manual processing remains in Phase 1. Bundle auto-refund deferred to Phase 2.

### User Stories

> Canonical versions of these stories live in `13-epics-user-stories.md` (Epic 4 and Epic 10). Below are Phase 2-specific status notes only.

- **US-4.1** — Apply Bundle Eligibility Rules. **STATUS:** Deferred to Phase 2.
- **US-4.2** — Free / Bundled Item "Keep at Discount" Option. **STATUS:** Deferred to Phase 2.
- **US-10.1** — Auto vs Manual Refund Thresholds (Bundle component: WF-070-073 calculation logic). **STATUS:** Bundle calculation logic deferred to Phase 2.

### Business Rules

> Canonical rule text lives in `08-business-rules.md`. Below are Phase 2-specific status notes only.

- **BR-15** — Bundle / Free Item 50% Keep Rule. Requires custom WooCommerce integration. **STATUS:** Deferred to Phase 2.
- **BR-26** — Auto-Refund Bundle Exclusion. **STATUS:** Kept in Phase 1 as a constraint. Auto-refund capability for bundles deferred to Phase 2.

### Process Narratives

> Full narrative for Refund Processing lives in `05-process-high-level.md`, Section 13.

**Phase 2 addition — Bundle Impact Calculations (WF-070-073):**
- System calculates bundle impacts and adjusted refundable amounts
- Accounts for 50% proration of bundled/free items customer keeps
- If post-bundle value < $600: Auto-refund (WF-071-072)
- If post-bundle value >= $600: Manual CX processing (WF-071-073)

### Scope Impact

#### Technical Constraints Added to Phase 1

- Orders with bundles or free items MUST route to manual refund processing
- Auto-refund threshold (<$600) applies ONLY to non-bundle orders
- Bundle detection logic required but proration calculation deferred

---

### Dependencies & Risks

#### Dependencies
- WooCommerce bundle data structure analysis and mapping
- Custom API integration to parse bundle relationships
- Proration calculation engine development
- Testing across all bundle types (mattress+pillow, duvet+pillow, gift-with-purchase)
- Business approval of proration rules and edge cases

#### Risks
- **WooCommerce Limitations:** Platform may not expose sufficient bundle metadata via API
- **Edge Cases:** Complex bundle scenarios (multi-tier bundles, partial returns) may be unhandled
- **Testing Complexity:** Combinatorial explosion of bundle configurations
- **Performance Impact:** Bundle calculation may slow down refund processing
- **Data Integrity:** Incorrect proration could result in over-refunds or under-refunds

---

## 4. Return Quantity Limits (Historical & Per-Request)

### Rationale for Deferral

The original requirement included a limit on the number of returns a customer could make for the same product type — both within a single request (max 2 units) and historically (lifetime limit). To reduce Phase 1 complexity and allow for broader return policies initially, this restriction has been moved to Future Phase. The system will currently allow customers to select items up to the purchased quantity without these specific blocks.

### Functional Requirements

#### FR-10 (Restriction Component) – Quantity Limit Exceeded
- **ID:** *(Extracted from FR-10)*
- **Description:** Prevent selection of more than two units of the same product type with a soft warning and flag the ticket for "Quantity Limit Exceeded" if over the limit.
- **Priority:** Phase 2
- **Dependencies:** Order history checks, logic to sum quantity across current and past returns

#### FR-HIST-1 – Historical Return Limit
- **ID:** *(New Requirement derived from business rule discussions)*
- **Description:** "Do not allow more than 1 return of the same product type throughout the client's history."
- **Priority:** Phase 2
- **Dependencies:** Customer profile history, global return aggregation

### Business Rules

- **BR-4** — Maximum Quantity: A maximum of two units per product type may be returned in a single request; selecting more triggers a soft warning and admin flag. **STATUS:** Deferred to Phase 2.

---

## Appendices — Deferred Content

### Appendix D.4 — Bundles Eligibility Rules

> Also documented in `16-appendices.md`, Section D.4.

| Scenario | Eligibility | Notes |
| :--- | :--- | :--- |
| Full bundle return | Eligible | Refund full bundle price |
| Returning single pillow (from bundle) | Eligible | Prorated refund |
| Returning duvet only | Eligible | Prorated refund |
| Free sleep bundle gift | Must return gift | Or deduct gift value |

**STATUS:** Deferred to Future Phase

---

## Changelog Impact

### Extraction Log — 2026-02-03

**Batch 3: Deep Scope Refinement (Phase 2 Move)**

Performed comprehensive "Deep Extraction" of Phase 2 features from active BRD documents:

#### Features Moved to Phase 2 Backlog:
1. **Vendors (Donation / Pickup Partners)** — Vendor portal access and pickup status updates
2. **Third-Party Vendor Integration** — Complete TCS/EQ3/Costco workflow (WF-004-017)
3. **Phase 2 Refund Logic** — Bundle impact calculations (WF-070-073)

#### Review Notes:
- Self-donate fallback (WF-130) kept in Phase 1
- Manual vendor status updates kept in Phase 1 (Return Logistics Team workaround)
- Bundle exclusion constraint (BR-26) kept in Phase 1 to force manual refunds
- Third-party vendor flow preserved in narrative but marked as Phase 2

---

## Discussion

> Comments for this page are available in Giscus.
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>
