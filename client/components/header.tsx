import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  Button,
  FontWhite
} from '../styles/styles';

interface Routing{
  pathname: string;
}

interface HeaderProps{
  bgColor: string;
}

const Header = () => {

  const router = useRouter();
  const { pathname }: Routing = router;


  const handleScroll = () =>{
    
    // console.log(window.pageYOffset);
  }

  useEffect(()=>{

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[])

  return(
    <HeaderEl
      bgColor={pathname === '/' ? 'rgba(0,0,0, 0.5)' : 'rgba(247, 232, 213, 1)'}
      color={pathname === '/' ? '#fff' : '#000'}
    >
      <GnbWrap>
        <Gnb>
          <Logo>
            <Link href="/">Maison de Siri</Link>
          </Logo>
          <GnbLists>
            <GnbList>
              <Link href="/guide">Guide</Link>
            </GnbList>
            <GnbList>
              Space
              <LnbLists>
                <LnbList>
                  <Link href="/space/yeonhui">연희점</Link>
                </LnbList>
                <LnbList>
                  <Link href="/space/seogyo">서교점</Link>
                </LnbList>
              </LnbLists>
            </GnbList>
            <GnbList>
              Schedule
              <LnbLists>
                <LnbList>
                  <Link href="/schedule/yeonhui">연희점</Link>
                </LnbList>
                <LnbList>
                  <Link href="/schedule/seogyo">서교점</Link>
                </LnbList>
              </LnbLists>
            </GnbList>
            <GnbList>
              <Link href="/reservation">Reservation</Link>
            </GnbList>
            <GnbList>
              Library
              <LnbLists>
                <LnbList>
                  <Link href="/library/yeonhui">연희점</Link>
                </LnbList>
                <LnbList>
                  <Link href="/library/seogyo">서교점</Link>
                </LnbList>
              </LnbLists>
            </GnbList>
            <GnbList>
              <Link href="/location">Location</Link>
            </GnbList>
            {/* <GnbList>로그인</GnbList> */}
          </GnbLists>
        </Gnb>
      </GnbWrap>
    </HeaderEl>
  )
}

const HeaderEl = styled('header')<HeaderProps>`
  ${FontWhite}
  width: 100%;
  height: 80px;
  position: fixed;
  color: ${props => props.color};
  background: ${props => props.bgColor};
  z-index: 2;
`
const GnbWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`
const Gnb = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 12%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.15rem;
`
const Logo = styled.div`
  width: auto;
  font-weight: 500;
  font-size: 1.2rem;
  transition: 0.2s;
`
const GnbLists = styled.ul`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LnbLists = styled.ul`
  width: 100px;
  display: block;
  position: absolute;
`
const LnbList = styled.li`
  font-size: 1.1rem;
  line-height: 48px;
  border: 1px solid #e6e6e6;
  color: #000;
  display: none;
  background-color: #fff;
  border-top: 0;
  cursor: pointer;
`
const GnbList = styled.li`
  width: 100px;
  line-height: 80px;
  text-align: center;
  margin: 0 16px;
  transition: 0.2s;
  font-weight: 500;

  &:hover{
    ${LnbList}{
      display: block;
    }
  }
`
export default Header;