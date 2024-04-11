"use strict";
// in this page we are going to create the Authentication
// now here i want to make a middleware which will check that the user jo request bhej raha hai wo valid user hai ya nahi aagar hai to theek warna error
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JWT_TOKEN = "MACK06062003";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authmiddle = req.headers.authorization;
    if (!(authmiddle) || !(authmiddle.startsWith('Bearer '))) {
        console.log(authmiddle);
        return res.status(403).json({
            msg: "Something went wrong during auth"
        });
    }
    const token = authmiddle.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_TOKEN);
        if (decoded.userid) {
            req.userid = decoded.userid;
            next();
        }
        else {
            res.status(400).json({
                msg: "Something went wrong you  need to do something"
            });
        }
    }
    catch (error) {
        // Handle token verification error
        return res.status(403).json({
            msg: "Token verification failed"
        });
    }
};
exports.default = authMiddleware;
