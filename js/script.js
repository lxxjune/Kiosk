//메뉴 데이터
const menuData = {
  all: [
    { name: "coffee", price: 5600 },
    { name: "cake", price: 7500 },
    { name: "cookie", price: 4500 },
    { name: "shake", price: 6500 },
    { name: "juice", price: 5000 },
    { name: "muffin", price: 5200 },
  ],
  drinks: [
    { name: "coffee", price: 5600 },
    { name: "juice", price: 5000 },
    { name: "shake", price: 6500 },
  ],
  desserts: [
    { name: "cake", price: 7500 },
    { name: "muffin", price: 5200 },
    { name: "cookie", price: 4500 },
  ],
};

// 장바구니 데이터
const cart = {};

// HTML 요소 참조
const menu = document.querySelector("#menu");
const cartItemsDisplay = document.querySelector("#cartItems");
const totalPriceDisplay = document.querySelector("#totalPrice");

//go to Home
function goHome() {
  filterMenu("all");
}

// menu filtering and add menu on floating-cart
function filterMenu(category) {
  menu.innerHTML = ""; // 초기화
  //add menu
  menuData[category].forEach((item) => {
    const button = document.createElement("button");
    button.textContent = `${item.name} (${item.price.toLocaleString()}원)`;
    button.setAttribute("data-name", item.name);
    button.setAttribute("data-price", item.price);
    menu.appendChild(button); // 이벤트는 menu.addEventListener에서 처리
  });
}

// 메뉴 버튼 클릭 이벤트 추가
menu.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const name = event.target.getAttribute("data-name");
    const price = parseInt(event.target.getAttribute("data-price"));

    if (cart[name]) {
      cart[name].count++;
    } else {
      cart[name] = { price, count: 1 };
    }

    updateCart();
  }
});

// 장바구니와 총액 업데이트
function updateCart() {
  cartItemsDisplay.innerHTML = ""; // 초기화
  let total = 0;

  Object.keys(cart).forEach((name) => {
    const { price, count } = cart[name];
    total += price * count;

    const item = document.createElement("div");
    item.textContent = `${name} x${count} (${(
      price * count
    ).toLocaleString()}원)`;
    cartItemsDisplay.appendChild(item);
  });

  totalPriceDisplay.textContent = `Total: ${total.toLocaleString()}원`; // 총 금액 업데이트
}

//delete
function clearCart() {
  for (const key in cart) {
    delete cart[key];
  }
  localStorage.removeItem("cart");
  updateCart();
  alert("장바구니가 초기화되었습니다.");
}

// Add to Cart 버튼 클릭 시
function addToCartPage() {
  // 장바구니 데이터를 localStorage에 저장
  localStorage.setItem("cart", JSON.stringify(cart));
  // 페이지 이동
  location.href = "cart.html"; // 'location'을 정확히 작성
  alert("장바구니로 이동합니다.");
}

// goCart 클릭시
function goCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  location.href = "cart.html";
  alert("장바구니로 이동합니다.");
}

// reset
document.addEventListener("DOMContentLoaded", () => {
  filterMenu("all");
});
