import passport from "passport";

import { Strategy as JWTstrategy } from "passport-jwt";
import { ExtractJwt as ExtractJWT } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel, UserModelInterface } from "../models/UserModel";
import { generateMD5 } from "../utils/generateHash";

passport.use(
  new LocalStrategy(
    async (username, password, done): Promise<void> => {
      try {
        const user = await UserModel.findOne({
          $or: [{ email: username }, { username: username }],
        }).exec();
        if (!user) {
          // res.status(401)
          return done(null, false, { message: "Такого логина не существует" });
        }
        if (user.password !== generateMD5(password + process.env.SECRET_KEY)) {
          return done(null, false, {
            message: "Неправильный логин или пароль.",
          });
        }
        if (!user.confirmed) {
          return done(null, false, {
            message:
              "Аккаунт не подтвержден. Чтобы подтвердить, перейдите по ссылке, отправленной на e-mail.",
          });
        }
        return done(null, user);
      } catch (error) {
        
        return done(error, false);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (payload: { data: UserModelInterface }, done) => {
      
      try {
        const user = await UserModel.findById(payload.data._id).exec();
        if (user) {
          return done(null, user);
        }
        done(null, false);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.serializeUser((user: UserModelInterface, done) => {
  done(null, user?._id);
});

passport.deserializeUser((id, done) => {
  
  UserModel.findById(id, (err, user) => {
    done(err, user);
  });
});

export { passport };
