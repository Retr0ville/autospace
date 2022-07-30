const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const salt = process.env.SAUCE;
const jwtSecret = process.env.JWTOKEN;

const validatePass = async (localPass, dbPass)=>{
 return await bcrypt.compare(localPass, dbPass)
}

const get_user = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  try {
    const exists =
      mongoose.Types.ObjectId.isValid(id) &&
      (await UserModel.exists({ _id: id }));
    if (!exists) {
      throw new Error("user doesn't exist in database");
    }
    const user = await UserModel.findById(id);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const register_user = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const { username, password, email } = req.body;
    if(!(username && password && email)) {
      throw new Error("Please fill all the fields");
    }
    if (await UserModel.exists({ username })) {
      throw new Error("user already exists, please login");
    }
    let hashedPass;
    bcrypt
      .hash(password, salt)
      .then((hash) => {
        hashedPass = hash;
      })
      .catch((err) => {
        throw new Error("could'nt hash password");
      });
    const newUser = new UserModel({ ...req.body, password: hashedPass });
    newUser
      .save()
      .then((savedUser) => {
        const token = await jwt.sign(savedUser, jwtSecret, { exp: "2d" });
        res.send({
          data: savedUser,
          token,
        });
      })
      .catch((err) => {
        throw new Error("User could'nt be saved to db");
      });
  } catch (err) {
    res.send({ error: err.message });
  }
};

const login_user = async (req, res) => {
  res.set("access-contron-allow-origin", "*");
  const { username, password } = req.body;
  if (!(username && password)) {
    throw new Error("Please fill all the fields");
  }
  try {
    const { username, password } = req.body;
  //  if(!UserModel.exists({ username })) {
  //     throw new Error("User doesn\'nt exist, Please Register");
  //   }
    const user = UserModel.findOne({username})
    if(user && validatePass(password, user.password)){
      const token = await jwt.sign(user, jwtSecret, { exp: "2d" });
        res.send({
          data: user,
          token,
        });
    } else {
      throw new Error('Invalid username or password')
    }
  } catch (err) {
    res.send({ error: err.message });
  }
};
