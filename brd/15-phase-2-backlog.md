# Phase 2 Backlog — Deferred Features

## Executive Summary

### Overview

During **Batch 3: Deep Scope Refinement**, three major feature sets were systematically extracted from the Phase 1 BRD and moved to this Phase 2 backlog. This strategic deferral allows the team to focus Phase 1 delivery on core return and warranty flows while preserving complete context for future implementation.

### Deferred Features at a Glance

| Feature | Scope | Business Impact | Technical Complexity |
|---------|-------|-----------------|---------------------|
| **Vendors (Donation/Pickup Partners)** | Portal access for external vendors to update pickup status | 🟡 Medium - Vendors handle logistics in Phase 1 via manual workaround | 🔴 High - Requires multi-tenant auth, RBAC, data partitioning |
| **Third-Party Vendor Integration** | Complete workflow for TSC, EQ3, Costco returns | 🔴 High - No third-party returns supported in Phase 1 | 🔴 High - Fundamental architecture gap, requires core rebuild |
| **Bundle Refund Logic** | Automated bundle impact calculations and 50% keep option | 🟡 Medium - Manual processing workaround in Phase 1 | 🔴 High - WooCommerce limitations, custom API integration needed |

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
- ✅ Core return flows (mattresses, furniture, accessories)
- ✅ Warranty claim processing
- ✅ Manual vendor coordination by Return Logistics Team
- ✅ Manual bundle refund processing by CX
- ✅ Third-party returns redirected to vendor processes

**Phase 2 Enhancements (This Backlog):**
- 🔄 Vendor portal with secure authentication
- 🔄 Third-party vendor approval workflows
- 🔄 WooCommerce bundle API integration
- 🔄 Automated bundle proration engine

### Business Continuity

All deferred features have **Phase 1 manual workarounds** to ensure zero disruption to customer service:

- **Vendor Status Updates:** Return Logistics Team enters vendor confirmations manually
- **Third-Party Returns:** Customers directed to vendor-specific return processes
- **Bundle Refunds:** CX team manually calculates proration and processes refunds

### Quick Reference

- **Total Features Deferred:** 3
- **Functional Requirements:** 13 (FR-9, FR-VENDOR-1–5, FR-TP-1–5)
- **User Stories:** 7 (from Epics 4, 8, 11)
- **Business Rules:** 4 (BR-1, BR-15, BR-16, BR-26)
- **Workflow Nodes:** 15+ (WF-004→017, WF-059/065A, WF-070→073)

---

This document contains all features, requirements, business rules, actors, and supporting artifacts that have been **deferred to Phase 2** during the deep scope refinement process.

> [!IMPORTANT]
> **Last Updated:** 2026-02-03  
> **Extraction Method:** Batch 3 Deep Scope Refinement  
> All items below were systematically extracted from active BRD documents to focus Phase 1 delivery.

---

## Overview

The following features have been moved to Phase 2 due to technical complexity, architectural limitations, or strategic prioritization. Each section documents the complete context including functional requirements, user stories, business rules, actors, and process narratives.

### Deferred Features Summary

1. **Vendors (Donation / Pickup Partners)** — External vendor portal access and pickup status updates
2. **Third-Party Vendor Integration (TCS, EQ3, Costco)** — Complete workflow for third-party vendor returns
3. **Phase 2 Refund Logic (Bundle Impact Calculations)** — Automated refund processing for orders with bundles/free items

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

#### US-8.1 Vendor Selection for Unboxed / Donation Flows
> *As an internal logistics user, I want to select the vendor who will pick up or receive the item.*

**Acceptance Criteria**

1. System shows allowed vendors for the item type and location.
2. Internal user (Return Logistics Team) can select a vendor.
3. Selection triggers emails to vendor and customer with instructions.
4. Vendor receives portal access to mark items as "Picked."
5. **Self-Donate Fallback (WF-130):** If no vendor is available for unboxed mattress pickup:
    
    - System offers customer a self-donation option.
    - Customer agrees to self-donate (checkbox).
    - Customer donates item, takes photo of donation, and contacts CX (call/email).
    - CX processes return manually in ClaimLane portal (WF-132).
    - Case closes after CX confirms donation proof.
6. Fallback decision is logged in ticket history.

**STATUS:** ✅ Self-donate fallback kept in Phase 1. Vendor portal access deferred to Phase 2.

---

#### US-8.2 Vendor Change Handling
> *As an internal user, I want to change vendors when needed without losing context.*

**Acceptance Criteria**

1. User can change from one vendor to another before pickup is completed.
2. New vendor receives updated notification; previous vendor is informed the job was reassigned.
3. Customer receives updated email with new vendor details.

**STATUS:** 🔄 Deferred to Phase 2

---

#### US-8.3 Vendor Pickup Confirmation
> *As a vendor, I want to confirm pickup in the portal so downstream processing can continue.*

**Acceptance Criteria**

1. Vendor can update status to "Picked" for assigned items.
2. Status change triggers transition to "Received" once warehouse confirms arrival, or to "In Transit" as configured.

**STATUS:** 🔄 Deferred to Phase 2

---

### Business Rules

#### BR-16 – Vendor Pickup and Status Updates
Vendors (or Logistics team) must update mattress status to "Picked" in the portal. This status update must transition the item to **"Received"** to trigger refund logic.

**STATUS:** 🔄 Deferred to Phase 2 — Phase 1 will use manual status updates by Return Logistics Team

---

### Process Narratives

#### Return Logistics Management (WF-059/065A → WF-064/063A)

**Phase 2 Capability:**

For **unboxed mattresses**, **oversized items**, and items requiring **disposal pickup**, the **Return Logistics Team** manages vendor coordination:

1. **Vendor Selection (WF-059/065A):**
    - Return Logistics Manager manually selects a **donation or pickup vendor**
    - **Photos are NOT sent to vendors** for unboxed mattresses

2. **Vendor Assignment Outcomes:**
    - **Vendor Selected**: Trigger emails to vendor and customer (WF-061/066)
    - **No Vendor Available**: Offer **Self-Donation** option (WF-130) *(kept in Phase 1)*

3. **Vendor Change Management (WF-062/067A):**
    - If vendor needs to be changed (WF-062/067A → WF-063/068A):
        - Select new vendor
        - Trigger updated email notifications to new vendor and customer

4. **Pickup Confirmation (WF-064/063A):**
    - Vendor picks up item and marks status as **"Picked"** in portal

**Phase 1 Workaround:** Return Logistics Team manually updates pickup status on behalf of vendors. Vendor portal access introduced in Phase 2.

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

#### US-1.1 Select Purchase Channel (Third-Party Component)
> *As a customer, I want to choose where I purchased so I am routed correctly.*

**Acceptance Criteria**

1. Customer can pick from:
    * Silk & Snow Online (CA / US)
    * Retail Store (in-person)
    * **Third-Party Vendor** ← *DEFERRED*
2. Selecting Third-Party Vendor is a Work-in-Progress (TDB).
3. Online and Retail selections proceed to store / order validation steps.

**STATUS:** 🔄 Third-Party component deferred to Phase 2

---

#### US-8.4 Third-Party Pickup Logistics Split
> *As a customer with an approved third-party claim, I want to choose the appropriate pickup method.*

**Acceptance Criteria**

1. After vendor approves claim (WF-009) and customer indicates need for pickup assistance (WF-011), system presents two options (WF-011A):
    
    - **Courier Pickup:** CX provides coordination and guidance. System generates return label (WF-012).
    - **Disposal Pickup:** Case is logged for Return Logistics Team (WF-011B, connects to shared logistics flow).
2. Pickup type is recorded in ticket.
3. For courier: Pickup confirmation triggers item received status (WF-014→015).
4. For disposal: Follows same vendor selection flow as unboxed mattresses (WF-059/065A).
5. Both paths eventually route to warehouse delivery (R1 or R_US).

**STATUS:** 🔄 Deferred to Phase 2

---

#### US-11.1 Automated Email Triggers (Third-Party Component)
> *As a system, I want to send automated emails at key workflow decision points to keep customers and vendors informed.*

**Acceptance Criteria**

1. Email sent when third-party vendor ticket is created (WF-008). ← *DEFERRED*
2. Email sent to vendor when third-party refund approval is granted (WF-016). ← *DEFERRED*
3. Email sent to customer when warranty claim is declined by CX (WF-052D). *(kept in Phase 1)*
4. Email sent when unboxed mattress vendor is assigned (existing feature). *(kept in Phase 1)*
5. Email sent when unboxed mattress vendor is changed, notifying new vendor and customer (existing feature). *(kept in Phase 1)*
6. Email sent when furniture return is approved/declined by CX (existing feature). *(kept in Phase 1)*
7. All emails are logged in ticket history with timestamps.
8. Email templates are configurable without code changes.
9. Failed email delivery triggers retry logic and alerts internal team.

**STATUS:** 🔄 Criteria 1-2 deferred to Phase 2. Criteria 3-9 kept in Phase 1.

---

### Business Rules

#### BR-1 – Third-Party Orders
Orders from third-party vendors never proceed through the Silk & Snow portal. The portal shows vendor instructions only.

**STATUS:** 🔄 Deferred to Phase 2

---

#### BR-TP-1 – Third-Party Documentation Requirements
*(Extracted from FR-17)* Collect lot number and detailed description for all claims and require an invoice when the purchase was made through a third-party vendor.

**STATUS:** 🔄 Deferred to Phase 2

---

### Process Narratives

#### C. THIRD-PARTY VENDOR FLOW (WF-004 → WF-017)

**11. Third-Party Vendor Returns (TSC, EQ3, Costco)**

For items purchased from third-party vendors, the workflow requires vendor approval and coordination:

##### 11A. Vendor Selection & Evidence (WF-005 → WF-007)

1. **Select Third-Party Vendor (WF-005):**
    - Customer chooses vendor: TSC, EQ3, or Costco

2. **Collect Required Evidence (WF-006):**
    - Receipt
    - Photos
    - Law tags
    - Other vendor-specific documentation
    
    > [!NOTE]
    > **WF-017:** Exact evidence requirements to be confirmed per vendor (TSC/EQ3).

3. **Log Action Item (WF-007):**
    - Create ticket in ClaimLane: *"Third-party vendor review required"*

##### 11B. Vendor Notification & Approval (WF-008 → WF-010)

4. **Send Vendor Email Notification (WF-008):**
    - System automatically emails vendor with ticket details

5. **Vendor Approval Decision (WF-009):**
    - **Vendor Declines (WF-010):**
        - Communicate vendor decision and next steps to customer → End (WF-060)
    - **Vendor Approves:**
        - Proceed to pickup assistance check

##### 11C. Pickup Assistance (WF-011 → WF-011B)

6. **Pickup Assistance Check (WF-011):**
    - Does customer need pickup assistance or defective item removal?
        - **No (WF-013):** Customer proceeds with vendor's own instructions (no CX coordination)
        - **Yes (WF-011A):** Determine pickup type

7. **Pickup Type Selection (WF-011A):**
    - **Courier Pickup (WF-012):**
        - CX provides pickup assistance (coordination + guidance)
        - Generate return label
    - **Disposal Pickup (WF-011B):**
        - Log for **Return Logistics Team** (routes to WF-059/065A)

##### 11D. Confirmation & Processing (WF-014 → WF-016)

8. **Pickup Confirmed/Scheduled (WF-014):**
    - Pickup arranged and confirmed with customer

9. **Item Received (WF-015):**
    - Confirm receipt of returned item

10. **Vendor Refund Notification (WF-016):**
    - Email vendor: *"Proceed with return / refund"*
    - If item routed to Caledonia, warehouse team updates status (WF-090 → WF-093)
    - Case closed (WF-060)

**STATUS:** 🔄 Entire Third-Party Vendor Flow (WF-004 → WF-017) deferred to Phase 2

---

### Scope Impact

#### Removed from In-Scope (03-scope.md)

*Third-party vendors are listed in channels but with a "Work-in-Progress" note. No explicit in-scope items removed.*

#### Added to Out-of-Scope

- Third-party vendor claim processing (TSC, EQ3, Costco)
- Third-party vendor approval workflows
- Third-party vendor email notifications
- Third-party pickup logistics coordination

---

### Dependencies 0026 Risks

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

## 3. Phase 2 Refund Logic (Bundle Impact Calculations)

### Rationale for Deferral

Due to WooCommerce core limitations regarding bundle structures, implementing automated bundle impact calculations requires **custom logic** to correctly identify bundled items and apply proration. Standard Claimlane/WooCommerce plugins do not support this out-of-the-box. There are too many technical limitations to accommodate this in Phase 1.

### Functional Requirements

#### FR-9 – Bundles Handling
*(Moved from 06-functional-requirements.md)*

Identify bundle items. When a main item is returned but the customer keeps a bundled/free item, the portal must offer the option to **keep the bundled/free item at 50% of the full website price** (not the bundle price) and adjust the refund amount accordingly.

**Technical Requirement:** This functionality requires custom implementation to parse WooCommerce bundle data and calculate proration via the API.

**STATUS:** 🔄 Deferred to Phase 2

---

#### FR-23 – Refund Processing (Bundle Component)
*(Modified from 06-functional-requirements.md)*

**Auto-Refund (Phase 1 Constraint):**
When items are marked "Received" and the **net refund value is less than 600** (store currency) **AND the order does NOT contain bundles or free items**, automatically initiate the refund in WooCommerce (if gateway supported).

**Manual Refund (Phase 1 Constraint):**
When items are marked "Received" and the **net refund value is 600 or greater**, OR the **order contains bundles/free items**, route the ticket to CX for manual refund processing. This is required because bundle proration logic is a **custom implementation** not standard to the platform.

**Phase 2 Future:**
Bundle impact calculations (WF-070→073) will enable adjusted auto-refunds for qualifying bundled orders. Until then, all orders with bundles require manual processing.

**STATUS:** 🔄 Bundle auto-refund capability deferred to Phase 2. Manual processing remains in Phase 1.

---

### User Stories

#### US-4.1 Apply Bundle Eligibility Rules
*(Moved from 13-epics-user-stories.md)*

> *As a system, I want bundled items to follow bundle-specific refund rules.*

**Acceptance Criteria**

1. Full bundle returned → full bundle price can be refunded.
2. Single components (e.g., pillow or duvet from a bundle) → refund is prorated based on configured value.
3. Free gift / gift-with-purchase must either be returned or have its value deducted from the refund.

**STATUS:** 🔄 Deferred to Phase 2

---

#### US-4.2 Free / Bundled Item "Keep at Discount" Option
*(Moved from 13-epics-user-stories.md)*

> *As a customer with a bundle or free item, I want the option to keep certain items at a discounted price when returning the main item.*

**Acceptance Criteria**

1. When returning a mattress or applicable accessory bundle with free items, the portal:
    
    * Detects associated free/bundled items.
    * Prompts the customer with the keep-option (e.g., keep item at 50% of list price).
2. If customer chooses to keep the item, its discounted value is deducted from the refund and the decision is recorded on the ticket.
3. If customer chooses to return, normal bundle rules apply (no extra deduction).

**STATUS:** 🔄 Deferred to Phase 2

---

#### US-10.1 Auto vs Manual Refund Thresholds (Bundle Component)
*(Modified from 13-epics-user-stories.md)*

**Auto-refund criteria (Phase 1):**
- Net value < 600 (store currency) AND
- Order does NOT contain bundles or free items (WF-067).

**Manual refund criteria:**
- Net value >= 600, OR
- Order contains bundles/free items, OR
- Flagged as exception (WF-069).

**Phase 2 Note:**
Bundle impact calculations (WF-070→073) will enable adjusted auto-refunds for qualifying bundled orders.

**STATUS:** 🔄 Bundle calculation logic (WF-070→073) deferred to Phase 2

---

### Business Rules

#### BR-15 – Bundle / Free Item 50% Keep Rule
*(Moved from 08-business-rules.md)*

When a bundle item is returned and the customer keeps the bundled/free item, the customer pays **50% of the full website price** for the kept item. The refund is adjusted (prorated) to reflect this charge and the decision is recorded on the ticket.

**Note:** This requires custom code integration to bridge the WooCommerce data structure with the portal.

**STATUS:** 🔄 Deferred to Phase 2

---

#### BR-26 – Auto-Refund Bundle Exclusion
*(Moved from 08-business-rules.md)*

Automatic refunds are strictly prohibited for any order containing bundles or free items, regardless of refund value. All such orders MUST route to manual refund processing. This is a Phase 1 technical limitation due to the **custom implementation required** for bundle calculation (WF-070→073).

**STATUS:** ✅ Kept in Phase 1 as a constraint. Auto-refund capability for bundles deferred to Phase 2.

---

### Process Narratives

#### 13. Refund Processing — Phase 2 Refund Logic (Future State)
*(Moved from 05-process-high-level.md)*

**Bundle Impact Calculation (WF-070):**
- System calculates bundle impacts and adjusted refundable amounts
- Accounts for 50% proration of bundled/free items customer keeps

**Auto-Refund After Bundle Calculation (WF-071 → WF-072):**
- If post-bundle calculation value **< $600**: Auto-refund

**Manual Refund After Bundle Calculation (WF-071 → WF-073):**
- If post-bundle calculation value **≥ $600**: Manual CX processing

**STATUS:** 🔄 Entire Phase 2 refund logic section (WF-070→073) deferred

---

#### Item Selection Process (Bundle Warning)
*(From 05-process-high-level.md)*

> [!WARNING]
> **Bundle / Free Item Promotion (Phase 2):** If the item is part of a bundle or free item promotion, the customer can keep bundled/free items at **50% of full website price**; the refund is adjusted accordingly.
>
> **Technical Implementation Note:** Due to WooCommerce core limitations regarding bundle structures, this step requires **custom logic** to correctly identify bundled items and apply the 50% proration logic. Standard Claimlane/WooCommerce plugins do not support this out-of-the-box.

**STATUS:** 🔄 Bundle keep-option deferred to Phase 2

---

### Scope Impact

#### Removed from In-Scope

*No explicit items removed. Bundle functionality was always marked as Phase 2 in warnings/notes.*

#### Technical Constraints Added to Phase 1

- Orders with bundles or free items MUST route to manual refund processing
- Auto-refund threshold (<$600) applies ONLY to non-bundle orders
- Bundle detection logic required but proration calculation deferred

---

### Dependencies 0026 Risks

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

## Appendices — Deferred Content

### Appendix D.4 — Bundles Eligibility Rules
*(Moved from 16-appendices.md)*

| Scenario | Eligibility | Notes |
| :--- | :--- | :--- |
| Full bundle return | Eligible | Refund full bundle price |
| Returning single pillow (from bundle) | Eligible | Prorated refund |
| Returning duvet only | Eligible | Prorated refund |
| Free sleep bundle gift | Must return gift | Or deduct gift value |

**STATUS:** 🔄 Deferred to Phase 2

---

## Changelog Impact

### Extraction Log — 2026-02-03

**Batch 3: Deep Scope Refinement (Phase 2 Move)**

Performed comprehensive "Deep Extraction" of Phase 2 features from active BRD documents:

#### Features Moved to Phase 2 Backlog:
1. **Vendors (Donation / Pickup Partners)** — Vendor portal access and pickup status updates
2. **Third-Party Vendor Integration** — Complete TCS/EQ3/Costco workflow (WF-004→017)
3. **Phase 2 Refund Logic** — Bundle impact calculations (WF-070→073)

#### Files Modified:
- **04-actors.md:** Moved Vendors actor, added Phase 2 note to Actor table
- **06-functional-requirements.md:** Moved FR-9 (Bundles), added Phase 2 placeholders to FR-20, FR-23, FR-32
- **08-business-rules.md:** Moved BR-15, updated BR-16 with Phase 1 workaround, kept BR-26 as constraint
- **13-epics-user-stories.md:** Moved Epic 8 (Vendor & Logistics), US-4.1, US-4.2, US-8.1-8.4, updated US-11.1
- **05-process-high-level.md:** Wrapped third-party vendor flow in Phase 2 markers, moved Phase 2 refund logic section
- **03-scope.md:** No changes (vendor communication already in-scope for Phase 1 via manual process)
- **15-changelog.md:** Added this extraction event
- **15-phase-2-backlog.md:** ✨ **CREATED** — Comprehensive backlog document

#### Extraction Method:
- **Functional Items:** Cut FRs, User Stories, Business Rules → Paste to Backlog with placeholders
- **Narrative:** Wrapped third-party flow sections with Phase 2 markers (not deleted to preserve context)
- **Actors:** Added Phase 2 deferral note to Vendors actor
- **Supporting Artifacts:** No changes to scope (manual workarounds in Phase 1)

#### Review Notes:
- Self-donate fallback (WF-130) kept in Phase 1
- Manual vendor status updates kept in Phase 1 (Return Logistics Team workaround)
- Bundle exclusion constraint (BR-26) kept in Phase 1 to force manual refunds
- Third-party vendor flow preserved in narrative but marked as Phase 2

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>
