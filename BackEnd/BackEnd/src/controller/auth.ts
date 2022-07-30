import User from "../models/user_model";
import {Request, Response} from "express";
import {StatusCodes} from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateTokens = (userId: string): [string, string] => {
    const accessToken = jwt.sign(
        {_id: userId},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.TOKEN_EXPIRATION}
    );
    const refreshToken = jwt.sign(
        {_id: userId},
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
    const email = req.body.email;
    const password = req.body.password;

    if (
        email == null ||
        password == null
    ) {
        res.status(StatusCodes.BAD_REQUEST);
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    //check if email is not already taken
    //save user in DB
    const user = new User({
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
        return res.status(StatusCodes.BAD_REQUEST).send({error: err.message});
    }
};

/**
 * login
 * @param {http req} req
 * @param {http res} res
 */
const login = async (req: Request, res: Response) => {
    console.log("login");
    const email = req.body.email;
    const password = req.body.password;
    if (email == null || password == null) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .send({error: "wrong email or password"});
    }

    try {
        // check password match
        const user = await User.findOne({email: email});
        if (user == null) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send({error: "wrong email or password"});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .send({error: "wrong email or password"});
        }

        //calc accesstoken
        const [accessToken, refreshToken] = generateTokens(user._id)
        user.refreshToken = refreshToken;
        await user.save();
        res.status(StatusCodes.OK).send({
            access_token: accessToken,
            refresh_token: refreshToken,
            _id: user._id,
            email: email
        });
    } catch (err) {
        return res.status(StatusCodes.BAD_REQUEST).send({error: err.message});
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
    if (token == undefined) {
        return res.sendStatus(StatusCodes.FORBIDDEN);
    }
    token = token.split(" ")[1];
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userId) => {
        if (err != null) {
            return res.sendStatus(StatusCodes.FORBIDDEN);
        }
        req.body._id = userId;

        try {
            const user = await User.findById(userId);
            if (user.refreshToken != token) {
                user.refreshToken = "";
                await user.save();
                return res.status(StatusCodes.FORBIDDEN).send({error: err.message});
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
            return res.status(StatusCodes.FORBIDDEN).send({error: err.message});
        }
    });
};

/**
 * test
 * @param {http req} req
 * @param {http res} res
 */
const test = async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send({});
};

/**
 * logout
 * @param {http req} req
 * @param {http res} res
 */
const logOut = async (req: Request, res: Response) => {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];
    console.log(token)
    try {
        jwt.sign(token, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXPIRATION_AFTER_LOGOUT}, async (err, logout) => {
            if (logout) {
                res.status(StatusCodes.OK).send('You have been Logged Out');
            } else {
                res.status(StatusCodes.FORBIDDEN).send(err.message);
            }
        })
        return res.sendStatus(StatusCodes.OK);
    } catch (error) {
        return res.sendStatus(StatusCodes.BAD_REQUEST).send({error:error.message})
    }
}


export = {
    register,
    login,
    renewToken,
    logOut,
    test,
};
