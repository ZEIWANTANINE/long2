const sql = require('mssql');
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require('uuid');
const prisma = new PrismaClient();
// Cấu hình kết nối SQL Server
const dbConfig = {
    user: 'sa',                    // Thay bằng user của bạn
    password: 'Gino606188.',        // Thay bằng mật khẩu của bạn
    server: 'localhost',   
    port: 1433,   // Dùng '\\' hoặc 'MSI,1433'
    database: 'NCKH',               // Thay bằng database của bạn
    options: {
        encrypt: false,              // Đặt thành true nếu dùng Azure
        trustServerCertificate: true // Nếu bị lỗi chứng chỉ thì bật lên
    }
};
// Hàm kết nối cơ sở dữ liệu
async function connectDB() {
    try {
        await sql.connect(dbConfig);
        console.log('Kết nối SQL Server thành công!');
    } catch (err) {
        console.error('Lỗi kết nối SQL Server:', err);
    }
}
async function updateJwtSecrets() {
    const users = await prisma.user.findMany();
  
    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: { jwtSecret: uuidv4() }, // Tạo giá trị jwtSecret ngẫu nhiên
      });
    }
  
    console.log('Cập nhật jwtSecret thành công!');
  }
  
  updateJwtSecrets()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
// Xuất module để dùng trong file khác
module.exports = {
    sql,
    connectDB,
    prisma
};
