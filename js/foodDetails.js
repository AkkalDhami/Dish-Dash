import { showToast } from '../assets/utility/showToast.js';
import { addToCart } from "../assets/utility/addToCart.js";
import { getCartLength } from "./getCartLength.js";
import { getWishlistLength } from "../assets/utility/getWishlistLength.js";
import { addToWishList } from "../assets/utility/addToWishList.js";
getCartLength();

getWishlistLength();

const foodImage = document.getElementById("foodImage");
const itemRating = document.getElementById("itemRating");
const itemPrice = document.getElementById("itemPrice");
const itemStock = document.getElementById("itemStock");
const itemName = document.getElementById("itemName");
const itemDescription = document.getElementById("itemDescription");
const itemReviews = document.getElementById("itemReviews");

itemReviews.innerHTML = "";

const params = new URLSearchParams(window.location.search);
const productId = String(params.get("id"));
const foodList = JSON.parse(localStorage.getItem("FoodList")) || [];
const product = foodList.find((p) => p._id === productId);

console.log(product);
console.log(foodList);

const recommendedItems = foodList.filter((item) => item.category === product.category);

const userReview = product.reviews.map((review) => review.rating);
const finalRating = userReview.reduce((total, rating) => total + rating, 0) / userReview.length || 0;
const rating = finalRating || "No rating available";

const discount = Math.round(((product.original_price - product.selling_price) / product.original_price) * 100);

const updateFoodDetails = () => {
  foodImage.src = product.image;
  itemRating.innerHTML = `
        <span class="text-orange-500 text-[20px] flex items-center">
            <i class="ri-star-fill"></i>
            <span class="ml-1 text-gray-800"> | ${rating}</span>
        </span>
        <span class="text-gray-600">(${product.reviews.length} Reviews)</span>
    `;
  itemPrice.innerHTML = `
        <span class="text-[18px] font-semibold text-gray-800">$${product.selling_price}</span>
        <span class="line-through text-gray-400 text-[16px]">$${product.original_price}</span>
           <span class="text-[#fff] px-3 py-[2px] rounded-full bg-[#ff6b38] sm:text-[14px] text-[12px] font-[500]">${discount}% off</span>
    `;
  itemStock.innerHTML = `
        <span>In Stock:</span>
        <span class="text-gray-700 z-10 font-semibold"> ${product.stock}</span>
        <span class="${product.stock === 0 ? "outStock" : "inStock"} w-3 h-3 ml-3 rounded-full inline-block"></span>
    `;
  itemName.innerHTML = `${product.name}`;
  itemDescription.innerHTML = `
        <p class="text-gray-700 text-[16px] font-[500]">
            ${product.description}
        </p>
        <ul class="mt-4 space-y-2 list-disc list-inside">
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        </ul>
    `;

  product.reviews.forEach((review) => {
    itemReviews.innerHTML += `
            <div data-tab="reviews"
                class="tabContent hidden p-3 sm:p-6 rounded-lg shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] max-w-md sm:w-[500px]"
            >
                <div class="flex items-center mb-4">
                    <img
                        class="w-12 h-12 rounded-full object-cover  mr-4"
                        src="../assets/images/profile_icon.png"
                        alt="Profile Picture"
                    />
                    <div>
                        <h2 class="text-[18px] font-[500]">${review.username}</h2>
                        <div class="flex items-center">
                            <i class="ri-star-fill text-orange-500"></i>
                            <span class="ml-2 text-gray-700"> | ${review.rating}</span>
                        </div>
                    </div>
                </div>
                <p class="mb-4 text-center">
                    "${review.comment}"
                </p>
                <div class="text-[#0d6efd] flex justify-end space-x-2 items-center">
                    <i class="ri-calendar-2-line"></i>
                    <span class="text-gray-600 text-[14px]">28 Jan 2025</span>
                </div>
            </div>
        `;
  });
};

updateFoodDetails();

// Tab functionality
const tabs = document.querySelectorAll(".tabs button");
const tabContent = document.querySelectorAll(".tabContent");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("tabActive"));
    tab.classList.add("tabActive");

    const dataTab = tab.getAttribute("data-tab");
    tabContent.forEach((content) => {
      content.classList.add("hidden");
      if (content.getAttribute("data-tab") === dataTab) {
        content.classList.remove("hidden");
      }
    });
  });
});

let addToCartBtn = document.getElementById("addToCartBtn");
let quantityContainer = document.getElementById("quantityContainer");
let recommendedItemContainer = document.getElementById("recommendedItemContainer");

let quantityInput = document.getElementById("quantityInput");
let quantity = parseInt(quantityInput.value) || 1;
quantityContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("decreaseQuantity")) {

    if (product.stock === 0) {
      quantityInput.value = 1
      quantity = parseInt(quantityInput.value);
      showToast("Out of stock", "error");
    } else if (quantityInput.value > 1) {
      quantityInput.value--;
      quantity = parseInt(quantityInput.value)
    } else {
      quantityInput.value = 1
      quantity = parseInt(quantityInput.value)
      showToast("Quantity cannot be less than 1", "error");
    }
  }

  if (e.target.classList.contains("increaseQuantity")) {
    if (product.stock === 0) {
      quantityInput.value = 1
      quantity = parseInt(quantityInput.value);
      showToast("Out of stock", "error");
    }
    else if (quantityInput.value >= product.stock) {
      quantityInput.value = product.stock
      quantity = parseInt(quantityInput.value)
      showToast("Quantity cannot be more than stock", "error");
    }
    else {
      quantityInput.value++;
      quantity = parseInt(quantityInput.value)

    }
  }
})

addToCartBtn.addEventListener("click", () => {
  addToCart(product._id, quantity);
  getCartLength();
});
document.querySelector("#addToWishlist").addEventListener("click", () => {
  addToWishList(product._id);
  getWishlistLength();
});

getCartLength();
getWishlistLength();

const orderNow = (productId, quantity) => {
  console.log(productId, quantity);

  let orderNowProd = foodList.find((item) => item._id === product._id);

  let orderNowItem = JSON.parse(localStorage.getItem("orderNowProd")) || [];

  if (!orderNowProd) {
    console.error("Product not found in foodList!");
    return;
  }

  orderNowItem.push({
    ...orderNowProd,
    quantity: quantity,
  });

  localStorage.setItem("orderNow", JSON.stringify(orderNowItem));

  window.location.href = `../html/orderNowPage.html`
}

let orderNowBtn = document.getElementById("orderNowBtn");
orderNowBtn.addEventListener("click", () => {
  orderNow(product._id, quantity);

});



function displayRecommendedItems(recommendedItems) {
  recommendedItems.forEach((item, ind) => {
    const userReview = item.reviews.map((review) => review.rating);
    const finalRating = userReview.reduce((total, rating) => total + rating, 0) / userReview.length || 0;
    const rating = finalRating || "No rating available";

    let { _id, category, description, image, name, selling_price, original_price } = item;

    let discount = Math.floor((original_price - selling_price) / original_price * 100);
    recommendedItemContainer.innerHTML += `
        <div id="${_id}" data-category="${category}"
            class="recommItems bg-[#f6f6f6] rounded shadow-sm hover:shadow-[0px_0px_12px_3px_#dadada] transition-all duration-300 overflow-hidden max-w-sm group hover:bg-white"
          >
            <div class="relative">
              <img
                src="${image}"
                alt="Veg Salad-${ind}"
                class="w-full h-56 object-cover group-hover:scale-100 duration-300"
              />

              <div
                class="absolute top-3 group-hover:right-3 -right-5 flex duration-300 flex-col gap-3"
              >
                <button
                  class="addToWishList bg-white p-3 w-[36px] h-[36px] flex items-center justify-center rounded-full shadow-md hover:bg-[#ff6b38] hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                >
                  <i class="ri-heart-line addToWishList text-[20px]"></i>
                </button>

                <button
                  class="viewDetails bg-white p-3 w-[36px] h-[36px] flex items-center justify-center rounded-full shadow-md hover:bg-[#ff6b38] hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
                >
                  <i class="ri-eye-line viewDetails text-lg"></i>
                </button>
              </div>

              <div class="absolute bottom-3 left-3">
                <span
                  class="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  ${discount}% off
                </span>
              </div>
            </div>

            <div class="p-4">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">
              ${name}
              </h3>

              <p class="text-gray-600 text-sm mb-3 line-clamp-2">
              ${description}
              </p>

              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                  <span
                    class="text-[16px] sm:text-[18px] font-[500] text-gray-800"
                    >$${selling_price}</span
                  >
                  <span class="text-gray-400 text-sm line-through">$${original_price}</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="ri-star-fill text-orange-500"></i>
                  <span class="text-gray-600"> | ${rating}</span>
                </div>
              </div>

              <button
                class="addToCart bg-[#0d6efd] w-full hover:bg-transparent border-2 hover:text-gray-800 border-[#0d6efd] text-white px-6 py-2.5 rounded-full shadow-md flex justify-center items-center space-x-2 transition text-[16px]"
              >
                <span class="addToCart">Add to Cart</span> <i class="ri-shopping-bag-line addToCart"></i>
              </button>
            </div>
          </div>
        `
  });
}
displayRecommendedItems(recommendedItems);

let recommItems = document.querySelectorAll(".recommItems");

recommItems.forEach((items) => {
  items.addEventListener('click', (e) => {
    console.log(e.target);
    let id = items.id;
    let quantity = 1;
    if (e.target.classList.contains("addToWishList")) {
      console.log("addToWishList");
      addToWishList(id);
    }

    if (e.target.classList.contains("addToCart")) {
      addToCart(id, quantity);
    }
    if (e.target.classList.contains("viewDetails")) {
      window.location.href = `../html/foodDetails.html?id=${id}&category=${product.category}`
    }
  })
})