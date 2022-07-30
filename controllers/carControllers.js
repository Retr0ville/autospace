const carModel = require("../models/CarModel");
const mongoose = require("mongoose");

const get_cars = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  carModel
    .find({}, { fuelType: 0, fuelCapacity: 0, priorUse: 0 })
    .populate("user", { password: 0 })
    .then((cars) => {
      cars && res.status(200).send(cars);
    })
    .catch((err) => {
      res.status(400).send({ error: err.message });
    });
};

const get_car = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  const exists =
    mongoose.Types.ObjectId.isValid(id) && (await carModel.exists({ _id: id }));
  if (exists) {
    carModel
      .findById(id)
      .populate("user", { password: 0 })
      .then((car) => {
        car && res.status(200).send(car);
      })
      .catch((err) => {
        res.status(400).send({ error: err.message });
      });
  } else {
    res.status(404).send({ error: "car doesn't exist in database" });
  }
};
 //! test this *//
const delete_car = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  const { userId } = req.jwtData;
  var isYourCar = false;

  //! test this *//
  const authorized = async (userId, id) => {
    let status = false;
    carModel
      .findById(id, "user")
      .then((car) => {
        status = userId === car.user;
        isYourCar = userId === car.user;
      })
      .catch(() => {
        status = false;
      });
    return status;
  };
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (isValid && (await authorized(userId, id))) {
    carModel
      .findByIdAndDelete(id)
      .then((car) => {
        car && res.status(200).send(car);
      })
      .catch((err) => {
        res.status(400).send({ error: err.message });
      });
  } else {
    isYourCar
      ? res.status(404).send({ error: "car doesn't exist in database" })
      : res.status(400).send({ error: "You can't delete a car you don't own" });
  }
};

const create_cars = (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    const { name, bodyType, transmission, price, imageUrl, user } = req.body;
    if (!(name && bodyType && transmission && price && imageUrl && user)) {
      res.status(400).send({ error: "Some required fields were omitted" });
      return;
    }
    const carInstance = new carModel(req.body);
    carInstance
      .save()
      .then((car) => {
        res.status(201).send(car);
      })
      .catch((err) => {
        res.send({ error: err.message });
      });
  } catch (err) {
    res
      .status(400)
      .send({
        error: err.message,
        message: "an error occured, couldn't update the database",
      });
  }
};

module.exports = {
  get_cars,
  get_car,
  delete_car,
  create_cars,
};
