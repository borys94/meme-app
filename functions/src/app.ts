import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import cors from "cors";

import {currentUser} from "./middlewares/currentUser";
import {errorHandler} from "./middlewares/errorHandler";

import {usersRouter} from "./routes/users";
import {authRouter} from "./routes/auth";
import {adminRouter} from "./routes/admin";

const app = express();

app.use(json());
app.use(cors({
  origin: true,
}));

app.get("status", (req, res) => {
  res.sendStatus(200);
});

app.use(currentUser);

app.use(adminRouter);
app.use(usersRouter);
app.use(authRouter);

app.use(errorHandler);

export {app};
