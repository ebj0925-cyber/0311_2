document.addEventListener("DOMContentLoaded", () => {
  setupSectionControls();
  setupProductActions();
  setupSearch();
  setupSectionTabs();
  setupHeaderActions();
  setupSubPageActions();
});

function setupSectionControls() {
  const sectionButtons = document.querySelectorAll(".section_btn button");

  sectionButtons.forEach((button) => {
    const buttons = Array.from(button.parentElement.querySelectorAll("button"));
    const isPrev = button.classList.contains("prev") || buttons.indexOf(button) === 0;

    button.setAttribute("aria-label", isPrev ? "이전 상품 보기" : "다음 상품 보기");

    button.addEventListener("click", () => {
      const section = button.closest(".section, .orga, .brand_section");
      const track = section?.querySelector(".product_list, .product_grid_3");

      if (!track) return;

      moveProductTrack(track, isPrev ? -1 : 1);
    });
  });
}

function moveProductTrack(track, direction) {
  const items = Array.from(track.children).filter((item) => item.nodeType === 1);

  if (items.length <= 1 || track.dataset.moving === "true") return;

  const style = window.getComputedStyle(track);
  const gap = parseFloat(style.columnGap || style.gap || 0) || 0;
  const itemWidth = items[0].getBoundingClientRect().width + gap;

  track.dataset.moving = "true";

  if (direction < 0) {
    track.insertBefore(items[items.length - 1], items[0]);
    track.style.transition = "none";
    track.style.transform = `translateX(-${itemWidth}px)`;

    requestAnimationFrame(() => {
      track.style.transition = "transform 0.28s ease";
      track.style.transform = "translateX(0)";
    });
  } else {
    track.style.transition = "transform 0.28s ease";
    track.style.transform = `translateX(-${itemWidth}px)`;
  }

  window.setTimeout(() => {
    if (direction > 0) {
      track.appendChild(track.firstElementChild);
    }

    track.style.transition = "none";
    track.style.transform = "translateX(0)";
    track.dataset.moving = "false";
  }, 300);
}

function setupProductActions() {
  enhanceProductActionIcons();

  const observer = new MutationObserver(() => {
    enhanceProductActionIcons();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  document.addEventListener("click", handleProductAction);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const target = event.target.closest(".product_action");
    if (!target) return;

    event.preventDefault();
    target.click();
  });
}

function enhanceProductActionIcons() {
  const icons = document.querySelectorAll(
    ".product_item .icon_box span, .product_col .icon_box span, .recommend_card .recommend_icons .icon_btn",
  );

  icons.forEach((icon) => {
    if (icon.classList.contains("product_action")) return;

    const img = icon.querySelector("img");
    const altText = img?.getAttribute("alt") || "";
    const isCart = icon.classList.contains("cart") || altText.includes("장바구니");
    const isWish = icon.classList.contains("wish") || altText.includes("찜");

    if (!isCart && !isWish) return;

    icon.classList.add("product_action", isCart ? "cart_action" : "wish_action");
    icon.setAttribute("role", "button");
    icon.setAttribute("tabindex", "0");
    icon.setAttribute("aria-label", isCart ? "장바구니 담기" : "찜하기");

    if (isWish) {
      icon.setAttribute("aria-pressed", "false");
    }
  });
}

function handleProductAction(event) {
  const action = event.target.closest(".product_action");

  if (!action) return;

  event.preventDefault();
  event.stopPropagation();

  if (action.classList.contains("wish_action")) {
    const isActive = action.classList.toggle("is_active");
    action.setAttribute("aria-pressed", String(isActive));
    showProductToast(isActive ? "찜 목록에 담았습니다." : "찜 목록에서 해제했습니다.");
    return;
  }

  showProductToast("장바구니에 담았습니다.");
}

function showProductToast(message) {
  let toast = document.querySelector(".product_toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "product_toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("is_show");

  window.clearTimeout(showProductToast.timer);
  showProductToast.timer = window.setTimeout(() => {
    toast.classList.remove("is_show");
  }, 1600);
}

function setupSearch() {
  const searchBoxes = document.querySelectorAll(".search_box");

  searchBoxes.forEach((box) => {
    const input = box.querySelector("input");
    const button = box.querySelector(".search_btn");

    if (!input || !button) return;

    button.addEventListener("click", () => {
      runProductSearch(input.value);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;

      event.preventDefault();
      runProductSearch(input.value);
    });
  });
}

function runProductSearch(value) {
  const keyword = value.trim();

  document.querySelectorAll(".search_match").forEach((item) => {
    item.classList.remove("search_match");
  });

  if (!keyword) {
    showProductToast("검색어를 입력해주세요.");
    return;
  }

  const cards = Array.from(
    document.querySelectorAll(".product_item, .product_col, .recommend_card"),
  );
  const matches = cards.filter((card) => card.textContent.includes(keyword));

  if (!matches.length) {
    showProductToast(`'${keyword}' 검색 결과가 없습니다.`);
    return;
  }

  matches.forEach((card) => card.classList.add("search_match"));
  matches[0].scrollIntoView({ behavior: "smooth", block: "center" });
  showProductToast(`'${keyword}' 검색 결과 ${matches.length}개를 찾았습니다.`);
}

function setupSectionTabs() {
  document.querySelectorAll(".section_tab").forEach((tabGroup) => {
    const buttons = tabGroup.querySelectorAll("button");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        showProductToast(`${button.textContent.trim()} 상품을 보여드립니다.`);
      });
    });
  });
}

function setupHeaderActions() {
  const header = document.getElementById("header");
  if (!header) return;

  const messageMap = {
    로그인: "로그인 페이지는 포트폴리오 시연용입니다.",
    회원가입: "회원가입 페이지는 포트폴리오 시연용입니다.",
    고객센터: "고객센터 페이지는 포트폴리오 시연용입니다.",
    마이페이지: "로그인 후 마이페이지를 이용할 수 있습니다.",
    찜: "찜한 상품 페이지는 포트폴리오 시연용입니다.",
    알림: "새 알림이 없습니다.",
    장바구니: "장바구니 페이지는 포트폴리오 시연용입니다.",
  };

  header.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const label =
        link.getAttribute("aria-label") ||
        link.textContent.trim() ||
        link.querySelector("img")?.getAttribute("alt") ||
        "";
      const message = messageMap[label] || `${label || "메뉴"}는 포트폴리오 시연용입니다.`;

      event.preventDefault();
      showProductToast(message);
    });
  });

  const categoryButton = header.querySelector(".category_btn");

  if (categoryButton) {
    categoryButton.addEventListener("click", () => {
      categoryButton.classList.toggle("active");
      showProductToast("카테고리 메뉴는 포트폴리오 시연용입니다.");
    });
  }
}

function setupSubPageActions() {
  const cartButton = document.querySelector(".btn_line");
  const buyButton = document.querySelector(".btn_green");

  if (cartButton) {
    cartButton.addEventListener("click", () => {
      showProductToast("장바구니에 담았습니다.");
    });
  }

  if (buyButton) {
    buyButton.addEventListener("click", () => {
      showProductToast("로그인 후 구매할 수 있습니다.");
    });
  }
}
