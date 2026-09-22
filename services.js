/* =========================================================
   CEILINGCRAFT
   TESTIMONIAL SLIDER
   ========================================================= */

function initTestimonials() {

  const track = document.getElementById("testimonialTrack");
  const prevButton = document.getElementById("testimonialPrev");
  const nextButton = document.getElementById("testimonialNext");
  const dots = document.querySelectorAll(
    ".services-testimonial-dot"
  );

  if (!track || !prevButton || !nextButton || !dots.length) {
    return;
  }


  /* =======================================================
     VARIABLES
     ======================================================= */

  const slides = track.querySelectorAll(
    ".services-testimonial-slide"
  );

  const totalSlides = slides.length;

  let currentSlide = 0;

  let autoPlay;


  /* =======================================================
     UPDATE SLIDER
     ======================================================= */

  function updateSlider(index) {

    currentSlide = index;

    const isRTL =
      document.body.classList.contains("rtl");

    let translateValue;

    if (isRTL) {
      translateValue = currentSlide * 100;
    } else {
      translateValue = currentSlide * -100;
    }

    track.style.transform =
      `translateX(${translateValue}%)`;


    /* Update dots */

    dots.forEach((dot, dotIndex) => {

      const isActive =
        dotIndex === currentSlide;

      dot.classList.toggle(
        "active",
        isActive
      );

      if (isActive) {
        dot.setAttribute(
          "aria-current",
          "true"
        );
      } else {
        dot.removeAttribute(
          "aria-current"
        );
      }

    });

  }


  /* =======================================================
     NEXT
     ======================================================= */

  function nextSlide() {

    const nextIndex =
      (currentSlide + 1) % totalSlides;

    updateSlider(nextIndex);

  }


  /* =======================================================
     PREVIOUS
     ======================================================= */

  function previousSlide() {

    const previousIndex =
      (currentSlide - 1 + totalSlides) %
      totalSlides;

    updateSlider(previousIndex);

  }


  /* =======================================================
     BUTTON EVENTS
     ======================================================= */

  nextButton.addEventListener(
    "click",
    function () {

      nextSlide();

      restartAutoPlay();

    }
  );


  prevButton.addEventListener(
    "click",
    function () {

      previousSlide();

      restartAutoPlay();

    }
  );


  /* =======================================================
     DOT EVENTS
     ======================================================= */

  dots.forEach((dot) => {

    dot.addEventListener(
      "click",
      function () {

        const index =
          Number(
            this.dataset.testimonial
          );

        updateSlider(index);

        restartAutoPlay();

      }
    );

  });


  /* =======================================================
     AUTO PLAY
     ======================================================= */

  function startAutoPlay() {

    autoPlay = setInterval(
      nextSlide,
      6000
    );

  }


  function stopAutoPlay() {

    clearInterval(autoPlay);

  }


  function restartAutoPlay() {

    stopAutoPlay();

    startAutoPlay();

  }


  /* =======================================================
     PAUSE ON HOVER
     ======================================================= */

  const slider =
    document.querySelector(
      ".services-testimonials-slider"
    );

  if (slider) {

    slider.addEventListener(
      "mouseenter",
      stopAutoPlay
    );

    slider.addEventListener(
      "mouseleave",
      startAutoPlay
    );

  }


  /* =======================================================
     TOUCH / SWIPE
     ======================================================= */

  let touchStartX = 0;

  let touchEndX = 0;


  track.addEventListener(
    "touchstart",
    function (event) {

      touchStartX =
        event.changedTouches[0].screenX;

      stopAutoPlay();

    },
    {
      passive: true
    }
  );


  track.addEventListener(
    "touchend",
    function (event) {

      touchEndX =
        event.changedTouches[0].screenX;

      const swipeDistance =
        touchStartX - touchEndX;


      if (Math.abs(swipeDistance) > 50) {

        if (swipeDistance > 0) {

          nextSlide();

        } else {

          previousSlide();

        }

      }

      startAutoPlay();

    },
    {
      passive: true
    }
  );


  /* =======================================================
     KEYBOARD NAVIGATION
     ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      const activeElement =
        document.activeElement;

      const isTyping =
        activeElement &&
        (
          activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA"
        );

      if (isTyping) {
        return;
      }


      if (event.key === "ArrowRight") {

        nextSlide();

        restartAutoPlay();

      }


      if (event.key === "ArrowLeft") {

        previousSlide();

        restartAutoPlay();

      }

    }
  );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  updateSlider(0);

  startAutoPlay();

}


/* =========================================================
   INITIALIZE WITH DOM
   ========================================================= */

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    initTestimonials
  );

} else {

  initTestimonials();

}