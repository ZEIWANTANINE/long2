const { sql } = require('../config/db');
const bcrypt = require('bcryptjs');

async function createUser(username, password, role, uniqueId, userData) {
    const hashedPassword = await bcrypt.hash(password, 10);
    let query = "";
    let request = new sql.Request();

    if (role === "sinhvien") {
        query = `INSERT INTO SinhVien (sMaSinhVien, sTenSinhVien, sEmail, sNganhHoc, sNienKhoa, sMaTrinhDoHocVan, sUsername, sPassword)
                 VALUES (@uniqueId, @ten, @email, @nganhHoc, @nienKhoa, @trinhDo, @username, @password)`;
    } else if (role === "giangvien") {
        query = `INSERT INTO GiangVien (sMaGiangVien, sTenGiangVien, sChucVu, sKhoa, sDonViCongTac, sMaTrinhDoHocVan, sGioiTinh, sUsername, sPassword)
                 VALUES (@uniqueId, @ten, @chucVu, @khoa, @donVi, @trinhDo, @gioiTinh, @username, @password)`;
    } else if (role === "nhanguyencuu") {
        query = `INSERT INTO NhaNghienCuu (sMaNhaNghienCuu, sTenNhaNghienCuu, sEmail, sDonViCongTac, sMaTrinhDoHocVan, sUsername, sPassword)
                 VALUES (@uniqueId, @ten, @email, @donVi, @trinhDo, @username, @password)`;
    } else {
        throw new Error("Vai trò không hợp lệ!");
    }

    request.input('username', sql.NVarChar, username);
    request.input('password', sql.NVarChar, hashedPassword);
    request.input('uniqueId', sql.NVarChar, uniqueId);
    request.input('ten', sql.NVarChar, userData.ten);
    request.input('email', sql.NVarChar, userData.email || null);
    request.input('nganhHoc', sql.NVarChar, userData.nganhHoc || null);
    request.input('nienKhoa', sql.NVarChar, userData.nienKhoa || null);
    request.input('trinhDo', sql.NVarChar, userData.trinhDo || null);
    request.input('chucVu', sql.NVarChar, userData.chucVu || null);
    request.input('khoa', sql.NVarChar, userData.khoa || null);
    request.input('donVi', sql.NVarChar, userData.donVi || null);
    request.input('gioiTinh', sql.NVarChar, userData.gioiTinh || null);

    await request.query(query);
}
