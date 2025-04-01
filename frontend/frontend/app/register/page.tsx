"use client";
import { useState } from "react";
import { registerUser } from "../utils/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("RESEARCHER");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, role });
      localStorage.setItem("role", role); // Lưu role vào localStorage
    
      alert("Đăng ký thành công!");
      router.push("/info");
    } catch (error) {
      alert("Đăng ký thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Hệ Thống Nghiên Cứu Khoa Học</h2>
        <p className="text-center text-gray-600 mb-4">Tạo tài khoản để bắt đầu</p>
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tên</label>
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Nhập tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div>
            <label className="block text-gray-700 font-medium mb-2">Vai trò</label>
            <select
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="TEACHER">Giảng viên</option>
              <option value="RESEARCHER">Nhà nghiên cứu</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Đăng ký
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Đã có tài khoản?{" "}
          <a href="/info" className="text-blue-500 hover:underline">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
}
