import { getCartLength } from "../js/getCartLength.js";
import { showToastNotify } from "../assets/utility/showToast.js";
document.addEventListener("DOMContentLoaded", () => {
  getCartLength();
  let carts = JSON.parse(localStorage.getItem("myCart")) || [];
  const form = document.getElementById("checkoutForm");
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const paymentEmail = document.getElementById("paymentEmail");
  const phoneNumber = document.getElementById("phoneNumber");
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const address = document.getElementById("address");
  const paymentMethod = document.getElementById("paymentMethod");

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const phoneNumberError = document.getElementById("phoneNumberError");
  const cityError = document.getElementById("cityError");
  const stateError = document.getElementById("stateError");
  const addressError = document.getElementById("addressError");
  const paymentError = document.getElementById("paymentError");

  let renderingToast = document.querySelector("#renderingToast");
  let submitButton = document.querySelector("#submitPayment");
  const originalButtonHtml = submitButton.innerHTML;
  let overlay = document.querySelector(".overlay");

  function renderCustomerProducts() {
    let selectedProducts = document.querySelector("#selectedProducts");
    let productsubTotal = document.getElementById("subTotal");
    let productTotalPrice = document.getElementById("totalPrice");
    let shippingPrice = 0;
    let totalAmount = 0;
    let shippingFee = document.querySelector("#shippingFee");

    selectedProducts.innerHTML = "";

    if (shippingPrice === 0) {
      shippingFee.classList.add("freeShipping");
      shippingFee.classList.remove("shippingFee");
      shippingFee.innerText = "Free";
    } else {
      shippingFee.classList.remove("freeShipping");
      shippingFee.classList.add("shippingFee");
      shippingFee.innerText = `$${shippingPrice}`;
    }

    carts.forEach((item) => {
      let { _id, rating, image, name, selling_price, quantity } = item;
      const itemTotal = selling_price * quantity;
      totalAmount += itemTotal;
      selectedProducts.innerHTML += `
               <div id="${_id}" data-aos="fade-up" data-aos-duration="1900" class="flex justify-between mb-2 rounded-md bg-[#ffffff] p-4 sm:p-8 overflow-hidden border border-gray-100 hover:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] transition-all">
                  <div class="flex gap-3">
                    <div class="relative">
                      <img
                        src="${image}"
                        alt="${name}"
                        class="w-[60px] h-[60px] sm:w-20 sm:h-20 object-cover rounded-md" />
                      <span
                        class="cartItems absolute w-[23px] h-[23px] rounded-full text-white top-0 -right-1 bg-[#3284e8] text-[12px] hidden items-center justify-center"
                        >${quantity}</span>
                    </div>
    
                    <div>
                      <h3
                        class="text-[16px] text-gray-700 sm:text-[18px] font-[400]"
                      >
                        ${name}
                      </h3>
                      <p class="text-gray-600 text-[16px] my-1 hidden">
                        <i class="ri-star-fill text-[#ff6b38]"></i> | ${rating}
                      </p>
                      <p class="text-gray-500 text-[16px] my-1">
                      Quantity: ${quantity}
                      </p>
                      <p class="text-gray-600 text-[13.5px] sm:text-[15px]">
                        Price: $${selling_price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-col text-[14px] sm:text-[16px]">
                    <p>Sub Total</p>
                    <p class="text-[16px] sm:text-[18px] text-[#0d6efd]">
                      $${itemTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
            `;
    });

    productsubTotal.innerHTML = `$${totalAmount.toFixed(2)}`;
    productTotalPrice.innerHTML = `$${(totalAmount + shippingPrice).toFixed(
      2
    )}`;
  }
  renderCustomerProducts();

  function clearCheckoutForm() {
    // Reset error messages
    firstName.value = "";
    lastName.value = "";
    paymentEmail.value = "";
    phoneNumber.value = "";
    city.value = "";
    state.value = "";
    address.value = "";
    paymentMethod.value = "Select Payment Method";
  }

  function clearErrorMsg() {
    // Reset error messages
    firstNameError.innerHTML = "";
    lastNameError.innerHTML = "";
    emailError.innerHTML = "";
    phoneNumberError.innerHTML = "";
    cityError.innerHTML = "";
    stateError.innerHTML = "";
    addressError.innerHTML = "";
    paymentError.innerHTML = "";
  }

  function clearShakeError() {
    firstName.classList.remove("borderError");
    lastName.classList.remove("borderError");
    paymentEmail.classList.remove("borderError");
    phoneNumber.classList.remove("borderError");
    city.classList.remove("borderError");
    state.classList.remove("borderError");
    address.classList.remove("borderError");
    paymentMethod.classList.remove("borderError");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let isValid = true;

    clearErrorMsg();
    clearShakeError();

    // Validate First Name
    if (firstName.value.trim() === "") {
      firstName.classList.add("borderError");
      firstNameError.classList.remove("hidden");
      firstNameError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your first name</span>`;
      isValid = false;
    } else {
      firstNameError.classList.add("hidden");
    }

    // Validate Last Name
    if (lastName.value.trim() === "") {
      lastName.classList.add("borderError");
      lastNameError.classList.remove("hidden");
      lastNameError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your last name</span>`;
      isValid = false;
    } else {
      lastNameError.classList.add("hidden");
    }

    // Validate Email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (paymentEmail.value.trim() === "") {
      paymentEmail.classList.add("borderError");
      emailError.classList.remove("hidden");
      emailError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your email address</span>`;
      isValid = false;
    } else if (!emailPattern.test(paymentEmail.value.trim())) {
      paymentEmail.classList.add("borderError");
      emailError.classList.remove("hidden");
      emailError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter a valid email address</span>`;
      isValid = false;
    } else {
      emailError.classList.add("hidden");
    }

    // Validate Phone Number
    const phonePattern = /^[0-9]{10}$/;
    if (phoneNumber.value.trim() === "") {
      phoneNumber.classList.add("borderError");
      phoneNumberError.classList.remove("hidden");
      phoneNumberError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your phone number</span>`;
      isValid = false;
    } else if (!phonePattern.test(phoneNumber.value.trim())) {
      phoneNumberError.classList.remove("hidden");
      phoneNumber.classList.add("borderError");
      phoneNumberError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter a valid phone number</span>`;
      isValid = false;
    } else {
      phoneNumberError.classList.add("hidden");
    }

    // Validate City
    if (city.value.trim() === "") {
      city.classList.add("borderError");
      cityError.classList.remove("hidden");
      cityError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your city</span>`;
      isValid = false;
    } else {
      cityError.classList.add("hidden");
    }

    // Validate State
    if (state.value.trim() === "") {
      state.classList.add("borderError");
      stateError.classList.remove("hidden");
      stateError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your state</span>`;
      isValid = false;
    } else {
      stateError.classList.add("hidden");
    }

    // Validate Address
    if (address.value.trim() === "") {
      address.classList.add("borderError");
      addressError.classList.remove("hidden");
      addressError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your address</span>`;
      isValid = false;
    } else {
      addressError.classList.add("hidden");
    }

    // Validate Payment Method
    if (
      paymentMethod.value.trim() === "" ||
      paymentMethod.value.trim() === "Select Payment Method"
    ) {
      paymentMethod.classList.add("borderError");
      paymentError.classList.remove("hidden");
      paymentError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please select a payment method</span>`;
      isValid = false;
    } else {
      paymentError.classList.add("hidden");
    }

    let pmmthd = paymentMethod.value.trim();
    if (!pmmthd || typeof pmmthd !== "string") {
      showToastNotify("Invalid payment method. Please try again.", "error");
      return;
    }
    if (!isValid) {
      showToastNotify("Please fill up all the required fields.", "error");
      return;
    }

    setLoadingState(true);

    try {
      console.log("one")
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("two")

      const newOrder = {
        orderId: Date.now().toString(),
        items: carts,
        totalAmount: carts.reduce((total, item) => total + item.selling_price * item.quantity, 0),
        paymentMethod: pmmthd,
        orderStatus: "Pending",
        orderDate: Date.now()
      };

      const myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
      myOrders.push(newOrder);

      localStorage.setItem("myOrders", JSON.stringify(myOrders));
      localStorage.setItem("myCart", JSON.stringify([]));

      showToastNotify("Your order has been placed successfully. We will get back to you soon.", "success");

      clearCheckoutForm();
      setLoadingState(false);

      setTimeout(() => redirectToOrderPage(), 3000);
    } catch (error) {
      showToastNotify("Order failed. Please try again.", "error");
      setLoadingState(false);
    }
  });

  // Function to set the loading state
  function setLoadingState(isLoading) {
    submitButton.disabled = isLoading;
    submitButton.innerHTML = isLoading
      ? `<div class="flex justify-center items-center gap-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Placing Order...
           </div>`
      : originalButtonHtml;
  }


  // Function to redirect to the order page
  function redirectToOrderPage() {
    // overlay.classList.remove("overlayActive");
    renderingToast.classList.remove("hidden");
    renderingToast.querySelector("div:nth-child(2)").classList.remove("-top-1/2");
    renderingToast.querySelector("div:nth-child(2)").classList.add("top-1/2");

    document.querySelector("#homePage")?.addEventListener("click", () => {
      window.location.href = "../index.html";
    });

    document.querySelector(".myOrder")?.addEventListener("click", () => {
      window.location.href = "../html/orderPage.html";
    });
  }

  document.querySelectorAll(".borderShakeError").forEach((input) => {
    input.addEventListener("animationend", () => {
      input.classList.remove("borderError");
    });
  });

  if (carts.length < 1) {
    renderingToast.querySelector("div:nth-child(2)").innerHTML = "";
    renderingToast.classList.remove("hidden");
    renderingToast.querySelector("div:nth-child(2)").classList.add("top-1/2");
    renderingToast.querySelector("div:nth-child(2)").classList.remove("-top-1/2");

    renderingToast.querySelector("div:nth-child(2)").innerHTML = `
      <div class="relative bg-white rounded-lg max-w-md w-full shadow">
      <button
        type="button"
        class="cancelClearCartItems absolute top-3 end-2.5 text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
        data-modal-hide="popup-modal"
      ></button>
      <div class="p-4 md:p-5 text-center">
        <svg
          class="mx-auto mb-4 text-red-600 w-12 h-12"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 class="mb-5 text-lg font-normal text-gray-800">
          <div class="flex justify-center my-3 items-center space-x-2">
            <span class="sm:text-[24px] text-[20px] font-semibold text-[#ff0000]"
              >Your Cart is empty </span
            ><img
              src="../assets/images/shopping-empty-bag.png"
              alt="empty cart"
              class="w-[30px] h-[30px] object-cover object-center scale-100 group-hover:scale-110 duration-300 transition-all"
            />
          </div>
         <span class="sm:text-[20px] text-[16px] font-semibold text-gray-700">
            Please items add to your cart <br />
            Rendering to home page...
         </span>
        </h3>
          <button onclick="window.location.href = '../index.html'"
            data-modal-hide="popup-modal"
            type="button"
            class="text-white group bg-[#eb5f2f] hover:bg-[#ff6b38] focus:ring-4 focus:outline-none duration-300 focus:ring-red-300 font-medium rounded-lg text-[14px] sm:text-[16px] inline-flex items-center px-5 py-2.5 text-center"
          >
          <i class="ri-send-plane-line group-hover:rotate-[230deg] rotate-[270deg] transition-transform"></i> &nbsp;
            Home Page
          </button>
      </div>
    </div>
        `;

    setTimeout(() => {
      window.location.href = `/`;
    }, 3000);
  }
});
