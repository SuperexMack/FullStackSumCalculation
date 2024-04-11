"use strict";
// so here we are going to create a signIn as well as signUp pages so that user can sign in or login
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// remember -> meaning of signIn is that user is already registered
// so first we are going to create signup
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const JWT_TOKEN = "MACK06062003";
// now here i am gonna to make zod
const newUser = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string()
});
// now here we are going to make a signup
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { success } = newUser.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "You had not inserted a data || You have inserted a Invalid data"
        });
    }
    let oldUser = yield db_1.User.findOne({
        username: req.body.username
    });
    if (oldUser) {
        res.json({
            msg: "User with this username is already regestired"
        });
    }
    let username = req.body.username;
    let password = req.body.password;
    const user = yield db_1.User.create({
        username: username,
        password: password
    });
    // const userid = user._id
    const token = jsonwebtoken_1.default.sign({
        userid: user._id
    }, JWT_TOKEN);
    res.json({
        msg: "User signed successfully!!!!",
        token: token
    });
}));
// now we are going to create the signin route 
const signinVerification = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // so first we will make a verification using zod
    const { success } = signinVerification.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            msg: "You had not inserted a data || You have inserted a Invalid data"
        });
    }
    // now we are going to check that kahin iss username wala pehele se to koi username present nahi hai na
    const userChecker = yield db_1.User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    // we are going to give the token and username to the user who is trying to sign in and trying to get the data
    if (userChecker) {
        const token = jsonwebtoken_1.default.sign({
            userid: userChecker._id
        }, JWT_TOKEN);
        res.json({
            msg: "Welcome back sir",
            token: token
        });
    }
    res.status(400).json({
        msg: "User not found"
    });
}));
exports.default = router;
