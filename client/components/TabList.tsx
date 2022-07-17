import { MouseEvent } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

interface TabProps{
  tabInfo: string[];
}

const TabListComponent = (props: TabProps) =>{

  const onClickTabHandler = (e:MouseEvent<HTMLLIElement>) =>{

  }

  return(
    <TabListWrap>
    </TabListWrap>
  )
}

const TabListWrap = styled.div(
  {
    margin: '10px 0',
  }
)
const TabLists = styled.ul(
  {
    backgroundColor: '#E7E6E6',
    padding: '10px 12px',
    borderRadius: '6px',
  }
)
const TabList = styled.li(
  {
    minWidth: '80px',
    display: 'inline-block',
    margin: '0 15px 0 0',
    padding: '5px 20px',
    borderRadius: '6px',
    // backgroundColor: '#FFF',
    textAlign: 'center',
    cursor: 'pointer',
  }
)
const ContentWrap = styled.div(
  {
    margin: '10px 0',
  }
)
const ContentTitle = styled.div(
  {
    fontSize: '1.3rem',
    fontWeight: '500',
    color: '#947346'
  }
)

export default TabListComponent