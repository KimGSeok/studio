import { css } from '@emotion/react';

export const CalendarStyle = css`

  /* Calendar */
  .rdt{
    position: relative;
  }

  .rdt .rdtPicker{
    -webkit-transition:all .15s linear;
    -moz-transition:all .15s linear;
    transition:all .15s linear;
    margin-top:-20px;
    visibility:hidden;
    display:block;opacity:0
  }

  .rdt.rdtOpen .rdtPicker{
    opacity: 1;
    visibility: visible;
    margin-top: 0
  }

  .rdt input.form-control{
    border:0;
    background-size:0 2px,100% 1px;
    background-repeat:no-repeat;
    background-position:bottom,50% -moz-calc(100% - 1px);
    background-position:bottom,center calc(100% - 1px);
    background-color:transparent;
    -webkit-transition:background 0s ease-out;
    -moz-transition:background 0s ease-out;
    transition:background 0s ease-out;
    float:none;
    border-radius:0;
    height:36px;
    padding:5px 0;
    font-size:12px;
    font-family:Roboto,Helvetica,Arial,sans-serif;
    font-weight:400;
    line-height:1.42857;
    display:block;
    width:100%;
    color:#555;
    text-align: center;
  }

  .rdt input.form-control, .rdt input.form-control:focus{
    box-shadow: none;
    background-color: #F3F3F3;
    background-repeat: unset;
    border-radius: 6px;
    text-align: left;
    padding: 0 15px;
    color: #000000;
    font-family: "Spoqa Han Sans Neo", "sans-serif";

    &::placeholder{
      color: #000000;
      font-family: "Spoqa Han Sans Neo", "sans-serif";
    }
  }

  .rdt input.form-control:focus{
    outline:none;
    background-size:100% 2px,100% 1px;
    -webkit-transition-duration:.3s;
    -moz-transition-duration:.3s;
    transition-duration:.3s
  }

  .rdtPicker{
    display:none;
    position:absolute;
    width:260px;
    padding:4px;
    margin-top:1px;
    z-index:99999!important;
    background:#fff;
    border-radius:.125rem;
    -webkit-box-shadow:0 10px 50px 0 rgba(0,0,0,.2);
    box-shadow:0 10px 50px 0 rgba(0,0,0,.2);
    -webkit-background-clip:padding-box;
    background-clip:padding-box;
    min-width:160px
  }

  .rdtPicker:before{
    width:0;
    height:0;
    vertical-align:middle;
    right:auto;
    color:#fff;
    border-bottom:.4em solid
  }

  .rdtPicker:after,.rdtPicker:before{
    display:inline-block;
    position:absolute;
    content:"";
    top:-5px;
    left:10px;
    border-right:.4em solid transparent;
    border-left:.4em solid transparent
  }

  .rdtPicker:after{
    border-bottom:.4em solid #fff
  }

  .rdtPicker{
    display:block;
    top:40px
  }

  .rdtStatic .rdtPicker{
    -webkit-box-shadow:none;
    box-shadow:none;
    position:static
  }

  .rdtPicker .rdtTimeToggle{
    text-align:center;
    padding:5px;
    border-radius:4px
  }

  .rdtPicker table{
    width:100%;
    margin:0;
    border-color:#fff!important;
    border-collapse:collapse
  }

  .rdtPicker td,.rdtPicker th{
    text-align:center;
    padding:1px
  }

  .rdtPicker td{
    cursor:pointer
  }

  .rdtDay{
    height:30px;
    line-height:33px;
    width:30px;
    text-align:center;
    padding:0;
    border-radius:50%
  }

  .rdtDay.rdtActive,.rdtDay.rdtActive:hover,.rdtDay.rdtToday.rdtActive{
    background-color:#0F0F70!important;
    color:#fff;
    -webkit-box-shadow:0 5px 20px 0 rgba(0,0,0,.2),0 13px 24px -11px rgba(156,39,176,.6);
    box-shadow:0 5px 20px 0 rgba(0,0,0,.2),0 13px 24px -11px rgba(156,39,176,.6)
  }

  .rdtDays tr .dow{
    border-bottom:1px solid #e3e3e3;
    text-align:center;
    font-size:12px;
    text-transform:uppercase;
    font-weight:400;
    padding-bottom:5px;
    padding-top:10px
  }

  .rdtDays tr .rdtNew,.rdtDays tr .rdtOld{
    color:#bdbdbd
  }

  .rdtPicker .rdtTimeToggle:hover,.rdtPicker td.rdtDay:hover,.rdtPicker td.rdtHour:hover,.rdtPicker td.rdtMinute:hover,.rdtPicker td.rdtSecond:hover{
    background:#eee;
    cursor:pointer
  }

  .rdtPicker td.rdtToday{
    position:relative
  }

  .rdtPicker td.rdtActive.rdtToday:before{
    border-bottom-color:#fff
  }

  .rdtPicker td.rdtDisabled,.rdtPicker td.rdtDisabled:hover{
    background:none;
    color:#999;
    cursor:not-allowed
  }

  .rdtPicker td span.rdtOld{
    color:#999
  }

  .rdtPicker td span.rdtDisabled,.rdtPicker td span.rdtDisabled:hover{
    background:none;
    color:#999;
    cursor:not-allowed
  }

  .rdtPicker .dow{
    width:14.2857%;
    border-bottom:none
  }

  .rdtPicker th.rdtSwitch{
    width:50px;
    padding:5px;
    border-radius:4px
  }

  .rdtPicker th.rdtNext,.rdtPicker th.rdtPrev{
    font-size:21px;
    vertical-align:top;
    border-radius:50%;
    line-height:33px
  }

  .rdtPicker .dow,.rdtPicker .rdtTimeToggle,.rdtPicker th.rdtNext,.rdtPicker th.rdtPrev,.rdtPicker th.rdtSwitch{
    color:#495057
  }

  .rdtPicker .rdtTime th.rdtSwitch,.rdtPicker .rdtTimeToggle{
    color:#0F0F70
  }

  .rdtNext span,.rdtPrev span{
    display:block;
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none
  }

  .rdtPicker th.rdtDisabled,.rdtPicker th.rdtDisabled:hover{
    background:none;
    color:#999;
    cursor:not-allowed
  }

  .rdtPicker thead tr:first-child th{
    cursor:pointer
  }

  .rdtPicker thead tr:first-child th:hover{
    background:#eee;
  }

  .rdtPicker button{
    border:none;
    background:none;
    cursor:pointer
  }

  .rdtPicker button:hover{
    background-color:#eee;
  }

  .rdtPicker thead button{
    width:100%;
    height:100%
  }

  td.rdtMonth,td.rdtYear{
    height:50px;
    width:25%;
    cursor:pointer
  }

  td.rdtMonth:hover,td.rdtYear:hover{
    background:#eee
  }

  .rdtCounters{
    display:inline-block
  }

  .rdtCounters > div{
    float:left;
    width:40px;
    font-weight:inherit;
    margin:3px;
    border-radius:50%
  }

  .rdtCounters .rdtCounterSeparator{
    width:0;
    border:1px solid transparent
  }

  .rdtCounter{
    height:100px;
    width:40px
  }

  .rdtCounter .rdtCount{
    padding:7px;
    height:40px;
    border:1px solid transparent
  }

  .rdtCounters .rdtCounter:last-child .rdtCount{
    color:#0F0F70;
    border-radius:50%;
    border:1px solid #0F0F70
  }

  .rdtCounterSeparator{
    padding:7px;
    line-height:100px
  }

  .rdtCounter .rdtBtn{
    line-height:40px;
    cursor:pointer;
    display:block;
    border-radius:50%;
    color:#0F0F70;
    -webkit-transition:all 60ms ease-in;
    -moz-transition:all 60ms ease-in;
    transition:all 60ms ease-in;
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none
  }

  .rdtCounter .rdtBtn:hover{
    background:#eee
  }

  .rdtCounter .rdtCount{
    font-size:inherit;
    line-height:25px
  }

  .rdtMilli{
    vertical-align:middle;
    padding-left:8px;
    width:48px
  }

  .rdtMilli input{
    width:100%;
    font-size:inherit;
    margin-top:37px
  }

  .rdtMonths,.rdtYears{
    padding-bottom:10px
  }

  .rdtMonths .rdtMonth,.rdtMonths .rdtYear,.rdtYears .rdtMonth,.rdtYears .rdtYear{
    display:inline-block;
    width:56px;
    height:56px;
    line-height:56px;
    margin:3px;
    cursor:pointer;
    border-radius:50%;
    text-align:center
  }

  .rdtMonths .rdtMonth.rdtActive,.rdtMonths .rdtYear.rdtActive,.rdtYears .rdtMonth.rdtActive,.rdtYears .rdtYear.rdtActive{
    background-color:#0F0F70!important;
    color:#fff
  }

  .image-gallery-icon{
    color:#fff;
    -webkit-transition:all .2s ease-out;
    -moz-transition:all .2s ease-out;
    transition:all .2s ease-out;
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
    background-color:transparent;
    border:0;
    cursor:pointer;
    outline:none;
    position:absolute;
    z-index:4;
    -webkit-filter:drop-shadow(0 2px 2px #1a1a1a);
    filter:drop-shadow(0 2px 2px #1a1a1a)
  }

  @media (min-width:1024px){
    .image-gallery-icon:hover{
      color:#337ab7
    }

    .image-gallery-icon:hover .image-gallery-svg{
      -webkit-transform:scale(1.1);
      -moz-transform:scale(1.1);
      transform:scale(1.1)
    }
  }

  .image-gallery-icon:focus{
    outline:2px solid #337ab7
  }

  .image-gallery-using-mouse .image-gallery-icon:focus{
    outline:none
  }

  .image-gallery-fullscreen-button,.image-gallery-play-button{
    bottom:0;
    padding:20px
  }

  .image-gallery-fullscreen-button .image-gallery-svg,.image-gallery-play-button .image-gallery-svg{
    height:36px;
    width:36px
  }
    
  @media (max-width:1024px){
    .image-gallery-fullscreen-button,.image-gallery-play-button{
      padding:15px
    }

    .image-gallery-fullscreen-button .image-gallery-svg,.image-gallery-play-button .image-gallery-svg{
      height:24px;width:24px
    }
  }

  @media (max-width:480px){
    .image-gallery-fullscreen-button,.image-gallery-play-button{
      padding:10px
    }
    
    .image-gallery-fullscreen-button .image-gallery-svg,.image-gallery-play-button .image-gallery-svg{
      height:16px;
      width:16px
    }
  }

  .image-gallery-fullscreen-button{
    right:0
  }

  .image-gallery-play-button{
    left:0
  }

  .image-gallery-left-nav,.image-gallery-right-nav{
    padding:50px 10px;
    top:50%
  }

  .image-gallery-left-nav .image-gallery-svg,.image-gallery-right-nav .image-gallery-svg{
    height:120px;
    width:60px
  }

  @media (max-width:1024px){
    .image-gallery-left-nav .image-gallery-svg,.image-gallery-right-nav .image-gallery-svg{
      height:72px;width:36px
    }
  }

  @media (max-width:480px){
    .image-gallery-left-nav .image-gallery-svg,.image-gallery-right-nav .image-gallery-svg{
      height:48px;width:24px
    }
  }

  .image-gallery-left-nav[disabled],.image-gallery-right-nav[disabled]{
    cursor:disabled;
    opacity:.6;
    pointer-events:none
  }

  .image-gallery-left-nav{
    left:0
  }

  .image-gallery-right-nav{
    right:0
  }

  .image-gallery{
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    -o-user-select:none;
    user-select:none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    position:relative
  }

  .image-gallery.fullscreen-modal{
    background:#000;
    bottom:0;
    height:100%;
    left:0;
    position:fixed;
    right:0;
    top:0;
    width:100%;
    z-index:5
  }

  .image-gallery.fullscreen-modal .image-gallery-content{
    top:50%;
    -webkit-transform:translateY(-50%);
    -moz-transform:translateY(-50%);
    transform:translateY(-50%)
  }

  .image-gallery-content{
    position:relative;
    line-height:0;
    top:0
  }

  .image-gallery-content.fullscreen{
    background:#000
  }

  .image-gallery-content .image-gallery-slide .image-gallery-image{
    max-height:-moz-calc(100vh - 80px);
    max-height:calc(100vh - 80px)
  }

  .image-gallery-content.left .image-gallery-slide .image-gallery-image,.image-gallery-content.right .image-gallery-slide .image-gallery-image{
    max-height:100vh
  }

  .image-gallery-slide-wrapper{
    position:relative
  }

  .image-gallery-slide-wrapper.left,.image-gallery-slide-wrapper.right{
    display:inline-block;
    width:-moz-calc(100% - 110px);
    width:calc(100% - 110px)
  }

  @media (max-width:1024px){
    .image-gallery-slide-wrapper.left,.image-gallery-slide-wrapper.right{
      width:-moz-calc(100% - 87px);
      width:calc(100% - 87px)
    }
  }
    
  .image-gallery-slide-wrapper.image-gallery-rtl{
    direction:rtl
  }

  .image-gallery-slides{
    line-height:0;
    overflow:hidden;
    position:relative;
    white-space:nowrap;
    text-align:center
  }

  .image-gallery-slide{
    left:0;
    position:absolute;
    top:0;
    width:100%
  }

  .image-gallery-slide.center{
    position:relative
  }

  .image-gallery-slide .image-gallery-image{
    width:100%;
    object-fit:contain
  }

  .image-gallery-slide .image-gallery-description{
    background:rgba(0,0,0,.4);
    bottom:70px;
    color:#fff;
    left:0;
    line-height:1;
    padding:10px 20px;
    position:absolute;
    white-space:normal
  }

  @media (max-width:1024px){
    .image-gallery-slide .image-gallery-description{
      bottom:45px;
      font-size:.8em;
      padding:8px 15px
    }
  }

  .image-gallery-bullets{
    bottom:20px;
    left:0;
    margin:0 auto;
    position:absolute;
    right:0;
    width:80%;
    z-index:4
  }

  .image-gallery-bullets .image-gallery-bullets-container{
    margin:0;
    padding:0;
    text-align:center
  }

  .image-gallery-bullets .image-gallery-bullet{
    -webkit-appearance:none;
    -moz-appearance:none;
    appearance:none;
    background-color:transparent;
    border:1px solid #fff;
    border-radius:50%;
    -webkit-box-shadow:0 1px 0 #1a1a1a;
    box-shadow:0 1px 0 #1a1a1a;
    cursor:pointer;
    display:inline-block;
    margin:0 5px;
    outline:none;
    padding:5px;
    -webkit-transition:background .2s ease-out;
    -moz-transition:background .2s ease-out;
    transition:background .2s ease-out
  }

  @media (max-width:1024px){
    .image-gallery-bullets .image-gallery-bullet{
      margin:0 3px;
      padding:3px
    }
  }

  @media (max-width:480px){
    .image-gallery-bullets .image-gallery-bullet{
      padding:2.7px
    }
  }

  .image-gallery-bullets .image-gallery-bullet:focus,.image-gallery-bullets .image-gallery-bullet:hover{
    background:#337ab7;
    -webkit-transform:scale(1.1);
    -moz-transform:scale(1.1);
    transform:scale(1.1)
  }

  .image-gallery-bullets .image-gallery-bullet.active{
    background:#fff
  }

  .image-gallery-thumbnails-wrapper{
    position:relative
  }

  .image-gallery-thumbnails-wrapper.thumbnails-wrapper-rtl{
    direction:rtl
  }

  .image-gallery-thumbnails-wrapper.left,.image-gallery-thumbnails-wrapper.right{
    display:inline-block;
    vertical-align:top;
    width:100px
  }

  @media (max-width:1024px){
    .image-gallery-thumbnails-wrapper.left,.image-gallery-thumbnails-wrapper.right{
      width:81px
    }
  }

  .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails,.image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails{
    height:100%;
    width:100%;
    left:0;
    padding:0;
    position:absolute;
    top:0
  }

  .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails .image-gallery-thumbnail,.image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails .image-gallery-thumbnail{
    display:block;
    margin-right:0;
    padding:0
  }

  .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails .image-gallery-thumbnail+.image-gallery-thumbnail,.image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails .image-gallery-thumbnail+.image-gallery-thumbnail{
    margin-left:0;
    margin-top:2px
  }

  .image-gallery-thumbnails-wrapper.left,.image-gallery-thumbnails-wrapper.right{
    margin:0 5px
  }

  @media (max-width:1024px){
    .image-gallery-thumbnails-wrapper.left,.image-gallery-thumbnails-wrapper.right{
      margin:0 3px
    }
  }

  .image-gallery-thumbnails{
    padding:5px 0
  }

  @media (max-width:1024px){
    .image-gallery-thumbnails{
      padding:3px 0
    }
  }

  .image-gallery-thumbnails .image-gallery-thumbnails-container{
    cursor:pointer;
    text-align:center;
    -webkit-transition:-webkit-transform .45s ease-out;
    transition:-webkit-transform .45s ease-out;
    -moz-transition:transform .45s ease-out,-moz-transform .45s ease-out;
    transition:transform .45s ease-out;
    transition:transform .45s ease-out,-webkit-transform .45s ease-out,-moz-transform .45s ease-out;
    white-space:nowrap
  }

  .image-gallery-thumbnail{
    display:inline-block;
    border:4px solid transparent;
    -webkit-transition:border .3s ease-out;
    -moz-transition:border .3s ease-out;
    transition:border .3s ease-out;
    width:100px;
    background:transparent
  }

  @media (max-width:1024px){
    .image-gallery-thumbnail{
      border:3px solid transparent;
      width:81px
    }
  }

  .image-gallery-thumbnail+.image-gallery-thumbnail{
    margin-left:2px
  }

  .image-gallery-thumbnail .image-gallery-thumbnail-inner{
    position:relative
  }

  .image-gallery-thumbnail .image-gallery-thumbnail-image{
    vertical-align:middle;
    width:100%;
    line-height:0
  }

  .image-gallery-thumbnail.active,.image-gallery-thumbnail:focus,.image-gallery-thumbnail:hover{
    outline:none;
    border:4px solid #337ab7
  }

  @media (max-width:1024px){
    .image-gallery-thumbnail.active,.image-gallery-thumbnail:focus,.image-gallery-thumbnail:hover{
      border:3px solid #337ab7
    }
  }

  .image-gallery-thumbnail-label{
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
    color:#fff;
    font-size:1em;
    left:0;
    line-height:1em;
    padding:5%;
    position:absolute;
    top:50%;
    text-shadow:1px 1px 0 #000;
    -webkit-transform:translateY(-50%);
    -moz-transform:translateY(-50%);
    transform:translateY(-50%);
    white-space:normal;
    width:100%
  }

  @media (max-width:1024px){
    .image-gallery-thumbnail-label{
      font-size:.8em;line-height:.8em
    }
  }

  .image-gallery-index{
    background:rgba(0,0,0,.4);
    color:#fff;
    line-height:1;
    padding:10px 20px;
    position:absolute;
    right:0;
    top:0;
    z-index:4
  }

  @media (max-width:1024px){
    .image-gallery-index{
      font-size:.8em;
      padding:5px 10px
    }
  }

  .image-gallery-left-nav,.image-gallery-right-nav{
    position:absolute;
    cursor:pointer;
    z-index:100;
    opacity:.5;
    bottom:-40%;
    top:auto;
    padding:0!important;
    color:#fff;
    font-size:5em;
    outline:none;
    background-color:transparent;
    border:0;
    -webkit-transform:translateY(-50%);
    -moz-transform:translateY(-50%);
    transform:translateY(-50%)
  }

  .image-gallery-left-nav:before,.image-gallery-left-nav:hover:before,.image-gallery-right-nav:before,.image-gallery-right-nav:hover:before{
    color:#3c4858;
    text-shadow:none
  }

  .image-gallery-left-nav:before,.image-gallery-right-nav:before{
    font-family:Material Icons;
    font-weight:400;
    font-style:normal;
    font-size:24px;
    line-height:1;
    letter-spacing:normal;
    text-transform:none;
    display:inline-block;
    white-space:nowrap;
    word-wrap:normal;
    direction:ltr;
    -webkit-font-feature-settings:"liga";
    -webkit-font-smoothing:antialiased
  }

  .image-gallery-left-nav{
    left:-20px
  }

  .image-gallery-left-nav:before{
    content:"chevron_left"
  }

  .image-gallery-right-nav{
    right:-20px
  }

  .image-gallery-right-nav:before{
    content:"chevron_right"
  }

  .image-gallery-thumbnail{
    margin:0;
    padding:0;
    cursor:pointer;
    position:relative;
    line-height:0px;
    width:125px;
    border:none!important
  }

  .image-gallery-thumbnail+.image-gallery-thumbnail{
    margin:0!important
  }

  .image-gallery-thumbnail img{
    max-width:100%;
    cursor:pointer;
    position:relative;
    margin-top:10px;
    margin-bottom:10px
  }

  .image-gallery-thumbnail-label{
    display:none!important
  }

  .image-gallery-thumbnails{
    padding:0!important;
    overflow:hidden;
    width:100%
  }

  .image-gallery-thumbnails-container{
    position:relative;
    margin:0;
    padding:0;
    list-style-type:none;
    text-align:center
  }

  .slick-slider{
    position:relative;
    display:block;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    -webkit-touch-callout:none;
    -khtml-user-select:none;
    touch-action:pan-y;
    -webkit-tap-highlight-color:transparent
  }

  @media (min-width:1024px){
    .slick-slider .slick-caption{
      display:block!important
    }
  }

  .slick-slider .slick-caption{
    padding-bottom:45px;
    position:absolute;
    right:15%;
    bottom:20px;
    left:15%;
    z-index:10;
    padding-top:20px;
    color:#fff;
    text-align:center;
    z-index:3;
    display:none
  }

  .slick-slider .slick-slide>div:first-child{
    position:relative
  }

  .slick-slider .slick-icons{
    position:relative;
    top:5px
  }

  .slick-slider .slick-image{
    width:100%!important;
    display:-moz-inline-box!important;
    display:inline-flex!important
  }

  .slick-list{
    position:relative;
    display:block;
    overflow:hidden;
    margin:0;
    padding:0
  }

  .slick-list:focus{
    outline:none
  }

  .slick-list.dragging{
    cursor:pointer;
    cursor:hand
  }

  .slick-slider .slick-list,.slick-slider .slick-track{
    -webkit-transform:translateZ(0);
    -moz-transform:translateZ(0);
    transform:translateZ(0)
  }

  .slick-track{
    position:relative;
    top:0;
    left:0;
    display:block;
    margin-left:auto;
    margin-right:auto
  }

  .slick-track:after,.slick-track:before{
    display:table;
    content:""
  }

  .slick-track:after{
    clear:both
  }

  .slick-loading .slick-track{
    visibility:hidden
  }

  .slick-slide{
    display:none;
    float:left;
    height:100%;
    min-height:1px
  }[dir=rtl]

  .slick-slide{
    float:right
  }

  .slick-slide img{
    display:block
  }

  .slick-slide.slick-loading img{
    display:none
  }

  .slick-slide.dragging img{
    pointer-events:none
  }


  .slick-initialized .slick-slide{
    display:block
  }

  .slick-loading .slick-slide{
    visibility:hidden
  }

  .slick-vertical .slick-slide{
    display:block;
    height:auto;
    border:1px solid transparent
  }

  .slick-arrow.slick-hidden{
    display:none
  }

  button.slick-arrow.slick-next,button.slick-arrow.slick-prev{
    font-size:0;
    line-height:0;
    position:absolute;
    top:50%;
    display:block;
    height:100%;
    padding:0;
    -webkit-transform:translateY(-50%);
    -moz-transform:translateY(-50%);
    transform:translateY(-50%);
    cursor:pointer;
    border:none;
    color:transparent;
    outline:none;
    background:transparent;
    width:15%;
    z-index:2;
    opacity:.5
  }

  .slick-prev{
    left:0
  }

  .slick-prev:before{
    content:"\f053";
    font-weight:600;
    font-family:Font Awesome\ 5 Free;
    -moz-osx-font-smoothing:grayscale;
    -webkit-font-smoothing:antialiased;
    display:inline-block;
    font-style:normal;
    -moz-font-feature-settings:normal;
    font-feature-settings:normal;
    font-variant:normal;
    text-rendering:auto;
    line-height:1;
    color:#fff;
    font-size:30px;
    width:100%
  }

  .slick-next{
    right:0
  }

  .slick-next:before{
    content:"\f054";
    font-weight:600;
    font-family:Font Awesome\ 5 Free;
    -moz-osx-font-smoothing:grayscale;
    -webkit-font-smoothing:antialiased;
    display:inline-block;
    font-style:normal;
    -moz-font-feature-settings:normal;
    font-feature-settings:normal;
    font-variant:normal;
    text-rendering:auto;
    line-height:1;
    color:#fff;
    font-size:30px;
    width:100%
  }

  .slick-list{
    z-index:1
  }

  .slick-dots{
    margin-top:0;
    margin-bottom:1rem;
    position:absolute;
    bottom:5px;
    width:100%;
    padding:0;
    list-style:none;
    text-align:center;
    z-index:3
  }

  .slick-dots li,.slick-dots li button{
    width:20px;
    height:20px;
    cursor:pointer
  }

  .slick-dots li{
    position:relative;
    display:inline-block;
    margin:0 5px;
    padding:0
  }

  .slick-dots li button{
    font-size:0;
    line-height:0;
    display:block;
    padding:5px;
    color:transparent;
    border:0;
    outline:none;
    background:transparent
  }

  .slick-dots li button:before{
    position:absolute;
    top:0;
    left:0;
    width:10px;
    height:10px;
    content:"\2022";
    text-align:center;
    opacity:1;
    background-color:#fff;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    -webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);
    box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2);
    border-radius:2px;
    -webkit-transition:all .3s linear;
    -moz-transition:all .3s linear;
    transition:all .3s linear
  }

  .slick-dots li.slick-active button:before{
    width:15px;
    height:15px;
    -webkit-box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);
    box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.2);
    top:-3px
  }

  .react-tagsinput{
    display:inline-block;
    padding:4px 6px;
    max-width:100%;
    line-height:22px
  }

  .react-tagsinput-tag{
    cursor:pointer;
    margin:5px 3px 5px 0;
    position:relative;
    border-radius:12px;
    color:#fff;
    font-weight:500;
    font-size:.75em;
    text-transform:uppercase;
    display:inline-block;
    line-height:1.5em;
    padding:3px 8px 3px .8em
  }

  .react-tagsinput-remove{
    cursor:pointer;
    font-weight:700
  }

  .react-tagsinput-tag a:before{
    font-family:Font Awesome\ 5 Free;
    content:"\f00d";
    padding:0 2px;
    font-weight:900
  }

  .react-tagsinput-tag a{
    cursor:pointer;
    position:absolute;
    top:3px;
    right:0;
    opacity:0;
    background-color:transparent;
    color:#fff
  }

  .react-tagsinput-input{
    background:transparent;
    border:0;
    color:#777;
    font-family:sans-serif;
    font-size:13px;
    font-weight:400;
    margin-bottom:6px;
    margin-top:1px;
    outline:none;
    padding:5px;
    width:80px
  }

  .react-tagsinput .react-tagsinput-tag{
    -webkit-transition:all .3s ease 0s;
    -moz-transition:all .3s ease 0s;
    transition:all .3s ease 0s;
    background-color:#999
  }

  .react-tagsinput .react-tagsinput-tag:hover{
    padding-right:22px
  }

  .react-tagsinput .react-tagsinput-tag:hover a{
    opacity:1;
    padding-right:4px;
    background-color:transparent;
    color:#fff
  }

  .react-tagsinput .react-tagsinput-tag.primary{
    background-color:#0F0F70
  }

  .react-tagsinput .react-tagsinput-tag.info{
    background-color:#00bcd4
  }

  .react-tagsinput .react-tagsinput-tag.success{
    background-color:#4caf50
  }

  .react-tagsinput .react-tagsinput-tag.warning{
    background-color:#ff9800
  }

  .react-tagsinput .react-tagsinput-tag.danger{
    background-color:#f44336
  }

  .react-tagsinput .react-tagsinput-tag.rose{
    background-color:#e91e63
  }

  .react-tagsinput .react-tagsinput-tag.default{
    background-color:#999
  }
`