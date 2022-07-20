import { NextPage } from "next";
import styled from '@emotion/styled';

const Reservation:NextPage = () =>{
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
      <PageContentWrap>
        <ReservationTable>
          <ReservationThead>
            <ReservationTrow>
              <ReservationTheader>순번</ReservationTheader>
              <ReservationTheader>제목</ReservationTheader>
              <ReservationTheader>작성자</ReservationTheader>
              <ReservationTheader>조회수</ReservationTheader>
              <ReservationTheader>작성날짜</ReservationTheader>
            </ReservationTrow>
          </ReservationThead>
          <ReservationTbody>
            <ReservationTrow>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
              <ReservationTData>1</ReservationTData>
            </ReservationTrow>
          </ReservationTbody>
        </ReservationTable>
      </PageContentWrap>
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%'
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
    minWidth: '240px',
    minHeight: '32px',
    padding: '0 8px',
    border: '1px solid #b3b3b3',
    borderLeft: '0',
    borderRight: '0',
    fontSize: '1rem'
  }
)
const SearchBtn = styled.div(
  {
    minHeight: '32px',
    border: '1px solid #b3b3b3',
    padding: '5px 12px',
    fontSize: '1rem'
  }
)
const PageContentWrap = styled.div(
  {

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
    borderBottom: '1px solid #e6e6e6'
  }
)
const ReservationTbody = styled.tbody(
  {
    
  }
)
const ReservationTrow = styled.tr(
  {
    
  }
)
const ReservationTheader = styled.th(
  {
    
  }
)
const ReservationTData = styled.td(
  {
    
  }
)
export default Reservation;