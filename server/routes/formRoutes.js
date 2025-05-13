const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.get("/", formController.getForms);
router.post("/", formController.createForm);
router.get("/:id", formController.getFormById);
router.post("/:id/responses", formController.submitResponse);

module.exports = router;
