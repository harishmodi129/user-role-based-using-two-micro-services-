const express = require("express");

const multer = require("multer");

const {
  UploadDocument,
  approveDocument,
} = require("../controller/documentController");

const authMiddleware = require("../middlewares/authMiddleware ");
const roleMiddelware = require("../middlewares/roleMiddleware");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",

  roleMiddelware("Role A"),
  upload.single("file"),
  UploadDocument
);
router.post(
  "/approve/:id",

  roleMiddelware("Role B"),
  approveDocument
);

module.exports = router;
