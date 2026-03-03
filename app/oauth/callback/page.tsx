"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-sm text-gray-700">로그인 처리 중...</p>
    </main>
  );
}
