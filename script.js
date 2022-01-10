"use strict";

// Common Variables
const slides = document.querySelectorAll(".feature");
const allSections = document.querySelectorAll(".section");
const slider = document.querySelector(".bg-2");
const navlinks = document.querySelectorAll(".nspc");
/////////////////////////////

//common functions
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${150 * (i - slide)}%)`)
  );
};
goToSlide(0);
////////////////////////////

// slides moving feature
const slidesIn = function () {
  let curSlide = 0;
  const maxSlide = slides.length;

  const nextSlide = function (slide) {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  setInterval(function () {
    nextSlide(curSlide);
  }, 5000);
};
////////////////////////////////////

// enter in feature

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
  //////////////////////////
  // Slides Feature
  slidesIn();

  ////////////////////////////////////
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.001,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

////////////////////////////

navlinks.forEach((at) => {
  at.addEventListener("click", function (e) {
    e.preventDefault();

    const src = e.target.dataset.src;

    document.querySelector(src).scrollIntoView({
      behavior: "smooth",
    });
  });
});
