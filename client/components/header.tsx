import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  fontWhite
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

  console.log(pathname);

  const handleScroll = () =>{
    console.log(window.pageYOffset);
  }

  useEffect(()=>{

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  },[])

  return(
    <HeaderEl
      bgColor="red"
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
            <GnbList>Space</GnbList>
            <GnbList>Schedule</GnbList>
            <GnbList>Reservation</GnbList>
            <GnbList>Library</GnbList>
            <GnbList>Location</GnbList>
          </GnbLists>
        </Gnb>
      </GnbWrap>
    </HeaderEl>
  )
}

const HeaderEl = styled('header')<HeaderProps>`
  ${fontWhite}
  width: 100%;
  height: 80px;
  position: fixed;
  color: ${props => props.bgColor};
  background: rgba(0,0,0, 0.5);
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
  font-weight: 300;
  font-size: 1.2rem;
  width: auto;
`

const GnbLists = styled.ul`
  display: flex;
  justify-content: center;
`

const GnbList = styled.li`
  width: 100px;
  padding: 5px 0;
  text-align: center;
  margin: 0 16px;
  transition: 0.5s;
  font-weight: 500;
  cursor: pointer;
`

export default Header;