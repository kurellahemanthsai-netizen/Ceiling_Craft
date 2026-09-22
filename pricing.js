/* =========================================================
   PRICING FAQ ACCORDION
   ========================================================= */

function initPricingFAQ() {

  const faqItems = document.querySelectorAll(
    ".pricing-faq-item"
  );

  if (!faqItems.length) return;


  faqItems.forEach((item) => {

    const question = item.querySelector(
      ".pricing-faq-question"
    );

    if (!question) return;


    question.addEventListener("click", () => {

      const isOpen = item.classList.contains("active");


      /* ================================================
         CLOSE ALL OTHER FAQ ITEMS
         ================================================ */

      faqItems.forEach((otherItem) => {

        otherItem.classList.remove("active");

        const otherQuestion =
          otherItem.querySelector(
            ".pricing-faq-question"
          );

        if (otherQuestion) {
          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });


      /* ================================================
         OPEN SELECTED ITEM
         ================================================ */

      if (!isOpen) {

        item.classList.add("active");

        question.setAttribute(
          "aria-expanded",
          "true"
        );

      }


      /* ================================================
         REFRESH LUCIDE ICONS
         ================================================ */

      if (typeof refreshIcons === "function") {
        refreshIcons();
      }

    });

  });

}


/* =========================================================
   INITIALIZE FAQ
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initPricingFAQ
);