const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");
const authController = require("../controllers/authController");

// Protéger toutes les routes avec authentification
router.use(authController.ensureLoggedIn);

// Routes CRUD pour les cours
router.get("/", coursesController.index, coursesController.indexView);
router.get("/new", coursesController.new);
router.post("/create", coursesController.validate, coursesController.create, coursesController.redirectView);
router.get("/:id", coursesController.show, coursesController.showView);
router.get("/:id/edit", coursesController.edit);
router.put("/:id/update", coursesController.update, coursesController.redirectView);
router.delete("/:id/delete", coursesController.delete, coursesController.redirectView);

module.exports = router;
