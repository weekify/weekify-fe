"use client";

import { useState } from "react";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
}

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = () => {
    const apiBaseUrl = getApiBaseUrl();
    window.location.href = `${apiBaseUrl}/oauth2/authorization/google`;
  };

  const handleRefresh = async () => {
    const response = await fetch(`${getApiBaseUrl()}/open-api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      setMessage("토큰 갱신 성공");
      return;
    }

    setMessage("토큰 갱신 실패");
  };

  const handleLogout = async () => {
    const response = await fetch(`${getApiBaseUrl()}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setMessage(response.ok ? "로그아웃 완료" : "로그아웃 실패");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Weekify OAuth 데모</h1>
        <p className="mt-2 text-sm text-gray-600">
          Google OAuth 로그인/토큰 갱신/로그아웃 흐름을 확인할 수 있습니다.
        </p>

        <div className="mt-6 grid gap-3">
          <button
            onClick={handleLogin}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
          >
            Google 로그인
          </button>

          <button
            onClick={handleRefresh}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900"
          >
            토큰 갱신
          </button>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900"
          >
            로그아웃
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
      </section>
    </main>
  );
}
