import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';

export const globalStyles = (
  <Global
    styles={css`
      @import url(https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

      :is(html,body){
        margin: 0;
        padding: 0;
      }
    `}
  />
)