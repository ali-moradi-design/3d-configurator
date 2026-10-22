import type { Metadata, Viewport } from 'next';
import '@/app/styles/globals.css';

export const metadata: Metadata = {
  title: 'Tidewalk | Design your own sneakers in 3D',
  description:
    'A 3D product configurator demo: change colorway, accent color and finish on a sneaker and watch the price update. Fictional brand, built with Next.js and react-three-fiber.',
};

export const viewport: Viewport = { themeColor: '#f5f2ec' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
