/* =========================================================
   CEILINGCRAFT — HOME 2 HERO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const hero = document.querySelector(".home2-hero");
  const video = document.querySelector(".hero-video");

  if (!hero || !video) return;


  /* =======================================================
     LUCIDE ICONS
     ======================================================= */

  function refreshIcons() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }

  refreshIcons();


  /* =======================================================
     VIDEO SETUP
     ======================================================= */

  video.muted = true;
  video.playsInline = true;

  /*
   * Try to start the video.
   * Some browsers may block autoplay, so we
   * gracefully handle the promise.
   */

  const startVideo = () => {

    video.play().catch(() => {
      console.log("Hero video autoplay was blocked.");
    });

  };

  if (video.readyState >= 2) {
    startVideo();
  } else {
    video.addEventListener("loadeddata", startVideo, {
      once: true
    });
  }


  /* =======================================================
     VIDEO ERROR RECOVERY
     ======================================================= */

  video.addEventListener("error", () => {

    console.warn("Hero video could not be loaded.");

    /*
     * Keep poster image visible if video fails.
     */
    video.style.opacity = "0";

  });


  /* =======================================================
     PAUSE VIDEO WHEN HERO IS NOT VISIBLE
     ======================================================= */

  const videoObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          video.play().catch(() => {});

        } else {

          video.pause();

        }

      });

    },
    {
      threshold: 0.15
    }
  );

  videoObserver.observe(hero);


  /* =======================================================
     REDUCED MOTION
     ======================================================= */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function handleReducedMotion() {

    if (reducedMotion.matches) {

      video.pause();

    } else {

      video.play().catch(() => {});

    }

  }

  handleReducedMotion();

  reducedMotion.addEventListener(
    "change",
    handleReducedMotion
  );


  /* =======================================================
     HERO VIDEO PARALLAX
     ======================================================= */

  let ticking = false;

  function updateParallax() {

    const rect = hero.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    /*
     * Only animate while hero is near the viewport.
     */
    if (
      rect.bottom >= 0 &&
      rect.top <= viewportHeight
    ) {

      const progress =
        (viewportHeight - rect.top) /
        (viewportHeight + rect.height);

      const movement =
        (progress - 0.5) * 35;

      video.style.transform =
        `scale(1.04) translateY(${movement}px)`;

    }

    ticking = false;

  }

  function requestParallax() {

    if (!ticking) {

      window.requestAnimationFrame(
        updateParallax
      );

      ticking = true;

    }

  }

  if (!reducedMotion.matches) {

    window.addEventListener(
      "scroll",
      requestParallax,
      { passive: true }
    );

  }


  /* =======================================================
     HERO SCROLL BUTTON
     ======================================================= */

  const scrollButton =
    document.querySelector(".hero-secondary-btn");

  if (scrollButton) {

    scrollButton.addEventListener("click", (event) => {

      const targetId =
        scrollButton.getAttribute("href");

      if (
        targetId &&
        targetId.startsWith("#")
      ) {

        const target =
          document.querySelector(targetId);

        if (target) {

          event.preventDefault();

          target.scrollIntoView({
            behavior:
              reducedMotion.matches
                ? "auto"
                : "smooth",
            block: "start"
          });

        }

      }

    });

  }


  /* =======================================================
     CLEANUP ON PAGE UNLOAD
     ======================================================= */

  window.addEventListener("pagehide", () => {

    video.pause();

    videoObserver.disconnect();

  });

});