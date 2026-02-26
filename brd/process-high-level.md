# High Level Process Flow

## Narrative Steps

1. **Purchase Channel Selection (WF-001)** – Customer selects where they purchased:

    *   **Silk & Snow Online – CA** (WF-002) – WooCommerce online orders
    *   **Silk & Snow Online – US** (WF-094) – WooCommerce online orders *(visible to US customers only, if possible)*
    *   **Silk & Snow Retail Store** (WF-003) – In-person purchase
    *   **Sleep Country Retail Store** – In-person purchase
    *   **Third-Party Vendor** (WF-004) – TSC, EQ3, or Costco

    **Retail Store Routing (WF-018 → WF-022)**

    Channel selection determines routing directly — no backend store lookup is performed:

    *   **Silk & Snow Retail Store:** Routes customer into the WooCommerce online order flow (WooCommerce Online + Shopify POS orders).
    *   **Sleep Country Retail Store:** Displays message (WF-021): *"This return cannot be processed through this portal. Please call the Sleep Country Customer Service team for further instructions."* Flow ends (WF-022).

2. **Customer Intent Selection (WF-023/096)** – Customer chooses the type of assistance needed:
    *   **Return** (WF-024/097)
    *   **Warranty claim** (WF-025/098)

    The flow branches accordingly into either the Return or Warranty workflow.

3. **Order Lookup & Validation (WF-026/099/042 → WF-028/101/044)** 
    
    Customer enters **order number and email** (WF-026/099/042). The system validates against WooCommerce records (WF-027/100/043).

    **Validation Outcomes:**

    *   **Success**: Proceed to display order items
    *   **Failure (WF-028/101/044)**: Display error message — *"For orders purchased in store, an email may not have been provided."* Customer may retry with corrected details.

4. **Display Order Items & Eligibility (WF-029/102)** 
    
    All items in the order are displayed with variant image and **eligibility status**. Eligibility is computed using:
    
    *   Product category
    *   Return window
    *   Trial length
    *   Final sale rules
    *   Purchase channel
    *   Delivered date

5. **Item Selection (WF-030/103)** 
    
    Customer selects one or more eligible items to return. Minimum of **one item required**.

    > [!WARNING]
    > **Bundle / Free Item Promotion (Future Phase):** If the item is part of a bundle or free item promotion, the customer can keep bundled/free items at **50% of full website price**; the refund is adjusted accordingly.
    >
    > **Technical Implementation Note:** Due to WooCommerce core limitations regarding bundle structures, this step requires **custom logic** to correctly identify bundled items and apply the 50% proration logic. Standard Claimlane/WooCommerce plugins do not support this out-of-the-box.

6. **Reason Selection (WF-038/105)** 
    
    Customer chooses a return reason for each selected item. Reasons map to WooCommerce refund categories.

    **Defective Routing Logic:**

    *   If customer selects **"Defective"** as reason AND **does not opt out** of product replacement → **Automatically redirect to Warranty claim workflow** (bypasses standard return logistics)

7. **Documentation Upload** 
    
    For damage claims, defective items, and certain return types, customers must upload required documentation:
    
    *   Photos of damage/defect
    *   Law tags (for mattresses)
    *   Measurements (if applicable)
    *   Receipt (for third-party claims)

---

### **Flow Split: Returns vs. Warranty vs. Third-Party**

At this point, the workflow branches into three distinct paths based on the claim type:

---

## **A. RETURN FLOW** (WF-038/105 onward)

### 8. **Product Type Routing (WF-038/105)**

The return flow splits based on **item type** and **region**:

#### **8A. Mattress Returns**

**Boxed Mattresses (WF-039 → WF-062A → WF-077A):**

1. Customer confirms mattress is boxed (WF-039)
2. Collect photo of the box (WF-061A)
3. Provide return label and drop-off instructions (WF-062A)
4. Customer ships item
5. Vendor picks up item; Status is auto-updated to **"Picked"** via Courier API (WF-064/063A)

**Unboxed Mattresses (WF-039 → WF-064A → WF-059/065A):**

1. Customer confirms mattress is unboxed (WF-039)
2. Collect photos, law tag, and condition details (WF-064A)
3. **Route to Return Logistics Team** (WF-059/065A) for vendor selection
4. See **Return Logistics Management** section below

#### **8B. Furniture Returns (WF-040)**

**CA Furniture (WF-040 → WF-137):**

1. Customer uploads photos and issue details (WF-069A)
2. ClaimLane calls **WooCommerce API** for carrier quotes (WF-137)
    - **Destination**: Always **Caledonia warehouse** (CA)
3. Notify customer of shipping charges (WF-073A)
    - **Note:** For disposal pickups, the charge displayed is equal to the courier pickup charge (business decision to standardize costs).
4. **Customer Accepts Charges & Submits Ticket** (WF-074A):
    - Customer provides pickup details / access constraints
    - Customer agrees to shipping costs
    - Ticket created in **CX Review Queue**
5. **CX Review & Approval** (WF-070A → WF-071A):
    - CX reviews photos and eligibility
    - If **declined** (WF-072A): Communicate decision to customer → End
    - If **approved**:
        - System **auto-generates label** and pickup instructions
        - Charge is finalized/processed
        - Item marked as **"Received"** (WF-089) once picked up

**US Furniture (WF-040 → WF-138):**

- Same process as CA furniture, except:
  - **Destination**: Determined by the **Fulfil ERP API** (WF-138; see FR-45). The API returns the origin warehouse per SKU. For orders shipped from **multiple warehouses**, the system uses the **closest warehouse** to the customer's shipping address (LA – JDLLA or NJ – JDLNJ).

#### **8C. Accessory & Bedding Returns**

**CA Accessories (Opened or Unopened) (WF-041):**

1. Collect return reason and photos (WF-076A)
2. Provide mail-in return label and instructions (WF-077A)
3. Customer ships item (WF-078A)
4. Item marked as **"Received"** (WF-089)

**US Accessories — Unopened (WF-115):**

1. Generate return label (WF-111)
2. Customer ships item
3. Item marked as **"Received"** (WF-089)

**US Accessories — Opened (WF-115 → WF-117):**

1. Present **Option 1 (WF-117)**: *"Keep item for 50% refund (no proof required)"*
    - If **accepted** (WF-118): Process 50% refund → Customer keeps item → **Return complete** → End
    - If **rejected**: Generate **Customer Care ticket** → CX contacts customer offline to encourage Option 2 (donate for 100% refund) → End

---

### 9. **Return Logistics Management (WF-059/065A → WF-064/063A)**

For **unboxed mattresses**, **oversized items**, and items requiring **disposal pickup**, the **Return Logistics Team** manages vendor coordination:

1. **Vendor Selection (WF-059/065A):**
    - Return Logistics Manager manually selects a **donation or pickup vendor**
    - **Photos are NOT sent to vendors** for unboxed mattresses
2. **Vendor Assignment Outcomes:**
    - **Vendor Selected**: Trigger emails to vendor and customer (WF-061/066)
    - **No Vendor Available (Self-Donation)**: Manger selects **"Self-Donation"** (WF-130)
3. **Vendor Change Management (WF-062/067A):**
    - If vendor needs to be changed (WF-062/067A → WF-063/068A):
        - Select new vendor
        - Trigger updated email notifications to new vendor and customer
4. **Pickup Confirmation (WF-064/063A):**
    - Vendor picks up item; Status is auto-updated to **"Picked"** via Courier API
5. **Self-Donation Flow (WF-130 → WF-132):**
    - When "Self-Donation" is selected:
        - Customer receives specific email instructions
        - Customer donates item themselves and takes photo as proof
        - Customer contacts **CX Team** (call or email)
        - CX manually processes return in ClaimLane portal (WF-132)

---

## **B. WARRANTY CLAIM FLOW** (WF-052 → WF-058)

### 10. **Warranty Claim Processing**

#### **10A. Item & Replacement Part Selection (WF-052 → WF-053)**

1. **Display Order Items with Replacement Parts (WF-052):**
    - System displays all items in the order
    - **Replacement parts shown with product context**

    > [!NOTE]
    > **Example – Nara Wooden Dresser (5-Drawer, Cortado)**
    >
    > Parent SKU: **SNSFNDR5005T**
    > - Drawer – Top Left | SNSFNDR5005TDRSL
    > - Drawer – Top Right | SNSFNDR5005TDRSR
    > - Drawer – Large | SNSFNDR5005TDRB
    > - Screw | SNSFNS5000TSW
    > - Stain & Brush | SNSFNWO5000ACST
    > - Stain & Brush | SNSFNS5000TST

2. **Customer Selects Item or Replacement Part (WF-053):**
    - Customer chooses the defective product or specific sub-part (e.g., drawer, screw)

#### **10B. Documentation & Submission (WF-054 → WF-055)**

3. **Collect Additional Information (WF-054):**
    - Issue description
    - Photos of defect
    - Address confirmation
4. **Submit Warranty Case (WF-055):**
    - Case submitted to ClaimLane with selected part SKUs, evidence, and notes

#### **10C. CX Review & Approval (WF-052B → WF-052D)**

5. **CX Reviews Submission (WF-052B):**
    - CX team validates photos and part selection
    - If the customer did not select a part, or selected an incorrect part, CX has the option to **override the part selection** before proceeding
6. **CX Approval Decision (WF-052C):**
    - **Declined (WF-052D)**: Communicate decline and next steps to customer → End
    - **Approved**: Proceed to pickup logic

#### **10D. Pickup Assistance (WF-052F → WF-052I)**

> [!NOTE]
> Pickup assistance is **not presented to the customer during submission**. The CX team may add pickup assistance as a follow-on action if the customer calls in to request it.

7. **CX Pickup Assistance Decision (WF-052F):**
    - Default assumption: customer does **not** require pickup assistance → proceed to replacement order placement (WF-056)
    - If customer calls CX to request assistance: CX adds pickup assistance to the case → proceed to pickup type selection
8. **Pickup Type Selection (WF-052H):**
    - **Courier Pickup (WF-052G):**
        - CX provides pickup assistance (coordination + guidance)
        - Generate return label with **"Defective"** wording (helps warehouse avoid inspection)
    - **Disposal Pickup (WF-052I):**
        - Log case for **Return Logistics Team** (routes to WF-059/065A vendor selection)

#### **10E. Replacement Order & Closure (WF-056 → WF-058)**

9. **CX Places Replacement Order (WF-056):**
    - CX creates replacement order in WooCommerce using **approved replacement part SKUs**
10. **Close Case (WF-058):**
    - Case marked complete after replacement order is placed

---

## **C. THIRD-PARTY VENDOR FLOW** (WF-004 → WF-017)

### 11. **Third-Party Vendor Returns (TSC, EQ3, Costco)**

Third-party vendor returns use a **vendor-initiated link-based flow**. The vendor verifies the customer's order externally, then shares a generic ClaimLane link with the customer to arrange pickup logistics. **No refund is issued by Silk & Snow** — the refund is the sole responsibility of the third-party vendor (see BR-1).

#### **11A. Vendor-Initiated Entry (WF-004 → WF-005)**

1. **Customer Contacts Third-Party Vendor:**
    - Customer contacts TSC, EQ3, or Costco about a return
    - Vendor verifies order details and eligibility externally (outside ClaimLane)
2. **Vendor Shares ClaimLane Link (WF-004):**
    - Vendor shares their **dedicated generic ClaimLane link** with the customer
    - Each vendor (TSC, EQ3, Costco) has a unique link URL that identifies the vendor
    - The link is **not unique to the customer** (same link shared with all customers of that vendor)

#### **11B. Terms & Conditions Gate (WF-005 → WF-006)**

3. **Customer Opens Link — T&C Page (WF-005):**
    - The link opens a **Terms & Conditions page** (security gate for non-unique links)
    - T&C clearly states:
        - No refund will be issued by Silk & Snow — refund is the responsibility of the third-party vendor
        - The return is not authorized by the third-party partner — Silk & Snow facilitates pickup logistics only
    - Customer must **explicitly accept** T&C (checkbox + confirm) to proceed
    - If customer declines → flow ends with message directing them back to vendor

#### **11C. Pickup Details & Ticket Creation (WF-006 → WF-008)**

4. **Collect Pickup Details (WF-006):**
    - Pickup address / location
    - Access constraints (elevator, stairs, gate codes, etc.)
    - Preferred pickup dates
    - Photos of item (condition documentation)
    - Contact information for pickup coordination
5. **Create ClaimLane Ticket (WF-007 → WF-008):**
    - Ticket tagged with third-party vendor name
    - **Costco orders:** Ticket created for tracking only — no pickup assistance required. Flow ends (WF-060)
    - **TSC / EQ3 orders:** Proceed to pickup logistics

#### **11D. Pickup Logistics — TSC & EQ3 Only (WF-011 → WF-014)**

6. **Pickup Type Selection (WF-011A):**
    - **Courier Pickup (WF-012):**
        - CX provides pickup assistance (coordination + guidance)
        - Generate return label
    - **Disposal Pickup (WF-011B):**
        - Log for **Return Logistics Team** (routes to WF-059/065A vendor selection)
7. **Pickup Confirmed/Scheduled (WF-014):**
    - Pickup arranged and confirmed with customer
8. **Item Collected (WF-015):**
    - Confirm collection of item
    - Notify vendor that item has been collected
    - Case closed (WF-060)

---

## **D. SHARED BACKEND PROCESSES**

### 12. **Ticket Creation**

The ClaimLane ticket stores all claim details:
- Customer information
- Selected items and SKUs
- Return/warranty reason
- Uploaded documentation
- Pickup/shipping details
- Vendor assignments (if applicable)

**Duplicate Prevention:** System prevents duplicate ticket creation for the same order and items.

---

### 13. **Refund Processing (WF-066B → WF-074)**

Once an item is marked as **"Received"** (WF-089), the refund logic is determined by **order value**, **bundle status**, and **phase**:

#### **Phase 1 Refund Logic (Current State)**

**Automatic Refund Eligibility (WF-067 → WF-068):**

- Conditions: Net refund value **< $600** AND order contains **NO bundles or free items**

- Action: Auto-initiate refund (if payment gateway supported)

**Manual Refund Triggers (WF-067 → WF-069):**

- Conditions: Net refund value **≥ $600** OR order contains **bundles/free items**

- Action: Route to CX for manual processing

> [!WARNING]
> **WF-074 Technical Limitation:** We cannot implement auto-refunds when bundles or free items are involved until we fix WooCommerce, which is currently restricting ClaimLane's data access to bundle structures.

#### **Future Phase Refund Logic (Future State)**

**Bundle Impact Calculation (WF-070):**

- System calculates bundle impacts and adjusted refundable amounts
- Accounts for 50% proration of bundled/free items customer keeps

**Auto-Refund After Bundle Calculation (WF-071 → WF-072):**

- If post-bundle calculation value **< $600**: Auto-refund

**Manual Refund After Bundle Calculation (WF-071 → WF-073):**

- If post-bundle calculation value **≥ $600**: Manual CX processing

---

### 14. **Warehouse Processing & Inventory Reconciliation**

#### **CA Warehouse (Caledonia) – Direct Portal Access (WF-090 → WF-093)**

1. **Return Delivered to Caledonia (WF-090)**
2. **Caledonia Team Updates Status (WF-091):**
    - Team has **limited-access portal role**
    - Updates status directly in ClaimLane portal (WF-092)
    - At **Inspection Completed** step, team selects an **Inspection Grade** from a mandatory dropdown:
        - **Grade A** – Resalable
        - **Grade B** – Donatable
        - **Grade C** – Damaged
        - *Reason code is mandatory for all grades*
    - Status transition: **Delivered → Processing → Inspection Completed**
3. **Store Ops Inventory Update (WF-093):**
    - Store Ops team runs **"Returned items" report** from portal
    - Report used to update inventory and reconcile returned goods

#### **US Warehouse (LA / NJ) – Offline Email-Based Process (WF-133 → WF-136)**

1. **Return Delivered to US Warehouse (WF-133)**
    - Item arrives at Los Angeles or New Jersey warehouse
2. **US Warehouse Emails Status (WF-134):**
    - US warehouse team has **NO direct portal access**
    - Team emails return status updates to **Internal Ops team** (offline to ClaimLane)
3. **Internal Ops Updates Portal (WF-135):**
    - Internal Ops team manually updates ClaimLane portal
    - Status transition: **Delivered → Processing → Inspection Completed**
4. **Internal Ops Inventory Update (WF-136):**
    - Internal Ops runs **"Returned items" report**
    - Report used for US inventory reconciliation

> [!IMPORTANT]
> **Key Difference:** US warehouse teams operate **completely offline** from the ClaimLane portal. All status updates require **Internal Ops intermediary** via email communication.

---

## Discussion

<div class="giscus-placeholder"></div>
