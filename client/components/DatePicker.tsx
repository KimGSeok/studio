import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Datetime from "react-datetime";
import moment from 'moment';
import "react-datetime/css/react-datetime.css";
import { timeList } from '../modules/time';
import { equalCheck } from '../modules/validation';

interface DProps{
  startDate: any;
  setStartDate: Dispatch<SetStateAction<any>>;
  endDate: any;
  setEndDate: Dispatch<SetStateAction<any>>;
  startTime: string;
  setStartTime: Dispatch<SetStateAction<any>>;
  endTime: string;
  setEndTime: Dispatch<SetStateAction<any>>;
}

const DatePicker = ({ startDate, setStartDate, endDate, setEndDate, startTime, setStartTime, endTime, setEndTime }: DProps) =>{

  // List State
  const [ startTimeList, setStartTimeList ] = useState(timeList); // 시작시간 목록
  const [ endTimeList, setEndTimeList ] = useState(timeList); // 종료시간 목록

  // Parameter
  let initCheck = false;
  const yestarday = moment().subtract(1, 'day');
  const tomorrow = moment(endDate).add(1, 'day');

  /* 오늘 이전 예약 불가 설정을 위한 시작날짜 Validation Handler */
  const isValidStartDateHandler = (current: moment.Moment) =>{
    if(endDate){
      return current.isBefore(tomorrow);
    }else{
      return current.isAfter(yestarday);
    }
  }

  /* 예약 불가 설정을 위한 종료날짜 Validation */
  const isValidEndDateHandler = (current: moment.Moment) => {
    const checkStartDate = typeof startDate === 'string' ? moment(startDate) : startDate;
    if(checkStartDate){
      return current.isAfter(checkStartDate - 1);
    }else{
      return current.isAfter(yestarday);
    }
  }

  /* 시작날짜 입력 시, Date Validation */
  const onChangeStartDateHandler = (e: moment.MomentInput) =>{

    // Parameter
    const date = moment(e).toDate()
    setStartDate(date);
    
    if(endDate != null){
      if(equalCheck(date, endDate)){

        // 시작시간 Filter
        if(startTime >= endTime){

          const arrStartTimeList = timeList.filter(el => (el < endTime));
          setStartTime(arrStartTimeList[arrStartTimeList.length -1]);
          setStartTimeList(arrStartTimeList);
        }else{

          // 종료시간 Filter
          const arrEndTimeList = timeList.filter(el => (el > startTime));
          setEndTimeList(arrEndTimeList);
          if(parseInt(endTime) === 0){
            setEndTime(arrEndTimeList[0]);
          }
        }
      }else{
        // Init
        setEndTimeList(timeList.filter(el => (parseInt(el) > 0)));
      }
    }
  }

  /* 종료날짜 입력 시, Date Validation */
  const onChangeEndDateHandler = (e: moment.MomentInput) =>{

    // Parameter
    const date = moment(e).toDate()
    setEndDate(date);

    if(startDate != null){
      if(equalCheck(startDate, date)){

        // 종료시간 Filter
        const preEndTime = endTime;
        const arrEndTimeList = timeList.filter(el => (el > startTime));
        setEndTimeList(arrEndTimeList);

        if(parseInt(preEndTime) <= 0 || parseInt(preEndTime) <= parseInt(startTime)){
          setEndTime(arrEndTimeList[0]);
        }else if(parseInt(preEndTime) > parseInt(startTime)){
          setEndTime(preEndTime);
        }
      }else{
  
        // Init
        setEndTimeList(timeList.filter(el => (parseInt(el) > 0)));
        setEndTime(endTime);
      }
    }
  }

  /* 시작시간 Change */
  const onChangeStartTimeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const value = e.target.value;
    setStartTime(value);

    if(equalCheck(startDate, endDate)){

      const preEndTime = endTime;
      const arrEndTimeList = timeList.filter(el => (el > value));
      setEndTimeList(arrEndTimeList);

      if(value < endTime){
        setEndTime(preEndTime);
      }else{
        setEndTime(arrEndTimeList[0]);
      }
    }
  }

  /* 종료시간 Change */
  const onChangeEndTimeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {

    const value = e.target.value;
    setEndTime(value);
  }

  useEffect(() => {

    if(!initCheck){

      // 시작날짜 24:00 제거
      setStartTimeList(timeList.filter(el => (el != '24:00')));
      setEndTimeList(timeList.filter(el => (parseInt(el) > 0)));

      initCheck = true;
    }
  },[])

  return(
    <DatePickerWrap>
      <DatePickerEl
        dateFormat="YYYY-MM-DD"
        timeFormat={false}
        inputProps={{
          placeholder: "시작날짜"
        }}
        closeOnSelect={true}
        isValidDate={isValidStartDateHandler}
        onChange={onChangeStartDateHandler}
        initialValue={startDate}
      />
      <TimePicker
        onChange={(e) => onChangeStartTimeHandler(e)}
        value={startTime}
      >
        {
          startTimeList.map((value, index) =>{
            return(
              <option key={index} value={value}>{value}</option>
            )
          })
        }
      </TimePicker>
      <Tilde>~</Tilde>
      <DatePickerEl
        dateFormat="YYYY-MM-DD"
        timeFormat={false}
        inputProps={{
          placeholder: "종료날짜"
        }}
        closeOnSelect={true}
        isValidDate={isValidEndDateHandler}
        onChange={onChangeEndDateHandler}
        initialValue={endDate}
      />
      <TimePicker
        onChange={(e) => onChangeEndTimeHandler(e)}
        value={endTime}
      >
        {
          endTimeList.map((value, index) =>{
            return(
              <option key={index} value={value}>{value}</option>
            )
          })
        }
      </TimePicker>
    </DatePickerWrap>
  )
}

const DatePickerWrap = styled.div(
  {
    display: 'flex',
    alignItems: 'center'
  }
)
const DatePickerEl = styled(Datetime)({
  '& > input':{
    position: 'relative',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)',
    outline: '0',
    border: '0',
    minHeight: '36px',
    padding: '0 8px',
    borderRadius: '4px',
    fontSize: '1rem',
    margin: '0 8px 0 0',

    '&::placeholder': {
      color: '#000'
    }
  }
})
const TimePicker = styled.select(
  {
    position: 'relative',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)',
    outline: '0',
    border: '0',
    minHeight: '36px',
    padding: '0 8px',
    borderRadius: '4px',
    fontSize: '1rem',
  }
)
const Tilde = styled.span(
  {
    margin: '0 6px'
  }
)

export default DatePicker;