import React, { useState, ChangeEvent, useEffect, MouseEvent, Dispatch, SetStateAction } from "react";
import styled from '@emotion/styled';
import moment from 'moment';
import DatePicker from "../components/DatePicker";
import Modal from '../components/Modal';

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';

interface DatePickerProps{
  checkReservationList: any;
  reservationSpaceList: any;
  setCheckReservationList: Dispatch<SetStateAction<any>>;
}

interface CheckBoxProps extends DatePickerProps{
  reservationId: string | number;
  space: string;
  isAllSpace: boolean;
  setIsAllSpace: Dispatch<SetStateAction<boolean>>;
}

interface SpaceProps{
  [key: string]: string;
}

const SpaceCheckBox = ({ reservationId, space, isAllSpace, setIsAllSpace, checkReservationList, reservationSpaceList, setCheckReservationList }: CheckBoxProps) =>{

  // Hooks
  const [ reservationSpaceArr, setReservationSpaceArr ] = useState<SpaceProps[]>([]); // 예약 공간목록
  const [ checkSpaceId, setCheckSpaceId ] = useState<string>(); // 체크한 목록 ID
  const [ checkSpaceList, setCheckSpaceList ] = useState<any[]>([]); // 체크된 공간의 목록
  const [ isCheckSpaceHtml, setIsCheckSpaceHtml ] = useState<any[]>([]); // HTML Check여부 확인 목록
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ modalTitle, setModalTitle ] = useState<string>();
  const [ startDate, setStartDate ] = useState<any>(null); // 시작날짜
  const [ startTime, setStartTime ] = useState<any>('00:00'); // 시작시간
  const [ endDate, setEndDate ] = useState<any>(null); // 종료날짜
  const [ endTime, setEndTime ] = useState<any>('01:00'); // 종료시간
  const allArr: string[] = [];

  // 공간선택 onChange Handler
  const onChangeSpaceHandler = (e: ChangeEvent<HTMLInputElement>, id: string, room: string) =>{
    e.stopPropagation();

    const isChecked = e.target.checked;

    if(isChecked){
      setIsOpen(true);
      setModalTitle(room);
      setCheckSpaceId(id);
    }else{

      // 상세 페이지(수정)일 경우
      if(reservationId){
        setCheckSpaceList(checkReservationList.filter((el: any) => el.space_id != id));
      }else{
        setCheckSpaceList(checkReservationList.filter((el: any) => el.id !== id));
      }
      setIsCheckSpaceHtml(isCheckSpaceHtml.filter((el) => el !== id));
    }
  }

  // 전체선택 onChange Handler
  const onChangeAllSpaceHandler = (e: ChangeEvent<HTMLInputElement>) =>{
    e.stopPropagation();

    const isChecked = e.target.checked;

    if(isChecked){

      setIsAllSpace(true);

      setIsOpen(true);
      setModalTitle('전체 공간');
      setCheckSpaceId('all');
    }
    // 전체 체크박스 선택 해제 시
    else{
      setCheckSpaceList([]);
      setIsCheckSpaceHtml([]);
    }
  }

  /* 날짜 선택하기 버튼 Click Handler */
  const onClickCheckDateHandler = (e: MouseEvent<HTMLDivElement>) =>{

    if(!startDate){
      alert("시작날짜를 선택해주세요.")
      return false;
    }

    if(!endDate){
      alert("종료날짜를 선택해주세요.")
      return false;
    }

    // 공간이 선택 됬을 때
    if(checkSpaceId){

      // 전체공간인 경우
      if(checkSpaceId === 'all'){

        // 전체 공간 setState를 담을 Arr
        let checkAllSpace: object[] = [];

        reservationSpaceArr.forEach((el) => allArr.push(el.id));
        setIsCheckSpaceHtml(allArr);

        reservationSpaceArr.map((value, index) => {
          checkAllSpace.push({
            id: value.id,
            startDate: moment(startDate).format(`YYYY-MM-DD ${startTime}:ss`),
            endDate: moment(endDate).format(`YYYY-MM-DD ${endTime}:ss`)
          })
        })

        setCheckSpaceList(checkAllSpace);
      }
      // 개별공간
      else{
        setIsCheckSpaceHtml([...isCheckSpaceHtml, checkSpaceId]);
        setCheckSpaceList([...checkSpaceList, {
          id: checkSpaceId,
          startDate: moment(startDate).format(`YYYY-MM-DD ${startTime}:ss`),
          endDate: moment(endDate).format(`YYYY-MM-DD ${endTime}:ss`)
        }]);
      }
    }

    setIsOpen(false);
  }

  /* 공간 선택 시, 상위 Props setState */
  useEffect(() => {

    setCheckReservationList(checkSpaceList);
  },[checkSpaceList])


  /* 공간목록 조회 useEffect */
  useEffect(() => {

    const getSpaceList = async() =>{
      
      // Data Fetching
      const res = await fetch(`${API_URL}/util/getSpaceList/?space=${space}`)
      const data = await res.json();

      if(data.status === 200){

        setReservationSpaceArr(data.result);
      }else{
        alert("공간목록 조회에 실패하였습니다.\n관리자에게 문의해주세요.");
      }
    }

    getSpaceList();
  },[space])

  /* Init Check Space Arr */
  useEffect(() => {

    // Arr
    let spaceIdArr = [];

    if(reservationSpaceArr.length > 0){

      // 전체예약
      if(reservationSpaceList.length === 1 && reservationSpaceList[0].space_id === '14'){
        setIsAllSpace(true);
        reservationSpaceArr.forEach((el) => allArr.push(el.id));

        setIsCheckSpaceHtml(allArr);
      }else{
        for(let index = 0; index < reservationSpaceList.length; index++){
          spaceIdArr.push(parseInt(reservationSpaceList[index].space_id));
        }
    
        setIsCheckSpaceHtml(spaceIdArr);
      }

      setCheckSpaceList(reservationSpaceList);
      setCheckReservationList(reservationSpaceList);
    }
  }, [reservationSpaceArr])

  return(
    <SpaceCheckBoxWrap>
      {/* 전체대관 개발 */}
      <SpaceWrap>
        <SpaceFloorWrap>전체 선택</SpaceFloorWrap>
        <SpaceRoomWrap>
          <SpaceCheckBoxElement
            id={'all'}
            type='checkbox'
            onChange={(e) => onChangeAllSpaceHandler(e)}
            checked={isCheckSpaceHtml.length === reservationSpaceArr.length ? true : false}
          />
          <SpaceRoomElement htmlFor={'all'}>전체 공간</SpaceRoomElement>
        </SpaceRoomWrap>
      </SpaceWrap>
      <SpaceWrap>
        <SpaceFloorWrap>1층</SpaceFloorWrap>
        {
          reservationSpaceArr && reservationSpaceArr.length > 0 ?
          reservationSpaceArr.map((el, index)=>{
            if(parseInt(el.floor) === 1){
              return(
                <SpaceRoomWrap key={index}>
                  <SpaceCheckBoxElement
                    id={el.id}
                    type='checkbox'
                    onChange={(e) => onChangeSpaceHandler(e, el.id, el.room)}
                    checked={isCheckSpaceHtml.indexOf(el.id) !== -1}
                  />
                  <SpaceRoomElement htmlFor={el.id}>{el.room}</SpaceRoomElement>
                </SpaceRoomWrap>
              )
            }
          })
          : ''
        }
      </SpaceWrap>
      <SpaceWrap>
        <SpaceFloorWrap>2층</SpaceFloorWrap>
        {
          reservationSpaceArr && reservationSpaceArr.length > 0 ?
          reservationSpaceArr.map((el, index)=>{
            if(parseInt(el.floor) === 2){
              return(
                <SpaceRoomWrap key={index}>
                  <SpaceCheckBoxElement
                    id={el.id}
                    type='checkbox'
                    onChange={(e) => onChangeSpaceHandler(e, el.id, el.room)}
                    checked={isCheckSpaceHtml.indexOf(el.id) !== -1}
                  />
                  <SpaceRoomElement htmlFor={el.id}>{el.room}</SpaceRoomElement>
                </SpaceRoomWrap>
              )
            }
          })
          : ''
        }
      </SpaceWrap>
      <SpaceWrap>
        <SpaceFloorWrap>3층</SpaceFloorWrap>
        {
          reservationSpaceArr && reservationSpaceArr.length > 0 ?
          reservationSpaceArr.map((el, index)=>{
            if(parseInt(el.floor) === 3){
              return(
                <SpaceRoomWrap key={index}>
                  <SpaceCheckBoxElement
                    id={el.id}
                    type='checkbox'
                    onChange={(e) => onChangeSpaceHandler(e, el.id, el.room)}
                    checked={isCheckSpaceHtml.indexOf(el.id) !== -1}
                  />
                  <SpaceRoomElement htmlFor={el.id}>{el.room}</SpaceRoomElement>
                </SpaceRoomWrap>
              )
            }
          })
          : ''
        }
      </SpaceWrap>
      <SpaceWrap>
        <SpaceFloorWrap>Garden</SpaceFloorWrap>
        {
          reservationSpaceArr && reservationSpaceArr.length > 0 ?
          reservationSpaceArr.map((el, index)=>{
            if(el.floor === 'Garden'){
              return(
                <SpaceRoomWrap key={index}>
                  <SpaceCheckBoxElement
                    id={el.id}
                    type='checkbox'
                    onChange={(e) => onChangeSpaceHandler(e, el.id, el.room)}
                    checked={isCheckSpaceHtml.indexOf(el.id) !== -1}
                  />
                  <SpaceRoomElement htmlFor={el.id}>{el.room}</SpaceRoomElement>
                </SpaceRoomWrap>
              )
            }
          })
          : ''
        }
      </SpaceWrap>
      {
        isOpen ?
        <Modal
          title={modalTitle + ' 의 예약시간을 설정해주세요.'}
          subTitle={'선택한 공간에 한해서만 시간이 설정됩니다.'}
          children={
            <>
              <DatePicker
                isOpen={isOpen}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
              <SelectDatePickerBtn onClick={(e)=>onClickCheckDateHandler(e)}>날짜 선택하기</SelectDatePickerBtn>
            </>
          }
          isShow={isOpen}
          setIsShow={setIsOpen}
        /> : ''
      }
    </SpaceCheckBoxWrap>
  )
}

const SpaceCheckBoxWrap = styled.div(
  {
    backgroundColor: '#fff',
    border: '0',
    borderRadius: '4px',
    padding: '12px 18px',
    boxShadow: '0 1.5px 1px 1px rgb(100 100 100 / 10%)'
  }
)
const SpaceWrap = styled.div(
  {
    padding: '4px 0'
  }
)
const SpaceFloorWrap = styled.div(
  {
    fontSize: '1.2rem',
    padding: '2px 6px'
  }
)
const SpaceRoomWrap = styled.div(
  {
    width: 'calc(20% - 12px)',
    display: 'inline-block',
    padding: '4px 0',
    ':nth-of-type(odd)': {
      margin: '6px 12px'
    },
  }
)
const SpaceCheckBoxElement = styled.input(
  {
    display: 'none',
    ':checked + label': {
      border: '1px solid #5800FF',
      backgroundColor: '#5800FF',
      color: '#fff'
    },
  }
)
const SpaceRoomElement = styled.label(
  {
    width: '100%',
    display: 'inline-block',
    fontSize: '0.9rem',
    fontColor: '',
    border: '1px solid #e6e6e6',
    borderRadius: '24px',
    padding: '8px 8px',
    textAlign: 'center',
    cursor: 'pointer'
  }
)
const SelectDatePickerBtn = styled.div(
  {
    maxWidth: '120px',
    padding: '6px 8px',
    border: '1px solid #e6e6e6',
    marginLeft: 'auto',
    borderRadius: '4px',
    textAlign: 'center',
    fontWeight: '500',
    cursor: 'pointer',
  }
)

export default SpaceCheckBox;