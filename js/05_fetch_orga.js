fetch("./json/05_orga.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("올가 JSON 파일을 불러오지 못했습니다.");
    }
    return response.json();
  })
  .then((data) => {
    const list = document.querySelector(".orga_list");
    let html = "";

    data.forEach((item) => {
      html += `
        <li class="product_item">
          <a href="./sub.html">
            <div class="product_img">
              <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="product_info">
              <div class="product_top_row">
                ${item.badge ? `<span class="badge">${item.badge}</span>` : `<span class="badge_empty"></span>`}

                <div class="icon_box">
                  <span class="wish">
                    <img src="./img/icon/icon-heart.png" alt="찜하기">
                  </span>
                  <span class="cart">
                    <img src="./img/icon/icon-cart.png" alt="장바구니">
                  </span>
                </div>
              </div>

              <p class="brand">${item.brand}</p>
              <h3 class="name">${item.name}</h3>

              <p class="price">
                ${item.discount > 0 ? `<span class="discount">${item.discount}%</span>` : ""}
                <strong>${item.salePrice.toLocaleString()}원</strong>
              </p>

              <p class="review">
                <span class="star">★ ${item.rating}</span>
                <span class="count">| 리뷰 ${item.reviewCount.toLocaleString()}</span>
              </p>
            </div>
          </a>
        </li>
      `;
    });

    list.innerHTML = html;
  })
  .catch((error) => {
    console.error(error);
    const list = document.querySelector(".orga_list");
    if (list) {
      list.innerHTML = "<p>올가 상품 데이터를 불러오지 못했습니다.</p>";
    }
  });