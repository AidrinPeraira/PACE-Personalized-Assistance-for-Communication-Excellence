import API from "./api";


export const addTask = (data) =>API.post('/admin/task/add',data); 