import axios from "axios";
import { HEADERS } from "../config.js";


/**
 * This file handles HTTP requests to the Materials table.
 */

const path = "/materials";

export async function getMaterials() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}${path}`,
    { headers:  HEADERS}
  );
  return response.data;
}

export async function createMaterial(entry) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}${path}`,
    entry,
    { headers: { HEADERS } }
  );
  return response.data;
}

export async function updateMaterials(changes) {
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

export async function deleteMaterials(entries) {
  const promises = entries.map((entry) => {
    const url = `${
      import.meta.env.VITE_API_URL
    }${path}?material_id=${entry.material_id}`;
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

export async function getMaterialOptions() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}${path}`,
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data.map((material) => {
    return {
      value: material.material_id,
      display: material.name,
    };
  });
}