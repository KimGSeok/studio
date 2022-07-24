import { Request, Response, NextFunction } from 'express';

/* 예약하기 조회 페이지 */
const getReservationList = (req: Request, res: Response, next: NextFunction) =>{
  try{

    res.json({
      result: '헬로우1'
    })
  }catch(err){
    console.log(err);
    console.log('예약페이지 조회중 에러발생');
    return({
      err: err
    })
  }
}

/* 예약 상세정보 페이지 */
const getReservationDetailInfo = (req: Request, res: Response, next: NextFunction) =>{
  try{

    // Request
    const { id } = req.params;

    console.log(id);
    
    res.json({
      result: '헬로우2'
    })
  }catch(err){
    console.log(err);
    console.log('예약 상세페이지 조회중 에러발생');
    return({
      err: err
    })
  }
}

/* 예약하기 */
const doReservation = (req: Request, res: Response, next: NextFunction) =>{
  try{

    const {} = req.body;

    res.json({
      result: '헬로우3'
    })
  }catch(err){
    console.log(err);
    console.log('예약중 에러발생');
    return({
      err: err
    })
  }
}

module.exports = {
  getReservationList,
  getReservationDetailInfo,
  doReservation
}