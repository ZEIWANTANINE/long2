"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserInfoPage() {
  const [role, setRole] = useState(""); // Vai trò của người dùng
  const [formData, setFormData] = useState<any>({}); // Dữ liệu form
  const [error, setError] = useState("");
  const router = useRouter();

  // Lấy vai trò người dùng từ localStorage hoặc API
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    if (!userRole) {
      alert("Bạn chưa đăng nhập!");
      router.push("/login");
      return;
    }
    setRole(userRole);
  }, [router]);

  // Xử lý khi người dùng thay đổi giá trị trong form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gửi dữ liệu đến backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:4000/auth/add-${role.toLowerCase()}-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Không thể lưu thông tin. Vui lòng thử lại.");
      }

      alert("Thông tin đã được lưu thành công!");
      router.push("/dashboard"); // Chuyển hướng đến trang dashboard
    } catch (err: any) {
      console.error("Lỗi khi lưu thông tin:", err);
      setError(err.message || "Đã xảy ra lỗi.");
    }
  };

  // Hiển thị form dựa trên vai trò
  const renderFormFields = () => {
    switch (role) {
      case "ADMIN":
        return (
          <>
            <label className="block mb-2">
              Tên quản trị viên:
              <input
                type="text"
                name="sTenQuanTriVien"
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Quyền hạn:
              <input
                type="text"
                name="sQuyenHan"
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
          </>
        );
      case "TEACHER":
        return (
          <>
            <label className="block mb-2">
              Tên giảng viên:
              <input
                type="text"
                name="sTenGiangVien"
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Khoa:
              <input
                type="text"
                name="sKhoa"
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Chức vụ:
              <input
                type="text"
                name="sChucVu"
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
          </>
        );
      case "RESEARCHER":
        return (
          <>
            <label className="block mb-2">
              Tên nhà nghiên cứu:
              <input
                type="text"
                name="sTenNhaNghienCuu"
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Đơn vị công tác:
              <input
                type="text"
                name="sDonViCongTac"
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
            <label className="block mb-2">
              Chức vụ:
              <input
                type="text"
                name="sChucVu"
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
              />
            </label>
          </>
        );
      default:
        return <p>Không xác định được vai trò của bạn.</p>;
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Nhập thông tin người dùng</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderFormFields()}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Lưu thông tin
        </button>
      </form>
    </div>
  );
}