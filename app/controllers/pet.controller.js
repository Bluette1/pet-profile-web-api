const db = require("../models");
const Pet = db.pet;
const User = db.user;

exports.addPet = async (req, res) => {
  const pet = new Pet(req.body.data);

  pet.save((err, pet) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const userId = req.userId;
    const user = User.findById(userId).exec((err, user) => {

      user.pets.push(pet.id);
      user.save((err, user) => {
        res.send({ message: "Pet was added successfully!" });
      });
    });
  });
};

exports.getPets = (req, res) => {
  Pet.find({}).exec((err, pets) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(pets);
  });
};



exports.getPet = (req, res) => {

  Pet.findById(id).exec((err, pet) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!pet) {
      res.status(404).send({message: 'Not Found'})
    }
    res.send(pet);
  });
};