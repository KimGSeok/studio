import Image from 'next/image';
import styled from '@emotion/styled';
import Header from '../components/header';

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
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0, 0.35);
`

export default function Home(){
  return(
    <>
      <Header />
      <Main>
        <Section1>
          <Square_1/>
        </Section1>
      </Main>
    </>
  )
}