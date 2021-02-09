import { model, Schema, Document } from "mongoose";
import { UserModelDocumentInterface, UserModelInterface } from "./UserModel";
import { mongoose } from "../core/db";
import { CommentModelInterface } from "./CommentModel";


export interface ILike {
  count: number;
  from: string[];
}

export interface TweetModelInterface {
  _id?: string; // from mongo db
  text: string;
  user: string | UserModelInterface;
  likes?: ILike;
  comments?: string[] | CommentModelInterface[];
  share?: number;
  repost?: number;
  images?: string[];
}

export type TweetModelDocumentInterface = TweetModelInterface & Document;

const TweetSchema = new Schema<TweetModelInterface>(
  {
    comments: [{
      ref: "comment", // тбалица с которой связь назыается user
      type: Schema.Types.ObjectId,
    }],
    likes: {
      count: {
        type: Number,
        default: 0,
      },
      from: {
        type: Array,
        default: [],
      },
    },
    share: {
      type: Number,
      default: 0,
    },
    repost: {
      type: Number,
      default: 0,
    },
    text: {
      required: true,
      type: String,
      maxlength: 280,
      minlength: 1,
    },
    images: [
      {
        type: String,
      },
    ],
    user: {
      required: true,
      ref: "user", // тбалица с которой связь назыается user
      type: Schema.Types.ObjectId, // благодаря этому связь между таблицами
    },
  },
  { timestamps: true, strict: false }
);

export const TweetModel = model<TweetModelDocumentInterface>(
  "Tweet",
  TweetSchema
);
