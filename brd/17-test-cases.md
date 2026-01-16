# Test Cases

This document contains test cases derived from the Functional Requirements and User Stories. These test cases are intended for User Acceptance Testing (UAT).

## 1. Purchase Channel & Routing

| ID | Description | Pre-conditions | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-1.1** | Channel Selection - Online | User is on the start screen. | 1. Select "Silk & Snow Online – CA / US (Shopify)". <br> 2. Click "Next". | User is navigated to the Intent Selection screen. |
| **TC-1.2** | Channel Selection - Retail (Shopify POS) | User is on the start screen. | 1. Select "Silk & Snow Retail Store". <br> 2. Select a store that uses Shopify POS. | User is navigated to the Intent Selection screen (or Order Lookup depending on flow). |
| **TC-1.3** | Channel Selection - Retail (STORIS) | User is on the start screen. | 1. Select "Silk & Snow Retail Store". <br> 2. Select a store that uses STORIS. | Message appears: "Returns must be handled in-person". Further steps are blocked. |
| **TC-1.4** | Channel Selection - Third-Party Vendor | User is on the start screen. | 1. Select "Third-Party Vendor". | Vendor instructions are shown. Further steps are blocked. |
| **TC-1.5** | Intent Selection - Return | User has selected a valid channel. | 1. Select "Return". | User is routed to return-specific flow (e.g. eligibility checks for returns). |
| **TC-1.6** | Intent Selection - Warranty Claim | User has selected a valid channel. | 1. Select "Warranty Claim". | User is routed to warranty-specific flow. |

## 2. Order Lookup & Validation

| ID | Description | Pre-conditions | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-2.1** | Order Lookup - Success | User is on Order Lookup screen. | 1. Enter valid Email Address. <br> 2. Enter valid Order Number associated with that email. <br> 3. Click "Find Order". | Order details are displayed (items, quantities). |
| **TC-2.2** | Order Lookup - Invalid Order Number | User is on Order Lookup screen. | 1. Enter valid Email Address. <br> 2. Enter invalid Order Number. <br> 3. Click "Find Order". | Error message: "We could not find your order". No order details revealed. |
| **TC-2.3** | Order Lookup - Email Mismatch | User is on Order Lookup screen. | 1. Enter Email Address not associated with the Order Number. <br> 2. Enter valid Order Number. <br> 3. Click "Find Order". | Error message: "We could not find your order". No order details revealed. |
| **TC-2.4** | Order Lookup - Validation | User is on Order Lookup screen. | 1. Leave Email or Order Number empty. <br> 2. Click "Find Order". | Validation error message indicating missing required fields. |

## 3. Item Display & Eligibility

| ID | Description | Pre-conditions | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-3.1** | Eligibility - Mattress within 365 days | Valid mattress order < 365 days old. | 1. Look up order. <br> 2. View mattress item. | Item is marked "Eligible". |
| **TC-3.2** | Eligibility - Mattress > 365 days | Valid mattress order > 365 days old. | 1. Look up order. <br> 2. View mattress item. | Item is marked "Not Eligible". Selection disabled. |
| **TC-3.3** | Eligibility - Furniture > 30 days | Valid furniture order > 30 days old. | 1. Look up order. <br> 2. View furniture item. | Item is marked "Not Eligible". Selection disabled. |
| **TC-3.4** | Eligibility - Final Sale | Order contains Final Sale item. | 1. Look up order. | Item is marked "Final Sale" and "Not Eligible". |
| **TC-3.5** | Bundle Handling - Keep Free Gift | Order contains Mattress + Free Pillow. | 1. Select Mattress for return. <br> 2. Keep Pillow (do not select it). | System prompts option to keep Pillow at 50% off. Refund amount adjusted accordingly. |
| **TC-3.6** | Bundle Handling - Return All | Order contains Mattress + Free Pillow. | 1. Select Mattress for return. <br> 2. Select Pillow for return. | Full refund calculated (no deduction for pillow). |

## 4. Documentation & Reasons

| ID | Description | Pre-conditions | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-4.1** | Return Reason Selection | Item selected. | 1. View Reason dropdown. | List contains configured reasons (e.g., "Too Firm"). "Other" is available if configured. |
| **TC-4.2** | Documentation - Furniture Claim | Furniture item selected for return. | 1. Select reason "Damaged". <br> 2. Proceed to documentation. | Upload fields for Photos and Description appear. Submission blocked until files uploaded. |
| **TC-4.3** | Documentation - Upload Validation | Upload screen active. | 1. Attempt to upload invalid file type (e.g., .exe). | Error message shown. File not uploaded. |
| **TC-4.4** | Documentation - Mandatory Fields | Upload screen active. | 1. Leave Description empty. <br> 2. Attempt to continue. | Validation error: Description is required. |

## 5. Logistics & Labels

| ID | Description | Pre-conditions | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-5.1** | Box Count Input | Label generation step. | 1. Enter Box Count = 1. <br> 2. Proceed. | System validates count is <= original shipment. Label generated. |
| **TC-5.2** | Box Count Exceeded | Label generation step. | 1. Enter Box Count > Original Shipment Count. | Error message: "Cannot exceed total box count of original shipment". |
| **TC-5.3** | Mattress Unboxed Flow | Mattress selected. | 1. Answer "No" to "Is it boxed?". | Flow routes to Vendor Selection/Donation instead of generating shipping label. |
| **TC-5.4** | Accessories Mail-In | Accessory selected. | 1. Complete details. | Return label and mail-in instructions are generated. |

## 6. Refunds & Warranty

| ID | Description | Pre-conditions | Steps | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-6.1** | Auto-Refund (< 600) | Return marked "Received". Net value < 600. | 1. System processes refund. | Refund is automatically initiated in WooCommerce. |
| **TC-6.2** | Manual Refund (>= 600) | Return marked "Received". Net value >= 600. | 1. System processes refund. | Ticket routed to CX for manual refund processing. |
| **TC-6.3** | Warranty - Replacement Order | Warranty claim approved. | 1. Reviewer approves claim. | Replacement order created in WooCommerce with "Processing" status. |
