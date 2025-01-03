'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const withAuth = (Component: React.ComponentType<any>, allowedRoles: string[]) => {
  return (props: any) => {
    const { role, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !allowedRoles.includes(role || '')) {
        router.push('/403');
      }
    }, [role, loading]);

    if (loading) return <p>Loading...</p>;

    return <Component {...props} />;
  };
};

export default withAuth;
