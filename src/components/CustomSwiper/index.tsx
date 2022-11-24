import { FC, ReactNode } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

interface CSwiperProps extends SwiperProps {
  children: ReactNode;
}

const CustomSwiper: FC<CSwiperProps> = ({ children }) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={4}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      style={{
        width: '100%',
        // height: 300,
        padding: '10px',
      }}
    >
      {children}
    </Swiper>
  );
};

export default CustomSwiper;
