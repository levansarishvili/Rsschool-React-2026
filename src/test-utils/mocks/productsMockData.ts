import type { ProductType } from '../../types/types';

export const mockProducts: ProductType[] = [
  {
    id: 1,
    title: 'Phone',
    description: 'Smartphone',
    price: 300,
    thumbnail:
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Laptop',
    description: 'Gaming laptop',
    price: 1500,
    thumbnail:
      'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
    rating: 4.8,
  },
];

export const mockProduct: ProductType = {
  id: 1,
  title: 'Phone',
  description: 'This is a test product description.',
  price: 300,
  thumbnail:
    'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
  rating: 4.5,
};
