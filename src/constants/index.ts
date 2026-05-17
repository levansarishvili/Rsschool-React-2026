export const DEFAULT_SEARCH_QUERY = 'ball';

const CORE_PRODUCT_FIELDS = [
  'id',
  'title',
  'price',
  'description',
  'thumbnail',
  'rating',
];
const EXTRA_DETAIL_FIELDS = [
  'availabilityStatus',
  'brand',
  'stock',
  'category',
];

export const API_SELECT_FIELDS = CORE_PRODUCT_FIELDS.join(',');
export const API_SELECT_FIELDS_DETAILS = [
  ...CORE_PRODUCT_FIELDS,
  ...EXTRA_DETAIL_FIELDS,
].join(',');
