import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export async function fetchAllUndeletedUnit() {
  return await axios.get(`${URL}/unit`);
}

export async function fetchGetUnitById(unit_id, token) {
  return await axios.get(`${URL}/unit/${unit_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchAddUnit(data, token) {
  return await axios.post(`${URL}/unit`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchEditUnit(id, data, token) {
  return await axios.put(`${URL}/unit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchDeleteUnit(unit_id, token) {
  return await axios.delete(`${URL}/unit/${unit_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
