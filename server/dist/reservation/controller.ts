import { Request, Response, NextFunction } from 'express';

/* 예약하기 조회 페이지 */
const getReservationList = (req: Request, res: Response, next: NextFunction) =>{
  try{
    res.json({
      result: '헬로우'
    })
  }catch(err){
    console.log(err);
    return({
      err: err
    })
  }
}

module.exports = {
  getReservationList
}