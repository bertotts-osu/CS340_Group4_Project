import axios from "axios";
import { HEADERS } from "../config.js";


/**
 * This file handles HTTP requests to the WorkOrders table.
 */

const path = "/work-orders";

export async function getWorkOrders() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}${path}`,
    { headers:  HEADERS}
  );
  return response.data;
}

export async function createWorkOrder(entry) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}${path}`,
    entry,
    { headers: { HEADERS } }
  );
  return response.data;
}

export async function updateWorkOrders(changes) {
  const promises = changes.map((row) => {
    return axios.put(
      `${import.meta.env.VITE_API_URL}${path}`,
      row,
      { headers: HEADERS }
    );
  });

  const results = await Promise.allSettled(promises); // returns a single promise with an array of objects describing each promises outcome
  const successes = results.filter(result => result.status === 'fulfilled').map(result => result.value.data); 
  const errors = results.filter(result => result.status === 'rejected').map(result => result.reason); 
  return { successes, errors };
}

export async function deleteWorkOrders(entries) {
  const promises = entries.map((entry) => {
    const url = `${
      import.meta.env.VITE_API_URL
    }${path}?work_order_id=${entry.work_order_id}`;
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

export async function getWorkOrderOptions() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/work-orders`,
    {headers: { "Content-Type": "application/json" }}
  );
  return response.data.map((workOrder) => {
    return {
      value: workOrder.work_order_id,
      display: workOrder.work_order_id,
    };
  });
}