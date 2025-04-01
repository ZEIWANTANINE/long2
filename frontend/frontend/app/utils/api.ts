const API_URL = "http://localhost:4000";

export const registerUser = async (userData: { name: string; email: string; password: string ;role:string}) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (userData: { email: string; password: string }) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};
export const getUsers = async (page: number = 1, limit: number = 10) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (!token) {
    throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
  }

  const res = await fetch(`${API_URL}/user/users?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
  });

  if (!res.ok) {
    throw new Error("Không thể lấy danh sách người dùng");
  }

  const data = await res.json();
  return {
    users: data.users || [], // Đảm bảo `users` luôn là một mảng
    totalPages: data.totalPages || 1,
  };
};
export const submitUserInfo = async (role: string, formData: any) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (!token) {
    throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
  }

  const res = await fetch(`${API_URL}/auth/add-${role.toLowerCase()}-info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Gửi token trong header
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error || "Không thể lưu thông tin. Vui lòng thử lại.");
  }

  return res.json(); // Trả về phản hồi từ server
};
export const createProduct = async (productData: { name: string; description: string; price: number; stock: number }) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  return res.json();
};

export const deleteProduct = async (id: number) => {
  const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
  return res.json();
};
