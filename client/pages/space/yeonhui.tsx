import { NextPage } from 'next'
import styled from '@emotion/styled';
import Image from 'next/image';
import { spawn } from 'child_process';

const Yeonhui:NextPage = () =>{

  const TabInfo = [ '1F', '2F', '3F', 'Garden' ];

  // , '/imags/space/yeonhui/Salon de siri36_L res.jpg'

  return(
    <Main>
      <PageIntroWrap>
        <PageTitle>연희점</PageTitle>
        <TabListWrap>
          <TabLists>
            {
              TabInfo.map((value, key) =>{
                return(
                  <TabList key={key}>{value}</TabList>
                )
              })
            }
          </TabLists>
        </TabListWrap>
        <ContentWrap>
          <ContentTitle>Kitchen, Room A</ContentTitle>
          <ContentImageWrap>
            <ContentImage
              src='/images/space/yeonhui/1 Floor/Salon de siri35_L res.jpg'
              width={16}
              height={12}
              layout={'responsive'}
            />
            <ContentImage
              src='/images/space/yeonhui/1 Floor/Salon de siri36_L res.jpg'
              width={16}
              height={12}
              layout={'responsive'}
            />
          </ContentImageWrap>
          <ContentTitle>Room B, C</ContentTitle>
          <ContentImageWrap>
            <ContentImage
              src='/images/space/yeonhui/1 Floor/Salon de siri39_L res.jpg'
              width={16}
              height={12}
              layout={'responsive'}
            />
            <ContentImage
              src='/images/space/yeonhui/1 Floor/Salon de siri38_L res.jpg'
              width={16}
              height={12}
              layout={'responsive'}
            />
          </ContentImageWrap>
          <ContentTitle>Bathroom</ContentTitle>
          <ContentImageWrap>
            <ContentImage
              src='/images/space/yeonhui/1 Floor/Salon de siri40_L res.jpg'
              width={16}
              height={12}
              layout={'responsive'}
            />
            <ContentImage
              src='/images/space/yeonhui/1 Floor/Salon de siri37_L res.jpg'
              width={16}
              height={12}
              layout={'responsive'}
            />
          </ContentImageWrap>
        </ContentWrap>
      </PageIntroWrap>
    </Main>
  )
}

const Main = styled.div`
  padding: 80px 12% 40px 12%;
`
const PageIntroWrap = styled.div`
  margin: 18px 0;
`
const PageTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`
const TabListWrap = styled.div(
  {
    margin: '10px 0',
  }
)
const TabLists = styled.ul(
  {
    backgroundColor: '#E7E6E6',
    padding: '10px 12px',
    borderRadius: '6px',
  }
)
const TabList = styled.li(
  {
    minWidth: '80px',
    display: 'inline-block',
    margin: '0 15px 0 0',
    padding: '5px 20px',
    borderRadius: '6px',
    // backgroundColor: '#FFF',
    textAlign: 'center',
    cursor: 'pointer',
  }
)
const ContentWrap = styled.div(
  {
    margin: '10px 0',
  }
)
const ContentTitle = styled.div(
  {
    fontSize: '1.3rem',
    fontWeight: '500',
    color: '#947346',
    margin: '18px 0'
  }
)
const ContentImageWrap = styled.div(
  {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0 36px 0',
    '& > span': {
      width: 'calc(50% - 5px) !important',
    }
  },
)
const ContentImage = styled(Image)(
  {
    width: '50% !important',
  }
)

export default Yeonhui;