import { model, Schema, Document } from "mongoose";

export interface UserModelInterface {
  _id?: string; // from mongo db
  email: string;
  fullname: string;
  username: string;
  followers?: number;
  followings?: number;
  password: string;
  confirmHash: string;
  confirmed?: boolean;
  location?: string;
  born?: string;
  background?: string;
  avatar?: string;
  about?: string;
  website?: string;
  tweets?: string[] 
}

export type UserModelDocumentInterface = UserModelInterface & Document;

const UserSchema = new Schema<UserModelInterface>(
  {
    fullname: {
      required: true,
      type: String,
    },

    username: {
      unique: true,
      required: true,
      type: String,
    },
    email: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    confirmHash: {
      required: true,
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: Number,
      default: 0,
    },
    followings: {
      type: Number,
      default: 0,
    },
    location: String,
    about: String,
    born: String,
    avatar: String,
    background: String,
    website: String,
  },
  {
    timestamps: true,
  }
);

//* мидл вор для удаления некоторых свойств при обращении к схеме, чтобы мы никогда не прочитали пароль и конфирм хэш
UserSchema.set("toJSON", {
  transform(
    doc,
    ret: Partial<UserModelInterface>,
    options
  ): Partial<UserModelInterface> {
    delete ret.password;
    delete ret.confirmHash;
    return ret;
  },
});

export const UserModel = model<UserModelDocumentInterface>("user", UserSchema);
