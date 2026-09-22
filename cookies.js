/* =========================================================
   CEILINGCRAFT
   TERMS / PRIVACY / COOKIE PAGES
   RTL + DARK MODE
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


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const rtlToggle =
    document.getElementById("termsRtlToggle");

  const themeToggle =
    document.getElementById("termsThemeToggle");


  /* =======================================================
     DARK MODE
     ======================================================= */

  const savedTheme =
    localStorage.getItem("ceilingcraft-theme");


  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }


  function updateThemeButton() {

    if (!themeToggle) return;

    const isDark =
      document.body.classList.contains("dark-mode");


    /* Change icon */

    themeToggle.innerHTML = isDark
      ? '<i data-lucide="sun" aria-hidden="true"></i>'
      : '<i data-lucide="moon" aria-hidden="true"></i>';


    /* Accessibility */

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


  /* =======================================================
     DARK MODE CLICK
     ======================================================= */

  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();


        const isDark =
          document.body.classList.toggle("dark-mode");


        localStorage.setItem(
          "ceilingcraft-theme",
          isDark
            ? "dark"
            : "light"
        );


        updateThemeButton();

      }
    );

  }


  /* Set initial theme icon */

  updateThemeButton();


  /* =======================================================
     RTL / LTR
     ======================================================= */

  const savedDirection =
    localStorage.getItem(
      "ceilingcraft-direction"
    );


  if (savedDirection === "rtl") {

    document.body.classList.add("rtl");

    document.documentElement.setAttribute(
      "dir",
      "rtl"
    );

  } else {

    document.body.classList.remove("rtl");

    document.documentElement.setAttribute(
      "dir",
      "ltr"
    );

  }


  /* =======================================================
     UPDATE RTL BUTTON
     ======================================================= */

  function updateRtlButton() {

    if (!rtlToggle) return;


    const isRTL =
      document.body.classList.contains("rtl");


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


  /* =======================================================
     RTL CLICK
     ======================================================= */

  if (rtlToggle) {

    rtlToggle.addEventListener(
      "click",
      function (event) {

        event.preventDefault();
        event.stopPropagation();


        const isRTL =
          document.body.classList.toggle("rtl");


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


        updateRtlButton();

      }
    );

  }


  /* Set initial RTL state */

  updateRtlButton();


  /* =======================================================
     FINAL ICON REFRESH
     ======================================================= */

  refreshIcons();

});