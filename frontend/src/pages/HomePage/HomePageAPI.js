import axios from "axios";

/**
 * This file sends the HTTP request for resetting the database to its initial data as documented in the DDL.sql file.
 */

export async function resetDatabase() {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}${"/admin/reset-db"}`
  );
  return response.data;
}