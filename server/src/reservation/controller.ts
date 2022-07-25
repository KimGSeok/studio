import { Request, Response, NextFunction } from 'express';
import { hash, cryptCompareSync } from '../../module/crypt';
const connect = require('../../middleware/db-connection');
const reservationQuery = require('./query');

interface BProps {
  title: string;
  name: string;
  password: string;
  passwordConfirm: string;
  content: string;
  salt: string;
}

/* 예약하기 조회 페이지 */
const getReservationList = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    const getReservationListQuery = reservationQuery.getReservationList();
    const result = await connect.executeForInput(getReservationListQuery.query, getReservationListQuery.params);

    console.log(result);

    res.json({
      result: result
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
const doReservation = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { title, name, password, content }: BProps = req.body;
    const { salt, hashPassword } = await hash(password);

    const doReservationQuery = reservationQuery.doReservation(title, name, hashPassword, content, salt);
    const result = await connect.executeForInput(doReservationQuery.query, doReservationQuery.params);

    res.json({
      result: result
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