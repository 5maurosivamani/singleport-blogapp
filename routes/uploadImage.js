const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const path = require("path");

router.post("/", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  const blogImage = req.files.image;
  const extention = path.extname(blogImage.name);
  const imgList = [".png", ".jpg", ".jpeg", ".gif"];
  const blogImageName = req.body.imageName;
  const pathArray = __dirname.split("\\");
  const newPathArray = pathArray.splice(0, pathArray.length - 2);
  const newPath = newPathArray.join("\\");

  console.log(blogImage);

  var uploadPath =
    newPath + "/client/fitness_app/public/images/" + blogImageName;

  if (!imgList.includes(extention)) {
    res.status(500).send("Invalid file!");
  }
  await blogImage.mv(uploadPath, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send("File uploaded to " + uploadPath);
  });
});

module.exports = router;
