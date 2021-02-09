import express from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { TweetModel, TweetModelInterface } from "../models/TweetModel";
import { isValidObjectId } from "../utils/isValidObject";
import { UserModelInterface } from "../models/UserModel";

class TweetsController {
  async index(
    req: express.Request & { query: { page: number } },
    res: express.Response
  ): Promise<void> {
    try {
      const page = req.query.page;
      const tweets = await TweetModel.find({})
        .populate("user")
        .populate("comments")
        .sort({ createdAt: "-1" })
        .skip(15 * (page - 1))
        .limit(15)
        .exec(); // найти и вернуть всех пользоватеелй
      res.json({
        status: "success",
        data: tweets,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.toString(),
      });
    }
  }
  async like(req: express.Request, res: express.Response): Promise<void> {
    try {
      const userId = (req.user as UserModelInterface)?._id;
      const tweetId = req.body.id;
      if (!userId) {
        res.status(403).send();
        return;
      }
      if (!isValidObjectId(tweetId)) {
        res.status(400).send();
        return;
      }
      const tweet = await TweetModel.findById(tweetId).exec();

      if (!tweet) {
        res.status(404).send();
        return;
      }
      if (tweet.likes!.from.includes(userId!.toString())) {
        tweet.likes!.count -= 1;
        tweet.likes!.from = tweet.likes!.from.filter(
          (id) => id.toString() !== userId.toString()
        );
      } else {
        tweet.likes!.count += 1;
        tweet.likes!.from.push(userId!);
      }
      tweet.save();

      res.json({
        status: "success",
        data: tweet,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.toString(),
      });
    }
  }
  async indexByQuery(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const text = <string>req.query.q;
      console.log(text);
      if (text) {
        const tweets = await TweetModel.find({
          text: { $regex: text, $options: "i" },
        })
          .populate("user")
          .populate("comments")
          .sort({ createdAt: "-1" })
          .exec();
        res.json({
          status: "success",
          data: tweets,
        });
        return;
      } else {
        res.status(404).json({
          status: "error",
          message: "Запрос не получен",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.toString(),
      });
    }
  }
  async indexForUser(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    try {
      const id = <string>req.query.id;

      if (id) {
        const tweets = await TweetModel.find({ user: id })
          .populate("user")
          .populate("comments")
          .sort({ createdAt: "-1" })
          .exec();
        console.log(tweets);
        res.json({
          status: "success",
          data: tweets,
        });
      } else {
        res.status(403).json({
          status: "error",
          message: "Не авторизован",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.toString(),
      });
    }
  }
  async show(req: express.Request, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.id;
      if (!isValidObjectId(tweetId)) {
        res.status(400).send();
        return;
      }

      const tweet = await TweetModel.findById(tweetId)
      .populate("user")
      .populate([{ path: 'comments', populate: [{ path: 'whoAnswer' },{ path: 'user' }]}])
        .exec();
      console.log(tweet);
      if (!tweet) {
        res.status(404).json({
          status: "error",
          message: "Твит не найден",
        });
        return;
      }

      res.json({
        status: "success",
        data: tweet,
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
      const user = req.user as UserModelInterface;
      if (user?._id) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).json({ status: "error", message: errors.array() });
          return;
        }
        const data: TweetModelInterface = {
          user: user._id,
          text: req.body.text,
          images: req.body.images,
        };

        const tweet = await TweetModel.create(data);
        if (!user.tweets) {
          user.tweets = [];
        }
        user.tweets.push(tweet._id);
        res.status(201).json({
          status: "success",
          data: await tweet.populate("user").execPopulate(),
        });
      }
    } catch (error) {
      console.log("errroror", error);
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async addComment(req: express.Request, res: express.Response): Promise<void> {
    try {
      const user = req.user as UserModelInterface;
      if (user?._id) {
        const tweetId = req.body.tweetId;
        const commentId = req.body.commentId;

        const tweet = await TweetModel.findById(tweetId);
        console.log("tweet", tweet);
        if (tweet) {
          if (!tweet.comments) {
            tweet.comments = [];
          }
          tweet.comments.push(commentId);
          console.log(tweet);
          tweet.save();
          res.status(201).json({
            status: "success",
            data: await tweet
              .populate("user")
              .populate("comments")
              .execPopulate(),
          });
        }
      }
    } catch (error) {
      console.log("errroror", error);
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      // try catch для отлавливания ошибок await
      const user = req.user as UserModelInterface;
      if (user) {
        const tweetId = req.params.id;
        if (!isValidObjectId(tweetId)) {
          res.status(400).json({ status: "error" });
          return;
        }
        const tweet = await TweetModel.findById(tweetId);
        if (tweet) {
          if (tweet.user.toString() === user._id?.toString()) {
            tweet.remove();

            res.json({ status: "success" });
          } else {
            res.status(403).json({ status: "error" }); // владелец твита не я
          }
        } else {
          res.status(404).json({ status: "error" });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
  async update(req: express.Request, res: express.Response): Promise<void> {
    try {
      // try catch для отлавливания ошибок await
      const user = req.user as UserModelInterface;
      if (user) {
        const tweetId = req.params.id;
        if (!isValidObjectId(tweetId)) {
          res.status(400).send();
          return;
        }
        const tweet = await TweetModel.findById(tweetId);
        if (tweet) {
          if (tweet.user.toString() === user._id?.toString()) {
            tweet.text = req.body.text;
            tweet.save();
            res.json({
              status: "success",
              data: tweet,
            });
          } else {
            res.status(403).send(); // владелец твита не я
          }
        } else {
          res.status(404).send();
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}

export const TweetsCtrl: TweetsController = new TweetsController();
