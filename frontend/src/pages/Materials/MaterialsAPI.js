import axios from "axios";

export async function getMaterials() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/materials`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function createMaterial(formData) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/materials`,
    formData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function updateMaterials(changes) {

  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/materials`,
    changes,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function deleteMaterials(entries) {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/materials`,
    {
      headers: { "Content-Type": "application/json" },
      data: entries,
    }
  );
  return response.data;
}