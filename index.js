require("dotenv").config({
  path: `.env`,
});

const cloudinary = require("cloudinary").v2;
const express = require("express");
const app = express();
const cors = require("cors");
const fileupload = require("express-fileupload");
const port = 8000;

app.use(cors());
app.options("*", cors());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.post("/upload", (req, res) => {
  const file = req.files.photo;
  console.log(file);
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.url);
      return res.json({
        success: 1,
        file: {
          url: result.url,
        },
      });
    }
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
