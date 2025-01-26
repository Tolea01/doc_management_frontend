import '@app/globals.scss';
import Sidebar from '@components/sidebar/Sidebar';
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
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <main className="main-content">
            <div className="min-h-screen fixed top-0 z-10">
              <Sidebar />
            </div>
            <div className="page-content">{children}</div>
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
              duration={2000}
            />
          </main>
        </Providers>
      </body>
    </html>
  );
}
