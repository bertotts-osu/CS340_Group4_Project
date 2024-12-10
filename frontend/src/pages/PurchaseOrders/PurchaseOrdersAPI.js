import axios from "axios";
import { HEADERS } from "../config.js";
import { getEmployeeNameOptions } from "../Employees/EmployeesAPI.js";

/**
 * This file handles HTTP requests to the PurchaseOrders table.
 */

const path = "/purchase-orders";

export async function getPurchaseOrders() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: HEADERS,
  });
  return response.data;
}

export async function createPurchaseOrder(entry) {
  const employees = await getEmployeeNameOptions();

  // Generate an employee name/id map
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.display] = employee.value;
    return acc;
  }, {});

  // add employee_id as an attribute and remove employee_name
  const updatedRow = {
    ...entry,
    employee_id: employeeMap[entry.employee_name],
  };
  delete updatedRow.employee_name;

  if (updatedRow["work_order_id"] === "") {
    updatedRow["work_order_id"] = null;
  }

  // send the http post request
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}${path}`,
    updatedRow,
    { headers: { HEADERS } }
  );
  return response.data;
}

export async function updatePurchaseOrders(changes) {
  // Generate an employee name/id map
  const employees = await getEmployeeNameOptions();
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.display] = employee.value;
    return acc;
  }, {});

  const promises = changes.map((row) => {
    // set the value of employee_id based on the employee name
    const updatedRow = {
      ...row,
      employee_id: employeeMap[row.employee_name],
    };
    delete updatedRow.employee_name;

    if (updatedRow["work_order_id"] === "") {
      updatedRow["work_order_id"] = null;
    }

    return axios.put(`${import.meta.env.VITE_API_URL}${path}`, updatedRow, {
      headers: HEADERS,
    });
  });

  const results = await Promise.allSettled(promises); // returns a single promise with an array of objects describing each promises outcome
  const successes = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value.data);
  const errors = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason);
  return { successes, errors };
}

export async function deletePurchaseOrders(entries) {
  const promises = entries.map((entry) => {
    const url = `${import.meta.env.VITE_API_URL}${path}?purchase_order_id=${
      entry.purchase_order_id
    }`;
    return axios.delete(url, {
      headers: { HEADERS },
    });
  });

  const results = await Promise.allSettled(promises);  // returns a single promise with an array of objects describing each promises outcome
  const successes = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value.data);
  const errors = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.value.data);
  return { successes, errors };
}

export async function getPurchaseOrdersWithEmployeeNames() {
  const employees = await getEmployeeNameOptions();
  const purchaseOrders = await getPurchaseOrders();

  // generate an employee id/name map
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.value] = employee.display;
    return acc;
  }, {});

  // add the employee_name as an attribute to WorkOrderEmployee
  return purchaseOrders.map((row) => {
    return {
      ...row,
      employee_name: employeeMap[row.employee_id] || "Unknown",
    };
  });
}

export async function getPurchaseOrderOptions() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data.map((purchaseOrder) => {
    return {
      value: purchaseOrder.purchase_order_id,
      display: purchaseOrder.purchase_order_id,
    };
  });
}
