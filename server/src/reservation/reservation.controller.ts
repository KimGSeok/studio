import { Request, Response, NextFunction } from 'express';
import { hash, cryptCompareSync } from '../../module/crypt';
import { pagination } from '../../module/paging';
import * as connect from '../../middleware/db-connection';
const reservationQuery = require('./reservation.query');

interface ReservationProps{
  id: number;
  startDate: string;
  endDate: string;
  [key: string]: any;
}

interface BProps {
  id?: number;
  title: string;
  space: string;
  isAllSpace: string;
  room: string;
  name: string;
  password: string;
  passwordConfirm: string;
  content: string;
  salt: string;
  reservationList: ReservationProps[];
  status: string;
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
    const status = req.query.status ? req.query.status : undefined; // 예약상태
    const space = req.query.space ? req.query.space : undefined; // 예약장소

    const getReservationListQuery = reservationQuery.getReservationList(keyword, category, status, space, begin, pageSize);
    const result: any = await connect.executeForInput(getReservationListQuery.query, getReservationListQuery.params);

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

      // 예약현황 조회
      const getReservationDetailQuery = reservationQuery.getReservationDetail(id);
      const result: any = await connect.executeForInput(getReservationDetailQuery.query, getReservationDetailQuery.params);
      
      // 예약공간 조회
      const getReservationSpaceListQuery = reservationQuery.getReservationSpaceList(id);
      const reservationSpaceList: any = await connect.executeForInput(getReservationSpaceListQuery.query, getReservationSpaceListQuery.params);

      // 페이지 조회수 업데이트
      const updateReserviatonViewCountQuery = reservationQuery.updateReserviatonViewCount(id);
      await connect.executeForInput(updateReserviatonViewCountQuery.query, updateReserviatonViewCountQuery.params);

      res.json({
        result: result.length === 0 ? { auth: 'deny' } : result[0],
        reservationSpaceList: reservationSpaceList
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
    const { title, space, name, password, content, isAllSpace, reservationList, status }: BProps = req.body;
    const { salt, hashPassword } = await hash(password);
    let reservationResult;

    if(reservationList.length > 0){

      // 예약현황 등록
      const doReservationQuery = reservationQuery.doReservation(title, space, name, hashPassword, content, salt, status);
      const doReservationResult: any = await connect.executeForInput(doReservationQuery.query, doReservationQuery.params);

      // 예약현황 식별 아이디
      const reservationId = doReservationResult.insertId;

      // 전체 예약( 연희 = 14, 서교 = 15 )
      if(isAllSpace){

        const spaceId = space === 'yeonhui' ? 14 : 15;
        reservationResult = await reservationDetail(reservationId, spaceId, reservationList[0].startDate, reservationList[0].endDate);
      }else{

        // 공간 상세예약
        reservationList.map(async (value) => {
          reservationResult = await reservationDetail(reservationId, value.id, value.startDate, value.endDate);
        })
      }

      res.send({
        result: doReservationResult
      })
    }else{
      res.send({
        message: 'fail'
      })
    }
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
    const result: any = await connect.executeForInput(getReservationDetailQuery.query, getReservationDetailQuery.params);

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

/* 예약상태 변경 */
const changeReservationStatus = async(req:Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { id, status }: BProps = req.body;

    const changeReservationStatusQuery = reservationQuery.changeReservationStatus(status, id);
    const result = await connect.executeForInput(changeReservationStatusQuery.query, changeReservationStatusQuery.params);

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

/* 예약 수정하기 */
const modifyReservation = async(req:Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { id, space, room, title, name, password, content, reservationList, status }: BProps = req.body;
    const { salt, hashPassword } = await hash(password);

    // const modifyReservationQuery = reservationQuery.modifyReservation(title, space, room, name, hashPassword, content, startDate, endDate, salt, id);
    // const result = await connect.executeForInput(modifyReservationQuery.query, modifyReservationQuery.params);

    res.send({
      // result: result
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

    // 상세예약 삭제
    const deleteReservationDetailQuery = reservationQuery.deleteReservationDetail(id);
    await connect.executeForInput(deleteReservationDetailQuery.query, deleteReservationDetailQuery.params);

    // 예약목록 삭제
    const deleteReservationQuery = reservationQuery.deleteReservation(id);
    const result = await connect.executeForInput(deleteReservationQuery.query, deleteReservationQuery.params);

    res.json({
      result: result
    })
  }catch(err){
    console.log(err);
    console.log('예약정보 삭제중 에러발생');
    next();
    return({
      err: err
    })
  }
}

// 상세예약 하기
const reservationDetail = async(id: string, spaceId: string | number, startDate: string, endDate: string) =>{

  const doReservationDetailQuery = reservationQuery.doReservationDetail(id, spaceId, startDate, endDate);
  const result = await connect.executeForInput(doReservationDetailQuery.query, doReservationDetailQuery.params);
  
  return result;
}

module.exports = {
  getReservationList,
  getReservationDetailInfo,
  checkReservationPassword,
  doReservation,
  changeReservationStatus,
  modifyReservation,
  deleteReservation
}