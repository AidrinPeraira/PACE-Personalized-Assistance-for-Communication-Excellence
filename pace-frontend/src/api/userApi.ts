import API from "./api";

export const getAllUsersApi = () => API.get("/admin/students");
