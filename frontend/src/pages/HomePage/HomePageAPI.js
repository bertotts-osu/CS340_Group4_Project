import axios from "axios";
// import { HEADERS } from "../config.js";

export async function resetDatabase() {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}${"/admin/reset-db"}`
  );
  return response.data;
}