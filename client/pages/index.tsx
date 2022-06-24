import Image from 'next/image';
import styled from '@emotion/styled';
import {
  fontWhite,
  button
} from '../styles/styles';

const Main = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
`

const Section1 = styled.section`
  width: 100%;
  height: 100vh;
  background: url(/images/home/home_bg_2-1.jpg) no-repeat;
  background-position: center;
  background-size: cover;
`

const Square_1 = styled.div`
  ${fontWhite}
  width: 40%;
  height: calc(100vh - 80px);
  background: rgba(0,0,0, 0.35);
  position: absolute;
  top: 80px;
`

const IntroTitle = styled.h1`
  text-align: center;
  font-size: 2.8rem;
  padding: 0 20px;
`

const IntroPointTitle = styled.div`
  display: inline-block;
  color: #fef7e5;
`

const Intro = styled.div`
  padding: 0 60px;
  line-height: 1.8rem;
  font-size: 1.15rem;
`

const Button = styled.button`
  ${button}
  background-color: #fef7e5; // FF7645
  color: #000;
  padding: 10px 24px;
  margin: 10px 0;
  font-weight: 600;
  margin-left: auto;
`

export default function Sample(){
  return(
    <>
      <Main>
        <Section1>
          <Square_1>
            <IntroTitle>
              [ Gallery <IntroPointTitle>Maison de SIRI</IntroPointTitle> ]
            </IntroTitle>
            <Intro>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum vel ex in auctor. Pellentesque ullamcorper consequat laoreet.<br />
                Pellentesque varius leo non ipsum mollis, et rhoncus lectus dignissim. Maecenas ullamcorper purus velit. Nullam eu efficitur velit.<br /> 
                Fusce pellentesque lectus a mi placerat facilisis. In eget turpis sit amet sapien maximus condimentum. <br />
              </p>
              <p>
                Suspendisse hendrerit pellentesque justo, id pellentesque nulla interdum eget. Donec ipsum tortor, condimentum tristique aliquet ac, tincidunt vel ligula.<br />
                Donec at facilisis nibh, id ultricies lacus. Donec lobortis eget sem rhoncus laoreet. Morbi porta vestibulum lorem, et aliquam odio ornare vel. <br />
                Sed mauris enim, sodales vel ultricies non, volutpat in ante.
              </p>
              <Button>갤러리 더 보기</Button>
            </Intro>
          </Square_1>
        </Section1>
      </Main>
    </>
  )
}