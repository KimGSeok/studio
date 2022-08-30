import React, { useState, ChangeEvent, useEffect } from "react";
import styled from '@emotion/styled';
import Modal from '../components/Modal';

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';

interface CheckBoxProps{
  space: string;
}

interface SpaceProps{
  [key: string]: string;
}

const SpaceCheckBox = ({ space }: CheckBoxProps) =>{

  // Hooks
  const [ reservationSpaceArr, setReservationSpaceArr ] = useState<SpaceProps[]>([]);
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ checkedItem, setCheckedItem ] = useState<string[]>([]);

  // 공간선택 onChange Handler
  const onChangeSpaceHandler = (e: ChangeEvent<HTMLInputElement>, id: string) =>{
    e.stopPropagation();

    const isChecked = e.target.checked;

    // 체크박스 선택 시
    if(isChecked){
      setCheckedItem([...checkedItem, id]);
    }
    // 체크박스 선택 해제 시
    else{
      setCheckedItem(checkedItem.filter((el) => el !== id));
    }
  }

  // 전체선택 onChange Handler
  const onChangeAllSpaceHandler = (e: ChangeEvent<HTMLInputElement>) =>{
    e.stopPropagation();

    const isChecked = e.target.checked;

    // 전체 체크박스 선택 시
    if(isChecked){

      const allArr:string[] = [];
      reservationSpaceArr.forEach((el) => allArr.push(el.id));
      setCheckedItem(allArr);
    }
    // 전체 체크박스 선택 해제 시
    else{
      setCheckedItem([]);
    }
  }

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
            checked={checkedItem.length === reservationSpaceArr.length ? true : false}
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
                    onChange={(e) => onChangeSpaceHandler(e, el.id)}
                    checked={checkedItem.includes(el.id) ? true : false}
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
                    onChange={(e) => onChangeSpaceHandler(e, el.id)}
                    checked={checkedItem.includes(el.id) ? true : false}
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
                    onChange={(e) => onChangeSpaceHandler(e, el.id)}
                    checked={checkedItem.includes(el.id) ? true : false}
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
                    onChange={(e) => onChangeSpaceHandler(e, el.id)}
                    checked={checkedItem.includes(el.id) ? true : false}
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
          title={'예약시 입력하신 비밀번호를 입력해주세요.'}
          subTitle={'작성자와 관리자만 열람하실 수 있습니다.'}
          children={
            <>
              야호
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

export default SpaceCheckBox;