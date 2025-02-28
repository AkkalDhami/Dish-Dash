let foodMenuContainer = document.getElementById("foodMenuContainer");
let filterFoodHeading = document.getElementById("filterFoodHeading");
function filterFood() {
  let food_list = JSON.parse(localStorage.getItem("FoodList"));
  const params = new URLSearchParams(window.location.search);
  const menunname = String(params.get("menu"));
  let filteredFood = food_list.filter((food) => food.category === menunname);
  filterFoodHeading.innerHTML = `${menunname} <i class="ri-restaurant-fill text-[#ff6b38]"></i>`;
  filteredFood.forEach((food, ind) => {
    const userReview = food.reviews.map((review) => review.rating);
    const finalRating = userReview.reduce((total, rating) => total + rating, 0) / userReview.length || 0;
    const rating = finalRating || "No rating available";
    let { _id, category, description, image, name, original_price, selling_price } = food;
    let discount = Math.floor((original_price - selling_price) / original_price * 100);
    foodMenuContainer.innerHTML += `
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
        `;
  });
  console.log(filteredFood)
}

filterFood();
