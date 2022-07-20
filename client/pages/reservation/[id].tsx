import { NextPage } from "next";
import styled from '@emotion/styled';

const DetailReservation:NextPage = () =>{
  return(
    <Main>
      예약하기 상세 페이지
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%'
  }
)

export default DetailReservation;