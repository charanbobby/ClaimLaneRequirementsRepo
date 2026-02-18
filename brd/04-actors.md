# Actors

## Customers and Retail

| Actor                     | Description                                                                                                       |
|---------------------------|-------------------------------------------------------------------------------------------------------------------|
| Customer                  | End user initiating a return, refund, or warranty claim through the portal.                                      |
| Retail Store (Shopify POS)| Physical stores whose transactions are recorded in Shopify; customers may initiate returns in the portal, with refunds handled per store rules. |
| Retail Store (STORIS)    | Non-Shopify retail locations; customers must reach out to Sleep Country Customer Care team for returns. |

## Systems

| Actor              | Description                                                                                                              |
|--------------------|--------------------------------------------------------------------------------------------------------------------------|
| Claimlane Portal   | Web-based interface guiding the customer through each step, applying eligibility rules, documentation requirements, and triggering backend actions. |
| WooCommerce System | Backend e-commerce system for orders, item details, inventory adjustments, refunds, and replacement order creation.      |
| Shipping Carrier API | External shipping providers (e.g., FedEx, Freight services) used to generate return labels or arrange pickups achieved via EasyPost API. |

## Customer Service and Operations

| Actor                    | Description                                                                                                       |
|--------------------------|-------------------------------------------------------------------------------------------------------------------|
| Customer Experience (CX) Agents | Review claims, validate documentation, perform manual refunds, manage exceptions, and override rules where permitted. |
| Internal Ops             | Processes US warehouse email notifications and manually updates return statuses in the portal for US returns (LA/NJ warehouses). Runs "Returned items" reports for US inventory reconciliation. |
| Caledonia Warehouse Team | Canadian warehouse team receiving physical returns and updating item condition/status using a limited-access role in the portal. |
| US Warehouse Team (LA / NJ) | US warehouse teams (Los Angeles and New Jersey) that receive physical returns and email status updates to Internal Ops. These teams do not have direct portal access; all status updates are processed offline via email. |
| Store Operations (Store Ops) | Team that runs “Returned items” reports from the portal to update inventory and reconcile returned goods.      |
| Return Logistics Team    | Internal team selecting donation/pickup vendors for unboxed mattresses or oversized items, managing vendor changes, triggering updated notifications, and offering self-donation options when no vendor is available. |

## External Partners

| Actor                           | Description                                                                                                  |
|---------------------------------|--------------------------------------------------------------------------------------------------------------|
| Vendors (Donation / Pickup Partners) | External partners (6–10 vendors) that collect unboxed mattresses, oversized items, or donations. Vendors have portal access to mark items as "Picked" and update pickup status directly within ClaimLane. |
| Third Party (EQ3/TSC/Costco) Partners | Third-party partners that sell Silk & Snow products through their own channels. Partners will have ability to share the link (to Claimlane) for clients to submit pickup requests. |

## Governance and Quality

| Actor               | Description                                                                                          |
|---------------------|------------------------------------------------------------------------------------------------------|
| UX Team      | Provides business-approved customer-facing UI.|
| Quality Assurance (QA) Testers | Business Ops and CX Team  |

---

## Discussion

<div class="giscus-placeholder"></div>
