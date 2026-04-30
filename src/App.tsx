import { Component } from 'react';
import type { AppState } from './types/types.ts';
import Loader from './components/loader/Loader.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { EmptyState } from './components/EmptyState.tsx';
import { ErrorState } from './components/ErrorState.tsx';

class App extends Component {
  state: AppState = {
    products: [],
    loading: true,
    error: null,
    searchQuery: '',
  };

  render() {
    const { products, loading, error, searchQuery } = this.state;

    return (
      <div className="font-inter text-base w-full px-4 md:px-8 pt-4 md:pt-6 flex flex-col gap-6 md:gap-10 justify-center min-h-screen">
        <Header />
        <main className="w-full flex-1 flex justify-center items-center min-h-[300px]">
          {loading && <Loader />}

          {!loading && products.length === 0 && !error && <EmptyState />}

          {error && <ErrorState error={error} />}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
