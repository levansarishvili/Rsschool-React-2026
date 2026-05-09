import '@testing-library/jest-dom';

import localStorageMock from './mocks/localStorageMock';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
