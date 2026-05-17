import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductApi } from '../services/api';
import type { ProductDetailsType } from '../types/types.ts';
import Loader from '../components/loader/Loader.tsx';
import { ErrorState } from '../components/ErrorState.tsx';
import { EmptyState } from '../components/EmptyState.tsx';
import { getStockColor } from '../utils/getStockColor.ts';

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductDetailsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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

  const handleCloseDetails = () => {
    navigate('/');
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
    <div className="w-full h-full flex flex-col gap-4">
      <div>
        <button
          className="cursor-pointer flex items-center gap-2 text-xs text-gray-500 
            hover:text-gray-900 font-medium border rounded-lg px-3 py-1.5"
          onClick={handleCloseDetails}
        >
          Close
        </button>
      </div>

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full max-h-52 object-contain rounded-lg bg-gray-100 p-4"
      />
      <div>
        <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">
          {product.brand}
        </span>
        <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
        <p className="text-xl font-bold text-primary mt-1">
          ${Math.round(product.price)}
        </p>
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
          <strong className={getStockColor(product.availabilityStatus)}>
            {` ${product.availabilityStatus}`}
          </strong>
        </span>
      </div>
    </div>
  );
}
