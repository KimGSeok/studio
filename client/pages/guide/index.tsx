import { NextPage } from 'next';
import styled from '@emotion/styled';

const Guide:NextPage = () => { 
  return(
    <Main>
      <PageIntroWrap>
        <PageTitle>이용안내</PageTitle>
        <PageSubTitle>Maison de Siri 이용안내</PageSubTitle>
      </PageIntroWrap>
      <PageContentWrap>
        <PageContent>
          <PageContentTitle>예약 방법</PageContentTitle>
          &#183; CALENDER 확인 후 RESERVATION 게시판 양식에 맞춰 게시물 작성 or 전화 예약<br/>
          &#183; 예약금 10만원을 입금하시면 확인 후 예약이 확정됩니다.<br/>
          &#183; 예약 내용 변경 및 취소는 전화 상담을 통해서만 가능합니다.
        </PageContent>
        <PageContent>
          <PageContentTitle>스튜디오 이용 안내 및 주의사항</PageContentTitle>
          &#183; 이용 시간은 촬영 시작이 아닌 준비 및 정리를 포함한 입, 퇴실 시간을 기준으로 합니다.<br/>
          &#183; 예약 시간보다 일찍 끝나는 경우에도 예약 시간을 기준으로 금액을 산정합니다.<br/>
          &#183; 사전에 협의된 촬영 시간을 초과할 경우, 금액 가이드에 따라 추가 금액이 발생합니다.<br/>
          &#183; 모든 오브제 및 가구는 퇴실 전 원래 위치로 이동 및 정리 부탁드립니다.<br/>
          &#183; 인테리어 집기와 오브제, 가구 등의 오염 및 파손 시 비용이 청구됩니다.<br/>
          &#183; 스튜디오 내부는 모두 금연 구역이며, 지정된 장소에서만 흡연이 가능합니다.
        </PageContent>
        <PageContent>
          <PageContentTitle>취소 및 환불 규정(총 이용금액 기준)</PageContentTitle>
          &#183; 촬영일 7일 전 100% 환불 가능<br/>
          &#183; 촬영일 4-5일 전 90% 환불 가능<br/>
          &#183; 촬영일 3일 전 50% 환불 가능<br/>
          &#183; 촬영일 1-2일 전 10% 환불 가능<br/>
          &#183; 당일 취소 및 변경 시 전액 환불 불가
        </PageContent>
        <PageContent>
          <PageContentTitle>이용 가능 물품</PageContentTitle>
          &#183; 전신 거울, 행거, 스팀 다리미, 블루투스 스피커
        </PageContent>
        <PageContent>
          <PageContentTitle>PRICE(1시간 / 5인 / 기본 2시간부터)</PageContentTitle>
          1F : 주방 + 다이닝룸 + 미니룸1 + 미니룸2 + 선큰 테라스 | 시간당 8만원<br/>
          2F : A room + B room + 리빙룸 + 주방 + 메이크업/탈의실 + 미니 테라스 | 시간당 10만원<br/>
          3F : A room + B room + C room + 거실 + TERRACE | 시간당 12만원<br/>
          Garden : 잔디마당 + 부뚜막 | 시간당 추가 2만원
        </PageContent>
        <PageContent>
          모두 1시간당 4인 기준 이용 금액이며, 최소 2시간부터 예약이 가능합니다.<br/>
          기준 인원 초과 시 1시간 기준 1인에 5천원의 추가 요금이 발생됩니다.<br/>
          세금계산서(현금영수증) 발행 시에는 부가세 10% 별도입니다.
        </PageContent>
        <PageContent>
          <PageContentTitle>입금 계좌</PageContentTitle>
          &#183; 신한은행 ㈜프로젝트에스 140-013-786689
        </PageContent>
      </PageContentWrap>
    </Main>
  )
}

const Main = styled.div({
  padding: '80px 12% 40px 12%',
  background: 'rgba(247, 232, 213, 1)',

  /* Tablet */
  '@media screen and (max-width: 1024px)': {
    padding: '80px 9% 40px 9%',
    background: 'rgba(247, 232, 213, 1)',
  },

  /* Phone */
  '@media screen and (max-width: 480px)': {
    padding: '80px 6% 40px 6%',
    background: 'rgba(247, 232, 213, 1)',
  }
})
const PageIntroWrap = styled.div({
  margin: '18px 0',

  /* Tablet */
  '@media screen and (max-width: 1024px)': {
    margin: '16px 0'
  },

  /* Phone */
  '@media screen and (max-width: 480px)': {
    margin: '14px 0'
  }
})
const PageTitle = styled.div({
  fontSize: '1.6rem',
  fontWeight: 'bold',

  /* Tablet */
  '@media screen and (max-width: 1024px)': {
    fontSize: '1.4rem',
  },

  /* Phone */
  '@media screen and (max-width: 480px)': {
    fontSize: '1.2rem',
  }
})
const PageSubTitle = styled.div({
  fontSize: '1.15rem',
  margin: '5px 0',

  /* Tablet */
  '@media screen and (max-width: 1024px)': {
    fontSize: '1.1rem',
    margin: '4px 0',
  },

  /* Phone */
  '@media screen and (max-width: 480px)': {
    fontSize: '1.05rem',
    margin: '3px 0',
  }
})
const PageContentWrap  = styled.div({
  lineHeight: '1.5rem',

  /* Tablet */
  '@media screen and (max-width: 1024px)': {
    lineHeight: '1.45rem',
    fontSize: '1rem',
    wordBreak: 'keep-all'
  },

  /* Phone */
  '@media screen and (max-width: 480px)': {
    lineHeight: '1.4rem',
    fontSize: '0.9rem',
    wordBreak: 'keep-all'
  }
})
const PageContent = styled.div`
  margin: 20px 0;
`
const PageContentTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  padding-bottom: 6px;
`

export default Guide;