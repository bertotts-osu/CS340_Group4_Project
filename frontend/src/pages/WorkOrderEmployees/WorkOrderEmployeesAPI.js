import axios from "axios";
import { HEADERS } from "../config.js";
import { getEmployeeNameOptions } from "../Employees/EmployeesAPI.js";

const path = "/work-order-employees";

export async function getWorkOrderEmployees() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}${path}`,
    { headers: HEADERS }
  );
  return response.data;
}

export async function createWorkOrderEmployee(entry) {
  const employees = await getEmployeeNameOptions();

  // Generate an employee name/id map
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.display] = employee.value;
    return acc;
  }, {});

  // add employee id as an attribute and remove employee name
  const updatedRow = {
    ...entry,
    employee_id: employeeMap[entry.employee_name]
  };
  delete updatedRow.employee_name;

  // send the http post request
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}${path}`,
    updatedRow,
    { headers: HEADERS }
  );
  return response.data;
}

export async function updateWorkOrderEmployees(changes) {
  const promises = changes.map((row) => {
    return axios.put(
      `${import.meta.env.VITE_API_URL}${path}`,
      row,
      { headers: HEADERS }
    );
  });

  const results = await Promise.allSettled(promises);
  const successes = results.filter(result => result.status === 'fulfilled').map(result => result.value.data); 
  const errors = results.filter(result => result.status === 'rejected').map(result => result.reason); 
  return { successes, errors };
}

export async function deleteWorkOrderEmployees(entries) {
  const promises = entries.map((entry) => {
    const url = `${import.meta.env.VITE_API_URL}${path}?work_order_id=${entry.work_order_id}&employee_id=${entry.employee_id}`;
    return axios.delete(url, 
      {headers: HEADERS}
    );
  });

const results = await Promise.allSettled(promises);
const successes = results.filter(result => result.status === 'fulfilled').map(result => result.value.data); 
const errors = results.filter(result => result.status === 'rejected').map(result => result.reason); 
return { successes, errors };
}

export async function getWorkOrderEmployeesWithNames() {
  const employees = await getEmployeeNameOptions();
  const workOrderEmployees = await getWorkOrderEmployees();

  // generate an employee id/name map
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.value] = employee.display;
    return acc;
  }, {});

  // add the employee_name as an attribute to WorkOrderEmployee
  return workOrderEmployees.map((row) => {
    return {
      ...row,
      employee_name: employeeMap[row.employee_id] || "Unknown",
    };
  });
}
