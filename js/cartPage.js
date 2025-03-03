import { getCartLength } from "./getCartLength.js";
import { showToastNotify } from "../assets/utility/showToast.js";
import { getWishlistLength } from "../assets/utility/getWishlistLength.js";

// Cart Component Class
class CartComponent {
  constructor() {
    this.cartItems = JSON.parse(localStorage.getItem("myCart")) || [];
    this.savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
    this.appliedCoupon = null;
    this.VALID_COUPONS = {
      WELCOME20: 20,
      SAVE10: 10,
      SPECIAL25: 25,
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    try {
      this.initializeElements();
      this.attachEventListeners();
      this.render();
    } catch (error) {
      console.error("Initialization error:", error);
    }
  }

  initializeElements() {
    // Main containers
    this.cartItemsContainer = document.getElementById("cartItems");
    this.savedItemsContainer = document.getElementById("savedItems");

    // Price elements
    this.totalQuantityEl = document.getElementById("totalQuantity");
    this.totalPriceEl = document.getElementById("totalPrice");
    this.finalPriceEl = document.getElementById("finalPrice");
    this.discountAmountEl = document.getElementById("discountAmount");

    // Buttons
    this.clearCartBtn = document.getElementById("clearCart");
    this.continueShoppingBtn = document.getElementById("continueShopping");
    this.checkoutBtn = document.getElementById("checkout");

    // Coupon elements
    this.couponInput = document.getElementById("couponCode");
    this.applyCouponBtn = document.getElementById("applyCoupon");
    this.couponMessage = document.getElementById("couponMessage");

    // Modal elements
    this.deleteToast = document.querySelector("#deleteToast");
    this.overlay = document.querySelector(".overlay");

    if (!this.cartItemsContainer) {
      throw new Error("Cart items container not found");
    }
  }

  attachEventListeners() {
    // Cart actions
    this.cartItemsContainer?.addEventListener("click", (e) =>
      this.handleCartAction(e)
    );
    this.savedItemsContainer?.addEventListener("click", (e) =>
      this.handleSavedItemAction(e)
    );

    // Button actions
    this.clearCartBtn?.addEventListener("click", () => this.handleClearCart());
    this.continueShoppingBtn?.addEventListener("click", () =>
      this.navigateToHome()
    );
    this.checkoutBtn?.addEventListener("click", () => this.handleCheckout());
    this.applyCouponBtn?.addEventListener("click", () =>
      this.handleApplyCoupon()
    );

    // Category navigation
    document
      .querySelector("#category-buttons")
      ?.addEventListener("click", (e) => this.handleCategoryNavigation(e));
  }

  renderCartItems() {
    if (!this.cartItemsContainer) return;

    this.cartItemsContainer.innerHTML = "";
    if (this.cartItems.length === 0) {
      this.renderEmptyCart();
      return;
    }

    this.cartItems.forEach((item, index) => {
      this.cartItemsContainer.innerHTML += this.renderCartItem(item, false);
    });
  }

  renderSavedItems() {
    if (!this.savedItemsContainer) return;

    this.savedItemsContainer.innerHTML = "";
    if (this.savedItems.length === 0) {
      this.savedItemsContainer.innerHTML = `
        <p class="text-gray-500 text-center py-4">No items saved for later</p>
      `;
      return;
    }

    this.savedItems.forEach((item, index) => {
      this.savedItemsContainer.innerHTML += this.renderCartItem(item, true);
    });
  }

  renderEmptyCart() {
    this.cartItemsContainer.innerHTML = `
       <div id="emptyState" class="">
      <div class="bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <div class="relative w-full max-w-[300px] h-[300px] mx-auto mb-8">
          <div
            class="absolute inset-0 flex items-center justify-center animate-float"
          >
            <div class="relative">
              <i class="ri-heart-3-line text-[36px] text-gray-200"></i>
              <img
                src="../assets/images/empty-cart.png"
                alt="empty cart"
                class="w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] object-center object-contain scale-100 group-hover:scale-110 duration-300 transition-all"
              />
              <!-- Animated Food Items -->
              <div
                class="absolute top-[2rem] -left-16 animate-float-delay-1 opacity-90"
              >
                <i class="ri-cake-3-line text-4xl text-[#ff6b38]"></i>
              </div>
              <div
                class="absolute top-[2rem] right-16 animate-float-delay-2 opacity-80"
              >
                <i class="ri-restaurant-line text-5xl text-[#ff8b38]"></i>
              </div>
              <div
                class="absolute top-24 -right-12 animate-float-delay-3 opacity-70"
              >
                <i class="ri-cup-line text-4xl text-[#ff6b38]"></i>
              </div>

              <!-- Animated Stars -->
              <div class="absolute -top-4 left-20 animate-ping-slow opacity-60">
                <i class="ri-star-smile-line text-2xl text-yellow-400"></i>
              </div>
              <div
                class="absolute top-20 -left-8 animate-ping-slower opacity-50"
              >
                <i class="ri-star-smile-line text-xl text-yellow-400"></i>
              </div>
              <div
                class="absolute -bottom-2 right-16 animate-ping-slow opacity-70"
              >
                <i class="ri-star-smile-line text-2xl text-yellow-400"></i>
              </div>

              <!-- Animated Circles -->
              <div
                class="absolute -top-20 left-10 w-3 h-3 rounded-full bg-[#ff6b38]/20 animate-ping-slow"
              ></div>
              <div
                class="absolute top-10 -right-10 w-2 h-2 rounded-full bg-[#ff8b38]/30 animate-ping-slower"
              ></div>
              <div
                class="absolute -bottom-10 left-20 w-4 h-4 rounded-full bg-[#ff6b38]/10 animate-ping-slow"
              ></div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="text-center max-w-[45rem] mx-auto">
          <h3 class="text-center flex justify-center my-3 items-center space-x-2 text-xl  sm:text-3xl font-semibold text-gray-900 mt-4">Your cart is empty <img src="../assets/images/shopping-empty-bag.png" alt="empty cart" class="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] object-cover object-center scale-100 group-hover:scale-110 duration-300 transition-all"> </h3>
          <p class="text-gray-500 mb-8 leading-relaxed animate-fade-in-delay-1">
            Explore our delicious menu and save your favorite items here. Start
            adding items to cart
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2"
          >
            <a
              href="../index.html"
              class="group px-6 py-3 border-2 border-[#107bdf] text-[#107bdf] rounded-full hover:bg-[#107bdf]/5 transition-all duration-300 flex items-center justify-center gap-2"
            >
             <i class="ri-arrow-left-fill text-xl duration-300 group-hover:-translate-x-1"></i>
              <span>Back to Homepage</span>
            </a>
          </div>

           
        </div>
      </div>
    </div>
    `;
  }

  updateTotals() {
    let totalQuantity = 0;
    let totalPrice = 0;

    this.cartItems.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.selling_price;
    });

    if (this.totalQuantityEl) this.totalQuantityEl.textContent = totalQuantity;
    if (this.totalPriceEl)
      this.totalPriceEl.textContent = totalPrice.toFixed(2);

    // Calculate discount if coupon is applied
    if (this.appliedCoupon && this.VALID_COUPONS[this.appliedCoupon]) {
      const discountAmount =
        (totalPrice * this.VALID_COUPONS[this.appliedCoupon]) / 100;
      if (this.discountAmountEl)
        this.discountAmountEl.textContent = discountAmount.toFixed(2);
      if (this.finalPriceEl)
        this.finalPriceEl.textContent = (totalPrice - discountAmount).toFixed(
          2
        );
    } else {
      if (this.discountAmountEl) this.discountAmountEl.textContent = "0.00";
      if (this.finalPriceEl)
        this.finalPriceEl.textContent = totalPrice.toFixed(2);
    }
  }

  checkEmptyStates() {
    if (this.cartItems.length === 0) {
      this.renderEmptyCart();
    }
  }

  renderToFilterPage(category) {
    window.location.href = `../html/filterFood.html?menu=${this.category}`;
  }

  handleClearCart() {
    if (this.cartItems.length === 0) {
      showToastNotify("Your cart is already empty", "error");
      return;
    }

    if (this.overlay && this.deleteToast) {
      this.overlay.classList.remove("overlayActive");
      this.deleteToast.classList.remove("-top-1/2");
      this.deleteToast.classList.add("top-1/2");

      // Add confirmation handlers
      const yesSureBtn = this.deleteToast.querySelector(
        "#yesSureClearCartItems"
      );
      const cancelBtns = this.deleteToast.querySelectorAll(
        ".cancelClearCartItems"
      );

      const handleCancel = () => {
        this.overlay.classList.add("overlayActive");
        this.deleteToast.classList.remove("top-1/2");
        this.deleteToast.classList.add("-top-1/2");
      };

      const handleConfirm = () => {
        this.cartItems = [];
        this.updateStorage();
        showToastNotify("Cart cleared successfully", "success");
        handleCancel();
      };

      yesSureBtn.addEventListener("click", handleConfirm, { once: true });
      cancelBtns.forEach((btn) =>
        btn.addEventListener("click", handleCancel, { once: true })
      );
      this.overlay.addEventListener("click", handleCancel, { once: true });
    }
  }

  removeFromCart(itemId) {
    this.cartItems = this.cartItems.filter((item) => item._id !== itemId);
    this.updateStorage();
    showToastNotify("Item removed from cart", "success");
  }

  removeFromSaved(itemId) {
    this.savedItems = this.savedItems.filter((item) => item._id !== itemId);
    localStorage.setItem("savedItems", JSON.stringify(this.savedItems));
    this.render();
    showToastNotify("Item removed from saved items", "success");
  }

  render() {
    this.renderCartItems();
    this.renderSavedItems();
    this.updateTotals();
    this.checkEmptyStates();
  }

  // Render Methods
  renderCartItem(item, isSaved = false) {
    const { _id, rating, image, name, selling_price, quantity } = item;

    return `
      <div data-aos="zoom-in" data-aos-duration="500" id="${_id}" class="itemDiv group hover:shadow-lg transition-all duration-300 rounded-lg p-3 sm:p-4 bg-white border border-gray-100">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <div class="relative w-full sm:w-auto">
              <img src="${image}" alt="${name}" 
                class="w-full sm:w-[140px] h-[140px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"/>
              <span class="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs sm:text-sm">
                <i class="ri-star-fill text-[#ff6b38]"></i> ${rating}
              </span>
            </div>
            
            <div class="flex flex-col justify-between py-1 sm:py-2 flex-1">
              <div>
                <h3 class="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-[#3284e8] transition-colors duration-300">${name}</h3>
                <p class="text-gray-500 text-xs sm:text-sm mt-1">Unit Price: $${selling_price.toFixed(
      2
    )}</p>
              </div>
              
              <div class="flex items-center gap-3 sm:gap-4 mt-2">
                ${!isSaved ? this.renderQuantityControls(quantity) : ""}
                <p class="font-semibold text-[#3284e8] text-sm sm:text-base">
                  $${(selling_price * (quantity || 1)).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center gap-2 mt-2 sm:mt-0">
            ${this.renderItemActions(_id, isSaved)}
          </div>
        </div>
      </div>
    `;
  }

  renderQuantityControls(quantity) {
    return `
      <div class="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
        <button class="decreaseCartQuantity w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors duration-200">
          <i class="ri-subtract-line"></i>
        </button>
        <input type="number" value="${quantity}" min="1" 
          class="quantity w-10 sm:w-12 bg-transparent text-center text-sm sm:text-base focus:outline-none" readonly/>
        <button class="increaseCartQuantity w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors duration-200">
          <i class="ri-add-line"></i>
        </button>
      </div>
    `;
  }

  renderItemActions(_id, isSaved) {
    return isSaved
      ? `
      <button title="Add to Cart" data-id="${_id}" class="moveToCart btn-icon">
        <i class="fas fa-cart-plus"></i>
      </button>
    `
      : `
      <button title="Save it for later" data-id="${_id}" class="saveForLater btn-icon">
        <i class="far fa-bookmark"></i>
      </button>
    ` +
      `
      <button title="Remove item" data-id="${_id}" class="removeItem btn-icon-danger">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;
  }

  // Event Handlers
  handleCartAction(event) {
    try {
      const itemDiv = event.target.closest(".itemDiv");
      if (!itemDiv) return;

      const itemId = itemDiv.id;
      const target = event.target.closest("button");

      if (!target) return;

      if (target.classList.contains("increaseCartQuantity")) {
        this.updateItemQuantity(itemId, 1);
      } else if (target.classList.contains("decreaseCartQuantity")) {
        this.updateItemQuantity(itemId, -1);
      } else if (target.classList.contains("removeItem")) {
        this.removeFromCart(itemId);
      } else if (target.classList.contains("saveForLater")) {
        this.moveToSavedItems(itemId);
      }
    } catch (error) {
      console.error("Error handling cart action:", error);
      showToastNotify("Error performing action", "error");
    }
  }

  handleSavedItemAction(event) {
    const itemDiv = event.target.closest(".itemDiv");
    if (!itemDiv) return;

    const itemId = itemDiv.id;
    const target = event.target.closest("button");

    if (!target) return;

    if (target.classList.contains("moveToCart")) {
      this.moveToCart(itemId);
    } else if (target.classList.contains("removeItem")) {
      this.removeFromSaved(itemId);
    }
  }

  handleApplyCoupon() {
    const code = this.couponInput.value.trim();

    if (!code) {
      showToastNotify("Please enter a coupon code", "error");
      return;
    }

    if (this.VALID_COUPONS[code]) {
      this.appliedCoupon = code;
      this.updateCouponUI(
        true,
        `${this.VALID_COUPONS[code]}% discount applied!`
      );
      showToastNotify("Coupon applied successfully!", "success");
      this.render();
      this.couponInput.value = "";
    } else {
      this.updateCouponUI(false, "Invalid coupon code");
      showToastNotify("Invalid coupon code", "error");
    }
  }

  // Utility Methods
  updateItemQuantity(itemId, change) {
    try {
      this.cartItems = this.cartItems.map((item) => {
        if (item._id === itemId) {
          const newQuantity = item.quantity + change;

          if (newQuantity > item.stock) {
            showToastNotify("Cannot exceed available stock", "warning");
            return item;
          }

          if (newQuantity >= 1) {
            item.quantity = newQuantity;
            showToastNotify("Quantity updated", "success");
          }
        }
        return item;
      });

      this.updateStorage();
    } catch (error) {
      console.error("Error updating quantity:", error);
      showToastNotify("Error updating quantity", "error");
    }
  }


  moveToSavedItems(itemId) {
    const item = this.cartItems.find((item) => item._id === itemId);
    if (item) {
      this.cartItems = this.cartItems.filter((item) => item._id !== itemId);
      this.savedItems.push(item);
      this.updateStorage();
      showToastNotify("Item saved for later", "success");
    }
  }

  moveToCart(itemId) {
    const item = this.savedItems.find((item) => item._id === itemId);
    if (item) {
      this.savedItems = this.savedItems.filter((item) => item._id !== itemId);
      this.cartItems.push(item);
      this.updateStorage();
      showToastNotify("Item moved to cart", "success");
    }
  }

  updateStorage() {
    try {
      localStorage.setItem("myCart", JSON.stringify(this.cartItems));
      localStorage.setItem("savedItems", JSON.stringify(this.savedItems));
      getCartLength();
      this.render();
    } catch (error) {
      console.error("Error updating storage:", error);
      showToastNotify("Error saving changes", "error");
    }
  }

  updateCouponUI(isValid, message) {
    this.couponMessage.classList.remove("hidden");
    this.couponMessage.className = `text-[16px] mt-2 border-l-[3px] pl-3 py-2 ${isValid
      ? "text-green-500 bg-green-50 border-l-green-400"
      : "text-red-500 bg-red-50 border-l-red-400"
      }`;
    this.couponMessage.innerHTML = `${message}`;
  }

  navigateToHome() {
    window.location.href = "../index.html";
  }

  handleCheckout() {
    if (this.cartItems.length >= 1) {
      window.location.href = "../html/checkoutPage.html";
    } else {
      showToastNotify("Your cart is empty", "error");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CartComponent();
});
