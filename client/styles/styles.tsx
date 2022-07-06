import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

export const globalStyles = (
  <Global
    styles={css`
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
      
      *, *:after, *:before{
        box-sizing: border-box;
        font-family: 'Pretendard';
      }

      :is(html,body){
        width: 100%;
        height: auto;
        margin: 0;
        padding: 0;
      }

      :is(ul, li){
        list-style: none;
        margin: 0;
        padding: 0;
      }

      a{
        text-decoration: none;
        color: inherit;
      }

      .swiper{
        height: 100vh;
      }

      .swiper-pagination-bullet-active{
        --swiper-theme-color: #fff;
      }
    `}
  />
)

export const button = css`
  display: block;
  outline: 0;
  border: 0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
`

/* Font Color */
export const fontWhite = css`
  color: #FFFFFF;
`

export const fontBlack = css`
  color: #333333;
`