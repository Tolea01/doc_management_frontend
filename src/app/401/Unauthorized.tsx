'use client';

import Button from '@components/buttons/Button';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="absolute inset-0 z-50 font-sans text-center bg-gradient-to-r from-[#2563eb] to-[#649fdb] bg-fixed text-white">
      <img
        src="https://images.plurk.com/5pHVCIyRNMdudWmVrrtQ.png"
        className="w-64 mx-auto pt-12"
      />
      <h1 className="font-light text-6xl my-4">Acces interzis</h1>
      <p className="text-4xl my-4">401 Unauthorized</p>
      <Button
        size="medium"
        value="Mergi la pagina de logare"
        variant="secondary"
        className="my-4"
        onClick={() => router.replace('/auth/login')}
      />
    </div>
  );
}
