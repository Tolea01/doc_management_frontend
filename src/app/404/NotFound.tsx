'use client';

import Button from '@components/buttons/Button';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="grid h-screen place-content-center bg-gradient-to-r from-[#2563eb] to-[#649fdb] bg-fixed text-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <p className="text-2xl font-bold tracking-tight sm:text-4xl">Pagina nu există!</p>
        <Button
          size="medium"
          value="Înapoi"
          variant="secondary"
          className="my-4"
          onClick={() => router.back()}
        />
      </div>
    </div>
  );
}
