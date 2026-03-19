const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error.middleware");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

/* Requier Routes */
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");


/* Using Routes */
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
