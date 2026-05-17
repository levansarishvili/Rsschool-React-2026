import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductApi } from '../services/api';
import type { ProductDetailsType } from '../types/types.ts';
import Loader from '../components/loader/Loader.tsx';
import { ErrorState } from '../components/ErrorState.tsx';
import { EmptyState } from '../components/EmptyState.tsx';

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDetailsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchProductApi(id);
      setProduct(data);
    } catch (err) {
      let errorMessage = 'Unknown error occurred';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error('Fetch error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      await fetchProduct();
    };

    loadProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorState error={error} />;
  if (!product) return <EmptyState message="No product found whith that ID" />;

  return (
    <div className="w-full h-full flex flex-col gap-4 animate-fade-in">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full max-h-60 object-contain rounded-xs bg-gray-100 p-4"
      />
      <div>
        <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">
          {product.brand}
        </span>
        <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
        <p className="text-xl font-black text-primary mt-1">${product.price}</p>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {product.description}
      </p>

      <div className="border-t pt-4 mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
        <span>
          Stock: <strong className="text-gray-700">{product.stock}</strong>
        </span>
        <span>
          Rating:
          <strong className="text-gray-700">
            ⭐ {product.rating.toFixed(1)}
          </strong>
        </span>
        <span>
          Status:
          <strong className="text-green-600">
            {product.availabilityStatus}
          </strong>
        </span>
      </div>
    </div>
  );
}
