import type { ApiProduct } from '../types/types.ts';

export const transformProducts = (products: ApiProduct[]) => {
  return products.map((product) => ({
    id: product.id,
    name: product.title,
    description: product.description,
    image: product.thumbnail,
    price: product.price,
    rating: product.rating,
  }));
};
