import API from "./api";


export const addTaskApi = (data) =>API.post('/admin/task/add',data); 

export const getSeniorsApi = () => API.get('/admin/seniors');

export const getAllTaskApi = () => API.get('/admin/task/all');

export const getAllStudentApi = () => API.get('/admin/students');


export const updateTaskApi = (taskId, data) => API.patch(`/admin/task/update/${taskId}`, data);

export const markAttendanceApi = (taskId, data) => API.patch(`/admin/task/attendance/${taskId}`, data);

export const deleteTaskApi = (taskId) => API.delete(`/admin/task/delete/${taskId}`);