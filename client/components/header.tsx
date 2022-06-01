import styled from '@emotion/styled';
import {
  fontWhite
} from '../styles/styles';

const Header = styled.header`
  ${fontWhite}
  width: 100%;
  height: 80px;
  position: fixed;
  border-bottom: 1px solid #dedede;
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
  padding: 0 15%;
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

  &:hover{
    transform: scale( 1.15 );
  }
`

export default function header(){
  return(
    <Header>
      <GnbWrap>
        <Gnb>
            <Logo>
              Maison de SIRI
            </Logo>
            <GnbLists>
              <GnbList>Gallery</GnbList>
              <GnbList>Room</GnbList>
              <GnbList>Guide</GnbList>
              <GnbList>Notice</GnbList>
              <GnbList>Reservation</GnbList>
              <GnbList>Contact</GnbList>
            </GnbLists>
        </Gnb>
      </GnbWrap>
    </Header>
  )
}