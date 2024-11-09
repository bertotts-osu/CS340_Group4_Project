import axios from 'axios';

export async function getWorkOrderData() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/work-orders`);
  return response.data;
}

  export async function getStageOptions() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/stages`);
    return response.data;
  }

  export async function submitWOForm (formData) {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/work-order`, 
      formData,
    );
    return response.data;
  }