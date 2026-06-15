import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export function getRtkErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string {
  if (!error) return 'Unknown error';

  if ('status' in error) {
    const status = error.status;

    if (status === 'PARSING_ERROR') {
      return 'Invalid response from server. Please try again.';
    }

    if (status === 404) {
      return 'Resource not found (404).';
    }

    if (status === 500) {
      return 'Server error. Please try again later.';
    }

    if (typeof error.data === 'string') {
      return 'Request failed.';
    }

    return `Request failed (${status})`;
  }

  if ('message' in error) {
    return error.message ?? 'Unknown error';
  }

  return 'Unknown error';
}
