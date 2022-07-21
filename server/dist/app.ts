import express, { Request, Response, NextFunction } from 'express';

const app = express();
const fixPath = '/server';

app.get('/', (req: Request, res: Response, next:NextFunction) => {
  res.send('홈페이지!');
});

app.use(`${fixPath}/reservation`, require('../dist/reservation')); // 예약하기

app.listen('3001',() => {
  console.log(`
    ################################################
    🛡️  Server listening on port: 3001
    ################################################
`);
})