// src/services/productApi.js
import { createApiInstance } from "../api/createApiInstance";

const productApi = createApiInstance("https://jsonplaceholder.typicode.com/todos");
export default productApi;