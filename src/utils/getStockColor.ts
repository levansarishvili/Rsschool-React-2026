export const getStockColor = (status: string) => {
  switch (status) {
    case 'In Stock':
      return 'text-green-600';
    case 'Low Stock':
      return 'text-yellow-500';
    case 'Out of Stock':
      return 'text-red-600';
    default:
      return 'text-gray-500';
  }
};
