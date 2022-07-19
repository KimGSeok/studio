import { useState } from 'react';
import { NextPage } from 'next'
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';

interface IImageProps{
  width?: string;
}

const Yeonhui:NextPage = () =>{

  const TabInfo = [ '1F', '2F', '3F', 'Garden' ];
  const [ checkTabList, setCheckTabList ] = useState(TabInfo[0]);

  return(
    <Main>
      <PageIntroWrap>
        <PageTitle>연희점</PageTitle>
        <TabListWrap>
          <TabLists>
            {
              TabInfo.map((value, key) =>{
                return(
                  <TabList
                    key={key}
                    css={checkTabList === value ? css`background-color: #fff;` : ''}
                    onClick={()=>setCheckTabList(value)}
                  >{value}</TabList>
                )
              })
            }
          </TabLists>
        </TabListWrap>
        <ContentWrap>
          {/* 1층 */
            checkTabList === '1F' ? 
            <>
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
            </> : ''
          }
          {/* 2층 */
            checkTabList === '2F' ? 
            <>
              <ContentTitle>Living Room</ContentTitle>
              <ContentImageWrap>
                <ContentImage
                  src='/images/space/yeonhui/2 Floor/Salon de siri25_L res.jpg'
                  width={16}
                  height={12}
                  layout={'responsive'}
                />
              </ContentImageWrap>
              <ContentTitle>Kitchen</ContentTitle>
              <ContentImageWrap>
                <ContentImage
                  src='/images/space/yeonhui/2 Floor/Salon de siri32_L res.jpg'
                  width={16}
                  height={12}
                  layout={'responsive'}
                />
                <ContentImage
                  src='/images/space/yeonhui/2 Floor/Salon de siri33_L res.jpg'
                  width={16}
                  height={12}
                  layout={'responsive'}
                />
              </ContentImageWrap>
              <ContentTitle>Room A</ContentTitle>
              <ContentImageWrap>
                <ContentImage
                  src='/images/space/yeonhui/2 Floor/Salon de siri27_L res.jpg'
                  width={16}
                  height={12}
                  layout={'responsive'}
                />
                <ContentImage
                  src='/images/space/yeonhui/2 Floor/Salon de siri28_L res.jpg'
                  width={16}
                  height={12}
                  layout={'responsive'}
                />
              </ContentImageWrap>
              <ContentTitle>Room B</ContentTitle>
              <ContentImageWrap
                width={'calc(33%) !important'}
              >
                <ImageArea width={'38%'}>
                  <ContentImage
                    src='/images/space/yeonhui/2 Floor/Salon de siri29_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'38%'}>
                  <ContentImage
                    src='/images/space/yeonhui/2 Floor/Salon de siri30_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'calc(24% - 10px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/2 Floor/Salon de siri31_L res.jpg'
                    width={4}
                    height={4.9}
                    layout={'responsive'}
                  />
                </ImageArea>
              </ContentImageWrap>
              <ContentTitle>BathRoom</ContentTitle>
              <ContentImageWrap>
                <ContentImage
                  src='/images/space/yeonhui/2 Floor/220611_MasiondeSiri0215(저해상).jpg'
                  width={16}
                  height={14}
                  layout={'responsive'}
                />
                <ContentImage
                  src='/images/space/yeonhui/2 Floor/220611_MasiondeSiri0219(저해상).jpg'
                  width={16}
                  height={14}
                  layout={'responsive'}
                />
              </ContentImageWrap>
            </> : ''
          }
          {/* 3층 */
            checkTabList === '3F' ? 
            <>
              <ContentTitle>Central Space</ContentTitle>
              <ContentImageWrap>
                <ContentImage
                  src='/images/space/yeonhui/3 Floor/Salon de siri05_L res.jpg'
                  width={16}
                  height={12}
                  layout={'responsive'}
                />
                <ContentImage
                  src='/images/space/yeonhui/3 Floor/Salon de siri01_L res.jpg'
                  width={16}
                  height={12}
                  layout={'responsive'}
                />
              </ContentImageWrap>
              <ContentTitle>Central Space</ContentTitle>
              <ContentImageWrap>
                <ImageArea width={'60%'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri21_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'calc(40% - 5px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri03_L res.jpg'
                    width={16}
                    height={18.15}
                    layout={'responsive'}
                  />
                </ImageArea>
              </ContentImageWrap>
              <ContentTitle>Room A</ContentTitle>
              <ContentImageWrap>
                <ImageArea width={'calc(33% - 1px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri06_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'calc(33% - 1px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri06_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'calc(33% - 1px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri10_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'33%'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri06_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'33%'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri09_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
              </ContentImageWrap>
              <ContentTitle>Room B</ContentTitle>
              <ContentImageWrap
                width={'calc(33%) !important'}
              >
                <ImageArea width={'38%'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri13_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'38%'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri12_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'calc(24% - 10px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri14_L res.jpg'
                    width={4}
                    height={4.9}
                    layout={'responsive'}
                  />
                </ImageArea>
              </ContentImageWrap>
              <ContentTitle>Room C</ContentTitle>
              <ContentImageWrap>
                <ImageArea width={'calc(33% - 1px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri15_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'calc(33% - 1px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri16_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'calc(33% - 1px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3 Floor/Salon de siri17_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
              </ContentImageWrap>
            </> : ''
          }
          {/* 3층 */
            checkTabList === 'Garden' ? 
            <>
              <ContentTitle>Terrace</ContentTitle>
              <ContentImageWrap>
                <ImageArea width={'calc(33% - 1px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3F Terrace/Salon de siri19_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'calc(33% - 1px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3F Terrace/Salon de siri20_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
                <ImageArea width={'calc(33% - 1px)'}>
                  <ContentImage
                    src='/images/space/yeonhui/3F Terrace/Salon de siri18_L res.jpg'
                    width={16}
                    height={12}
                    layout={'responsive'}
                  />
                </ImageArea>
              </ContentImageWrap>
            </> : ''
          }
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
const ContentImageWrap = styled.div<IImageProps>(
  {
    margin: '10px 0 36px 0',
    '& > :not(:last-of-type)': {
      margin: '0 5px 0 0 !important'
    }
  },
  props => ({
    '& > span': {
      width: props.width ? props.width : 'calc(50% - 5px) !important',
      display: 'inline-block !important',
    }
  })
)
const ImageArea = styled.div<IImageProps>(
  props => ({
    width: props.width,
    display: 'inline-block'
  })
)
const ContentImage = styled(Image)(
  {
    display: 'inline-block !important',
  },
)

export default Yeonhui;