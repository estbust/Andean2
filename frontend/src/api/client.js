const API_BASE = '/api';

export async function fetchProducts({ category, featured } = {}) {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (featured) params.append('featured', 'true');

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const response = await fetch(`${API_BASE}/products/${queryString}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchProductBySlug(slug) {
  const response = await fetch(`${API_BASE}/products/${slug}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${slug}: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE}/categories/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
}

export async function sendContactMessage({ name, email, message }) {
  const response = await fetch(`${API_BASE}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || `Error ${response.status}: Failed to send message`);
  }
  return response.json();
}
