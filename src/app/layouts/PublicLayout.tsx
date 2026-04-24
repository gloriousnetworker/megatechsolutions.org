import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BannerTicker } from '../components/BannerTicker';

export function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <BannerTicker />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
