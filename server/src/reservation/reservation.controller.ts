import { Request, Response, NextFunction } from 'express';
import { hash, cryptCompareSync } from '../../module/crypt';
import { pagination } from '../../module/paging';
const connect = require('../../middleware/db-connection');
const reservationQuery = require('./reservation.query');

interface BProps {
  id?: number;
  title: string;
  space: string;
  room: string;
  name: string;
  password: string;
  passwordConfirm: string;
  content: string;
  salt: string;
  startDate: string;
  endDate: string;
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
    const date = req.query.date ? req.query.date : undefined; // 예약조회 날짜

    const getReservationListQuery = reservationQuery.getReservationList(keyword, category, status, space, date, begin, pageSize);
    const result = await connect.executeForInput(getReservationListQuery.query, getReservationListQuery.params);

    // 페이징
    const paging = pagination(page, result[1][0].rowCount, pageSize);

    // Schedule 페이지 예약현황 조회
    const dayObject = onFilterReservationInfo(result[0]);

    res.send({
      result: result[0],
      paging: paging,
      dayObject: dayObject
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
    const { title, space, room, name, password, content, startDate, endDate, status }: BProps = req.body;
    const { salt, hashPassword } = await hash(password);

    const doReservationQuery = reservationQuery.doReservation(title, space, room, name, hashPassword, content, startDate, endDate, salt, status);
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
    const { id, space, room, title, name, password, content, startDate, endDate, status }: BProps = req.body;
    const { salt, hashPassword } = await hash(password);

    const modifyReservationQuery = reservationQuery.modifyReservation(title, space, room, name, hashPassword, content, startDate, endDate, salt, id);
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

const onFilterReservationInfo = (result: any) =>{

  // Date Object
  let dayObj:string[] = [];

  result.map(function(obj: any){

    let startDate = new Date(obj.reservation_start_date);
    let endDate = new Date(obj.reservation_end_date);
    let endDateFlag = true;

    while(true){

      let year: string | number = startDate.getFullYear(); // 연도
      let month: string | number = startDate.getMonth() + 1; // 월
      let date: string | number = startDate.getDate(); // 일

      // 날짜 객체 Format 수정
      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;

      dayObj.push(
        year+'-'+month+'-'+date
      );

      if(obj.reservation_end_date_time === "00:00:00"){

        if(endDateFlag){
          endDate.setDate(endDate.getDate()-1);
          endDateFlag = false;
        }

        // 날짜가 작거나 같은경우
        if( startDate.getTime() === endDate.getTime() ){
          break;
        }
      }else{

        // 날짜가 같은경우
        if( startDate.getTime() === endDate.getTime() ){
          break;
        }
      }

      startDate.setDate(startDate.getDate()+1)
    }
  })

  dayObj = dayObj.filter((target, index, obj)=>{
    return obj.indexOf(target) === index;
  })

  return dayObj;
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