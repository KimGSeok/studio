import { Request, Response, NextFunction } from 'express';
import { hash, cryptCompareSync } from '../../module/crypt';
import { pagination } from '../../module/paging';
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

    console.log("req.query :", req.query);

    // Parameter
    let page = req.query.page === undefined ? 1 : parseInt(req.query.page as string);
    if(page < 1) page = 1;
    const pageSize = 10;
    const begin = (page - 1) * pageSize;
    const category = req.query.category ? req.query.category : 'all'; // 검색 카테고리
    const keyword = req.query.keyword ? `%${req.query.keyword}%` : '%%'; // 검색 키워드

    const getReservationListQuery = reservationQuery.getReservationList(keyword, category, begin, pageSize);
    const result = await connect.executeForInput(getReservationListQuery.query, getReservationListQuery.params);

    // 페이징
    const paging = pagination(page, result[1][0].rowCount, pageSize);

    res.send({
      result: result[0],
      paging: paging
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

/* 예약 상세정보 비밀번호 검증 */
const checkReservationPassword = async(req:Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { reservationId, checkPassword } = req.body;

    const getReservationDetailQuery = reservationQuery.getReservationDetail(reservationId);
    const result = await connect.executeForInput(getReservationDetailQuery.query, getReservationDetailQuery.params);

    // Result
    const { password, salt } = result[0];
    const { hashPassword } = await cryptCompareSync(checkPassword, salt);

    res.send({
      result: password === hashPassword
    })

  }catch(err){
    console.log(err);
    console.log('예약 상세정보 비밀번호 검증중 에러발생');
    return({
      err: err
    })
  }
}

module.exports = {
  getReservationList,
  getReservationDetailInfo,
  checkReservationPassword,
  doReservation,
}