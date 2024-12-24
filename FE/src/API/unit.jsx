import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export async function fetchAllUndeletedUnit() {
  return await axios.get(`${URL}/unit`);
}
