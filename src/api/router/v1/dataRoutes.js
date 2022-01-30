import express from "express";
import logger from "../../config/logging.js";
import busboy from "busboy";
import path from "path";
import fs from "fs";

// IRRELEVANT TO OTHER ROUTES, SOLELY FOR TESTING OUT LARGE UPLOADS/READS

const router = express.Router();

router.get("/data", function (req, res) {
  const filePath = "./files/generateText.md";
  const src = fs.createReadStream(filePath);
  src.on("open", function () {
    src.pipe(res);
  });
  src.on("error", function (err) {
    logger.log("error", err);
    res.end(err);
  });
});

router.get("/upload", function (req, res) {
  res.status(200).send(`
      <html>
        <head></head>
        <body>
          <form method="POST" enctype="multipart/form-data">
            <input type="file" name="filefield"><br />
            <input type="submit">
          </form>
        </body>
      </html>
    `);
});

router.post("/upload", function (req, res) {
  const filePath = "./files";
  const bb = busboy({ headers: req.headers });
  bb.on("file", (name, file, info) => {
    const saveTo = path.join(filePath, `busboy-upload-${info.filename}`);
    file.pipe(fs.createWriteStream(saveTo));
  });
  bb.on("error", function (err) {
    logger.error(err);
  });
  bb.on("close", () => {
    res.status(200).send(`Success`);
  });
  req.pipe(bb);
});

export default router;
