export interface AppState {
  products: ProductType[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  totalProducts: number;
}

export interface ProductsApiResponse {
  products: ProductType[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductType {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  rating: number;
}

export interface ProductDetailsType {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  availabilityStatus: string;
  brand: string;
  stock: string;
  category: string;
}
