-- PROJECT Group 4
-- Stephen Bertotti and David Kazarian
-- Note: Values pre-fixed with : indicate variables to be set at runtime by the backend programming language. 


-- Fetch all WorkOrders.
SELECT * FROM WorkOrders;

-- Create a new WorkOrder.
INSERT INTO WorkOrders (size, street, city, state, zip, stage, applied_at, estimated_at, scheduled_at, started_at, completed_at, on_hold_at, canceled_at) 
VALUES (:size, :street, :city, :state, :zip, :stage, :applied_at, :estimated_at, :scheduled_at, :started_at, :completed_at, :on_hold_at, :canceled_at);

-- Update a WorkOrder.
UPDATE WorkOrders
SET size = :size, street = :street, city = :city, state = :state, zip = :zip, stage = :stage,
    applied_at = :applied_at, estimated_at = :estimated_at, scheduled_at = :scheduled_at,
    started_at = :started_at, completed_at = :completed_at, on_hold_at = :on_hold_at, canceled_at = :canceled_at
WHERE work_order_id = :work_order_id;

-- Delete a WorkOrder.
DELETE FROM WorkOrders
WHERE work_order_id = :work_order_id;


-- Fetch all Employees.
SELECT * FROM Employees;

-- Create a new Employee.
INSERT INTO Employees (first_name, last_name, email, phone_number, status, skill_level) 
VALUES (:first_name, :last_name, :email, :phone_number, :status, :skill_level);

-- Update an Employee.
UPDATE Employees
SET first_name = :first_name, last_name = :last_name, email = :email, phone_number = :phone_number, status = :status
WHERE employee_id = :employee_id;

-- Delete an Employee.
DELETE FROM Employees
WHERE employee_id = :employee_id;



-- Fetch all WorkOrderEmployees along with associated Employees' first & last names.
SELECT WorkOrderEmployees.*, Employees.first_name, Employees.last_name
FROM WorkOrderEmployees INNER JOIN Employees ON WorkOrderEmployees.employee_id = Employees.employee_id;

-- Create a new WorkOrderEmployee association.
INSERT INTO WorkOrderEmployees (work_order_id, employee_id, assigned_at) 
VALUES (:work_order_id, :employee_id, :assigned_at);

-- Update a WorkOrderEmployee association.
UPDATE WorkOrderEmployees 
SET assigned_at = :assigned_at 
WHERE work_order_id = :work_order_id AND employee_id = :employee_id;

-- Delete a WorkOrderEmployee association.
DELETE FROM WorkOrderEmployees 
WHERE work_order_id = :work_order_id AND employee_id = :employee_id;



-- Fetch all PurchaseOrders along with associated Employees' first & last names.
SELECT PurchaseOrders.*, Employees.first_name, Employees.last_name
FROM PurchaseOrders INNER JOIN Employees ON PurchaseOrders.employee_id = Employees.employee_id;

-- Create a new PurchaseOrder.
INSERT INTO PurchaseOrders (created_at, employee_id, work_order_id) 
VALUES (:created_at, :employee_id, :work_order_id);

-- Update a PurchaseOrder.
UPDATE PurchaseOrders 
SET created_at = :created_at, employee_id = :employee_id, work_order_id = :work_order_id 
WHERE purchase_order_id = :purchase_order_id;

-- Delete a PurchaseOrder.
DELETE FROM PurchaseOrders 
WHERE purchase_order_id = :purchase_order_id;



-- Fetch all PurchaseOrderItems along with associated Material names.
SELECT PurchaseOrderItems.*, Materials.name
FROM PurchaseOrderItems INNER JOIN Materials ON PurchaseOrderItems.material_id = Materials.material_id;

-- Create a new PurchaseOrderItem.
INSERT INTO PurchaseOrderItems (unit_cost, quantity, estimated_delivery_date, delivery_type, purchase_order_id, material_id) 
VALUES (:unit_cost, :quantity, :estimated_delivery_date, :delivery_type, :purchase_order_id, :material_id);

-- Update a PurchaseOrderItem.
UPDATE PurchaseOrderItems
SET
    unit_cost = :unit_cost, quantity = :quantity, estimated_delivery_date = :estimated_delivery_date,
    delivery_type = :delivery_type, purchase_order_id = :purchase_order_id, material_id = :material_id
WHERE purchase_order_item_id = :purchase_order_item_id;

-- Delete a PurchaseOrderItem.
DELETE FROM PurchaseOrderItems
WHERE purchase_order_item_id = :purchase_order_item_id;



-- Fetch all Materials.
SELECT * FROM Materials;

-- Create a new Material.
INSERT INTO Materials (name, unit, unit_cost, quantity_available) 
VALUES (:name, :unit, :unit_cost, :quantity_available);

-- Update a Material.
UPDATE Materials
SET name = :name, unit = :unit, unit_cost = :unit_cost, quantity_available = :quantity_available
WHERE material_id = :material_id;

-- Delete a Material.
DELETE FROM Materials
WHERE material_id = :material_id;