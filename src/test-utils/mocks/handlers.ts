import { delay, http, HttpResponse } from 'msw';
import { server } from './server';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.get(`${API_URL}products/search`, () => {
    return HttpResponse.json({
      products: [
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
      ],
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
  server.use(
    http.get(`${API_URL}products/search`, async () => {
      await delay(responseDelay);

      return HttpResponse.json({ products });
    })
  );
};

export const mockErrorResponse = () => {
  server.use(
    http.get(`${API_URL}products/search`, () => {
      return HttpResponse.error();
    })
  );
};

export const mockProductErrorResponse = () => {
  server.use(
    http.get(`${API_URL}products/:id`, () => {
      return HttpResponse.error();
    })
  );
};
