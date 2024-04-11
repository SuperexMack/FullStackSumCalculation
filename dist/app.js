"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const MainCalculation_1 = __importDefault(require("./MainCalculation"));
const user_1 = __importDefault(require("./verification/user"));
const getData_1 = __importDefault(require("./verification/getData"));
app.use(express_1.default.json());
const PORT = 9000;
app.use("/v1/getdata", MainCalculation_1.default);
app.use("/v1", user_1.default);
app.use("/v1/mydata", getData_1.default);
app.listen(PORT, () => {
    console.log(`your server is running on the port number ${PORT}`);
});
