import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/products',
});

export async function getProducts(params) {
  const { data } = await API.get('/', { params });
  return data;
}

// ✅ Add these so App.jsx stops crashing
export async function fetchProducts(page = 1, filters = {}) {
  const params = { page, limit: 20, ...filters };
  const { data } = await API.get('/', { params });
  return data;
}

export async function fetchCategories() {
  const { data } = await API.get('/categories');
  return data;
}
