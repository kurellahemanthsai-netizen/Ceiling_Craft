/* =========================================================
   CEILINGCRAFT
   COMING SOON PAGE JAVASCRIPT
   COUNTDOWN + DARK MODE + RTL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


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
     ELEMENTS
     ======================================================= */

  const rtlToggle =
    document.getElementById("comingSoonRtlToggle");

  const themeToggle =
    document.getElementById("comingSoonThemeToggle");

  const countdown =
    document.getElementById("comingSoonCountdown");

  const countdownDays =
    document.getElementById("countdownDays");

  const countdownHours =
    document.getElementById("countdownHours");

  const countdownMinutes =
    document.getElementById("countdownMinutes");

  const countdownSeconds =
    document.getElementById("countdownSeconds");


  /* =======================================================
     COUNTDOWN
     ======================================================= */

  /*
   * =======================================================
   * SET YOUR LAUNCH DATE HERE
   * =======================================================
   *
   * Current example:
   * October 31, 2026 at 11:59:59 PM
   *
   * Format:
   * YYYY-MM-DDTHH:MM:SS
   */

  const launchDate =
    new Date("2026-10-31T23:59:59").getTime();


  function updateCountdown() {

    const currentTime =
      new Date().getTime();

    const difference =
      launchDate - currentTime;


    /*
     * Launch date reached
     */

    if (difference <= 0) {

      countdownDays.textContent = "00";
      countdownHours.textContent = "00";
      countdownMinutes.textContent = "00";
      countdownSeconds.textContent = "00";

      countdown.classList.add("completed");

      return;
    }


    /*
     * Calculate remaining time
     */

    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );

    const hours =
      Math.floor(
        (difference /
          (1000 * 60 * 60)) %
          24
      );

    const minutes =
      Math.floor(
        (difference /
          (1000 * 60)) %
          60
      );

    const seconds =
      Math.floor(
        (difference / 1000) %
          60
      );


    /*
     * Display values
     */

    countdownDays.textContent =
      String(days).padStart(2, "0");

    countdownHours.textContent =
      String(hours).padStart(2, "0");

    countdownMinutes.textContent =
      String(minutes).padStart(2, "0");

    countdownSeconds.textContent =
      String(seconds).padStart(2, "0");
  }


  /*
   * Initial update
   */

  updateCountdown();


  /*
   * Update every second
   */

  const countdownInterval =
    setInterval(function () {

      updateCountdown();

      /*
       * Stop unnecessary interval
       * after countdown completes.
       */

      if (
        countdown.classList.contains(
          "completed"
        )
      ) {
        clearInterval(countdownInterval);
      }

    }, 1000);


  /* =======================================================
     THEME
     ======================================================= */

  const savedTheme =
    localStorage.getItem(
      "ceilingcraft-theme"
    );


  if (savedTheme === "dark") {

    document.body.classList.add(
      "dark-mode"
    );
  }


  function updateThemeIcon() {

    if (!themeToggle) return;


    const isDark =
      document.body.classList.contains(
        "dark-mode"
      );


    themeToggle.innerHTML =
      isDark
        ? '<i data-lucide="sun" aria-hidden="true"></i>'
        : '<i data-lucide="moon" aria-hidden="true"></i>';


    themeToggle.setAttribute(
      "aria-label",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );


    themeToggle.setAttribute(
      "title",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );


    refreshIcons();
  }


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      function () {

        const isDark =
          document.body.classList.toggle(
            "dark-mode"
          );


        localStorage.setItem(
          "ceilingcraft-theme",
          isDark
            ? "dark"
            : "light"
        );


        updateThemeIcon();

      }
    );
  }


  updateThemeIcon();


  /* =======================================================
     RTL
     ======================================================= */

  const savedDirection =
    localStorage.getItem(
      "ceilingcraft-direction"
    );


  if (savedDirection === "rtl") {

    document.body.classList.add(
      "rtl"
    );

    document.documentElement.setAttribute(
      "dir",
      "rtl"
    );
  }


  function updateRtlIcon() {

    if (!rtlToggle) return;


    const isRTL =
      document.body.classList.contains(
        "rtl"
      );


    rtlToggle.setAttribute(
      "aria-label",
      isRTL
        ? "Switch to LTR"
        : "Switch to RTL"
    );


    rtlToggle.setAttribute(
      "title",
      isRTL
        ? "Switch to LTR"
        : "Switch to RTL"
    );
  }


  if (rtlToggle) {

    rtlToggle.addEventListener(
      "click",
      function () {

        const isRTL =
          document.body.classList.toggle(
            "rtl"
          );


        document.documentElement.setAttribute(
          "dir",
          isRTL
            ? "rtl"
            : "ltr"
        );


        localStorage.setItem(
          "ceilingcraft-direction",
          isRTL
            ? "rtl"
            : "ltr"
        );


        updateRtlIcon();

      }
    );
  }


  updateRtlIcon();

});