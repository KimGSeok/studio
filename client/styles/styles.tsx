import { css, Global } from '@emotion/react';

export const globalStyles = (
  <Global
    styles={css`
      @import url(https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap);
      @import url(https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&family=Quicksand:wght@400;500&family=Rock+Salt&display=swap);

      *, *:after, *:before{
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
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
    `}
  />
)

/* Font Color */
export const fontWhite = css`
  color: #FFFFFF;
`

export const fontBlack = css`
  color: #333333;
`