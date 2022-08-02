"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = (0, express_1.default)();
const fixPath = '/server';
app.use((0, cors_1.default)({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', (req, res, next) => {
    res.send('홈페이지!');
});
app.use(`${fixPath}/reservation`, require('./reservation')); // 예약하기
app.use(`${fixPath}/util`, require('./util')); // etc
app.listen('3001', () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 3001
    ################################################
`);
});
