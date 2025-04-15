const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");

const app = express();

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/ai_academy");

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connexion réussie à MongoDB en utilisant Mongoose!");
});
db.on("error", err => {
  console.error("Erreur de connexion à MongoDB:", err);
});

// Configuration serveur
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Middlewares
app.use(layouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes principales
app.get("/", homeController.index);
app.get("/about", homeController.about);
app.get("/courses", homeController.courses);
app.get("/contact", homeController.contact);
app.post("/contact", homeController.processContact);

// Routes abonnés
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/subscribers/new", subscribersController.getSubscriptionPage);
app.post("/subscribers/create", subscribersController.saveSubscriber);
app.get("/subscribers/:id", subscribersController.show);

// Gestion des erreurs
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// Lancement du serveur
app.listen(app.get("port"), () => {
  console.log(`Le serveur a démarré sur http://localhost:${app.get("port")}`);
});
