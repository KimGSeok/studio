import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Header from '../components/sample2';
import {
  fontWhite,
  button
} from '../styles/styles';

const Main = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  overflow: hidden;
`

const Section1 = styled.section`
  width: 60%;
  height: 100vh;
  background: url(/images/home/home_bg_2-1.jpg) no-repeat;
  background-position: center;
  background-size: cover;
`

const Square_1 = styled.div`
  ${fontWhite}
  width: 60%;
  height: calc(100vh - 80px);
  background: rgba(0,0,0, 0.35);
  position: absolute;
  top: 80px;
`

const Section2 = styled.section`
  width: 40%;
  height: 100vh;
  padding: 0 0 2rem 0;
`

const IntroTitle = styled.div`
  width: 100%;
  height: 80px;
  margin: 0 0 30px 0;
  text-align: center;
  border-bottom: 1px solid #e6e6e6;
`

const Title = styled.h1`
  display: inline-block;
  width: fit-content;
  font-size: 1.7rem;
  box-shadow: inset 0 -8px rgb(255 131 49 / 25%);
`

const GalleyLists = styled.ul`
  width: 100%;
  height: auto;
  padding: 0 3rem;
  overflow-y: auto;
`

const GalleyList = styled.li`
  width: 100%;
  height: 360px;
  position: relative;
  border-radius: 8px;
  box-shadow: 2px 2px 5px 3px rgb(53 60 73 / 25%);

  :not(:last-child){
    margin-bottom: 2rem;
  }
`

const GradientBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 30%, #000);
  border-radius: 8px;
  opacity: 0.5;
  z-index: 1;
`

const ListText = styled.div`
  ${fontWhite}
  position: absolute;
  width: 100%;
  line-height: 1.35rem;
  font-size: 1.05rem;
  padding: 1rem;
  bottom: 0.5rem;
  z-index: 2;
`

const ListImage = styled(Image)`
  border-radius: 8px;
  z-index: 0;
`

export default function Sample(){
  return(
    <>
      <Main>
        <Section1>
          <Header />
          <Square_1>
          </Square_1>
        </Section1>
        <Section2>
          <IntroTitle>
            <Title>BEST Gallery Introduce</Title>
          </IntroTitle>
          <GalleyLists>
            <GalleyList>
              <GradientBackground />
              <ListText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum vel ex in auctor. Pellentesque ullamcorper consequat laoreet.<br />
                Pellentesque varius leo non ipsum mollis, et rhoncus lectus dignissim. Maecenas ullamcorper purus velit. Nullam eu efficitur velit.<br /> 
              </ListText>
              <ListImage
                src="/images/home/list_1.jpg"
                layout={"fill"}
              />
            </GalleyList>
            <GalleyList>
              <GradientBackground />
              <ListText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum vel ex in auctor. Pellentesque ullamcorper consequat laoreet.<br />
                Pellentesque varius leo non ipsum mollis, et rhoncus lectus dignissim. Maecenas ullamcorper purus velit. Nullam eu efficitur velit.<br /> 
              </ListText>
              <ListImage
                src="/images/home/list_2.jpg"
                layout={"fill"}
              />
            </GalleyList>
            <GalleyList>
              <GradientBackground />
              <ListText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum vel ex in auctor. Pellentesque ullamcorper consequat laoreet.<br />
                Pellentesque varius leo non ipsum mollis, et rhoncus lectus dignissim. Maecenas ullamcorper purus velit. Nullam eu efficitur velit.<br /> 
              </ListText>
              <ListImage
                src="/images/home/list_3.jpg"
                layout={"fill"}
              />
            </GalleyList>
            <GalleyList>
              <GradientBackground />
              <ListText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum vel ex in auctor. Pellentesque ullamcorper consequat laoreet.<br />
                Pellentesque varius leo non ipsum mollis, et rhoncus lectus dignissim. Maecenas ullamcorper purus velit. Nullam eu efficitur velit.<br /> 
              </ListText>
              <ListImage
                src="/images/home/list_4.jpg"
                layout={"fill"}
              />
            </GalleyList>
            <GalleyList>
              <GradientBackground />
              <ListText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum vel ex in auctor. Pellentesque ullamcorper consequat laoreet.<br />
                Pellentesque varius leo non ipsum mollis, et rhoncus lectus dignissim. Maecenas ullamcorper purus velit. Nullam eu efficitur velit.<br /> 
              </ListText>
              <ListImage
                src="/images/home/list_5.jpg"
                layout={"fill"}
              />
            </GalleyList>
          </GalleyLists>
        </Section2>
      </Main>
    </>
  )
}