import { Request, Response, NextFunction } from 'express';
import * as connect from '../../middleware/db-connection';
const scheduleQuery = require('./schedule.query');

/* 공간 예약현황 조회 */
const getReservationScheduleList = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { space } = req.query;

    // Query
    const getSpaceListQuery = scheduleQuery.getReservationDetailInfo(space);
    const spaceList: any = await connect.executeForInput(getSpaceListQuery.query, getSpaceListQuery.params);

    // 예약 날짜목록
    const dayObj = onFilterReservationInfo(spaceList);
    
    res.json({
      status: 200,
      dayObj: dayObj,
      result: spaceList
    })

  }catch(err){
    console.log(err);
    console.log('공간 목록 조회중 에러발생');
    next();
  }
}

/* 예약날짜 상세 예약정보 조회 */
const getScheduleDetailInfo = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { space } = req.query;

    // Query
    const getSpaceListQuery = scheduleQuery.getReservationDetailInfo(space);
    const spaceList: any = await connect.executeForInput(getSpaceListQuery.query, getSpaceListQuery.params);

    // 예약 날짜목록
    const dayObj = onFilterReservationInfo(spaceList);
    
    res.json({
      status: 200,
      dayObj: dayObj,
      result: spaceList
    })

  }catch(err){
    console.log(err);
    console.log('공간 목록 조회중 에러발생');
    next();
  }
}

/* 예약날짜 상세 공간정보 조회 */
const getScheduleSpaceInfo = async(req: Request, res: Response, next: NextFunction) =>{
  try{

    // Parameter
    const { space, id } = req.query;

    // Query
    const getScheduleSpaceInfoQuery = scheduleQuery.getScheduleSpaceInfo(id);
    const result: any = await connect.executeForInput(getScheduleSpaceInfoQuery.query, getScheduleSpaceInfoQuery.params);
    
    res.json({
      status: 200,
      result: result
    })

  }catch(err){
    console.log(err);
    console.log('공간 목록 조회중 에러발생');
    next();
  }
}

/* 예약 상세정보 필터링 */
const onFilterReservationInfo = (result: any) =>{

  // Date Object
  let dayObj: string[] = [];

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

      break;
    }
  })

  dayObj = dayObj.filter((target, index, obj)=>{
    return obj.indexOf(target) === index;
  })

  return dayObj;
}

module.exports = {
  getReservationScheduleList,
  getScheduleDetailInfo,
  getScheduleSpaceInfo
}