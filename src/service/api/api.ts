import axios from "axios";

export const api = axios.create({
  // baseURL: "https://crud-login-api.herokuapp.com",
  baseURL: "http://localhost:8080",
});
