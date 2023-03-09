import "dotenv/config";
import "express-async-errors";
import express from "express";
import morgan from "morgan";

const app = express();

//db connection
import connectdb from "./db/connectdb.js";

//middlewares
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import notFoundMiddleware from "./middlewares/not-found.js";

//routes
import homeRoute from "./routes/homeRoute.js";
import ideaRoute from "./routes/ideaRoute.js";
import userRoute from "./routes/userRoute.js";
import commentRoute from "./routes/commentRoute.js";
import authRoute from "./routes/authRoute.js";

if (process.env.NODE_ENV !== "producction") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/home", homeRoute);
app.use("/api/v1/idea", ideaRoute);
app.use("/api/v1/comment", commentRoute);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectdb(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server listen on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
