import { getCartLength } from "../js/getCartLength.js";
import { showToastNotify } from "../assets/utility/showToast.js";
document.addEventListener("DOMContentLoaded", () => {
    getCartLength();
    let carts = JSON.parse(localStorage.getItem("orderNow")) || [];
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
    let overlay2 = document.querySelector(".overlay");

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
            console.log(item)
            let { _id, rating, image, name, selling_price, quantity } = item;
            const itemTotal = selling_price * quantity;
            totalAmount += itemTotal;
            selectedProducts.innerHTML += `
               <div id="${_id}" class="flex justify-between mb-4 rounded-md p-4 bg-[#f6f6f6]">
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

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        clearErrorMsg();
        clearShakeError();

        // Validate First Name
        if (firstName.value.trim() === "") {
            firstName.classList.add("borderError");
            firstNameError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your first name</span>`;
            isValid = false;
        }

        // Validate Last Name
        if (lastName.value.trim() === "") {
            lastName.classList.add("borderError");
            lastNameError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your last name</span>`;
            isValid = false;
        }

        // Validate Email
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (paymentEmail.value.trim() === "") {
            paymentEmail.classList.add("borderError");
            emailError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your email address</span>`;
            isValid = false;
        } else if (!emailPattern.test(paymentEmail.value.trim())) {
            paymentEmail.classList.add("borderError");
            emailError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter a valid email address</span>`;
            isValid = false;
        } else {
            paymentEmail.classList.remove("borderError");
        }

        // Validate Phone Number
        const phonePattern = /^[0-9]{10}$/;
        if (phoneNumber.value.trim() === "") {
            phoneNumber.classList.add("borderError");
            phoneNumberError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your phone number</span>`;
            isValid = false;
        } else if (!phonePattern.test(phoneNumber.value.trim())) {
            phoneNumber.classList.add("borderError");
            phoneNumberError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter a valid phone number</span>`;
            isValid = false;
        }

        // Validate City
        if (city.value.trim() === "") {
            city.classList.add("borderError");
            cityError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your city</span>`;
            isValid = false;
        }

        // Validate State
        if (state.value.trim() === "") {
            state.classList.add("borderError");
            stateError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your state</span>`;
            isValid = false;
        }

        // Validate Address
        if (address.value.trim() === "") {
            address.classList.add("borderError");
            addressError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please enter your address</span>`;
            isValid = false;
        }

        // Validate Payment Method
        if (
            paymentMethod.value === "" ||
            paymentMethod.value === "Select Payment Method"
        ) {
            paymentMethod.classList.add("borderError");
            paymentError.innerHTML = `<i class="ri-error-warning-line"></i> <span>Please select a payment method</span>`;
            isValid = false;
        } else {
            paymentError.innerHTML = "";
        }

        let pmmthd = paymentMethod.value.trim();

        if (isValid) {
            let loadingState = document.querySelector(".loadingState");

            loadingState.classList.remove("hidden");
            loadingState.classList.add("flex");

            loadingState.parentElement.classList.add("pointer-events-none");
            loadingState.parentElement.classList.add("cursor-not-allowed");
            loadingState.parentElement.classList.remove("cursor-pointer");


            // console.log(loadingState.parentElement)

            setTimeout(() => {

                loadingState.classList.add("hidden");
                loadingState.classList.remove("flex");

                loadingState.parentElement.classList.remove("pointer-events-none");
                loadingState.parentElement.classList.remove("cursor-not-allowed");
                loadingState.parentElement.classList.add("cursor-pointer");

                clearCheckoutForm();
                showToastNotify("Form submitted successfully!", "success");
                overlay2.classList.remove("overlayActive");
                renderingToast.classList.add("top-1/2");
                renderingToast.classList.remove("-top-1/2");

                // Redirect listeners
                const cancelClearCartItems = renderingToast.querySelector(".myOrder");
                const homePage = renderingToast.querySelector("#homePage");

                homePage.addEventListener("click", () => {
                    // window.location.href = "../index.html";
                });

                cancelClearCartItems.addEventListener("click", () => {
                    // window.location.href = "../html/orderPage.html";
                });

                const cartItems = JSON.parse(localStorage.getItem("orderNow")) || [];
                let myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];

                if (cartItems.length === 0) {
                  showToastNotify("Please order something first.", "error");
                    return;
                }

                // Validate the user-provided payment method
                if (!pmmthd || typeof pmmthd !== "string") {
                  showToastNotify("Invalid payment method. Please try again.", "error");
                    return;
                }

                // Create a new order object
                const newOrder = {
                    orderId: Date.now().toString(),
                    items: [...cartItems],
                    totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
                    paymentMethod: pmmthd,
                    orderStatus: "Pending",
                };

                myOrders.push(newOrder);

                localStorage.setItem("myOrders", JSON.stringify(myOrders));

                localStorage.setItem("orderNow", JSON.stringify([]));

                showToastNotify("Order placed successfully!", "success");

            }, 3000);
        } else {
          showToastNotify("Please fill up all the required fields.", "error");
        }

    });

    document.querySelectorAll(".borderShakeError").forEach((input) => {
        input.addEventListener("animationend", () => {
            input.classList.remove("borderError");
        });
    });

    if (carts.length < 1) {
        renderingToast.innerHTML = "";
        overlay2.classList.remove("overlayActive");
        renderingToast.classList.add("top-1/2");
        renderingToast.classList.remove("-top-1/2");

        renderingToast.innerHTML = `
          <div class="relative bg-white rounded-lg shadow">
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
            <span class="text-[22px] font-semibold text-[#ff0000]"
              >Please order something first</span
            ><img
              src="../assets/images/shopping-empty-bag.png"
              alt="empty cart"
              class="w-[30px] h-[30px] object-cover object-center scale-100 group-hover:scale-110 duration-300 transition-all"
            />
          </div>
          Rendering to home page...
        </h3>
          <button onclick="window.location.href = '../index.html'"
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-[#eb5f2f] hover:bg-[#ff6b38] focus:ring-4 focus:outline-none duration-300 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Home Page
          </button>
      </div>
    </div>
        `;

        setTimeout(() => {
            window.location.href = `../index.html`;
        }, 3000);
    }
});
