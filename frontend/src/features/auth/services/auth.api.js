import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const register = ({ username, email, password }) => {
  try {
    const response = api.post("/register", { username, email, password });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = ({ email, password }) => {
  try {
    const response = api.post(
      "/login",
      { email, password },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  try {
    const response = api.get("/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMe = () => {
  try {
    const response = api.get("/get-me");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
