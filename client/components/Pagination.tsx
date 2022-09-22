import styled from '@emotion/styled';

interface OProps{
  [key: string]: number;
}

interface PProps{
  paging: OProps;
  search: (page: number) => void;
}

const Pagination = ({ paging, search }: PProps) =>{

  // Arr
  const pagingArr: Array<number> = [];
  for( let index: number = paging.startPage; index <= paging.endPage; index++){
    pagingArr.push(index);
  }

  return(
    <PagingWrap>
      <PprevArrow onClick={() => search(1)}/>
      <PrevArrow onClick={() => search(paging.page === 1 ? 1 : paging.page - 1)}/>
      <PagingLists>
        {
          pagingArr.length !== 0 ?
          pagingArr.map((value, index)=>{
            return(
              <PagingList
                key={index}
                onClick={() => search(value)}
              >{value}</PagingList>
            )
          })
          :
          <PagingList
            onClick={() => search(1)}
          >1</PagingList>
        }
      </PagingLists>
      <NextArrow onClick={() => search(paging.endPage === paging.totalPage ? paging.totalPage : paging.endPage > paging.totalPage ? paging.endPage : paging.endPage + 1)}/>
      <NNextArrow onClick={() => search(paging.totalPage)}/>
    </PagingWrap>
  )
}

const PagingWrap = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '8px 0 0 0'
  }
)
const PprevArrow = styled.div(
  {
    width: '30px',
    height: '30px',
    background: 'url(/icons/first_page_black.svg) no-repeat center center',
    cursor: 'pointer',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      width: '25px',
      height: '25px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: '18px',
      height: '18px',
    }
  }
)
const PrevArrow = styled.div(
  {
    width: '30px',
    height: '30px',
    background: 'url(/icons/navigate_before_black.svg) no-repeat center center',
    cursor: 'pointer',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      width: '25px',
      height: '25px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: '18px',
      height: '18px',
    }
  }
)
const NextArrow = styled.div(
  {
    width: '30px',
    height: '30px',
    background: 'url(/icons/navigate_next_black.svg) no-repeat center center',
    cursor: 'pointer',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      width: '25px',
      height: '25px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: '18px',
      height: '18px',
    }
  }
)
const NNextArrow = styled.div(
  {
    width: '30px',
    height: '30px',
    background: 'url(/icons/last_page_black.svg) no-repeat center center',
    cursor: 'pointer',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      width: '25px',
      height: '25px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      width: '18px',
      height: '18px',
    }
  }
)
const PagingLists = styled.ul(
  {
    margin: '0 4px',
    display: 'flex'
  }
)
const PagingList = styled.li(
  {
    fontSize: '1.2rem',
    padding: '0 4px',
    cursor: 'pointer',

    /* Tablet */
    '@media screen and (max-width: 1024px)': {
      fontSize: '1.1rem',
      padding: '0 3px',
    },

    /* Phone */
    '@media screen and (max-width: 480px)': {
      fontSize: '1rem',
      padding: '0 2px',
    }
  }
)

export default Pagination;