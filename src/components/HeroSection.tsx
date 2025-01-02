"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { nextSlide, prevSlide, setCurrentSlide } from "@/redux/heroSlice";

const HomeHeroSection = () => {
  const dispatch = useDispatch();
  const { currentSlide, slides } = useSelector(
    (state: RootState) => state.hero
  );

  const handleNextSlide = useCallback(() => {
    dispatch(nextSlide());
  }, [dispatch]);

  const handlePrevSlide = useCallback(() => {
    dispatch(prevSlide());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(handleNextSlide, 3000);
    return () => clearInterval(timer);
  }, [handleNextSlide]);

  const handlers = useSwipeable({
    onSwipedLeft: handleNextSlide,
    onSwipedRight: handlePrevSlide,
    trackMouse: true,
  });

  return (
    <div
      className="relative w-full h-[calc(100vh-100px)]  overflow-hidden overflow-y-hidden"
      {...handlers}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
          />
        </div>
      ))}

      <button
        onClick={handlePrevSlide}
        className=" max-xs:hidden absolute top-1/2 left-4 transform -translate-y-1/2    rounded-full p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 text-[#0c1feb]" />
      </button>
      <button
        onClick={handleNextSlide}
        className=" max-xs:hidden absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 text-[#0c1feb]" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => dispatch(setCurrentSlide(index))}
            className={`w-4 h-4 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white bg-opacity-50 hover:bg-opacity-75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeHeroSection;
