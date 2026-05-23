// src/layouts/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export default function RootLayout() {
  return (
    <div className="flex flex-col gap-10 text-base bg-background w-full min-h-screen">
      <Header />

      <div
        className="flex flex-col gap-10 text-base w-full min-h-screen 
          bg-linear-to-br from-background via-background-secondary to-surface"
      >
        <main className="max-w-360 mx-auto px-4 md:px-8 pb-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
