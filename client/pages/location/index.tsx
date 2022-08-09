import { NextPage } from 'next';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import TapYeonhui from './TapYeonhui';
import TapSeogyo from './TapSeogyo';

const Location:NextPage = () =>{

  const [ isTapMenu, isSetTapMenu ] = useState('yeonhui');

  return(
    <Main>
      <PageWrap>
        <PageTitle>오시는 길</PageTitle>
        <TabLists>
          <TabList
            css={isTapMenu === 'yeonhui' ? css`background-color: #fff; font-weight:500;` : ''}
            onClick={() => isSetTapMenu('yeonhui')}
          >연희점</TabList>
          <TabList
            css={isTapMenu === 'seogyo' ? css`background-color: #fff; font-weight:500;` : ''}
            onClick={() => isSetTapMenu('seogyo')}
          >서교점</TabList>
        </TabLists>
        {
          isTapMenu === 'yeonhui' ? <TapYeonhui /> : ''
        }
        {
          isTapMenu === 'seogyo' ? <TapSeogyo /> : ''
        }
      </PageWrap>
    </Main>
  )
}

const Main = styled.div(
  {
    padding: '80px 12% 40px 12%',
    background: 'rgba(247, 232, 213, 1)',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      padding: '80px 9% 40px 9%',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      padding: '80px 6% 40px 6%',
    }
  },
)
const PageWrap = styled.div(
  {
    padding: '24px 0'
  }
)
const PageTitle = styled.div(
  {
    fontSize: '1.6rem',
    fontWeight: 'bold',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '1.5rem',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '1.4rem',
    }
  }
)
const TabLists = styled.ul(
  {
    backgroundColor: '#ededed',
    borderRadius: '6px',
    border: '1px solid #e6e6e6',
    padding: '6px 8px',
    margin: '12px 0 12px 0',
  }
)
const TabList = styled.li(
  {
    minWidth: '100px',
    display: 'inline-block',
    padding: '8px 12px',
    borderRadius: '6px',
    margin: '0 12px 0 0',
    textAlign: 'center',
    cursor: 'pointer'
  }
)

export default Location;