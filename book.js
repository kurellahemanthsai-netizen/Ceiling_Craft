/* =========================================================
   CEILINGCRAFT
   BOOK A VISIT JAVASCRIPT
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
     DATE — PREVENT PAST DATES
     ======================================================= */

  const dateInput =
    document.getElementById("date");

  if (dateInput) {

    const today = new Date();

    const year =
      today.getFullYear();

    const month =
      String(today.getMonth() + 1)
        .padStart(2, "0");

    const day =
      String(today.getDate())
        .padStart(2, "0");

    dateInput.min =
      `${year}-${month}-${day}`;

  }


  /* =======================================================
     BOOKING FORM
     ======================================================= */

  const bookingForm =
    document.getElementById("bookingForm");

  if (bookingForm) {

    bookingForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        /* -----------------------------------------------
           VALIDATION
           ----------------------------------------------- */

        if (!bookingForm.checkValidity()) {

          bookingForm.reportValidity();

          return;

        }


        /* -----------------------------------------------
           SUBMIT BUTTON
           ----------------------------------------------- */

        const button =
          bookingForm.querySelector(
            ".book-visit-submit-btn"
          );

        if (!button) return;


        const originalContent =
          button.innerHTML;


        /* -----------------------------------------------
           SUCCESS STATE
           ----------------------------------------------- */

        button.innerHTML = `
          <span>Request Submitted</span>
          <i
            data-lucide="check"
            aria-hidden="true"
          ></i>
        `;

        button.disabled = true;

        refreshIcons();


        /* -----------------------------------------------
           RESET FORM
           ----------------------------------------------- */

        bookingForm.reset();


        /* -----------------------------------------------
           RESTORE BUTTON
           ----------------------------------------------- */

        setTimeout(function () {

          button.innerHTML =
            originalContent;

          button.disabled = false;

          refreshIcons();

        }, 2500);

      }
    );

  }


  /* =======================================================
     DARK MODE
     ======================================================= */

  const themeToggle =
    document.getElementById(
      "bookThemeToggle"
    );


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


    themeToggle.innerHTML = isDark
      ? '<i data-lucide="sun" aria-hidden="true"></i>'
      : '<i data-lucide="moon" aria-hidden="true"></i>';

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
    document.getElementById(
      "bookRtlToggle"
    );


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

      }
    );

  }


  /* =======================================================
     INITIAL DIRECTION
     ======================================================= */

  if (!document.body.classList.contains("rtl")) {

    document.documentElement.setAttribute(
      "dir",
      "ltr"
    );

  }


});