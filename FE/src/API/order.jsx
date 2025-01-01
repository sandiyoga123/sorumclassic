import axios from "axios";
const URL = import.meta.env.VITE_API_URL;

export async function fetchCreateOrder(unit_id, data, token) {
  return await axios.post(`${URL}/order/${unit_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function fetchUploadPayment(order_id, data, token) {
  return await axios.put(`${URL}/order/pay/${order_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchUpdateOrderStatus(order_id, data, token) {
  return await axios.put(`${URL}/order/${order_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchAddReview(order_id, data, token) {
  return await axios.put(`${URL}/order/review/${order_id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchGetDashboardData(day, token) {
  return await axios.get(`${URL}/order/dashboard?day=${day || ""}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchGetOrdersUserByStatus(status, token) {
  return await axios.get(`${URL}/order/status/${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchGetOrderDetail(order_id, token) {
  return await axios.get(`${URL}/order/${order_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchGetAllOrder(filter, token) {
  return await axios.get(`${URL}/order/?page=${filter?.page}&status=${filter?.status || ""}&lte=${filter?.lte || ""}&gte=${filter?.gte || ""}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
