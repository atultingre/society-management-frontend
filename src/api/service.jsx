import { message } from "antd";
import axios from "axios";
// getting token

const token = localStorage.getItem("token");

const BASE_URL =
  "https://society-management-backend.onrender.com/api" ||
  "http://localhost:5000/api";

const headers = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const api = axios.create({
  baseURL: BASE_URL,
});

export const handleApiError = (error) => {
  if (error.response && error.response.data && error.response.data.error) {
    message.error(error.response.data.error);
  } else {
    message.error(error.response?.data?.error || "Something went wrong");
  }
};

export const login = async ({ email, password }) => {
  console.log("login: ", email, password);
  try {
    const response = await api.post("/auth/login", { email, password });
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const signup = async (data) => {
  console.log("signup: ", data);
  try {
    const response = await api.post("/auth/signup", data);
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const getHouse = async (props) => {
  console.log("getHouse: ", props);
  const { wing, houseNumber, userId } = props;

  try {
    const response = await api.get(
      `/house/${wing}/${houseNumber}/${userId}`,
      headers
    );
    return response.data.house;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllHouses = async () => {
  try {
    const response = await api.get("/houses");
    return response.data.houses;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateHouse = async (props) => {
  console.log("updateHouse: ", props);

  const { data, wing, houseNumber, userId } = props;

  try {
    const response = await api.put(
      `/house/${wing}/${houseNumber}/${userId}`,
      data,
      headers
    );
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteHouse = async (props) => {
  console.log("deleteHouse: ", props);

  const { wing, houseNumber, userId } = props;

  try {
    const response = await api.delete(
      `/house/${wing}/${houseNumber}/${userId}`,
      headers
    );
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const createHouse = async (props) => {
  console.log("createHouse: ", props);

  const { data, wing, houseNumber, userId } = props;

  try {
    const response = await api.post(
      `/house/${wing}/${houseNumber}/${userId}`,
      data,
      headers
    );
    return response;
  } catch (error) {
    handleApiError(error);
  }
};
