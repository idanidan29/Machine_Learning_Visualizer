import api from "./axios";  // your axios instance with interceptor

export function register({ username, email, fullName, password }) {
  return api.post("/auth/register", { username, email, fullName, password });
}

export function login({ username, password }) {
  return api.post("/auth/login", { username, password });
}
