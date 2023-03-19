import fs from "fs";
import formidable from "formidable";
import path from "path";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    export interface Request {
      form: {
        fields: formidable.Fields;
        files: formidable.Files;
      };
    }
  }
}

// create folder if does not exists
const uploadDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadDir, { recursive: true });

let fileCounter = 0;
const form = formidable({
  uploadDir,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: (part) => part.mimetype?.startsWith("image/") || false,
  filename: (originalName, originalExt, part, form) => {
    fileCounter++;
    const fieldName = part.name;
    const timestamp = Date.now();
    const ext = part.mimetype?.split("/").pop();
    return `${fieldName}-${timestamp}-${fileCounter}.${ext}`;
  },
});

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({ message: "cannot upload file" });
      return;
    }
    req.form = { fields, files };
    next();
  });
};