const express = require("express");
require("dotenv").config();
const cors = require("cors");
const dbConnect = require('./dbConnect')
const productRouter = require("./routes/productRoutes")
const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is runnning")
})

app.use("/api/products", productRouter);

dbConnect();

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})