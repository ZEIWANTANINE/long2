"use client";
import { useState } from "react";
import { loginUser } from "../app/utils/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password }); // Gọi API đăng nhập
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role); // Lưu role vào localStorage

        // Điều hướng dựa trên vai trò
        if (data.role === "ADMIN") {
          router.push("/admin/user"); // Chuyển hướng đến trang quản trị
        } else {
          router.push("/home"); // Chuyển hướng đến trang người dùng thông thường
        }
      } else {
        alert("Sai email hoặc mật khẩu!");
      }
    } catch (error) {
      alert("Đăng nhập thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Nghiên Cứu Khoa Học</h2>
        <p className="text-center text-gray-600 mb-4">Đăng nhập để tiếp tục</p>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Mật khẩu</label>
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}