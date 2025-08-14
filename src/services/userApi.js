// src/services/userApi.js
import { createApiInstance } from "../api/createApiInstance";

const userApi = createApiInstance("https://jsonplaceholder.typicode.com");
export default userApi;