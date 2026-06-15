import { delay, http, HttpResponse } from 'msw';
import { server } from './server';
import { API_SELECT_FIELDS } from '../../constants';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const mockProducts = [
  {
    id: 1,
    title: 'Iphone 16',
    description: 'Smartphone',
    price: 300,
    thumbnail:
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Macbook',
    description: 'Gaming laptop',
    price: 1500,
    thumbnail:
      'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
    rating: 4.8,
  },
];

export const handlers = [
  http.get(`${API_URL}products/search`, () => {
    return HttpResponse.json({
      products: mockProducts,
    });
  }),

  http.get(`${API_URL}products`, () => {
    return HttpResponse.json({
      products: mockProducts,
      total: mockProducts.length,
      skip: 0,
      limit: 12,
      select: API_SELECT_FIELDS,
    });
  }),

  http.get(`${API_URL}products/:id`, ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      id,
      title: 'Iphone 16',
      description: 'Smartphone',
      price: 300,
      thumbnail:
        'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
      rating: 4.5,
      stock: 12,
      brand: 'Apple',
      availabilityStatus: 'In Stock',
    });
  }),
];

export const mockProductsResponse = (products = [], responseDelay = 0) => {
  const handlerFn = async () => {
    if (responseDelay > 0) await delay(responseDelay);
    return HttpResponse.json({ products, total: products.length });
  };

  server.use(
    http.get(`${API_URL}products/search`, handlerFn),
    http.get(`${API_URL}products`, handlerFn)
  );
};

export const mockErrorResponse = () => {
  const errorFn = () => HttpResponse.error();

  server.use(
    http.get(`${API_URL}products/search`, errorFn),
    http.get(`${API_URL}products`, errorFn)
  );
};

export const mockProductErrorResponse = () => {
  server.use(
    http.get(`${API_URL}products/:id`, () => {
      return HttpResponse.error();
    })
  );
};
