import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
require('dotenv').config();

const app = express();
const fixPath = '/server';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true
}));

app.get('/', (req: Request, res: Response, next:NextFunction) => {
  res.send('홈페이지!');
});

app.use(`${fixPath}/reservation`, require('./reservation')); // 예약하기
app.use(`${fixPath}/util`, require('./util')); // etc

app.listen('3001',() => {
  console.log(`
    ################################################
    🛡️  Server listening on port: 3001
    ################################################
`);
})