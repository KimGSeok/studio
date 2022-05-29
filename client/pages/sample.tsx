import Image from 'next/image';
import styled from '@emotion/styled';
import Header from '../components/sample';

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
  width: 45%;
  height: calc(100vh - 80px);
  background: rgba(0,0,0, 0.35);
  position: absolute;
  top: 80px;
`

export default function Sample(){
  return(
    <>
      <Header />
      <Main>
        <Section1>
        </Section1>
        <Square_1 />
      </Main>
    </>
  )
}