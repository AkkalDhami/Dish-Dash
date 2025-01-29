let foodMenuContainer = document.getElementById("foodMenuContainer");
let filterFoodHeading = document.getElementById("filterFoodHeading");
function filterFood() {
  let food_list = JSON.parse(localStorage.getItem("FoodList"));
  const params = new URLSearchParams(window.location.search);
  const menunname = String(params.get("menu")).toUpperCase();
  let filteredFood = food_list.filter((food) => food.category.toUpperCase() === menunname);
  filterFoodHeading.innerHTML = `${menunname} <i class="ri-restaurant-fill text-[#ff6b38]"></i>`;
  filteredFood.forEach((food, ind) => {
    let { _id, category, description, image, name, original_price, selling_price, rating } = food;
    let discount = Math.floor((original_price - selling_price) / original_price * 100);
    foodMenuContainer.innerHTML += `
    <div data-category="${category}"
            id="${_id}"
            class="foodItem bg-[#f6f6f6] p-5 rounded-md hover:shadow-lg hover:bg-[#ffffff] duration-300 w-[300px] group overflow-hidden"
          >
            <div
              class="img max-w-[280px] max-h-[280px] rounded-md overflow-hidden"
            >
              <img
                src="${image}"
                alt="food-${ind} image"
                class="w-full h-full object-cover object-center scale-100 group-hover:scale-110 duration-300 transition-all"
              />
            </div>
            <div class="flex mt-3 flex-col">
             <div class="flex justify-between my-1 items-center">
               <h3 class="text-[18px] font-semibold">${name}</h3>
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
              <button onclick="window.location.href='../html/foodDetails.html?id=${_id}&category=${category}'"
                class="viewMore px-4 flex items-center gap-4 py-[10px] border-2 border-[#eb5f2f] hover:bg-[#ff6b38] text-gray-800 rounded-full hover:text-white text-[16px] group/viewMore sm:text-[16px] duration-300 justify-center w-full"
              >
                View More
                <i
                  class="ri-arrow-right-line group-hover/viewMore:translate-x-2 duration-100"
                ></i>
              </button>
            </div>
          </div>
        `;
  });
  console.log(filteredFood)
}

filterFood();
