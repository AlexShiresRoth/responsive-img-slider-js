(() => {
  const state = { index: 0, position: 0, carouselWidth: 0 };

  const testimonials = [
    {
      name: "one",
      img:
        "https://images.clickfunnels.com/b1/f6e21afcce4b69acc1151c6da80598/review.png",
      bg: "black",
    },
    {
      name: "two",
      img:
        "https://images.clickfunnels.com/a3/5a7942862d4dde81562cd966b12eb6/review-2.png",
      bg: "red",
    },
    {
      name: "three",
      img:
        "https://images.clickfunnels.com/69/9ed6b2c8c6440e9aa223c640b6add4/review-3.png",
      bg: "blue",
    },
  ].reverse();

  const selectors = {
    carousel: document.querySelector(".testimonial-carousel"),
    box: document.querySelector(".review-box"),
  };

  const clear = () => {
    state.index = 0;
    state.position = 0;
    selectors.carousel.style.backgroundPosition = "0 0";
    selectors.carousel.scrollLeft = 0;
  };

  const scroll = () => {
    state.carouselWidth = selectors.carousel.getBoundingClientRect().width;
    selectors.carousel.style.backgroundPosition = `${(state.position +=
      state.carouselWidth)}px 0`;
    selectors.carousel.scrollLeft = selectors.box.scrollLeft += state.position;
  };

  const handleCarouselResize = () => {
    clear();
    return (state.carouselWidth = selectors.carousel.getBoundingClientRect().width);
  };

  const initCarousel = () => {
    //layout array to html
    testimonials.map((item) => {
      const markup = `<div class="review" style="background: url('${item.img}'); 
      background-size:contain;background-repeat:no-repeat; 
      background-position:center;height:100%;"></div>`;
      selectors.box.insertAdjacentHTML("afterbegin", markup);
    });

    (() => {
      //ping index state every 10ms
      const reviews = document.querySelectorAll(".review");

      setInterval(() => {
        reviews.forEach((r, i) => {
          i !== state.index ? (r.style.opacity = "0") : (r.style.opacity = "1");
        });
      }, 10);
    })();

    clear();

    setInterval(() => {
      scroll();
      state.index += 1;
      if (state.index > testimonials.length - 1) {
        clear();
      }
    }, 7000);
  };

  const main = () => {
    initCarousel();
  };

  window.addEventListener("resize", handleCarouselResize);
  window.addEventListener("load", main);
})();
