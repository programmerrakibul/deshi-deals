// Function for get elements
function getEl(targetStr) {
  const el = document.querySelector(targetStr);
  return el;
}

// Function for Convert inner text into a number
function strToNumber(el) {
  const num = Number(el.textContent);
  return num;
}

const productContainer = getEl("#products-container");
const cartItemContainer = getEl("#cart-item-container");

// Function for create cards
function makeCartCard(obj) {
  const { imgSrc, title, price } = obj;

  // Creating a new card for cart container
  const newCard = document.createElement("div");
  newCard.className = "flex items-center bg-[#F4F1F1] p-2 rounded-sm";
  newCard.innerHTML = `
                <img
                  class="h-16 w-16 object-contain rounded-lg mr-4"
                  src="${imgSrc}"
                  alt="Product"
                />
                <div class="flex-1">
                  <h2 class="font-semibold">${title}</h2>
                  <span class="text-gray-500 text-sm">$${price}</span>
                </div>
                <button class="text-gray-500 hover:text-red-500">
                  <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M19 13H5v-2h14v2z" />
                  </svg>
                </button>
  `;

  return newCard;
}

function addToCart(e) {
  const target = e.target;
  const cartBtn = target.className.includes("card-cart-btn");
  if (cartBtn) {
    const container = target.closest(".card");
    const imgSrc = container.children[0].children[0].src;
    const title = container.children[1].children[1].textContent;
    const price = container.children[1].children[2].children[0].textContent;
    const card = { imgSrc, title, price };
    const cartQuantityEl = getEl("#cart-quantity");
    const cartQuantity = strToNumber(cartQuantityEl);
    const cartPriceEl = getEl("#total-cart-price");
    const cartPrice = strToNumber(cartPriceEl);
    const itemPrice = Number(price);
    const totalQuantity = cartQuantity + 1;
    const totalPrice = cartPrice + itemPrice;
    cartQuantityEl.textContent = totalQuantity;
    cartPriceEl.textContent = totalPrice.toFixed(2);

    const addCard = makeCartCard(card);
    cartItemContainer.append(addCard);
  }
}

productContainer.addEventListener("click", addToCart);
