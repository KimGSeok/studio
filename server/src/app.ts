import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
require('dotenv').config();

const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const fixPath = '/server';

app.use(cors({
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req: Request, res: Response, next:NextFunction) => {
  res.send('홈페이지!');
});

app.use(`${fixPath}/schedule`, require('./schedule')); // 스케줄
app.use(`${fixPath}/reservation`, require('./reservation')); // 예약하기
app.use(`${fixPath}/util`, require('./util')); // etc

app.listen('3001',() => {
  console.log(`
    ################################################
    🛡️  Server listening on port: 3001
    ################################################
`);
})