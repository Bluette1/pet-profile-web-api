const db = require("../models");
const Pet = db.pet;
const User = db.user;

exports.addPet = async (req, res) => {
  const { name, age, sex, weight, color, missing, } = req.body;
  const pet = new Pet({
    name,
    age,
    sex,
    weight,
    color,
    missing,
    image: req.file.location,

  });

  pet.save((err, pet) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    const userId = req.userId;
    const user = User.findById(userId).exec((err, user) => {
      user.pets.push(pet.id);
      user.save((err, user) => {
        res.status(201).send({ message: "Pet was added successfully!" });
      });
    });
  });
};

exports.updatePet = async (req, res) => {
  const {id} = req.params
  const { name, age, sex, weight, color, missing, image} = req.body;
  let img = image;
  if (req.file) {
    img = req.file.location;
  }
  const pet = {
    name,
    age,
    sex,
    weight,
    color,
    missing,
    image: img,
  };

  Pet.findByIdAndUpdate(id, pet).exec((err, pet) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(pet);
  });
};


exports.getOwnPets = (req, res) => {
  const userId = req.userId;
  User.findById(userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(user.pets);
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
      res.status(404).send({ message: "Not Found" });
    }
    res.send(pet);
  });
};