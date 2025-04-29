const jsonWebToken = require("jsonwebtoken"); // Assure-toi d'importer jwt
const token_key = "TA_CLE_SECRETE"; // ou utilise process.env.TOKEN_KEY



module.exports = {
  index: (req, res, next) => { ... },

  indexView: (req, res) => { ... },

  new: (req, res) => { ... },

  create: (req, res, next) => { ... },

  redirectView: (req, res, next) => { ... },

  show: (req, res, next) => { ... },

  showView: (req, res) => { ... },

  edit: (req, res, next) => { ... },

  update: (req, res, next) => { ... },

  delete: (req, res, next) => { ... },

  getApiToken: (req, res) => {
    if (req.user) {
      let signedToken = jsonWebToken.sign(
        {
          data: req.user._id,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30) // 30 jours
        },
        token_key
      );
      res.render("users/api-token", {
        token: signedToken
      });
    } else {
      req.flash("error", "Vous devez être connecté pour obtenir un token API.");
      res.redirect("/login");
    }
  }
};
