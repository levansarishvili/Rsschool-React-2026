// src/layouts/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import { Footer } from '../components/Footer.tsx';
import { Header } from '../components/Header.tsx';

export default function RootLayout() {
  return (
    <div className="flex flex-col gap-10 font-inter text-base bg-gray-50 w-full min-h-screen">
      <Header />

      <div className="max-w-360 mx-auto w-full flex-1 flex flex-col justify-between">
        <main className="px-4 md:px-8 pb-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
