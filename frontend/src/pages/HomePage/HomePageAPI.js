import axios from "axios";
// import { HEADERS } from "../config.js";

export async function resetDatabase() {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}${"/admin/reset-db"}`
  );
  console.log(`results = ${JSON.stringify(response.data)}`);
  return response.data;
}