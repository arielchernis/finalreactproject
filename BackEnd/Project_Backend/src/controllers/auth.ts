import User from "../models/user_model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Post from "../models/post_model";

const generateTokens = (userId: string): [string, string] => {
  const accessToken = jwt.sign(
    { _id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRATION }
  );
  const refreshToken = jwt.sign(
    { _id: userId },
    process.env.REFRESH_TOKEN_SECRET,
    {}
  );
  return [accessToken, refreshToken]
}
/**
 * register
 * @param {http req} req
 * @param {http res} res
 */
const register = async (req: Request, res: Response) => {
  console.log("register");
  //validate email/password
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (
    email == null ||
    email == undefined ||
    password == null ||
    password == undefined
  ) {
    res.status(StatusCodes.BAD_REQUEST);
  }

  //encrypt password
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: encryptedPassword,
  });
  try {
    const newUser = await user.save();
    //login - create access token
    const [accessToken, refreshToken] = generateTokens(newUser._id)
    newUser.refreshToken = refreshToken;
    await newUser.save();
    res.status(StatusCodes.OK).send({
      access_token: accessToken,
      refresh_token: refreshToken,
      _id: newUser._id,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

/**
 * login
 * @param {http req} req
 * @param {http res} res
 */
const name = async (req : Request,res : Response) => {
  console.log("getname")
  const name = req.params.name;
  console.log("name:" +name)
  if (name == null) {
    return res
        .status(StatusCodes.BAD_REQUEST)
        .send({error: "wrong name 1"});
  }
  try {
    // check password match
    const user = await User.findOne({name: name});
    if (user == null) {
      return res
          .status(StatusCodes.BAD_REQUEST)
          .send({error: "wrong name 2"});
    }
  }catch(err){
    return res.status(StatusCodes.BAD_REQUEST).send({error: err.message});
  }
}
const getUsers = async (req: Request, res: Response) => {
  console.log("getUsers");

  try {
    const email = req.query.email;
    const name = req.query.name;
    let users;
    if (email != null || email != undefined) {
      users = await User.find({ email: email});
    } else {
      users = await User.find();
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send({
      err: err.message,
    });
  }
};
const login = async (req: Request, res: Response) => {
  console.log("login");
  const email = req.body.email;
  const password = req.body.password;
  if (email == null || password == null) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "wrong email or password" });
  }

  try {
    // check password match
    const user = await User.findOne({ email: email });
    if (user == null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "wrong email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: "wrong email or password" });
    }

    const [accessToken, refreshToken] = generateTokens(user._id)
    user.refreshToken = refreshToken;
    await user.save();
    res.status(StatusCodes.OK).send({
      access_token: accessToken,
      refresh_token: refreshToken,
      _id: user._id,
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).send({ error: err.message });
  }
};

/**
 * renewToken
 * get new access token by the refresh token
 * @param {http req} req
 * @param {http res} res
 */
const renewToken = async (req: Request, res: Response) => {
  console.log("renewToken");
  // validate refresh token
  let token = req.headers["authorization"];
  if (token == undefined || token == null) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }
  token = token.split(" ")[1];

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userId) => {
    console.log("jwt.verify");
    if (err != null) {
      return res.status(StatusCodes.FORBIDDEN).send({ err: err.message })
    }
    try {
      const id: string = userId['_id']
      const user2 = await User.findById(id);
      if (user2.refreshToken != token) {
        user2.refreshToken = "";
        await user2.save();
        console.log("refresh token not valid - not present in DB")
        return res.status(StatusCodes.FORBIDDEN).send({ error: err.message });
      }

      const [accessToken, refreshToken] = generateTokens(id)
      user2.refreshToken = refreshToken;
      await user2.save();
      console.log("StatusCodes.OK");
      res.status(StatusCodes.OK).send({
        access_token: accessToken,
        refresh_token: refreshToken,
        _id: id,
      });
    } catch (err) {
      return res.status(StatusCodes.FORBIDDEN).send({ error: err.message });
    }
  });
};

/**
 * test
 * @param {http req} req
 * @param {http res} res
 */
const test = async (req: Request, res: Response) => {
  try {
    const user = await User.findById('6241a871835ce0051192dc20')
    user.refreshToken = "sdfasd"
    await user.save()
    res.status(StatusCodes.OK).send({ test: 'adsfasd' });

  } catch (err) {
    return res.status(StatusCodes.FORBIDDEN).send({ error: err.message });
  }
};

export = {
  register,
  login,
  renewToken,
  test,
  name,
  getUsers,
};
