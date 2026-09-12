const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const parseResponse = async (response) => {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || `Error HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
};

export const getApiUrl = () => API_URL;

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/api/products`);
  return parseResponse(response);
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/api/products/${id}`);
  return parseResponse(response);
};

export const createProduct = async (product) => {
  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });

  return parseResponse(response);
};

export const updateProduct = async (id, product) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });

  return parseResponse(response);
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE'
  });

  return parseResponse(response);
};
