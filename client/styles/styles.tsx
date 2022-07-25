import { css, Global } from '@emotion/react';

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
        -ms-overflow-style: none;

        ::-webkit-scrollbar {
          scroll-behavior: smooth;
          display: none;
        }
      }

      :is(ul, li){
        list-style: none;
        margin: 0;
        padding: 0;
      }

      select{
        outline: 0;
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

      .sun-editor .se-wrapper{
        height: 60vh;
      }
    `}
  />
)

export const Button = css`
  display: block;
  outline: 0;
  border: 0;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
`

/* Font Color */
export const FontWhite = css`
  color: #FFFFFF;
`

export const FontBlack = css`
  color: #333333;
`