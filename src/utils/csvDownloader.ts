import type { ProductType } from '../types/types';

export const downloadItemsAsCSV = (items: ProductType[]): void => {
  if (items.length === 0) return;

  const headers = ['ID', 'Title', 'Description', 'Price', 'Catalog URL'];

  const rows = items.map((item) => [
    item.id,
    `"${(item.title || '').replace(/"/g, '""')}"`,
    `"${(item.description || '').replace(/"/g, '""')}"`,
    item.price,
    `"${window.location.origin}/details/${item.id}"`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${items.length}_items.csv`);
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
