import type { Metadata } from 'next';
import { Archivo, Roboto, Roboto_Slab } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AskRusty from '@/components/ask-rusty';
import ScrollReveal from '@/components/scroll-reveal';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-roboto-slab',
});

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ridgelineboating.com'),
  title: 'Ridgeline Boating Center — Central Florida Marine Sales & Service',
  description:
    'Family-owned marine sales and service in central Florida. New and pre-owned boats, motors, docks, lifts, and certified service in Lake Wales, FL.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${roboto.variable} ${robotoSlab.variable} ${archivo.variable}`}
      >
        <Header />
        <main>{children}</main>
        <ScrollReveal />
        <Footer />
        <div className='lg:hidden fixed bottom-0 inset-x-0 z-50'>
          <AskRusty fullWidth />
        </div>
      </body>
    </html>
  );
}
