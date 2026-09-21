import { useState, useEffect } from 'react';

export const useFetch = (data, delay = 800) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(data);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [data, delay]);

  return { loading, items };
};