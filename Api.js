Action: file_editor create /app/frontend/src/lib/api.js --file-text "import axios from \"axios\";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const fetchCategories = () => api.get(\"/categories\").then((r) => r.data);
export const fetchProducts = (params = {}) =>
  api.get(\"/products\", { params }).then((r) => r.data);
export const fetchFeatured = () =>
  api.get(\"/products/featured\").then((r) => r.data);
export const fetchProduct = (id) =>
  api.get(`/products/${id}`).then((r) => r.data);
export const createOrder = (payload) =>
  api.post(\"/orders\", payload).then((r) => r.data);
export const fetchOrder = (id) => api.get(`/orders/${id}`).then((r) => r.data);
"
Observation: Create successful: /app/frontend/src/lib/api.js
