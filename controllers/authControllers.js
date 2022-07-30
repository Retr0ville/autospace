// const mongoose = require("mongoose");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const salt = process.env.SAUCE;
const jwtSecret = process.env.JWTOKEN;

const validatePass = async (localPass, dbPass) => {
  if (!(localPass && dbPass)) {
    return false;
  }
  return await bcrypt.compare(localPass, dbPass);
};



const register_user = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    const { username, password, email } = req.body;
    if (!(username && password && email)) {
      res.status(400).send("Please fill all the fields");
      return;
      // throw new Error("Please fill all the fields");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).send("Invalid email, use a valid email");
      return;
      // throw new Error("Please fill all the fields");
    }
    // (?=(.*RULE){MIN_OCCURANCES,})
    if (
      !/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/.test(
        password
      )
    ) {
      res
        .status(400)
        .send(
          "Password should be at least 8 characters long and include a capital letter and a symbol"
        );
      return;
      // throw new Error("Please fill all the fields");
    }
    if (await UserModel.exists({ email })) {
      res.status(400).send("user already exists, please login");
      return;
      // throw new Error("user already exists, please login");
    }
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        const newUser = new UserModel({ ...req.body, password: hash });
        newUser
          .save()
          .then(({_id, username, email, picUrl, created_at, updatedAt}) => {
            const token = jwt.sign({ email, userId: _id }, jwtSecret, {
              expiresIn: "2d",
            });
            res.status(201).send({
              user: {
                userId: _id,
                username,
                email,
                created_at,
                updatedAt,
                picUrl,
                location,
              },
              token,
            });
            return;
          })
          .catch((err) => {
            res.status(400).send({
              error: err.message,
              message: "User could not be saved to db",
            });
            return;
            // throw new Error("User could'nt be saved to db");
          });
      })
      .catch((err) => {
        return res.status(400).send({
          error: err.message,
          message: "password is malformed or non-existent",
        });
        // throw new Error({error:err.message, message:"could'nt hash password"});
      });
  } catch (err) {
    res.status(400).send({ error: err.message });
    return;
  }
};

const login_user = async (req, res) => {
  res.set("access-control-allow-origin", "*");
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send("Please fill all the fields");
    return;
    // throw new Error("Please fill all the fields");
  }
  try {
    const { email, password } = req.body;
    //  if(!UserModel.exists({ username })) {
    //     throw new Error("User doesn\'nt exist, Please Register");
    //   }
    const user = await UserModel.findOne({ email });
    if (user && (await validatePass(password, user.password))) {
      const {_id, username, email, picUrl, location, created_at, updatedAt} = user
      const token = await jwt.sign({ email, userId: _id  }, jwtSecret, {
        expiresIn: "2d",
      });
      res.send({
        user: {
          userId: _id,
          username,
          email,
          created_at,
          updatedAt,
          picUrl,
          location,
        },
        token,
      });
    } else {
      res.status(400).send("Invalid email or password");
      return;
      // throw new Error('Invalid username or password')
    }
  } catch (err) {
    res.send({ error: err.message });
    return;
  }
};

module.exports = {
  register_user,
  login_user,
};
