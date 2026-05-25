// src/layouts/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export default function RootLayout() {
  return (
    <div className="flex flex-col text-base bg-background text-foreground w-full min-h-screen font-mono md:font-sans selection:bg-accent selection:text-background">
      <Header />

      <div className="flex-1 flex flex-col w-full bg-background-secondary pattern-diagonal-lines">
        <main className="w-full flex-1 max-w-360 mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="bg-card border-3 border-foreground p-4 md:p-8 shadow-[6px_6px_0px_0px_rgba(43,41,39,1)] dark:shadow-[6px_6px_0px_0px_rgba(244,239,226,1)] rounded-sm">
            <Outlet />
          </div>
        </main>

        <div className="border-t-3 border-foreground">
          <Footer />
        </div>
      </div>
    </div>
  );
}
