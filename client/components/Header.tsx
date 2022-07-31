import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import Image from 'next/image';
import Router, { useRouter } from 'next/router';
import { useState, MouseEvent } from 'react';
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

interface MProps{
  left: string;  
}

const Header = () => {

  const router = useRouter();
  const { pathname }: Routing = router;

  const [ isShowMobileNav, setShowMobileNav ] = useState(false);

  Router.events.on('routeChangeComplete', (url) => {
    setShowMobileNav(false);
  })

  const showMobileMenu = (e:MouseEvent<HTMLImageElement | HTMLDivElement>) =>{
    console.log(3);
    setShowMobileNav(!isShowMobileNav);
  }

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
          <GnbListWrap
            left={isShowMobileNav ? '0' : '100vw'}
          >
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
              {/* <GnbList>
                Library
                <LnbLists>
                  <LnbList>
                    <Link href="/library/yeonhui">연희점</Link>
                  </LnbList>
                  <LnbList>
                    <Link href="/library/seogyo">서교점</Link>
                  </LnbList>
                </LnbLists>
              </GnbList> */}
              <GnbList>
                <Link href="/location">Location</Link>
              </GnbList>
              {/* <GnbList>로그인</GnbList> */}
            </GnbLists>
            {
              !isShowMobileNav ?
              <MobileMenu onClick={(e) => showMobileMenu(e)}>
                <Image
                  src="/icons/menu_black.svg"
                  width={34}
                  height={34}
                />
              </MobileMenu>
              :
              <MobileCloseBtn>
                <MobileCloseIcon
                  onClick={(e) => showMobileMenu(e)}
                  src="/icons/close_black.svg"
                  width={34}
                  height={34}
                />
              </MobileCloseBtn>
            }
          </GnbListWrap>
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
  z-index: 99;
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

  /* Tablet */
  @media screen and (max-width: 1024px){
    padding: 0 8%;
  }

  /* Phone */
  @media screen and (max-width: 480px){
    padding: 0 6%;
  }
`
const Logo = styled.div`
  width: auto;
  font-weight: 500;
  font-size: 1.2rem;
  transition: 0.2s;
`
const GnbListWrap = styled.div<MProps>(
  {
    transition: 'all .5s',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      width: '100%',
      height: '100vh',
      position: 'absolute',
      top: '80px',
      left: '100vw',
      backgroundColor: '#fff',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: '100%',
      height: '100vh',
      position: 'absolute',
      top: '80px',
      left: '100vw',
      backgroundColor: '#fff'
    }
  },
  props =>(
    {
      /* Tablet */
      '@media screen and (max-width: 1024px)': {
        left: props.left
      },

      /* Phone */
      '@media screen and (max-width: 480px)': {
        left: props.left
      }
    }
  )
)
const GnbLists = styled.ul`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Tablet */
  @media screen and (max-width: 1024px){
    display: inline-block;
    width: 100%;
    background-color: #f8f9fa;
  }

  /* Phone */
  @media screen and (max-width: 480px){
    display: inline-block;
    width: 100%;
    background-color: #f8f9fa;
  }
`
const LnbLists = styled.ul`
  width: 100px;
  display: block;
  position: absolute;

  /* Tablet */
  @media screen and (max-width: 1024px){
    position: relative;
    width: 100%;
  }

  /* Phone */
  @media screen and (max-width: 480px){
    position: relative;
    width: 100%;
  }
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

  /* Tablet */
  @media screen and (max-width: 1024px){
    position: relative;
    width: 100%;
    line-height: 54px;
    border: 0;
    background-color: #f8f9fa;
  }

  /* Phone */
  @media screen and (max-width: 480px){
    position: relative;
    width: 100%;
    line-height: 48px;
    border: 0;
    background-color: #f8f9fa;
  }
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

  /* Tablet */
  @media screen and (max-width: 1024px){
    width: 100%;
    line-height: 54px;
    margin: 0;
    background-color: #fff;

    :last-of-type{
      border-bottom: 1px solid #dadada;
    }
  }

  /* Phone */
  @media screen and (max-width: 480px){
    width: 100%;
    line-height: 48px;
    margin: 0;
    background-color: #fff;

    :last-of-type{
      border-bottom: 1px solid #dadada;
    }
  }
`
const MobileMenu = styled.div(
  {
    display: 'none',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      display: 'block',
      position: 'fixed',
      top: '24px',
      right: '24px',
      cursor: 'pointer'
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      display: 'block',
      position: 'fixed',
      top: '24px',
      right: '24px',
      cursor: 'pointer'
    }
  }
)
const MobileCloseBtn = styled.div(
  {
    display: 'none',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      display: 'block',
      position: 'fixed',
      top: '24px',
      right: '24px',
      cursor: 'pointer',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      display: 'block',
      position: 'fixed',
      top: '24px',
      right: '24px',
      cursor: 'pointer'
    }
  }
)
const MobileCloseIcon = styled(Image)({})

export default Header;