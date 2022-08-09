import { NextPage } from 'next';
import Image from 'next/image';
import styled from '@emotion/styled';
import router from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Button
} from '../styles/styles';

const Home:NextPage = () =>{
  return(
    <Main>
      <Square1>
        <Intro>
          <p>
            메종 드 시리는 연희동과 서교동에 자리한 단독주택형 렌탈 공간으로, 매거진 에디터와 방송 PD, 광고기획자로 구성된 디자인&아티스트 그룹의 차별화된 감각과 아이디어가 더해진 라이프스타일 컨셉 스튜디오 입니다.
          </p>
          <p>
            영상, 사진, 희화, 스타일링 등에 특화된 소속 크루들과의 협업을 통해 보다 돋보이는 광고, 홍보 컨텐츠 또한 별도 제작 가능합니다.
          </p>
          <p>
            하이엔드 가구와 명품 벽지, 품격 있는 오브제들로 채워진 각각의 공간에서 보다 완성도 높은 컨텐츠를 만들어보세요.
          </p>
        </Intro>
        <ButtonEl onClick={() => (router.push({
          pathname: '/space/yeonhui'
        }))}>갤러리 더 보기</ButtonEl>
      </Square1>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          speed={850}
          loop={true}
          pagination={{
            clickable: true,
          }}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <SliderImage
              src="/images/home/Salon de siri05_L res.jpg"
              layout={'fill'}
              priority={true}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderImage
              src="/images/home/Salon de siri13_L res.jpg"
              layout={'fill'}
              priority={true}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderImage
              src="/images/home/Salon de siri25_L res.jpg"
              layout={'fill'}
              priority={true}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderImage
              src="/images/home/Salon de siri30_L res.jpg"
              layout={'fill'}
              priority={true}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderImage
              src="/images/home/Salon de siri34_L res.jpg"
              layout={'fill'}
              priority={true}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SliderImage
              src="/images/home/Salon de siri36_L res.jpg"
              layout={'fill'}
              priority={true}
            />
          </SwiperSlide>
        </Swiper>
    </Main>
  )
}

const Main = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;

  @media screen and (max-width: 1366px){
    width: 200vw;
    position: relative;
    left: -50%;
  }
`
const SliderImage = styled(Image)`
`
const Square1 = styled.div`
  width: 30%;
  padding: 20px 0;
  height: calc(100vh - 80px);
  background: rgba(247, 232, 213, 0.45);
  color: #632e24;
  font-weight: 500;
  position: absolute;
  top: 80px;
  z-index: 2;

  @media screen and (max-width: 1366px){
    display: none;
  }
`
const Intro = styled.div`
  padding: 80px 40px;
  line-height: 1.6rem;
  font-size: 1rem;
  text-align: center;

  p{
    word-break: keep-all;
  }
`
const ButtonEl = styled.button`
  ${Button}
  color: #000;
  padding: 10px 24px;
  margin: 70px 40px;
  font-weight: 600;
  margin-left: auto;
  background: rgba(255, 255, 255, 0.7);
`

export default Home;