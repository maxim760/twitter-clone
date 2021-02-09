import express from "express";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { UserModel, UserModelInterface } from "../models/UserModel";
import { generateMD5 } from "../utils/generateHash";
import { transport } from "../core/mailer";
import { UserModelDocumentInterface } from "../models/UserModel";

import { SentMessageInfo } from "nodemailer/lib/sendmail-transport";
import { sendEmail } from "../utils/sendEmail";
import { isValidObjectId } from "../utils/isValidObject";

interface DataInterface {
  email: string;
  fullname: string;
  username: string;
  confirmHash: string;
  password: string;
}

class UserController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const users = await UserModel.find({}).exec(); // найти и вернуть всех пользоватеелй
      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: JSON.stringify(error),
      });
    }
  }
  async getLastUsers(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { count } = req.query
      if (!count) {
        res.status(404).send()
        return
      }
      const users = await UserModel.find({}).sort({createdAt:-1}).limit(5).exec() // найти и вернуть всех пользоватеелй
      res.json({
        status: "success",
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: JSON.stringify(error),
      });
    }
  }
  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = req.params.id;

      if (!isValidObjectId(userId)) {
        res.status(400).send();
        return;
      }

      const user = await UserModel.findById(userId).exec();
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "Пользователь не найден",
        });
        return;
      }

      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async showByUsername(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const username = req.params.username;
      const user = await UserModel.findOne({ username }).exec();
      if (!user) {
        res.status(404).json({
          status: "error",
          message: "Пользователь не найден",
        });
        return;
      }
      res.json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: "error", message: errors.array() });
        return;
      }

      const data: DataInterface = {

        email: req.body.email,
        username: req.body.username,
        fullname: req.body.fullname,
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
        confirmHash: generateMD5(
          process.env.SECRET_KEY + req.body.username ||
            (Math.random() * 1e32).toString(36)
        ),
      };
      const user = await UserModel.create(data);

      sendEmail(
        {
          // emailFrom: "maks.tomanov@mail.ru",
          emailTo: data.email,
          subject: "Подтверждение почты Twitter Clone",
          html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:${
            process.env.PORT || 8888
          }/auth/verify?hash=${
            data.confirmHash
          }">по этой ссылке</a>.<br>Если вы сейчас не регистрировались в twitter clone, то проигнорируйте данное сообщение.`,
        },
        (err: Error | null, info: SentMessageInfo) => {
          if (err) {
            res.status(500).json({
              status: "error",
              message: err,
            });
          } else {
            res.status(201).json({ status: "success", data: user });
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: "error", message: error });
    }
  }
  async setAvatar(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelInterface;
      const url = req.body.avatar;
      if (user._id) {
        const id = user._id;
        const findedUser = await UserModel.findById(id).exec(); // найти и вернуть всех пользоватеелй
        if (findedUser) {
          findedUser.avatar = url;
          findedUser.save();
          res.status(200).json({
            status: "success",
          });
        } else {
          res.status(404).send({
            status: "error",
            message: "Пользователь не найден",
          });
        }
      } else {
        res
          .status(403)
          .json({ status: "error", message: "Пользователь не авторизован" });
      }
    } catch (error) {
      res.status(500).json({status:"error", message: error})
    }
  }
  async setBg(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelInterface;
      const url = req.body.bg;
      if (user._id) {
        const id = user._id;
        const findedUser = await UserModel.findById(id).exec(); // найти и вернуть всех пользоватеелй
        if (findedUser) {
          findedUser.background = url;
          findedUser.save();
          res.status(200).json({
            status: "success",
          });
        } else {
          res.status(404).send({
            status: "error",
            message: "Пользователь не найден",
          });
        }
      } else {
        res
          .status(403)
          .json({ status: "error", message: "Пользователь не авторизован" });
      }
    } catch (error) {
      res.status(500).json({status:"error", message: error})
    }
  }
  async setEdit(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelInterface;
      const {avatar, background, website, fullname, about, location, birthday} = req.body;
      if (user._id) {
        const id = user._id;
        const findedUser = await UserModel.findById(id).exec(); // найти и вернуть всех пользоватеелй
        if (findedUser) {
          if (avatar) {
            findedUser.avatar = avatar;   
          }
          if (background) {
            findedUser.background = background;   
          }
          if (website) {
            findedUser.website = website;   
          }
          if (fullname) {
            findedUser.fullname = fullname;   
          }
          if (about) {
            findedUser.about = about;   
          }
          if (location) {
            findedUser.location = location;   
          }
          if (birthday) {
            findedUser.born = birthday;   
          }
          findedUser.save();
          res.status(200).json({
            status: "success",
          });
        } else {
          res.status(404).send({
            status: "error",
            message: "Пользователь не найден",
          });
        }
      } else {
        res
          .status(403)
          .json({ status: "error", message: "Пользователь не авторизован" });
      }
    } catch (error) {
      res.status(500).json({status:"error", message: error})
    }
  }

  async verify(req: express.Request, res: express.Response): Promise<void> {
    try {
      const hash = <string>req.query.hash;
      if (!hash) {
        res.status(400).send();
        return;
      }
      const user = await UserModel.findOne({ confirmHash: hash }).exec(); // найти и вернуть всех пользоватеелй
      if (user) {
        user.confirmed = true;
        user.save();
        res.json({
          status: "success",
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "Пользователь не найден",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: JSON.stringify(error),
      });
    }
  }

  async afterLogin(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user
        ? (req.user as UserModelDocumentInterface).toJSON()
        : undefined;
      res.json({
        status: "success",
        data: {
          ...user, // уже после toJSON()
          token: jwt.sign(
            { data: req.user },
            process.env.SECRET_KEY as string,
            { expiresIn: "30d" }
          ),
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: JSON.stringify(error),
      });
    }
  }

  async getUserInfo(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      res.json({
        status: "success",
        data: req.user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: JSON.stringify(error),
      });
    }
  }
}

export const UserCtrl: UserController = new UserController();
