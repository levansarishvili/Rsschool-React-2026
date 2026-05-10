import { Component } from 'react';
import type { AppState } from './types/types.ts';
import Loader from './components/loader/Loader.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { EmptyState } from './components/EmptyState.tsx';
import { ErrorState } from './components/ErrorState.tsx';
import { fetchProductsApi } from './services/api.ts';
import { transformProducts } from './utils/transform.ts';
import ProductList from './components/ProductList/ProductList.tsx';

class App extends Component<object, AppState> {
  state: AppState = {
    products: [],
    loading: true,
    error: null,
    searchQuery: '',
  };

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async (query = 'ball') => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const data = await fetchProductsApi(query);
      const productsData = transformProducts(data.products);

      this.setState({ products: productsData || [], loading: false });
    } catch (error) {
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error('Fetch error:', errorMessage);
      this.setState({ error: errorMessage, loading: false });
    }
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query, loading: true }, () => {
      this.fetchProducts(query);
    });
  };

  render() {
    const { products, loading, error, searchQuery } = this.state;

    return (
      <div className="font-inter text-base bg-gray-50 w-full min-h-screen">
        <Header searchQuery={searchQuery} onSearch={this.handleSearch} />
        <div className="max-w-7xl mx-auto pt-4 md:pt-6 flex flex-col gap-6 md:gap-12 justify-center min-h-screen">
          <main className="relative z-0 w-full flex-1 flex justify-center items-center min-h-75 px-4 md:px-8">
            {loading && <Loader />}

            {!loading && products.length === 0 && !error && <EmptyState />}

            {error && <ErrorState error={error} />}

            {!loading && !error && products.length > 0 && (
              <ProductList products={products} />
            )}
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
