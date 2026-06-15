import '@testing-library/jest-dom';

import { beforeAll, afterAll, afterEach } from 'vitest';
import { server } from '../test-utils/mocks/server';
import localStorageMock from '../test-utils/mocks/localStorageMock';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
