import '@app/globals.scss';
import { SITE_NAME } from '@constants/seo.constants';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import Providers from './providers';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  style: ['normal'],
});

export const metadata: Metadata = {
  title: SITE_NAME,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster
            toastOptions={{
              classNames: {
                error: 'toast danger',
                success: 'toast success',
                warning: 'toast warning',
                info: 'toast info',
              },
            }}
            theme="light"
            position="top-center"
            duration={1500}
          />
        </Providers>
      </body>
    </html>
  );
}
