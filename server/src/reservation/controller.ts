import { Request, Response, NextFunction } from 'express';
import { hash, cryptCompareSync } from '../../module/crypt';
import { pagination } from '../../module/paging';
const connect = require('../../middleware/db-connection');
const reservationQuery = require('./query');

interface BProps {
  id?: number;
  title: string;
  space: string;
  name: string;
  password: string;
  passwordConfirm: string;
  content: string;
  salt: string;
  startDate: string;
  endDate: string;
}

/* 예약하기 조회 페이지 */
const getReservationList = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    let page = req.query.page === undefined ? 1 : parseInt(req.query.page as string);
    if(page < 1) page = 1;
    const pageSize = 10;
    const begin = (page - 1) * pageSize;
    const category = req.query.category ? req.query.category : 'all'; // 검색 카테고리
    const keyword = req.query.keyword ? `%${req.query.keyword}%` : '%%'; // 검색 키워드
    const status = req.query.status ? req.query.status : undefined;

    const getReservationListQuery = reservationQuery.getReservationList(keyword, category, status, begin, pageSize);
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
    next();
    return({
      err: err
    })
  }
}

/* 예약 상세정보 페이지 */
const getReservationDetailInfo = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    // Request
    const { id } = req.params;

    if(id != 'detail'){
      const getReservationDetailQuery = reservationQuery.getReservationDetail(id);
      const result = await connect.executeForInput(getReservationDetailQuery.query, getReservationDetailQuery.params);

      // 페이지 조회수 업데이트
      const updateReserviatonViewCountQuery = reservationQuery.updateReserviatonViewCount(id);
      await connect.executeForInput(updateReserviatonViewCountQuery.query, updateReserviatonViewCountQuery.params);

      res.json({
        result: result.length === 0 ? { auth: 'deny' } : result[0]
      })
    }else{
      res.json({
        result: 'detail'
      })
    }
  }catch(err){
    console.log(err);
    console.log('예약 상세페이지 조회중 에러발생');
    next();
    return({
      err: err
    })
  }
}

/* 예약하기 */
const doReservation = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { title, space, name, password, content, startDate, endDate }: BProps = req.body;
    const { salt, hashPassword } = await hash(password);

    const doReservationQuery = reservationQuery.doReservation(title, space, name, hashPassword, content, startDate, endDate, salt);
    const result = await connect.executeForInput(doReservationQuery.query, doReservationQuery.params);

    res.send({
      result: result
    })
  }catch(err){
    console.log(err);
    console.log('예약중 에러발생');
    next();
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
    next();
    return({
      err: err
    })
  }
}

/* 예약 수정하기 */
const modifyReservation = async(req:Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { id, space, title, name, password, content, startDate, endDate }: BProps = req.body;
    const { salt, hashPassword } = await hash(password);

    const modifyReservationQuery = reservationQuery.modifyReservation(title, space, name, hashPassword, content, startDate, endDate, salt, id);
    const result = await connect.executeForInput(modifyReservationQuery.query, modifyReservationQuery.params);

    res.send({
      result: result
    })
  }catch(err){
    console.log(err);
    console.log('예약정보 수정중 에러발생');
    next();
    return({
      err: err
    })
  }
}

/* 예약 삭제하기 */
const deleteReservation = async(req:Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { id } = req.body;

    const deleteReservationQuery = reservationQuery.deleteReservation(id);
    const result = await connect.executeForInput(deleteReservationQuery.query, deleteReservationQuery.params);

    res.json({
      result: result
    })
  }catch(err){
    console.log(err);
    console.log('예약정보 삭제중 에러발생');
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
  modifyReservation,
  deleteReservation
}