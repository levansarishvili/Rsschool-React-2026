import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { createTestStore } from '../test-utils/createTestStore';
import { server } from '../test-utils/mocks/server';
import { api } from './api';

describe('RTK Query - Cache + Invalidation Tests', () => {
  let store: ReturnType<typeof createTestStore>;

  let requestCounters = {
    products: 0,
    detail: 0,
    mutation: 0,
  };

  const resetCounters = () => {
    requestCounters = {
      products: 0,
      detail: 0,
      mutation: 0,
    };
  };

  beforeEach(() => {
    store = createTestStore();
    resetCounters();

    server.use(
      http.get(/.*\/products.*/, ({ request }) => {
        const url = new URL(request.url);
        const skip = url.searchParams.get('skip') || '0';
        const search = url.searchParams.get('search') || '';

        requestCounters.products++;

        return HttpResponse.json({
          products: [
            {
              id: 1,
              title: `Product skip-${skip} search-${search}`,
            },
          ],
          total: 100,
        });
      }),

      http.get('*/products/:id', () => {
        requestCounters.detail++;

        return HttpResponse.json({
          id: 1,
          title: 'iPhone 16',
        });
      }),

      http.post('*/products', async () => {
        requestCounters.mutation++;

        return HttpResponse.json({
          id: 999,
          title: 'Created Product',
        });
      })
    );
  });

  it('should return cached data for identical queries (no refetch)', async () => {
    await store.dispatch(
      api.endpoints.getProducts.initiate({ skip: 0, search: '' })
    );

    expect(requestCounters.products).toBe(1);

    await store.dispatch(
      api.endpoints.getProducts.initiate({ skip: 0, search: '' })
    );

    expect(requestCounters.products).toBe(1);
  });

  it('should fetch new data for different query params', async () => {
    await store.dispatch(
      api.endpoints.getProducts.initiate({ skip: 0, search: '' })
    );

    await store.dispatch(
      api.endpoints.getProducts.initiate({ skip: 10, search: '' })
    );

    expect(requestCounters.products).toBe(2);
  });

  it('should cache results per search query', async () => {
    await store.dispatch(
      api.endpoints.getProducts.initiate({ skip: 0, search: 'phone' })
    );

    await store.dispatch(
      api.endpoints.getProducts.initiate({ skip: 0, search: 'laptop' })
    );

    expect(requestCounters.products).toBe(2);

    await store.dispatch(
      api.endpoints.getProducts.initiate({ skip: 0, search: 'phone' })
    );

    expect(requestCounters.products).toBe(2);
  });

  it('should refetch when refetch is called', async () => {
    const sub = store.dispatch(
      api.endpoints.getProducts.initiate({ skip: 0, search: '' })
    );

    await sub;

    expect(requestCounters.products).toBe(1);

    await sub.refetch();

    expect(requestCounters.products).toBe(2);
  });
});
