import { Dispatch, SetStateAction, MouseEvent, ReactElement, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';

interface MProps{
  title: string;
  subTitle: string;
  children: ReactElement;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setIsCertification: Dispatch<SetStateAction<boolean>>;
}

const Modal = (props: MProps) => {

  const { title, subTitle, children, isShow, setIsShow, setIsCertification } = props;

  const onCloseModalHandler = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    setIsShow(!isShow);
  }

  useEffect(() =>{

    // ESC버튼 닫기
    const escPressCloseModalHandler = (e: KeyboardEvent) =>{
      if(e.keyCode === 27) setIsShow(!isShow);
    }

    window.addEventListener('keydown', escPressCloseModalHandler);

    return() => {
      window.removeEventListener('keydown', escPressCloseModalHandler);
    }
  },[])

  return(
    <ModalWrap>
      <ModalEl>
        <TitleWrap>
          <Title>{title}</Title>
          <CloseBtn
            src="/icons/close_black.svg"
            width={28}
            height={28}
            onClick={(e)=>onCloseModalHandler(e)}
          />
        </TitleWrap>
        <SubTitle>{subTitle}</SubTitle>
        <Content>{children}</Content>
      </ModalEl>
    </ModalWrap>
  )
}

const ModalWrap = styled.div(
  {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: '99'
  }
)
const ModalEl = styled.div(
  {
    maxWidth: '480px',
    margin: '160px auto 80px',
    padding: '24px 16px',
    backgroundColor: '#FFF',
    borderRadius: '6px'
  }
)
const TitleWrap = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '6px'
  }
)
const CloseBtn = styled(Image)(
  {
    cursor: 'pointer'
  }
)
const Title = styled.div(
  {
    fontSize: '1.2rem',
    fontWeight: '600'
  }
)
const SubTitle = styled.div({})
const Content = styled.div(
  {

  }
)

export default Modal;