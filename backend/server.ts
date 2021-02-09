//* Для включения базы данных надо в mongodb/bin зайти и в cmd: mongod.exe --dbpath c:\data\db *\\
// подлкючаем базу данных и dotenv
import dotenv from "dotenv";
dotenv.config();
//* надо в самом начале dotebv
import path from "path";
import "./core/db";
import express from "express";
import flash from "connect-flash";
import session from "express-session";
import { UserCtrl } from "./controllers/UserController";
import { registerValidation } from "./validations/register";
import { passport } from "./core/passport";
import { UserModel } from "./models/UserModel";
import { createTweetValidations } from "./validations/createTweet";
import { TweetsCtrl } from "./controllers/TweetsController";

import multer from "multer";
import { UploadFileCtrl } from "./controllers/UploadFileController";
import { CommentCtrl } from "./controllers/CommentController";

const PORT = process.env.PORT || 8888;

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve(path.resolve(), "uploads"))
//   },
//   filename: function (req, file, cb) {
//     const ext = file.originalname.split(".").pop()?.toLowerCase()
//     const name = `${file.fieldname}-${Date.now()}.${ext}`
//     cb(null, name )
//   }
// })

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const app = express();
app.use(passport.initialize());
app.use(express.json());

app.use(flash());

app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/users", UserCtrl.index);
app.get("/users/last", UserCtrl.getLastUsers);
app.get(
  "/users/me",
  passport.authenticate("jwt", { session: false }),
  UserCtrl.getUserInfo
); // доступ к себе имеют только авторизованые пользователи
app.get("/users/:id", UserCtrl.show);
app.post("/user/avatar", passport.authenticate("jwt"), UserCtrl.setAvatar);
app.post("/user/bg", passport.authenticate("jwt"), UserCtrl.setBg);
app.post("/user/edit", passport.authenticate("jwt"), UserCtrl.setEdit);
app.get("/user/:username", UserCtrl.showByUsername);

app.get("/tweets", TweetsCtrl.index);
app.get("/tweets/query", TweetsCtrl.indexByQuery);
app.get("/usertweet/tweets", TweetsCtrl.indexForUser);
app.get("/tweets/:id", TweetsCtrl.show);
app.delete("/tweets/:id", passport.authenticate("jwt"), TweetsCtrl.delete);
app.patch(
  "/tweets/:id",
  passport.authenticate("jwt"),
  createTweetValidations,
  TweetsCtrl.update
);
// сначала проверка на авторизацию
app.post(
  "/tweets",
  passport.authenticate("jwt"),
  createTweetValidations,
  TweetsCtrl.create
);
app.post(
  "/addComment",
  passport.authenticate("jwt"),
  TweetsCtrl.addComment
);
app.post(
  "/tweets/like",
  passport.authenticate("jwt"),
  TweetsCtrl.like
);

app.post("/auth/register", registerValidation, UserCtrl.create);
app.get("/auth/verify", UserCtrl.verify);
app.post(
  "/auth/login",
  function (req: express.Request, res: express.Response, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        res.status(401).json({ status: "error", message: info.message });
        return;
      }
      req.user = user;
      UserCtrl.afterLogin(req, res);
    })(req, res, next);
  }
);

app.post("/upload", upload.single("image"), UploadFileCtrl.index);

app.post("/comment", passport.authenticate("jwt"), CommentCtrl.add);
app.post("/comment/like", passport.authenticate("jwt"), CommentCtrl.like);
app.get("/comment/:id", passport.authenticate("jwt"), CommentCtrl.show);
app.patch("/comment/:id", passport.authenticate("jwt"), CommentCtrl.update);
app.delete("/comment/:id", passport.authenticate("jwt"), CommentCtrl.remove);

app.listen(PORT, (): void => {
  console.log("Server Runned on port " + PORT);
});
