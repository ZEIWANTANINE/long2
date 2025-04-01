const jwt = require("jsonwebtoken");
const { prisma } = require("../config/db");// phai co {} thi prisma ms fetch dc

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Giải mã token để lấy userId (không xác thực chữ ký ở bước này)
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: "Token không hợp lệ" });
    }

    // Truy vấn cơ sở dữ liệu để lấy jwtSecret của người dùng
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(401).json({ error: "Người dùng không tồn tại" });
    }

    // Xác thực token bằng jwtSecret của người dùng
    jwt.verify(token, user.jwtSecret);

    // Gắn thông tin người dùng vào request
    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    console.error("Lỗi xác thực:", error);
    return res.status(401).json({ error: "Token không hợp lệ" });
  }
};
module.exports = authMiddleware;