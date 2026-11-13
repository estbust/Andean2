import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchCategories } from '../api/client';

export function useProducts({ category, featured } = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts({ category, featured });
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Error loading products');
    } finally {
      setLoading(false);
    }
  }, [category, featured]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { products, loading, error, refetch: loadData };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await fetchCategories();
        if (isMounted) setCategories(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
}
