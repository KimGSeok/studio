"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const utilController = require('./util.controller');
router.post('/login', utilController.checkLoginInfo); // 로그인 정보 조회
module.exports = router;
