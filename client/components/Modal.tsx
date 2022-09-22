import { Dispatch, SetStateAction, MouseEvent, ReactElement, useEffect } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

interface MProps{
  title: string;
  subTitle: string;
  children: ReactElement;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  setIsCertification?: Dispatch<SetStateAction<boolean>>;
}

const Modal = (props: MProps) => {

  const { title, subTitle, children, isShow, setIsShow } = props;

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
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: '99',
  }
)
const ModalEl = styled.div(
  {
    maxWidth: '700px',
    margin: '160px auto 80px',
    padding: '24px 16px',
    backgroundColor: '#FFF',
    borderRadius: '6px',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      margin: '140px auto 80px',
      padding: '20px 14px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      margin: '120px 20px 80px',
      padding: '18px 12px',
    }
  }
)
const TitleWrap = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '6px',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      marginBottom: '5px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      marginBottom: '4px',
    }
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
    fontWeight: '600',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '1.1rem',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '1rem',
    }
  }
)
const SubTitle = styled.div({
  /* Tablet */
  '@media screen and (max-width: 1024px)': {
    fontSize: '1rem',
  },

  /* Phone */
  '@media screen and (max-width: 480px)': {
    fontSize: '0.9rem',
  } 
})
const Content = styled.div(
  {

  }
)

export default Modal;