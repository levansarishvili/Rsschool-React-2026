import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchProductApi } from '../services/api';
import type { ProductDetailsType } from '../types/types';

export function useProduct() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductDetailsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const data = await fetchProductApi(id);

        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  const handleCloseDetails = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  return {
    product,
    loading,
    error,
    handleCloseDetails,
  };
}
