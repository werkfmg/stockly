import axios from "axios";

const API_URL = "http://localhost:3000/products";

// Get all products
export const getProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Add new product
export const addProduct = async (product) => {
  const { data } = await axios.post(API_URL, product);
  return data;
};

// Update product
export const updateProduct = async (product) => {
  const { data } = await axios.put(`${API_URL}/${product.id}`, product);
  return data;
};

// Delete product
export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
