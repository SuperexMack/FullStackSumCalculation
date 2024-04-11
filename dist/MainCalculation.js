"use strict";
// In this file i want to add 2 datas or we can say we are going to add to number
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
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const express_2 = __importDefault(require("express"));
const app = (0, express_2.default)();
const router = (0, express_1.Router)();
const db_1 = require("./db");
const Authmiddleware_1 = __importDefault(require("./verification/Authmiddleware"));
// so now we are going to create the Zod schema so that the user will not able to enter any rubbish data
const ValidData = zod_1.default.object({
    NumberFirst: zod_1.default.number(),
    NumberSecond: zod_1.default.number(),
});
// The below functiom will try to add 2 number 
const AddData = (first, second) => {
    // so in the below paragraph i want to add 2 numbers entered by the user in the database
    let Answer = first + second;
    return Answer;
};
// now in the below line we are going to make a post request and after getting the post request  will allow the user to the value of his entered data as Sum
router.post("/getsum", Authmiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // now we are going to validate the user input sended by the user using zod
    const { success } = ValidData.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            msg: "You had not inserted a data || You have inserted a Invalid data"
        });
    }
    let first = req.body.NumberFirst;
    let second = req.body.NumberSecond;
    let userid = req.userid;
    // Now we are going to call the adder function so that it can add the datas
    let answer = AddData(first, second);
    yield db_1.TotalSum.create({
        NumberFirst: first,
        NumberSecond: second,
        Finalsum: answer,
        ownerData: userid,
    });
    // now we are going to show this data to the user
    res.json({
        msg: `The Total sum is ${answer}`
    });
}));
exports.default = router;
