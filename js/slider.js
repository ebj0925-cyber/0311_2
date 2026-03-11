document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slider_track");
  const prevBtn = document.querySelector(".main_slider .prev");
  const nextBtn = document.querySelector(".main_slider .next");
  const playBtn = document.querySelector(".main_slider .play");
  const currentEl = document.querySelector(".slider_paging .current");
  const totalEl = document.querySelector(".slider_paging .total");

  if (!track) return;

  let sliderData = [];
  let currentIndex = 0;
  let visibleCount = getVisibleCount();
  let autoSlide = null;
  let isPlaying = true;

  function getVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  async function initSlider() {
    try {
      const res = await fetch("./json/slider.json");
      const data = await res.json();
      sliderData = data;

      renderSlides(sliderData);
      visibleCount = getVisibleCount();
      totalEl.textContent = sliderData.length;
      updateSlider();
      startAutoSlide();
    } catch (error) {
      console.error("슬라이드 데이터를 불러오지 못했습니다.", error);
    }
  }

  function renderSlides(data) {
    track.innerHTML = data
      .map((item, index) => {
        const isLight = index === 0 ? "light_text" : "";

        return `
          <li class="slider_item ${isLight}">
            <a href="${item.link}">
              <img src="${item.image}" alt="${item.title.replace(/\n/g, " ")}">
              <div class="slide_dim"></div>
              <div class="slide_txt">
                <div class="badge_wrap">
                  ${item.badge1 ? `<span class="badge">${item.badge1}</span>` : ""}
                  ${item.badge2 ? `<span class="badge">${item.badge2}</span>` : ""}
                </div>
                <h3 class="slide_title">${item.title}</h3>
                <p class="slide_desc">${item.desc}</p>
              </div>
            </a>
          </li>
        `;
      })
      .join("");
  }

  function updateSlider() {
    const items = document.querySelectorAll(".slider_item");
    if (!items.length) return;

    const itemWidth = items[0].offsetWidth;
    const gap = 18;
    const moveX = (itemWidth + gap) * currentIndex;

    track.style.transform = `translateX(-${moveX}px)`;
    currentEl.textContent = currentIndex + 1;
  }

  function nextSlide() {
    const maxIndex = sliderData.length - visibleCount;
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }

  function prevSlide() {
    const maxIndex = sliderData.length - visibleCount;
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateSlider();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function stopAutoSlide() {
    if (autoSlide) clearInterval(autoSlide);
  }

  prevBtn.addEventListener("click", () => {
    prevSlide();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
  });

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      stopAutoSlide();
      playBtn.textContent = "▶";
      playBtn.setAttribute("aria-label", "슬라이드 재생");
    } else {
      startAutoSlide();
      playBtn.textContent = "❚❚";
      playBtn.setAttribute("aria-label", "슬라이드 정지");
    }
    isPlaying = !isPlaying;
  });

  window.addEventListener("resize", () => {
    visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, sliderData.length - visibleCount);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    updateSlider();
  });

  initSlider();
});