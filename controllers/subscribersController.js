const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res, next) => {
  Subscriber.find({})
    .exec()
    .then(subscribers => {
      res.render("subscribers/index", {
        subscribers: subscribers,
        pageTitle: "Liste des abonnés"
      });
    })
    .catch(error => {
      console.log(`Erreur lors de la récupération des abonnés: ${error.message}`);
      next(error);
    });
};

exports.getSubscriptionPage = (req, res) => {
    res.render("subscribers/new", {
        pageTitle: "S'abonner"
      });
      
};

exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });

  newSubscriber.save()
    .then(result => {
      res.render("subscribers/thanks", {
        pageTitle: "Merci pour votre inscription"
      });
    })
    .catch(error => {
      console.error("Erreur lors de l’enregistrement :", error);
      res.status(500).send("Erreur lors de l’enregistrement.");
    });
};

exports.show = (req, res, next) => {
  let subscriberId = req.params.id;
  Subscriber.findById(subscriberId)
    .then(subscriber => {
      res.render("subscribers/show", {
        subscriber: subscriber,
        pageTitle: `Détails de ${subscriber.name}`
      });
    })
    .catch(error => {
      console.log(`Erreur lors de la récupération d'un abonné par ID: ${error.message}`);
      next(error);
    });
};
