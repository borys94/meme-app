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
import {updateUser} from "./routes/admin/updateUser";
import {addTemplateRouter} from "./routes/admin/addTemplate";

const app = express();

app.use(json());
// app.use(bodyParser.text({type: '/'}));
app.use(cors({
  origin: true,
}));

app.use(currentUser);

app.use("/admin", addTemplateRouter);


// const upload = multer({
//   dest: 'uploads/'
// });
// app.post('/admin/templates', upload.single("image"), (req, res) => {
//   // const {fileBase64, title} = req.body;
//   console.log("-----------")
//   console.log(req.file)
// })


app.get("/status", (req, res) => {
  res.sendStatus(200);
});

// app.get("/admin/setUserRole", setUserRole);
app.post("/admin/users/:uid", updateUser);

// app.post("/admin/templates", addTemplate);

app.post("/auth/signUp", signUp);

// app.get("/user/scores", requireAuth, getHighscore);
// app.post("/user/scores", requireAuth, addScore);

app.use(errorHandler);

export {app};
