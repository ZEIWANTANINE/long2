const jwt = require("jsonwebtoken");
const { prisma } = require("../config/db");// phai co {} thi prisma ms fetch dc

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization header không tồn tại hoặc không hợp lệ");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  try {
    // Giải mã token để lấy userId
    const decoded = jwt.decode(token);
    console.log("Decoded token:", decoded);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: "Token không hợp lệ" });
    }

    // Truy vấn cơ sở dữ liệu để lấy JWT_SECRET của người dùng
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(401).json({ error: "Người dùng không tồn tại" });
    }

    // Xác thực token với JWT_SECRET của người dùng
    jwt.verify(token, user.jwtSecret);
    console.log("Token hợp lệ");

    // Lưu thông tin user vào request
    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    console.log("Lỗi xác thực token:", error.message);
    return res.status(401).json({ error: "Token không hợp lệ" });
  }
};

module.exports = authMiddleware;