-- PROJECT Group 4
-- Stephen Bertotti and David Kazarian

-- Disable foreign key checks so tables/records can be deleted without triggering constraints
SET FOREIGN_KEY_CHECKS = 0;
-- Disable Autocommit so all tables and records are processed as a single transaction
SET AUTOCOMMIT = 0;



-- Create the WorkOrders table
DROP TABLE IF EXISTS `WorkOrders`;
CREATE TABLE `WorkOrders` (
	`work_order_id` int NOT NULL AUTO_INCREMENT,
	`size` enum('Small','Medium','Large') NOT NULL,
	`street` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`state` varchar(2) NOT NULL,
	`zip` varchar(5) NOT NULL,
	`stage` enum('Applied','Estimated','Paid','Scheduled','In Progress','Completed','On Hold','Canceled') NOT NULL,
	`applied_at` datetime NOT NULL,
	`estimated_at` datetime,
	`scheduled_at` datetime,
	`started_at` datetime,
	`completed_at` datetime,
	`on_hold_at` datetime,
	`canceled_at` datetime,
	PRIMARY KEY (`work_order_id`)
);
-- Add the WorkOrders data
INSERT INTO `WorkOrders` (`work_order_id`, `size`, `street`, `city`, `state`, `zip`, `stage`, `applied_at`, `estimated_at`, `scheduled_at`,`started_at`,`completed_at`,`on_hold_at`, `canceled_at`)
VALUES
(1, 'Medium', '2520 NW Hayes Ave', 'Corvallis', 'OR', '97330', 'In Progress', '2024-08-04 15:45:56', '2024-08-15 12:25:42', '2024-08-23 09:45:23', '2024-09-02 08:45:41', NULL, NULL, NULL),
(2, 'Small', '1432 College St', 'Philomath', 'OR', '97370', 'Scheduled', '2024-08-20 12:23:35', '2024-08-25 16:45:04', '2024-08-30 11:34:52', NULL, NULL, NULL, NULL),
(3, 'Large', '4170 SW Research Way', 'Corvallis', 'OR', '97333', 'Applied', '2024-09-03 16:56:05', NULL, NULL, NULL, NULL, NULL, NULL);



-- Create the Employees table
DROP TABLE IF EXISTS `Employees`;
CREATE TABLE `Employees` (
	`employee_id` int NOT NULL AUTO_INCREMENT,
	`first_name` varchar(255) NOT NULL,
	`last_name` varchar(255) NOT NULL,
	`email` varchar(255),
	`phone_number` varchar(12),
	`status` enum('Active','Inactive') NOT NULL,
	`skill_level` enum('Apprentice','Associate','Principal') NOT NULL,
	PRIMARY KEY (`employee_id`)
);
-- Add the Employees data
INSERT INTO `Employees` (`employee_id`, `first_name`, `last_name`, `email`, `phone_number`, `status`, `skill_level`)
VALUES
(1, 'Scott', 'Derickson', 's.derickson@lfeaves.com', '541-223-6245', 'Active', 'Principal'),
(2, 'Aria', 'Stark', 'a.stark@lfeaves.com', '555-123-4567', 'Active', 'Associate'),
(3, 'Thor', 'Odinsson', 't.odinsson@lfeaves.com', '555-987-6543', 'Inactive', 'Associate'),
(4, 'Luna', 'Larson', 'l.larson@lfeaves.com', '555-678-1234', 'Active', 'Principal'),
(5, 'Nick', 'Anderson', 'n.anderson@lfeaves.com', '555-456-7890', 'Active', 'Apprentice');



-- Create the WorkOrderEmployees intersection table
DROP TABLE IF EXISTS `WorkOrderEmployees`;
CREATE TABLE `WorkOrderEmployees` (
	`work_order_id` int NOT NULL,
	`employee_id` int NOT NULL,
	`assigned_at` datetime NOT NULL,
	PRIMARY KEY (`work_order_id`, `employee_id`),
	FOREIGN KEY (`work_order_id`) REFERENCES `WorkOrders` (`work_order_id`) ON DELETE CASCADE,
	FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`) ON DELETE CASCADE
);
-- Add the WorkOrderEmployees data
INSERT INTO `WorkOrderEmployees` (`work_order_id`, `employee_id`, `assigned_at`)
VALUES
(1, 1, '2024-08-04 16:47:56'),
(1, 5, '2024-08-05 17:46:25'),
(2, 2, '2024-08-21 12:25:25');



-- Create the PurchaseOrders table
DROP TABLE IF EXISTS `PurchaseOrders`;
CREATE TABLE `PurchaseOrders` (
	`purchase_order_id` int NOT NULL AUTO_INCREMENT,
	`created_at` datetime NOT NULL,
	`employee_id` int NOT NULL,
	`work_order_id` int,
	PRIMARY KEY (`purchase_order_id`),
	FOREIGN KEY (`employee_id`) REFERENCES `Employees` (`employee_id`) ON DELETE CASCADE,
	FOREIGN KEY (`work_order_id`) REFERENCES `WorkOrders` (`work_order_id`) ON DELETE SET NULL
);
-- Add the PurchaseOrders data
INSERT INTO `PurchaseOrders` (`purchase_order_id`, `created_at`, `employee_id`, `work_order_id`)
VALUES
(1, '2024-08-01 15:23:53', 1, NULL),
(2, '2024-08-23 06:23:35', 4, 1),
(3, '2024-08-30 23:34:05', 4, 2);



-- Create the PurchaseOrderItems table
DROP TABLE IF EXISTS `PurchaseOrderItems`;
CREATE TABLE `PurchaseOrderItems` (
	`purchase_order_item_id` int NOT NULL AUTO_INCREMENT,
	`unit_cost` decimal(12, 2) NOT NULL,
	`quantity` int NOT NULL,
	`estimated_delivery_date` date,
	`delivery_type` enum('Stock','Ship') NOT NULL,
	`purchase_order_id` int NOT NULL,
	`material_id` int NOT NULL,
	PRIMARY KEY (`purchase_order_item_id`),
	FOREIGN KEY (`purchase_order_id`) REFERENCES `PurchaseOrders` (`purchase_order_id`) ON DELETE CASCADE,
	FOREIGN KEY (`material_id`) REFERENCES `Materials` (`material_id`) ON DELETE CASCADE
);
-- Add the PurchaseOrderItems data
INSERT INTO `PurchaseOrderItems` (`purchase_order_item_id`, `unit_cost`, `quantity`, `estimated_delivery_date`, `delivery_type`, `purchase_order_id`, `material_id`)
VALUES
(1, 2.10, 10000, '2024-08-08', 'Ship', 1, 3),
(2, 1.24, 10000, '2024-08-08', 'Ship', 1, 2),
(3, 5.49, 500, '2024-08-10', 'Ship', 1, 1),
(4, 2.10, 286, NULL, 'Stock', 2, 3),
(5, 5.56, 22, NULL, 'Stock', 2, 1),
(6, 2.15, 118, NULL, 'Stock', 3, 3),
(7, 5.56, 16, NULL, 'Stock', 3, 1);




-- Create the Materials table
DROP TABLE IF EXISTS `Materials`;
CREATE TABLE `Materials` (
	`material_id` int NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`unit` enum('FT','EA') NOT NULL,
	`unit_cost` decimal(12, 2) NOT NULL,
	`quantity_available` int NOT NULL,
	PRIMARY KEY (`material_id`)
);
-- Add the Materials data
INSERT INTO `Materials` (`material_id`, `name`, `unit`, `unit_cost`, `quantity_available`)
VALUES
(1, 'Bolt Fastener Set', 'EA', 5.56, 462),
(2, 'Standard Seamless Eave 5"', 'FT', 1.24, 10000),
(3, 'Standard Seamless Eave 6"', 'FT', 2.12, 9596),
(4, 'Colored Seamless Eave 5"', 'FT', 3.45, 0),
(5, 'Colored Seamless Eave 6"', 'FT', 4.15, 0);



-- Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
-- Commit all changes
COMMIT;