import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CarouselImages } from "./carouselImage";

const Carousel = () => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true
      };
      console.log(settings);
    
    return (
        <div className="w-[1000px] mx-auto">
            <Slider {...settings}>
                {
                    CarouselImages?.map(image => image?.img)
                }
            </Slider>
        </div>
    );
};

export default Carousel;