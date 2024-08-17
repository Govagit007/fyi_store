const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
// const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const products = require("./routes/productRoutes");
// const order = require("./routes/orderRoutes");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");

const app = express();

dotenv.config();
connectDB();

// Use cors middleware
app.use(
  cors({
    origin: "https://fyi-store.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Handle preflight requests
app.options("/*", cors());

//----routes
app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

app.use("/api/users", user);
app.use("/api/products", products);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`API is Running On http://localhost:${PORT}`)
);
