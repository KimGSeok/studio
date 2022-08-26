import React, { useState, MouseEvent, useEffect } from "react";
import styled from '@emotion/styled';

const SpaceCheckBox = () =>{

  const [ reservationSpaceArr, setReservationSpaceArr ] = useState([]);

  const onClickSpaceHandler = (e: any) =>{
    console.log(e);

    // 클릭 했을 때, 상태를 확인

  }

  return(
    <SpaceCheckBoxWrap>
      <SpaceWrap>
        <SpaceFloorWrap>1층</SpaceFloorWrap>
        <SpaceRoomWrap>
          <SpaceCheckBoxElement id="1" type='checkbox' />
          <SpaceRoomElement htmlFor="1" onClick={(e) => onClickSpaceHandler(e)}>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Room B, C</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Bathroom</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
          <SpaceRoomElement>Kitchen, Room A</SpaceRoomElement>
        </SpaceRoomWrap>
      </SpaceWrap>
      <SpaceWrap>
        <SpaceFloorWrap>2층</SpaceFloorWrap>
        <SpaceRoomWrap>
          <SpaceRoomElement>Living Room</SpaceRoomElement>
          <SpaceRoomElement>Kitchen</SpaceRoomElement>
          <SpaceRoomElement>Room A</SpaceRoomElement>
          <SpaceRoomElement>Room B</SpaceRoomElement>
          <SpaceRoomElement>BathRoom</SpaceRoomElement>
        </SpaceRoomWrap>
      </SpaceWrap>
      <SpaceWrap>
        <SpaceFloorWrap>3층</SpaceFloorWrap>
        <SpaceRoomWrap>
          <SpaceRoomElement>Central Space</SpaceRoomElement>
          <SpaceRoomElement>Room A</SpaceRoomElement>
          <SpaceRoomElement>Room B</SpaceRoomElement>
          <SpaceRoomElement>Room C</SpaceRoomElement>
        </SpaceRoomWrap>
      </SpaceWrap>
    </SpaceCheckBoxWrap>
  )
}

const SpaceCheckBoxWrap = styled.div(
  {
    backgroundColor: '#fff',
    border: '1px solid #d6d6d6',
    borderRadius: '4px',
    padding: '12px 8px',
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
    padding: '4px 0'
  }
)
const SpaceCheckBoxElement = styled.input(
  {
    display: 'none',
    ':checked + label': {
      color: 'red'
    },
  }
)
const SpaceRoomElement = styled.label(
  {
    width: 'calc(20% - 12px)',
    fontSize: '0.9rem',
    fontColor: '',
    display: 'inline-block',
    border: '1px solid #e6e6e6',
    borderRadius: '24px',
    padding: '8px 8px',
    textAlign: 'center',
    cursor: 'pointer',
    ':nth-of-type(5n-1), :nth-of-type(5n-3)': {
      margin: '6px 12px'
    },
  }
)

export default SpaceCheckBox;