"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function OAuthErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");
  const message = searchParams.get("message");

  const description = (() => {
    if (errorCode === "4003") {
      return "OAuth 인증에 실패했습니다. 다시 시도해 주세요.";
    }
    return message || "알 수 없는 오류가 발생했습니다.";
  })();

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-xl font-semibold text-gray-900">로그인 실패</h1>
        <p className="mt-3 text-sm text-gray-700">{description}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          홈으로 이동
        </button>
      </section>
    </main>
  );
}

export default function OAuthErrorPage() {
  return (
    <Suspense fallback={<main className="min-h-screen flex items-center justify-center">로딩 중...</main>}>
      <OAuthErrorContent />
    </Suspense>
  );
}
