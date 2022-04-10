import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const UserStory = (items: any, theme?: any) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      navigation={theme === 'pc'}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Navigation]}
      className="mySwiper"
    >
      {items && items.map((val) => <SwiperSlide>{val}</SwiperSlide>)}
    </Swiper>
  );
};

export const Efficient = (props: any) => {
  return (
    <div>
      <Swiper
        direction={'vertical'}
        loop={true}
        spaceBetween={300}
        speed={150}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        style={{
          height: '38px',
          paddingLeft: '8px',
          color: '#677CE5',
          letterSpacing: '0.05em',
        }}
      >
        <SwiperSlide>
          <div>Develop elegantly.</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>Run rapidly.</div>
        </SwiperSlide>
        <SwiperSlide>
          <div>Deploy universally.</div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export const MobileApplication = (items: any, styles: any) => {
  console.log('itemsitems', items);
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="myMobileSwiper"
    >
      {items &&
        items.map((val) => (
          <SwiperSlide>
            <div className={styles['mobile-application']}>
              <div className={styles['title']}>{val.title}</div>
              <div className={styles['description']}>{val.description}</div>
              <div className={styles['com']}>{val.component}</div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
