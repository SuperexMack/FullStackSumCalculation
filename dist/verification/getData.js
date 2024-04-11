"use strict";
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
const Authmiddleware_1 = __importDefault(require("./Authmiddleware"));
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.get("/getmydata", Authmiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userdata = yield db_1.TotalSum.find({
            ownerData: req.userid
        });
        if (userdata.length === 0) {
            return res.status(400).json({
                msg: "No data found for the user"
            });
        }
        else {
            // If data is found, return it as JSON
            return res.status(200).json({
                msg: "Data found for the user",
                data: userdata.map(data => ({
                    field1: data.NumberFirst,
                    field2: data.NumberSecond,
                    field3: data.Finalsum
                }))
            });
        }
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            msg: "Internal Server Error"
        });
    }
}));
exports.default = router;
