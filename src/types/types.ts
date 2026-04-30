export interface AppState {
  products: ProductType[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export interface ProductType {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}
