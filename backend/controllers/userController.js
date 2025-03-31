const {prisma} = require("../config/db");

exports.getUsers = async (req, res) => {
  
  try {
    console.log("Đang kết nối đến cơ sở dữ liệu...");
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    console.log("Danh sách người dùng:", users);
    res.json(users);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error.message);
    console.error("Chi tiết lỗi:", error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách người dùng" });
  }
};
