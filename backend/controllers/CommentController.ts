import express from "express";
import mongoose from "mongoose";

import { TweetModel } from "../models/TweetModel";
import { isValidObjectId } from "../utils/isValidObject";
import {
  UserModelDocumentInterface,
  UserModelInterface,
} from "../models/UserModel";
import { CommentModelInterface, CommentModel } from "../models/CommentModel";

class CommentController {
  async show(
    req: express.Request & { query: { page: number } },
    res: express.Response
  ): Promise<void> {
    try {
      const user = req.user as UserModelInterface;
      if (!user._id) {
        res.status(403).send();
        return;
      }
      const commentId = req.params.id;

      if (!isValidObjectId(commentId)) {
        res.status(400).send();
        return;
      }
      const comment = await CommentModel.findById(commentId).populate("user");

      if (!comment) {
        res.status(404).send();
      }
      res.status(200).json({
        status: "success",
        data: comment,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async add(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const user = req.user as UserModelInterface;
      if (!user._id) {
        res.status(403).send();
        return;
      }
      const data: CommentModelInterface = {
        user: user._id,
        whoAnswer: req.body.whoAnswer,
        images: req.body.images || null,
        text: req.body.text,
        tweet: req.body.tweetId,
      };
      const comment = await CommentModel.create(data);
      if (!comment) {
        res.status(400).send();
        return;
      }
      console.log(comment, "comment");
      res.status(201).json({
        status: "success",
        data: await comment.populate("user").populate("whoAnswer").execPopulate(),
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async remove(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const user = req.user as UserModelInterface;
      if (!user._id) {
        res.status(403).send();
        return;
      }
      const commentId = req.params.id;

      if (!isValidObjectId(commentId)) {
        res.status(400).send();
        return;
      }
      const comment = await CommentModel.findById(commentId);

      if (!comment) {
        res.status(404).send();
      }
      if (user._id.toString() !== comment?.user.toString()) {
        res.status(403).send(); // не удалить чужой коммент
        return;
      }
      comment.remove()
      res.json({ status: "success" });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelInterface;
      if (!user._id) {
        res.status(403).send();
        return;
      }
      const commentId = req.params.id;
      const text = req.body.text;
      const images = req.body.images;

      if (!isValidObjectId(commentId)) {
        res.status(400).send();
        return;
      }
      const comment = await CommentModel.findById(commentId);

      if (!comment) {
        res.status(404).send();
      }
      if (user._id.toString() !== comment?.user.toString()) {
        res.status(403).send(); // не удалить чужой коммент
        return;
      }
      if (text) {
        comment.text = text;
      }
      if (images) {
        comment.images = images;
      }
      comment.save();
      res.json({ status: "success", data: comment });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async like(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = (req.user as UserModelInterface)?._id;
      const commentId = req.body.id;
      if (!userId) {
        res.status(403).send();
        return;
      }
      if (!isValidObjectId(commentId)) {
        res.status(400).send();
        return;
      }
      const comment = await CommentModel.findById(commentId).exec();

      if (!comment) {
        res.status(404).send();
        return;
      }
      if (comment.likes!.from.includes(userId!.toString())) {
        comment.likes!.count -= 1;
        comment.likes!.from = comment.likes!.from.filter(
          (id) => id.toString() !== userId.toString()
        );
      } else {
        comment.likes!.count += 1;
        comment.likes!.from.push(userId!);
      }
      comment.save();

      res.json({
        status: "success",
        data: comment,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.toString(),
      });
    }
  }


}

export const CommentCtrl: CommentController = new CommentController();








