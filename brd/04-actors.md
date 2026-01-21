# Actors


## Customers and Retail

| Actor                     | Description                                                                                                       |
|---------------------------|-------------------------------------------------------------------------------------------------------------------|
| Customer                  | End user initiating a return, refund, or warranty claim through the portal.                                      |
| Retail Store (Shopify POS)| Physical stores whose transactions are recorded in Shopify; customers may initiate returns in the portal, with refunds handled per store rules. |
| Retail Store (STORIS)    | Non-Shopify retail locations; customers must return items in person. The portal provides guidance only (no automated processing). |

## Systems

| Actor              | Description                                                                                                              |
|--------------------|--------------------------------------------------------------------------------------------------------------------------|
| Claimlane Portal   | Web-based interface guiding the customer through each step, applying eligibility rules, documentation requirements, and triggering backend actions. |
| WooCommerce System | Backend e-commerce system for orders, item details, inventory adjustments, refunds, and replacement order creation.      |
| Shipping Carrier API | External shipping providers (e.g., FedEx, EasyPost, freight services) used to generate return labels or arrange pickups. |

## Customer Service and Operations

| Actor                    | Description                                                                                                       |
|--------------------------|-------------------------------------------------------------------------------------------------------------------|
| Customer Service (CS) Agents | Review claims, validate documentation, perform manual refunds, manage exceptions, and override rules where permitted. |
| Caledonia Warehouse Team | Canadian warehouse team receiving physical returns and updating item condition/status using a limited-access role in the portal. |
| Store Operations (Store Ops) | Team that runs “Returned items” reports from the portal to update inventory and reconcile returned goods.      |
| Return Logistics Team    | Internal team selecting donation/pickup vendors for unboxed mattresses or oversized items, managing vendor changes, and triggering updated notifications. |

## External Partners

| Actor                           | Description                                                                                                  |
|---------------------------------|--------------------------------------------------------------------------------------------------------------|
| Vendors (Donation / Pickup Partners) | External partners that collect unboxed mattresses, oversized items, or donations and update pickup status within the portal where applicable. |

## Governance and Quality

| Actor               | Description                                                                                          |
|---------------------|------------------------------------------------------------------------------------------------------|
| Marketing Team      | Provides business-approved messaging and copy for reasons, instructions, and customer-facing content.|
| Quality Assurance (QA) Testers | Validate portal functionality, eligibility logic, documentation rules, and end-to-end flows against the defined requirements and acceptance criteria. |

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>

