// utils/withAuth.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "./auth";

export const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};