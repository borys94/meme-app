import express from "express";
import "express-async-errors";
import {json} from "body-parser";
import cors from "cors";

import {signUp} from "./routes/auth/signUp";
// import {getHighscore} from "./routes/user/getHighscore";
// import {addScore} from "./routes/user/addScore";
// import {requireAuth} from "./middlewares/requireAuth";
import {currentUser} from "./middlewares/currentUser";
import {errorHandler} from "./middlewares/errorHandler";

// import {setUserRole} from "./routes/admin/setUserRole";
// import {getUsers} from "./routes/admin/getUsers";

const app = express();

app.use(json());
app.use(cors({
  origin: true,
}));

app.use(currentUser);

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

// app.get("/admin/setUserRole", setUserRole);
// app.get("/admin/users", getUsers);

app.post("/auth/signUp", signUp);

// app.get("/user/scores", requireAuth, getHighscore);
// app.post("/user/scores", requireAuth, addScore);

app.use(errorHandler);

export {app};
