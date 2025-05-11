const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/articleController");
const Article = require("../models/Article");

router.post("/", auth, controller.create);
router.get("/", controller.readAll);
router.get("/:id", controller.readOne);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, controller.delete);

module.exports = router;
