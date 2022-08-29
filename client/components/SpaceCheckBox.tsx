import React, { useState, MouseEvent, useEffect } from "react";
import styled from '@emotion/styled';

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';

interface CheckBoxProps{
  space: string;
}

interface SpaceProps{
  [key: string]: string;
}

const SpaceCheckBox = ({ space }: CheckBoxProps) =>{

  // Hooks
  const [ reservationSpaceArr, setReservationSpaceArr ] = useState<SpaceProps[]>();

  const onClickSpaceHandler = (e: any) =>{
    console.log(e);

    // 클릭 했을 때, 상태를 확인

  }

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

  return(
    <SpaceCheckBoxWrap>
      {/* 전체대관 개발 */}
      <SpaceWrap>
        <SpaceFloorWrap>1층</SpaceFloorWrap>
        {
          reservationSpaceArr && reservationSpaceArr.length > 0 ?
          reservationSpaceArr.map((el, index)=>{
            if(parseInt(el.floor) === 1){
              return(
                <SpaceRoomWrap key={index}>
                  <SpaceCheckBoxElement id={el.id} type='checkbox'/>
                  <SpaceRoomElement htmlFor={el.id} onClick={(e) => onClickSpaceHandler(e)}>{el.room}</SpaceRoomElement>
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
                  <SpaceCheckBoxElement id={el.id} type='checkbox'/>
                  <SpaceRoomElement htmlFor={el.id} onClick={(e) => onClickSpaceHandler(e)}>{el.room}</SpaceRoomElement>
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
                  <SpaceCheckBoxElement id={el.id} type='checkbox'/>
                  <SpaceRoomElement htmlFor={el.id} onClick={(e) => onClickSpaceHandler(e)}>{el.room}</SpaceRoomElement>
                </SpaceRoomWrap>
              )
            }
          })
          : ''
        }
      </SpaceWrap>
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

export default SpaceCheckBox;