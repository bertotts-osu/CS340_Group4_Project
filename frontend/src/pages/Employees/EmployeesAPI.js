import axios from "axios";
import { HEADERS } from "../config.js";


/**
 * This file handles HTTP requests to the Employees table.
 */

const path = "/employees";

export async function getEmployees() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: { HEADERS },
  });
  return response.data;
}

export async function createEmployee(entry) {
  nullBlankOptionalFields(entry);
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}${path}`,
    entry,
    { headers: { HEADERS } }
  );
  return response.data;
}

export async function updateEmployees(changes) {
  const promises = changes.map((row) => {
    nullBlankOptionalFields(row);
    return axios.put(`${import.meta.env.VITE_API_URL}${path}`, row, {
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

export async function deleteEmployees(entries) {
  const promises = entries.map((entry) => {
    const url = `${import.meta.env.VITE_API_URL}${path}?employee_id=${
      entry.employee_id
    }`;
    return axios.delete(url, {
      headers: { HEADERS },
    });
  });

  const results = await Promise.allSettled(promises); // returns a single promise with an array of objects describing each promises outcome
  const successes = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value.data);
  const errors = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.value.data);
  return { successes, errors };
}

export async function getEmployeeNameOptions() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: { HEADERS },
  });
  return response.data.map((employee) => {
    return {
      value: employee.employee_id,
      display: employee.first_name + " " + employee.last_name,
    };
  });
}

function nullBlankOptionalFields(entry) {
  for (const field of ["email", "phone_number"]) {
    if (typeof entry[field] === "string" && entry[field].trim().length === 0) {
      entry[field] = null;
    }
  }
}
