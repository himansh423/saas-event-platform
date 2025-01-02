import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import img1 from "../../public/hackathonImage.webp";
import img2 from "../../public/hackathonImage.webp";
import img3 from "../../public/hackathonImage.webp";

interface Slide {
  image: typeof img1;
  title: string;
  description: string;
}

interface HeroState {
  currentSlide: number;
  slides: Slide[];
}

const initialState: HeroState = {
  currentSlide: 0,
  slides: [
    {
      image: img1,
      title: "Unveiling Bridal Elegance",
      description: "Step into unmatched beauty with our timeless lehengas, crafted for every special moment.",
    },
    {
      image: img2,
      title: "Celebrate Tradition in Style",
      description: "Our exquisite lehengas combine intricate detailing with modern sophistication for any occasion.",
    },
    {
      image: img3,
      title: "Redefining Festive Grace",
      description: "Experience the perfect blend of vibrant designs and luxurious fabrics with our exclusive collection.",
    },
  ],
};

const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    nextSlide: (state) => {
      state.currentSlide = (state.currentSlide + 1) % state.slides.length;
    },
    prevSlide: (state) => {
      state.currentSlide = (state.currentSlide - 1 + state.slides.length) % state.slides.length;
    },
    setCurrentSlide: (state, action: PayloadAction<number>) => {
      state.currentSlide = action.payload;
    },
  },
});

export const { nextSlide, prevSlide, setCurrentSlide } = heroSlice.actions;
export default heroSlice;