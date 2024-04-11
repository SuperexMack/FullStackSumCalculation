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
exports.User = exports.TotalSum = void 0;
// This file is going to make a schema
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
let URL_LINK = "mongodb://localhost:27017/TotalSum";
main()
    .then(() => {
    console.log(`Your database is connected`);
})
    .catch((err) => {
    console.log(err);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(URL_LINK);
    });
}
const Mysum = new schema({
    NumberFirst: Number,
    NumberSecond: Number,
    Finalsum: Number,
    ownerData: {
        type: schema.Types.ObjectId,
        ref: "Mysum",
        required: true
    }
});
// now below we are going to make a user data which consist of username and password with the value of sum
const MYUser = new schema({
    username: String,
    password: String,
});
exports.TotalSum = mongoose_1.default.model("TotalSum", Mysum);
exports.User = mongoose_1.default.model("User", MYUser);
