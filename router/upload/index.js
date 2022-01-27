import express from "express";
import logger from "../../config/logging.js";
import busboy from "busboy";
import path from "path";
import fs from "fs";

const router = express.Router();

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
    logger.log("info", "Starting file upload");
    const saveTo = path.join(filePath, `busboy-upload-${info.filename}`);
    file.pipe(fs.createWriteStream(saveTo));
  });
  bb.on("error", function (err) {
    logger.log("error", `Error in file upload: ${err}`);
  });
  bb.on("close", () => {
    res.status(200).send(`Success`);
    logger.log("info", "Finished file upload");
  });
  req.pipe(bb);
});

export default router;
