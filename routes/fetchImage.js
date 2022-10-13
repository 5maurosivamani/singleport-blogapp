const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/:img_name", (req, res) => {
  const pathArray = __dirname.split("/");
  const newPathArray = pathArray.splice(0, pathArray.length - 1);
  const newPath = newPathArray.join("/");
  var imagePath = newPath + "/public/images/" + req.params.img_name;

  if (fs.existsSync(imagePath)) {
    res.send(imagePath);
  } else {
    res.json({ status: 404, imagePath });
  }
});

module.exports = router;
