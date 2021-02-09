import express from "express";
import { cloudinary } from "../core/cloudinary";

class UploadFileController {
  async index(req: express.Request, res: express.Response): Promise<void> {
    const { file } = req;
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error || !result) {
          return res.status(500).json({
            status: "error",
            message: error || "upload error",
          });
        }
        res
          .status(201)
          .json({
            url: result.url,
            size: ~~(result.bytes / 1024),
            width: result.width,
            height: result.height,
          });
      })
      .end(file.buffer);
  }
}
export const UploadFileCtrl = new UploadFileController();
