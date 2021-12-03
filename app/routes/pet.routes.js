const { verifyToken } = require("../middlewares");

const controller = require("../controllers/pet.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/pets", controller.getPets);

  app.get("/api/pet", controller.getPet);
  app.post("/api/pets", [verifyToken], controller.addPet);

};