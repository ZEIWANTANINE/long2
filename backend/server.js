const express = require('express');
const app = express();
const PORT = 4000;
const { connectDB } = require('./config/db');
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.get('/', (req, res) => {
    res.send('Server đang chạy!');
});
// Middleware để xử lý JSON
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
const listEndpoints = require('express-list-endpoints');

console.log('Các route hiện có trong server:');
console.table(listEndpoints(app));

// Chạy server
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
