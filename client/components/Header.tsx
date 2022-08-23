import { useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import {
  FontWhite
} from '../styles/styles';

interface SProps{
  setIsShowSquare?: Dispatch<SetStateAction<boolean>>;
}

interface Routing{
  pathname: string;
}

interface HeaderProps{
  bgColor: string;
  boxShadow: string;
}

interface MProps{
  left: string;  
}

const Header = ({ setIsShowSquare }: SProps) => {

  // Hooks
  const router = useRouter();
  const { pathname }: Routing = router;
  const [ isShowMobileNav, setShowMobileNav ] = useState(false);

  // onMouseHoverEvent
  const logoHoverEventHandler = (e: MouseEvent<HTMLDivElement>) =>{
    if(setIsShowSquare){
      if(e.type === 'mouseenter'){
        setIsShowSquare(true);
      }else if(e.type === 'mouseleave'){
        setIsShowSquare(false);
      }
    }
  }

  // Router Event
  Router.events.on('routeChangeComplete', (url) => {
    setShowMobileNav(false);
  })

  const showMobileMenu = (e:MouseEvent<HTMLImageElement | HTMLDivElement>) =>{
    setShowMobileNav(!isShowMobileNav);
  }

  return(
    <HeaderEl
      bgColor={pathname === '/' ? 'rgba(247, 232, 213, 0.45)' : 'rgba(237, 221, 202, 1)'}
      boxShadow={pathname === '/' ? '' : '0 1px 5px 1px rgb(5 5 5 / 10%)'}
      color={pathname === '/' ? '#632e24' : '#000'}
    >
      <GnbWrap>
        <Gnb>
          <Link href='/'>
            <Logo
              onMouseEnter={(e) => (logoHoverEventHandler(e))}
              onMouseLeave={(e) => (logoHoverEventHandler(e))}
            >
              Maison de Siri
            </Logo>
          </Link>
          <GnbListWrap left={isShowMobileNav ? '0' : '100vw'}>
            <GnbLists>
              <Link href='/guide'>
                <GnbList>
                  Guide
                </GnbList>
              </Link>
              <GnbList>
                Space
                <LnbLists>
                  <Link href='/space/yeonhui'>
                    <LnbList>
                      연희점
                    </LnbList>
                  </Link>
                  <Link href='/space/seogyo'>
                    <LnbList>
                      서교점
                    </LnbList>
                  </Link>
                </LnbLists>
              </GnbList>
              <GnbList>
                Schedule
                <LnbLists>
                  <Link href='/schedule/yeonhui'>
                    <LnbList>
                      연희점
                    </LnbList>
                  </Link>
                  <Link href='/schedule/seogyo'>
                    <LnbList>
                      서교점
                    </LnbList>
                  </Link>
                </LnbLists>
              </GnbList>
              <Link href='/reservation'>
                <GnbList>
                  Reservation
                </GnbList>
              </Link>
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
                Location
                <LnbLists>
                <Link href='/location/yeonhui'>
                  <LnbList>
                    연희점
                  </LnbList>
                </Link>
                <Link href='/location/seogyo'>
                  <LnbList>
                    서교점
                  </LnbList>
                </Link>
              </LnbLists>
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
  box-shadow: ${props => props.boxShadow};
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
  font-size: 1.1rem;

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
  font-size: 1.3rem;
  transition: 0.2s;
  cursor: pointer;
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
  cursor: pointer;

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
  border: 1px solid #d6cbbf;
  color: #000;
  display: none;
  background-color: rgba(247, 232, 213, 0.45);
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