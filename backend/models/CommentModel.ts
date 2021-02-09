import { model, Schema, Document } from "mongoose";
import { UserModelDocumentInterface, UserModelInterface } from "./UserModel";
import { mongoose } from "../core/db";
import { ILike, TweetModelInterface } from "./TweetModel";

export interface CommentModelInterface {
  _id?: string; // from mongo db
  user: UserModelInterface | string;
  tweet: TweetModelInterface | string;
  text: string;
  images?: string[];
  whoAnswer: UserModelInterface | string;
  likes?: ILike;
}

export type CommentModelDocumentInterface = CommentModelInterface & Document;

const CommentSchema = new Schema<CommentModelInterface>(
  {
    whoAnswer: {
      required: true,
      ref: "user",
      type: Schema.Types.ObjectId,
    },
    user: {
      required: true,
      ref: "user",
      type: Schema.Types.ObjectId,
    },
    tweet: {
      required: true,
      ref: "tweet",
      type: Schema.Types.ObjectId,
    },
    text: {
      required: true,
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
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
  },
  { timestamps: true }
);

export const CommentModel = model<CommentModelDocumentInterface>(
  "comment",
  CommentSchema
);
