import { showToastNotify } from '../assets/utility/showToast.js';
import { addToCart } from "../assets/utility/addToCart.js";
import { getCartLength } from "./getCartLength.js";
import { getWishlistLength } from "../assets/utility/getWishlistLength.js";
import { addToWishList } from "../assets/utility/addTowishList.js";
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
        <span class="text-orange-500 text-[18px] flex items-center">
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
      showToastNotify("Food is Out of stock", "warn");
    } else if (quantityInput.value > 1) {
      quantityInput.value--;
      quantity = parseInt(quantityInput.value)
    } else {
      quantityInput.value = 1
      quantity = parseInt(quantityInput.value)
      showToastNotify("Quantity cannot be less than 1", "error");
    }
  }

  if (e.target.classList.contains("increaseQuantity")) {
    if (product.stock === 0) {
      quantityInput.value = 1
      quantity = parseInt(quantityInput.value);
      showToastNotify("Food is Out of stock", "warn");
    }
    else if (quantityInput.value >= product.stock) {
      quantityInput.value = product.stock
      quantity = parseInt(quantityInput.value)
      showToastNotify("Quantity cannot be more than stock", "error");
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

  if (product.stock === 0) {
    showToastNotify("Food is Out of stock", "warn");
    return;
  }
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
        <div data-category="${category}"
            id="${_id}"
            class="foodItem bg-[#f6f6f6]  rounded-md hover:shadow-lg hover:bg-[#ffffff] duration-300 w-[300px] group overflow-hidden relative"
          >
          <div class="absolute top-5 opacity-100 group-hover:opacity-100 right-3  flex space-y-2 duration-300 flex-col">
            
            <i title="Add to wishlist" class="addToWishList ri-heart-line z-30 duration-500 w-[30px] h-[30px] flex items-center justify-center p-5 cursor-pointer shadow-[0px_0px_16px_3px_#a19393] hover:bg-[#ff6b38] bg-white rounded-full hover:text-white  text-2xl text-[#ff6b38]"></i>
            
            <i title="View Details" onclick="window.location.href='../html/foodDetails.html?id=${_id}&category=${category}'" class="ri-eye-line viewMore z-30 w-[30px] h-[30px] flex items-center justify-center p-5 cursor-pointer hover:bg-[#0d6efd] bg-white rounded-full hover:text-white duration-300 shadow-[0px_0px_16px_3px_#a19393] text-2xl text-[#3284e8]"></i>
          </div>

            <div onclick="window.location.href='../html/foodDetails.html?id=${_id}&category=${category}'"
              class="img max-h-[280px] cursor-pointer w-full overflow-hidden"
            >  
              <img
                src="${image}"
                alt="food-${ind} image"
                class="w-full h-full object-cover object-center scale-100 group-hover:scale-110 duration-300 transition-all"
              />
            </div>

            <div class="flex p-[8px_12px] mt-3 flex-col">
             <div class="flex justify-between my-1 items-center">
               <h3 class="text-[18px] group-hover:text-[#0d6efd] duration-200 font-semibold">${name}</h3>
               <span class="text-[#fff] px-3 py-[2px] rounded-full bg-[#ff6b38] sm:text-[14px] text-[12px] font-[500]">${discount}% off</span>
              </div>
              <h4 class="text-[15px]">${description}</h4>
              <div class="flex mt-2 w-full justify-between">
                <div class="flex gap-4 items-center">
                  <p class="text-[18px] font-[500]">$${selling_price}</p>
                  <p class="text-[16px] text-[#727374] font-[400] line-through">
                    $${original_price}
                  </p>
                </div>
                <h3><i class="ri-star-fill text-[#ff6b38]"></i> | ${rating}</h3>
              </div>
              <button
                class="addToCart mt-3 mb-2 px-4 flex items-center gap-4 py-[12px] bg-[#0d6efd] hover:bg-[#3284e8] rounded-full text-white text-[16px] sm:text-[16px] duration-300 justify-center w-full"
              >
                Add to Cart <i class="ri-shopping-bag-line addToCart"></i>
              </button>
            </div>
          </div>
        `
  });
}
displayRecommendedItems(recommendedItems);


recommendedItemContainer.addEventListener("click", (e) => {
  const foodItem = e.target.closest(".foodItem");
  const id = foodItem.id;
  const wishlistItem = e.target.closest(".addToWishList");
  if (!id) {
    console.error("ID not found for food item!", e.target);
    return;
  }
  if (wishlistItem) {
    addToWishList(id);
  }
})
