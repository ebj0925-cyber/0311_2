fetch("./json/07_newitem.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("07_newitem.json 파일을 찾을 수 없습니다.");
    }
    return response.json();
  })
  .then((data) => {
    const newitemList = document.getElementById("newitemList");
    if (!newitemList) return;

    let html = "";

    data.forEach((item) => {
      html += `
        <div class="product_col">
          <a href="#" class="product_top_img">
            <img src="${item.topImage}" alt="${item.name}">
          </a>

          <div class="product_row_info">
            <a href="#" class="product_thumb">
              <img src="${item.thumbImage}" alt="${item.name}">
            </a>

            <div class="product_info">
              <p class="brand">${item.brand}</p>
              <h3 class="name">${item.name}</h3>

              <p class="price">
                <span class="discount">${item.discount}</span>
                <strong>${item.price}</strong>
              </p>

              <p class="review">★ ${item.rating} | 리뷰 ${item.review}</p>
              ${item.badge ? `<span class="item_tag">${item.badge}</span>` : ""}
            </div>
          </div>
        </div>
      `;
    });

    newitemList.innerHTML = html;
  })
  .catch((error) => {
    console.error("07_newitem.json 불러오기 실패:", error);
  });