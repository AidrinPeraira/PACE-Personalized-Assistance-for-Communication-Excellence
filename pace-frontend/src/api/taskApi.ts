import API from "./api";


export const addTaskApi = (data) =>API.post('/admin/task/add',data); 