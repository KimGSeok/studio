import { GetServerSideProps, NextPage, NextPageContext } from "next";
import styled from '@emotion/styled';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';

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

export const getServerSideProps: GetServerSideProps = async(context) =>{

  const { id }: any = context.params;

  const url = `${API_URL}/reservation/${id}`;
  const result = await axios.get(url);

  return{
    props:{

    }
  }
}

export default DetailReservation;