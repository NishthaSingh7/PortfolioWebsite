const carouselSlider = new Swiper(".carousel-slider", {
  grabCursor: true,
  watchSlidesProgress: true,
  loop: true,
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 20,
  initialSlide: 0,

  on: {
    progress(swiper) {
      const totalSlides = swiper.slides.length;

      for (let i = 0; i < totalSlides; i++) {
        const slide = swiper.slides[i];
        const progress = slide.progress || 0;
        const absProgress = Math.abs(progress);

        let multiplier = 1;
        if (absProgress > 1) {
          multiplier = 0.3 * (absProgress - 1) + 1;
        }

        const translateX = `${progress * multiplier * 50}%`;
        const scale = 1 - 0.2 * absProgress;
        const zIndex = totalSlides - Math.abs(Math.round(progress));
        const opacity = absProgress > 3 ? 0 : 1;

        slide.style.transform = `translateX(${translateX}) scale(${scale})`;
        slide.style.zIndex = zIndex;
        slide.style.opacity = opacity;

        const contents = slide.querySelectorAll(".item-content");
        contents.forEach((el) => {
          el.style.opacity = (1 - absProgress / 3).toString();
        });
      }
    },

    setTransition(swiper, duration) {
      swiper.slides.forEach((slide) => {
        slide.style.transitionDuration = `${duration}ms`;

        const contents = slide.querySelectorAll(".item-content");
        contents.forEach((el) => {
          el.style.transitionDuration = `${duration}ms`;
        });
      });
    }
  }
});

