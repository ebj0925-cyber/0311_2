fetch("./json/08_brand.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("08_brand.json 파일을 찾을 수 없습니다.");
    }
    return response.json();
  })
  .then((data) => {
    const brandMainBanner = document.getElementById("brandMainBanner");
    const brandTopProducts = document.getElementById("brandTopProducts");
    const brandBottomProducts = document.getElementById("brandBottomProducts");

    if (brandMainBanner) {
      brandMainBanner.innerHTML = `
    <a href="./sub.html">
      <img src="${data.mainBanner}" alt="${data.brandName} 브랜드 배너">
    </a>
  `;
    }

    const topItems = data.products.slice(0, 3);
    const bottomItems = data.products.slice(3, 8);

    function createProductCard(item) {
      return `
        <li class="product_item">
          <a href="./sub.html">
            <div class="product_img">
              <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="icon_box">
              <span><img src="./img/icon/icon-heart.png" alt="찜하기"></span>
              <span><img src="./img/icon/icon-cart.png" alt="장바구니"></span>
            </div>

            <div class="product_info">
              <p class="brand">${item.brand}</p>
              <h3 class="name">${item.name}</h3>

              <p class="price">
                ${item.discount ? `<span class="discount">${item.discount}</span>` : ""}
                <strong>${item.price}</strong>
              </p>

              <p class="review">★ ${item.rating} <span class="bar">|</span> 리뷰 ${item.review}</p>
            </div>
          </a>
        </li>
      `;
    }

    if (brandTopProducts) {
      brandTopProducts.innerHTML = topItems.map(createProductCard).join("");
    }

    if (brandBottomProducts) {
      brandBottomProducts.innerHTML = bottomItems
        .map(createProductCard)
        .join("");
    }
  })
  .catch((error) => {
    console.error("브랜드 데이터 불러오기 실패:", error);
  });
