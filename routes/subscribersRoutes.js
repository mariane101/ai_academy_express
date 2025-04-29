const express = require("express");
const router = express.Router();
const subscribersController = require("../controllers/subscribersController");
const authController = require("../controllers/authController");

// Protéger toutes les routes avec authentification
router.use(authController.ensureLoggedIn);

// Routes CRUD pour les abonnés
router.get("/", subscribersController.index, subscribersController.indexView);
router.get("/new", subscribersController.new);
router.post("/create", subscribersController.validate, subscribersController.create, subscribersController.redirectView);
router.get("/:id", subscribersController.show, subscribersController.showView);
router.get("/:id/edit", subscribersController.edit);
router.put("/:id/update", subscribersController.update, subscribersController.redirectView);
router.delete("/:id/delete", subscribersController.delete, subscribersController.redirectView);

module.exports = router;
