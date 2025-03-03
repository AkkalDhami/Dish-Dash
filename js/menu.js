let menu_container = document.querySelector("#menu_container");
let item_container = document.querySelector("#item_container");

async function fetchAPI() {
  let res = await fetch("../assets/json/api.json");
  let data = await res.json();

  localStorage.setItem("menuList", JSON.stringify(data.menu_list));
  localStorage.setItem("FoodList", JSON.stringify(data.food_list));
}

fetchAPI();

function displayMenu() {
  let menu_list = JSON.parse(localStorage.getItem("menuList"));
  let food_list = JSON.parse(localStorage.getItem("FoodList"));
  menu_list.forEach((menu, ind) => {
    let { menu_image, menu_name } = menu;

    menu_container.innerHTML += `
          <div
            class="foodMenu flex flex-col items-center space-y-3 group flex-grow cursor-pointer"
            data-menu="${menu_name}"
          >
            <div
              class="img max-w-[120px] h-[120px] rounded-full overflow-hidden "
            >
              <img
                src="${menu_image}"
                alt="food-${ind} image"
                class="w-full h-full object-cover object-center scale-100 group-hover:scale-110 duration-300 transition-all"
              />
            </div>
            <h3
              class="text-[16px] group-hover:text-[#3284e8] duration-300 transition-all"
            >
              ${menu_name}
            </h3>
          </div>
        `;
  });

  food_list.slice(0, 12).forEach((food, ind) => {

    const userReview = food.reviews.map((review) => review.rating);
    const finalRating = userReview.reduce((total, rating) => total + rating, 0) / userReview.length || 0;
    const rating = finalRating || "No rating available";

    let { _id, category, description, image, name, stock, selling_price, original_price } = food;
    let discount = Math.floor((original_price - selling_price) / original_price * 100);

    item_container.innerHTML += `
  <div data-category="${category}" 
            id="${_id}"
            class="foodItem bg-[#f6f6f6] p-5 rounded-md hover:shadow-lg hover:bg-[#ffffff] duration-300 w-[300px] group overflow-hidden relative"
          >
          <div class="absolute top-5 opacity-100 group-hover:opacity-100 right-6 group-hover:right-6 flex space-y-2 duration-300 flex-col">
            
            <i title="Add to wishlist" class="addToWishList ri-heart-line z-30 duration-500 w-[30px] h-[30px] flex items-center justify-center p-5 cursor-pointer shadow-[0px_0px_16px_3px_#a19393] hover:bg-[#ff6b38] bg-white rounded-full hover:text-white  text-2xl text-[#ff6b38]"></i>
            
            <i title="View Details" onclick="window.location.href='../html/foodDetails.html?id=${_id}&category=${category}'" class="ri-eye-line viewMore z-30 w-[30px] h-[30px] flex items-center justify-center p-5 cursor-pointer hover:bg-[#0d6efd] bg-white rounded-full hover:text-white duration-300 shadow-[0px_0px_16px_3px_#a19393] text-2xl text-[#3284e8]"
                ></i>
          </div>

            <div onclick="window.location.href='../html/foodDetails.html?id=${_id}&category=${category}'"
              class="img cursor-pointer max-w-[280px] max-h-[280px] rounded-md overflow-hidden relative"
            > <div class="px-2 ${stock === 0 ? "opacity-100" : "opacity-0"} py-1 z-30 bg-red-500 text-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2">Out of Stock</div>
              <img
                src="${image}"
                alt="food-${ind} image"
                class="w-full h-full object-cover object-center scale-100 group-hover:scale-110  duration-300 transition-all"
              />
            </div>
            <div class="flex mt-3 flex-col">
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
            </div>
            <div
              class="mt-2 flex flex-col space-y-3 justify-between w-full items-center"
            >
              <button
                class="addToCart px-4 flex items-center gap-4 py-[12px] bg-[#0d6efd] hover:bg-[#3284e8] rounded-full text-white text-[16px] sm:text-[16px] duration-300 justify-center w-full"
              >
                Add to Cart <i class="ri-shopping-bag-line addToCart"></i>
              </button>
              
            </div>
          </div>
    `;
  });


  menu_container.addEventListener("click", (event) => {
    const menuItem = event.target.closest(".foodMenu");
    if (menuItem) {
      const menu = menuItem.getAttribute("data-menu");
      console.log("Clicked menu:", menu);
      window.location.href = `../html/filterFood.html?menu=${menu}`;
    }
  });


}
displayMenu();
