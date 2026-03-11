document.addEventListener("DOMContentLoaded", () => {
  const quickMenuList = document.querySelector(".quick_menu_list");

  if (!quickMenuList) return;

  fetch("./json/quick_menu.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("quick_menu.json 파일을 불러오지 못했습니다.");
      }
      return response.json();
    })
    .then((data) => {
      const html = data.map((item) => {
        return `
          <li class="quick_menu_item">
            <a href="${item.link}">
              <span class="quick_icon">
                <img src="${item.image}" alt="${item.title}">
              </span>
              <strong>${item.title}</strong>
            </a>
          </li>
        `;
      }).join("");

      quickMenuList.innerHTML = html;
    })
    .catch((error) => {
      console.error("퀵메뉴 데이터를 불러오는 중 오류가 발생했습니다.", error);
    });
});