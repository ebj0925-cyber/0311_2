fetch("./json/sub.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("sub.json 파일을 찾을 수 없습니다.");
    }
    return response.json();
  })
  .then((data) => {
    renderTop(data.top);
    renderRecommend(data.recommend);
    renderDetail(data.detail);
  })
  .catch((error) => {
    console.error(error);
  });

/* =========================
   공통 함수
========================= */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value ?? "";
}

function formatPrice(price) {
  const number =
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^\d]/g, ""));

  return `${number.toLocaleString("ko-KR")}원`;
}

function getPriceText(price) {
  if (price === undefined || price === null || price === "") return "";
  return formatPrice(price);
}

/* =========================
   상단 영역
========================= */
function renderTop(top) {
  renderBreadcrumb(top.breadcrumb);
  renderGallery(top.images);
  renderTopInfo(top);
  renderOrderBox(top.order);
}

function renderBreadcrumb(items) {
  const breadcrumbBox = document.getElementById("breadcrumbBox");
  if (!breadcrumbBox || !items) return;

  breadcrumbBox.innerHTML = items
    .map((item, index) => {
      const isLast = index === items.length - 1;
      return isLast
        ? `<span>${item}</span>`
        : `<a href="#">${item}</a><span class="breadcrumb_arrow">&gt;</span>`;
    })
    .join("");
}

function renderGallery(images) {
  const mainImage = document.getElementById("mainImage");
  const thumbList = document.getElementById("thumbList");

  if (mainImage && images?.main) {
    mainImage.src = images.main;
    mainImage.alt = "상품 대표 이미지";
  }

  if (!thumbList) return;

  const thumbs = images?.thumbs || [];

  if (!thumbs.length) {
    thumbList.innerHTML = "";
    return;
  }

  thumbList.innerHTML = thumbs
    .map(
      (src, index) => `
        <button
          type="button"
          class="thumb_btn ${index === 0 ? "active" : ""}"
          data-src="${src}"
          aria-label="상품 썸네일 ${index + 1}">
          <img src="${src}" alt="상품 썸네일 ${index + 1}">
        </button>
      `,
    )
    .join("");

  const thumbButtons = thumbList.querySelectorAll(".thumb_btn");

  thumbButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetSrc = button.dataset.src;

      if (mainImage && targetSrc) {
        mainImage.src = targetSrc;
      }

      thumbButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

function renderTopInfo(top) {
  const badgeList = document.getElementById("badgeList");
  const priceBox = document.getElementById("priceBox");
  const metaBox = document.getElementById("metaBox");
  const subReviewSummary = document.getElementById("subReviewSummary");

  if (badgeList) {
    badgeList.innerHTML = `
      <span class="sub_badge">${top.brand ?? ""}</span>
      ${top.badge ? `<span class="sub_badge">${top.badge}</span>` : ""}
    `;
  }

  setText("goodsTitle", top.title);
  setText("goodsDesc", top.desc);

  if (priceBox) {
    priceBox.innerHTML = `
  <p class="original_price">${getPriceText(top.price?.original)}</p>
  <div class="sale_price_row">
    <span class="discount_rate">${top.price?.discountRate ?? ""}</span>
    <strong class="sale_price">${getPriceText(top.price?.sale)}</strong>
  </div>
`;
  }

  if (subReviewSummary) {
    subReviewSummary.innerHTML = `
      <span class="review_label">상품후기</span>
      <span class="review_star">★</span>
      <span class="review_score">${top.rating?.score ?? "0.0"}</span>
      <span class="review_divider">|</span>
      <span class="review_count">후기 ${top.rating?.reviewCount ?? 0}건</span>
    `;
  }

  if (metaBox) {
    metaBox.innerHTML = (top.meta || [])
      .map(
        (item) => `
          <div class="meta_row">
            <span class="meta_label">${item.label}</span>
            <span class="meta_value">${item.value}</span>
          </div>
        `,
      )
      .join("");
  }
}

function renderOrderBox(order) {
  const countInput = document.getElementById("countInput");
  const minusBtn = document.getElementById("minusBtn");
  const plusBtn = document.getElementById("plusBtn");
  const totalPrice = document.getElementById("totalPrice");
  const buyButton = document.querySelector(".btn_green");

  if (!countInput || !minusBtn || !plusBtn || !totalPrice) return;

  let quantity = order?.quantity || 1;
  const unitPrice = Number(order?.unitPrice) || 0;

  countInput.value = quantity;

  if (buyButton && order?.buttonText) {
    buyButton.textContent = order.buttonText;
  }

  function updateTotal() {
    totalPrice.textContent = formatPrice(unitPrice * quantity);
  }

  minusBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity -= 1;
      countInput.value = quantity;
      updateTotal();
    }
  });

  plusBtn.addEventListener("click", () => {
    quantity += 1;
    countInput.value = quantity;
    updateTotal();
  });

  updateTotal();
}

/* =========================
   추천 상품 영역
========================= */
function renderRecommend(recommend) {
  setText("recommendTitle", recommend?.title);

  const recommendList = document.getElementById("recommendList");
  if (!recommendList) return;

  recommendList.innerHTML = (recommend?.items || [])
    .map((item) => {
      const discountHtml = item.discountRate
        ? `<span class="recommend_discount">${item.discountRate}</span>`
        : "";

      return `
        <div class="recommend_card">
          <a href="${item.link}">
            <div class="recommend_img">
              <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="recommend_text">
              <div class="recommend_top_row">
                ${item.badge ? `<span class="recommend_badge">${item.badge}</span>` : ""}

                <div class="recommend_icons">
                  <span class="icon_btn" aria-label="찜하기">
                    <img src="./img/icon/icon-heart.png" alt="찜하기">
                  </span>
                  <span class="icon_btn" aria-label="장바구니 담기">
                    <img src="./img/icon/icon-cart.png" alt="장바구니 담기">
                  </span>
                </div>
              </div>

              <p class="recommend_brand">${item.brand ?? ""}</p>
              <h4 class="recommend_name">${item.name}</h4>

              <div class="recommend_price_row">
                ${discountHtml}
                <strong class="recommend_price">${item.price}</strong>
              </div>

              <p class="recommend_rating">★ ${item.rating} | ${item.reviewCount}건</p>
              <span class="recommend_tag">${item.tag}</span>
            </div>
          </a>
        </div>
      `;
    })
    .join("");
}

/* =========================
   상세 영역
========================= */
function renderDetail(detail) {
  const detailTabs = document.getElementById("detailTabs");
  const detailContents = document.getElementById("detailContents");

  if (!detailTabs || !detailContents) return;

  detailTabs.innerHTML = (detail?.tabs || [])
    .map((tab, index) => {
      const countText = tab.count
        ? `<span class="tab_count">${tab.count}</span>`
        : "";

      return `
        <button
          type="button"
          class="detail_tab_btn ${index === 0 ? "active" : ""}"
          data-tab="${tab.id}">
          ${tab.label}${countText}
        </button>
      `;
    })
    .join("");

  detailContents.innerHTML = `
    <section class="detail_panel active" data-panel="info">
      <div class="detail_info_images">
        ${(detail?.infoImages || [])
          .map(
            (src, index) => `
              <div class="detail_img_box">
                <img src="${src}" alt="상세 이미지 ${index + 1}">
              </div>
            `,
          )
          .join("")}
      </div>
    </section>

    <section class="detail_panel" data-panel="buy">
      <div class="detail_text_box">
        <h4>구매정보</h4>
        <ul class="detail_text_list">
          ${(detail?.buyInfo || []).map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </section>

    <section class="detail_panel" data-panel="review">
      <div class="detail_text_box">
        <h4>상품후기</h4>
        <p>평점 ${detail?.reviewSummary?.score ?? "0.0"}</p>
        <p>총 ${detail?.reviewSummary?.count ?? 0}개의 후기가 있습니다.</p>
      </div>
    </section>

    <section class="detail_panel" data-panel="qna">
      <div class="detail_text_box">
        <h4>상품문의</h4>
        <p>총 ${detail?.qnaSummary?.count ?? 0}개의 문의가 있습니다.</p>
      </div>
    </section>

    <section class="detail_panel" data-panel="delivery">
      <div class="detail_text_box">
        <h4>배송/환불</h4>
        <ul class="detail_text_list">
          ${(detail?.deliveryInfo || []).map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </section>
  `;

  setupTabs();
}

function setupTabs() {
  const tabButtons = document.querySelectorAll(".detail_tab_btn");
  const panels = document.querySelectorAll(".detail_panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");

      const activePanel = document.querySelector(
        `.detail_panel[data-panel="${target}"]`,
      );

      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });
}
