/* =========================================================
   CEILINGCRAFT
   404 PAGE JAVASCRIPT
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
     DARK MODE
     ======================================================= */

  const themeToggle =
    document.getElementById("errorThemeToggle");


  const savedTheme =
    localStorage.getItem("ceilingcraft-theme");


  if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

  }


  function updateThemeIcon() {

    if (!themeToggle) return;


    const isDark =
      document.body.classList.contains("dark-mode");


    themeToggle.innerHTML = isDark

      ? `
        <i
          data-lucide="sun"
          aria-hidden="true"
        ></i>
      `

      : `
        <i
          data-lucide="moon"
          aria-hidden="true"
        ></i>
      `;


    refreshIcons();

  }


  updateThemeIcon();


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      function () {

        document.body.classList.toggle(
          "dark-mode"
        );


        const isDark =
          document.body.classList.contains(
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


  /* =======================================================
     RTL
     ======================================================= */

  const rtlToggle =
    document.getElementById("errorRtlToggle");


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

    document.documentElement.setAttribute(
      "dir",
      "ltr"
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
          isRTL ? "rtl" : "ltr"
        );


        localStorage.setItem(
          "ceilingcraft-direction",
          isRTL
            ? "rtl"
            : "ltr"
        );

      }
    );

  }

});