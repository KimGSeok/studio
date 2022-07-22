import { GetServerSideProps, NextPage } from "next";
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import Router from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? 'http://localhost:3001/server' : 'http://www.maisondesiri.com/server';

const Reservation:NextPage = () =>{

   /* 상세 페이지 */
   const goDetail = (id: number) =>{
    console.log(id);
    Router.push({
      pathname: `/reservation/${id}`,
    })
  }

  return(
    <Main>
      <PageIntroWrap>
        <SearchInfo>전체 검색결과는 &#91; <SearchCount>9,999</SearchCount> &#93; 건 입니다.</SearchInfo>
        <SearchWrap>
          <SearchCondition>
            <option>전체</option>
            <option>예약자명</option>
            <option>제목</option>
          </SearchCondition>
          <SearchInput placeholder="검색어를 입력해주세요."/>
          <SearchBtn>검색하기</SearchBtn>
        </SearchWrap>
      </PageIntroWrap>
      <WriteBtn>글쓰기</WriteBtn>
      <PageContentWrap>
        <ReservationTable>
          <ReservationThead>
            <ReservationThrow>
              <ReservationTheader>순번</ReservationTheader>
              <ReservationTheader>제목</ReservationTheader>
              <ReservationTheader>작성자</ReservationTheader>
              <ReservationTheader>조회수</ReservationTheader>
              <ReservationTheader>작성날짜</ReservationTheader>
            </ReservationThrow>
          </ReservationThead>
          <ReservationTbody>
            <ReservationTrow onClick={()=>goDetail(1)}>
              <ReservationTData width={'6%'}>1</ReservationTData>
              <ReservationTData width={'60%'} css={css`text-align: left;`}>3</ReservationTData>
              <ReservationTData width={'10%'}>1</ReservationTData>
              <ReservationTData width={'10%'}>1</ReservationTData>
              <ReservationTData width={'14%'}>1</ReservationTData>
            </ReservationTrow>
            <ReservationTrow>
              <ReservationTData>2</ReservationTData>
              <ReservationTData css={css`text-align: left;`}>3</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
            </ReservationTrow>
            <ReservationTrow>
              <ReservationTData>3</ReservationTData>
              <ReservationTData css={css`text-align: left;`}>3</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
            </ReservationTrow>
            <ReservationTrow>
              <ReservationTData>4</ReservationTData>
              <ReservationTData css={css`text-align: left;`}>3</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
            </ReservationTrow>
            <ReservationTrow>
              <ReservationTData>5</ReservationTData>
              <ReservationTData css={css`text-align: left;`}>3</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
            </ReservationTrow>
            <ReservationTrow>
              <ReservationTData>6</ReservationTData>
              <ReservationTData css={css`text-align: left;`}>3</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
            </ReservationTrow>
            <ReservationTrow>
              <ReservationTData>7</ReservationTData>
              <ReservationTData css={css`text-align: left;`}>3</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
            </ReservationTrow>
            <ReservationTrow>
              <ReservationTData>8</ReservationTData>
              <ReservationTData css={css`text-align: left;`}>3</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
            </ReservationTrow>
            <ReservationTrow>
              <ReservationTData>9</ReservationTData>
              <ReservationTData css={css`text-align: left;`}>3</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
            </ReservationTrow>
            <ReservationTrow>
              <ReservationTData>10</ReservationTData>
              <ReservationTData css={css`text-align: left;`}>3</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
            </ReservationTrow>
          </ReservationTbody>
        </ReservationTable>
        <>페이징</>
      </PageContentWrap>
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%',
    height: 'calc(100vh - 220px)'
  }
)
const PageIntroWrap = styled.div(
  {
    margin: '18px 0 12px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
)
const SearchInfo = styled.div(
  {
    fontSize: '1.2rem',
  }
)
const SearchCount = styled.span(
  {
    fontWeight: 'bold'
  }
)
const SearchWrap = styled.div(
  {
    display: 'flex',
    alignItems: 'center'
  }
)
const SearchCondition = styled.select(
  {
    position: 'relative',
    right: '0',
    border: '1px solid #b3b3b3',
    minHeight: '32px',
    padding: '0 2px',
    fontSize: '1rem'
  }
)
const SearchInput = styled.input(
  {
    minWidth: '320px',
    minHeight: '32px',
    padding: '0 8px',
    border: '1px solid #b3b3b3',
    borderLeft: '0',
    borderRight: '0',
    fontSize: '1rem',
    ':focus, :active':{
      outline: '0',
    }
  },
)
const SearchBtn = styled.div(
  {
    minHeight: '32px',
    border: '1px solid #b8b8b8',
    padding: '5px 12px',
    fontSize: '1rem',
    cursor: 'pointer'
  }
)
const WriteBtn = styled.div(
  {
    marginLeft: 'auto',
    display: 'block',
    minWidth: '80px',
    maxWidth: '100px',
    minHeight: '32px',
    border: '1px solid #b8b8b8',
    padding: '6px 12px',
    fontSize: '1rem',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer'
  }
)
const PageContentWrap = styled.div(
  {
    margin: '12px 0 0 0'
  }
)
const ReservationTable = styled.table(
  {
    width: '100%',
    borderCollapse: 'collapse'
  }
)
const ReservationThead = styled.thead(
  {
    borderTop: '1px solid #e6e6e6',
    borderBottom: '1px solid #e6e6e6',
  }
)
const ReservationThrow = styled.tr(
  {
    borderBottom: '1px solid #e6e6e6',
  }
)
const ReservationTbody = styled.tbody(
  {
  }
)
const ReservationTrow = styled.tr(
  {
    borderBottom: '1px solid #e6e6e6',
    ':hover':{
      backgroundColor: '#f4f8f8',
      cursor: 'pointer'
    }
  }
)
const ReservationTheader = styled.th(
  {
    padding: '8px 0',
    fontSize: '1.1rem'
  }
)
const ReservationTData = styled.td(
  {
    textAlign: 'center',
    padding: '12px 8px'
  },
  props => ({
    width: props.width
  })
)

export const getServerSideProps:GetServerSideProps = async (context) =>{

  try{

    const url = `${API_URL}/reservation`;
    const result = await axios.get(url);

    console.log(result.data);

    return {
      props: {
        data: result.data
      }
    }
  }catch(err){
    console.log("예약페이지 에러발생");
    return{
      props: {
        result: err
      }
    }
  }
}

export default Reservation;