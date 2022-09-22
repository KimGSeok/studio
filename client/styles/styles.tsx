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

      .fc-icon-chevron-left:before{
        content: url("/icons/navigate_before_white.svg");
      }

      .fc-icon-chevron-right:before{
        content: url("/icons/navigate_next_white.svg");
      }

      /* FullCalendar 예약현황 이벤트 */
      .fc-daygrid-dot-event .fc-event-title{
        text-overflow: ellipsis;
      }

      .fc-h-event .fc-event-title-container{
        font-size: 0.9rem;
        padding: 2px;
        text-align: center;
        cursor: pointer
      }

      .fc-theme-standard .fc-scrollgrid{
        border-bottom-width: 0;
      }

      .fc-theme-standard .fc-scrollgrid{
        border-color: #d6cbbf;
      }

      .fc-theme-standard td, .fc-theme-standard th{
        border: 1px solid #d6cbbf;
      }

      /* Tablet */
      @media screen and (max-width: 1024px){

        .fc .fc-toolbar-title{
          font-size: 1.4rem;
        }

        .fc .fc-button-primary{
          font-size: 1rem;
        }

        .fc .fc-button-group{
          font-size: 0.5rem;
        }
      };

      /* Phone */
      @media screen and (max-width: 480px){

        .fc .fc-toolbar-title{
          font-size: 1.2rem;
        }

        .fc .fc-button-primary{
          font-size: 0.7rem;
        }

        .fc .fc-button-group{
          font-size: 0.2rem;
        }

        .fc-icon-chevron-left:before, .fc-icon-chevron-right:before{
          position: relative;
          top: -4px;
          left: -4px;
        }

        .fc .fc-view-harness {
          height: 40vh !important;
          font-size: 0.7rem;
        }
      };
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