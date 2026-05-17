export interface AppState {
  products: ProductType[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export interface ProductsApiResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductType {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
}

export interface Review {
  user: string;
  comment: string;
  rating: number;
  date: string;
  reviewerEmail: string;
  reviewerName: string;
}
