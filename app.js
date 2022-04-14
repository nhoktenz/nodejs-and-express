import express from "express";
import chalk from "chalk";
import Debug from "debug";
import morgan from "morgan";
import path from "path";
import sessionRouter from "./src/routers/sessionsRouter.js";
import adminRouter from "./src/routers/adminRouter.js";

// const { default: sessions } = await import('./src/data/sessions.json', {
//     assert: {
//       type: 'json'
//     }
//   });

const PORT = process.env.PORT || 5000;
const debug = Debug("app");
const app = express();
//const sessionRouter = require('./src/routers/sessionRouter');

app.use(morgan("tiny"));
app.use(express.static("public"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/sessions", sessionRouter);
app.use("admin", adminRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Globomantics", data: ["a", "b", "c"] });
});

app.listen(5000, () => {
  debug(`Listening on port  ${chalk.green(PORT)}`);
});
