import { getCartLength } from "./getCartLength.js";
import { showToast } from "../assets/utility/showToast.js";
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const totalQuantityEl = document.getElementById("totalQuantity");
  const totalPriceEl = document.getElementById("totalPrice");
  const clearCartBtn = document.getElementById("clearCart");
  const continueShoppingBtn = document.getElementById("continueShopping");
  const checkoutBtn = document.getElementById("checkout");

  let deleteToast = document.querySelector("#deleteToast");
  let overlay = document.querySelector(".overlay");

  getCartLength();

  let cartItems = JSON.parse(localStorage.getItem("myCart")) || [];

  const renderCart = () => {
    cartItemsContainer.innerHTML = "";
    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach((item, ind) => {
      let { _id, rating, image, name, selling_price, quantity } = item;

      cartItemsContainer.innerHTML += `
    <div id="${_id}" class="itemDiv max-w-[255px] hover:shadow-[0px_0px_11px_3px_#c0c7cd]  sm:max-w-full flex space-y-4 items-start sm:items-center flex-col  duration-300 transition-all  sm:flex-row sm:justify-between bg-[#f6f6f6] hover:bg-[#fff] shadow-lg rounded-lg p-4">
          <div class="ml-0 sm:ml-2 flex flex-col sm:flex-row space-y-2 sm:space-x-3 items-start sm:items-center">
            <img
              src="${image}"
              alt="${image}-${ind}"
              class="w-[220px] h-[200px] sm:w-[140px] sm:h-[140px] object-cover rounded-lg"
            />
            <div class="flex flex-col space-y-2">
              <h2 class="text-[18px] font-semibold">${name}</h2>
              <p class="text-gray-500 text-[18px]">
                <i class="ri-star-fill text-[#ff6b38]"></i> | ${rating}
              </p>
              <p class="text-gray-800 text-[16px]  font-[500] mt-1">
                Price: $${selling_price.toFixed(2)}
              </p>
              <p class="text-gray-800  text-[16px] font-[500] mt-1">
                Subtotal: $${(selling_price * quantity).toFixed(2)}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <button
                class="decreaseCartQuantity px-2 py-1 bg-[#f6f6f6] duration-200 rounded hover:bg-gray-300"
              >
                <i class="ri-subtract-line"></i>
              </button>
              <input
                type="number"
                value="${item.quantity}"
                min="1"
                class="quantity w-12 py-1 focus:outline-0 text-center border duration-300 border-gray-300 rounded" readonly
              />
              <button
                class="increaseCartQuantity px-2 py-1 bg-[#f6f6f6] duration-300 rounded hover:bg-gray-300"
              >
                <i class="ri-add-line"></i>
              </button>
            </div>
            <button data-id="${_id}" class="ml-4 text-red-500 hover:text-red-600 removeItem">
              <i class="ri-delete-bin-line text-xl"></i>
            </button>
          </div>
        </div>
        `;

      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.selling_price;
    });

    totalQuantityEl.textContent = totalQuantity;

    totalPriceEl.textContent = totalPrice.toFixed(2);

    if (cartItems.length == 0) {
      cartItemsContainer.innerHTML = `<div class="flex flex-col my-7 items-center justify-center">
                    <img src="../assets/images/empty-cart.png" alt="empty cart" class="w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] object-cover object-center scale-100 group-hover:scale-110 duration-300 transition-all">
                    <h3 class="text-center flex items-center space-x-2 text-xl  sm:text-3xl font-semibold text-gray-900 mt-4">Your cart is empty <img src="../assets/images/shopping-empty-bag.png" alt="empty cart" class="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] object-cover object-center scale-100 group-hover:scale-110 duration-300 transition-all"> </h3>
                    </div>`;
    }
  };

  const updateCart = () => {
    renderCart();
    localStorage.setItem("myCart", JSON.stringify(cartItems));
  };

  function saveCart(cart) {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }

  clearCartBtn.addEventListener("click", () => {
    if (cartItems.length >= 1) {


      overlay.classList.remove("overlayActive");
      deleteToast.classList.remove("-top-1/2");
      deleteToast.classList.add("top-1/2");

      let cancelClearCartItems = deleteToast.querySelectorAll(
        ".cancelClearCartItems"
      );
      let yesSureClearCartItems = deleteToast.querySelector(
        "#yesSureClearCartItems"
      );

      overlay.addEventListener("click", () => {
        cancelClearCart();
      });
      cancelClearCartItems.forEach((btn) =>
        btn.addEventListener("click", cancelClearCart)
      );

      function cancelClearCart() {
        overlay.classList.add("overlayActive");
        deleteToast.classList.remove("top-1/2");
        deleteToast.classList.add("-top-1/2");
        return;
      }

      yesSureClearCartItems.addEventListener("click", () => {
        cartItems = [];
        updateCart();
        saveCart(cartItems);
        getCartLength();
        cancelClearCart();
      });
    } else {
      showToast("Your cart is empty", "error");
    }
  });

  continueShoppingBtn.addEventListener("click", () => {
    window.location.href = `../index.html`;
  });

  // Checkout (Redirect Example)
  checkoutBtn.addEventListener("click", () => {
    if (cartItems.length >= 1) {
      window.location.href = `../html/checkoutPage.html`;
    } else {
      showToast("Your cart is empty", "error");
    }
  });

  renderCart();



  cartItemsContainer.addEventListener("click", (event) => {
    const itemDiv = event.target.closest(".itemDiv");
    const itemId = itemDiv.id;
    if (event.target.closest(".increaseCartQuantity")) {
      let increaseBtn = itemDiv.querySelector(".increaseCartQuantity");
      if (increaseBtn) {
        cartItems = cartItems.map((item) => {
          if (item._id === itemId) {
            item.quantity += 1;
          }
          return item;
        })
        updateCart();
        saveCart(cartItems);
        getCartLength();
      }
    }

    if (event.target.closest(".decreaseCartQuantity")) {
      cartItems = cartItems.map((item) => {
        if (item._id === itemId) {
          item.quantity -= 1;
          if (item.quantity < 1) {
            item.quantity = 1;
            showToast("Quantity cannot be less than 1", "error");
          }

        }
        return item;
      })
      updateCart();
      saveCart(cartItems);
      getCartLength();
    }

    if (event.target.closest(".removeItem")) {
      const deleteButton = event.target.closest(".removeItem");
      const itemId = deleteButton.getAttribute("data-id");
      cartItems = cartItems.filter((item) => item._id !== itemId);
      updateCart();
      saveCart(cartItems);
      getCartLength();
    }
  });

});

