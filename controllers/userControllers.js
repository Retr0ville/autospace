const UserModel = require("../models/userModel")
const mongoose = require("mongoose")

const get_user = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { id } = req.query;
  
  try {
    const exists =
      mongoose.Types.ObjectId.isValid(id) &&
      (await UserModel.exists({ _id: id }));
    if (exists) {
      UserModel.findById(id).select({password: 0})
        .then((user) => {
          res.status(200).send(user);
        })
        .catch((err) => {
          res.status(400).send({ error: err.message });
        });
      return;
    } else {
      res.status(404).send({ error: "user doesn't exist" });
      return;
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
    return;
  }
};

const get_users = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
      UserModel.find().select({password: 0})
        .then((users) => {
          res.status(200).send(users);
          return
        })
        .catch((err) => {
          res.status(404).send({ error: err.message, message:"could'nt fetch users" });
        });
      return;
  } catch (err) {
    res.status(400).send({ error: err.message });
    return;
  }
};

const get_user_cars = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  
  try {
    const exists =
      mongoose.Types.ObjectId.isValid(id) &&
      (await UserModel.exists({ _id: id }));
    if (exists) {
      UserModel.findById(id).select("cars").populate()
        .then((cars) => {
          res.status(200).send(cars);
        })
        .catch((err) => {
          res.status(400).send({ error: err.message });
        });
      return;
    } else {
      res.status(404).send({ error: "user doesn't exist" });
      return;
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
    return;
  }
};

module.exports = {
  get_user,
  get_users,
  get_user_cars,
}