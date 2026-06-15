import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SelectionFlyout } from '../SelectionFlyout';

export default function RootLayout() {
  return (
    <div className="flex flex-col text-base bg-background text-foreground w-full min-h-screen font-sans antialiased selection:bg-primary/20 selection:text-primary">
      <Header />
      <main className="w-full max-w-340 mx-auto px-4 md:px-6 flex-1 py-8 md:py-12">
        <Outlet />
      </main>
      <Footer />
      <SelectionFlyout />
    </div>
  );
}
