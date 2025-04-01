"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Đăng nhập thành công!</h1>
        <p className="text-gray-700 mb-6">Chào mừng bạn đến với hệ thống của chúng tôi.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => router.push("/dashboard")}
        >
          Đi đến trang chủ
        </button>
      </div>
    </div>
  );
}