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
        pauseOnHover: true,
      };
      console.log(settings);
    
    return (
        <div className="lg:w-[1000px] md:w-[70%] sm:w-full xsm:w-full mx-auto">
            <Slider {...settings}>
                {
                    CarouselImages?.map(image => image?.img)
                }
            </Slider>
        </div>
    );
};

export default Carousel;