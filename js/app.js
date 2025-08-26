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
const cartQuantityEl = getEl("#cart-quantity");
const cartPriceEl = getEl("#total-cart-price");
const cartContainer = getEl("#cart-container");
const cartShowBtn = getEl("#cart-show-btn");
const cartHideBtn = getEl("#cart-close-btn");

// Function for create cards
function makeCartCard(obj) {
  const { imgSrc, title, price } = obj;

  // Creating a new card for cart container
  const newCard = document.createElement("div");
  newCard.className =
    "flex items-center gap-1 bg-[#F4F1F1] p-2 rounded-sm cart-card-item";
  newCard.innerHTML = `
                <img
                  class="h-16 w-16 object-contain rounded-lg mr-4"
                  src="${imgSrc}"
                  alt="Product"
                />
                <div class="flex-1">
                  <h2 class="font-semibold">${title}</h2>
                  <p class="text-gray-500 text-sm">$<span class="cart-item-price">${price}</span></p>
                </div>
                <button class="text-gray-500 hover:text-red-500 remove-cart-btn">
                  <i class="fa-solid fa-minus"></i>
                </button>
  `;

  return newCard;
}

// Add Cart Items
// Calculates total cart price
// Calculate total cart quantity
function addToCart(e) {
  const target = e.target;
  const cartBtn = target.className.includes("card-cart-btn");
  if (cartBtn) {
    const container = target.closest(".card");
    const imgSrc = container.children[0].children[0].src;
    const title = container.children[1].children[1].textContent;
    const price = container.children[1].children[2].children[0].textContent;
    const card = { imgSrc, title, price };
    const cartQuantity = strToNumber(cartQuantityEl);
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

// Remove Cart Items
// Calculates total remove cart price
// Calculate total remove cart quantity
function removeCartItem(e) {
  const target = e.target;
  const removeBtn = target.closest(".remove-cart-btn");
  if (removeBtn) {
    const card = target.closest(".cart-card-item");
    const priceEl = card.querySelector(".cart-item-price");
    const price = strToNumber(priceEl);
    const cartQuantity = strToNumber(cartQuantityEl);
    const cartPrice = strToNumber(cartPriceEl);

    const totalQuantity = cartQuantity - 1;
    const totalPrice = cartPrice - price;
    cartQuantityEl.textContent = totalQuantity;
    cartPriceEl.textContent = totalPrice.toFixed(2);

    card.remove();
  }
}

// Function for replacing classes
// It replaces from old class to new class
function replaceClasses(el, replacements) {
  replacements.forEach(([oldClass, newClass]) => {
    el.classList.replace(oldClass, newClass);
  });
}

// Making cart container visible with this function
// It replaces some tailwind classes from cart container
function showCartContainer() {
  const classArr = [
    ["-right-[100%]", "right-0"],
    ["opacity-0", "opacity-100"],
    ["invisible", "visible"],
  ];

  replaceClasses(cartContainer, classArr);
}

// Making cart container invisible with this function
// It replaces some tailwind classes from cart container
function hideCartContainer() {
  const classArr = [
    ["right-0", "-right-[100%]"],
    ["opacity-100", "opacity-0"],
    ["visible", "invisible"],
  ];

  replaceClasses(cartContainer, classArr);
}

// Add Item to Cart Button Listener
productContainer.addEventListener("click", addToCart);

// Remove Cart Item Button Listener
cartItemContainer.addEventListener("click", removeCartItem);

// Show Cart Container Button Listener
cartShowBtn.addEventListener("click", showCartContainer);

// Remove Cart Container Button Listener
cartHideBtn.addEventListener("click", hideCartContainer);
