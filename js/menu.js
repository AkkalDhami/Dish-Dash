let menu_container = document.querySelector("#menu_container");
let item_container = document.querySelector("#item_container");

async function fetchAPI() {
  let res = await fetch('../assets/json/api.json');
  let data = await res.json();

  localStorage.setItem("menuList", JSON.stringify(data.menu_list));
  localStorage.setItem("FoodList", JSON.stringify(data.food_list));

}

fetchAPI();

function displayMenu() {
  let menu_list = JSON.parse(localStorage.getItem("menuList"));
  let food_list = JSON.parse(localStorage.getItem("FoodList"));
  console.log(food_list)
  menu_list.forEach((menu, ind) => {
    let { menu_image, menu_name } = menu;

    menu_container.innerHTML += `
          <div
            class="card flex flex-col items-center space-y-3 group flex-grow cursor-pointer"
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
        `
  });

  food_list.forEach((food, ind) => {
    let { _id, category, description, image, name, price, rating } = food;
    item_container.innerHTML += `
     <div data-category="${category}"
            id="${_id}"
            class="card bg-[#f6f6f6] p-5 rounded-md hover:shadow-lg hover:bg-[#ffffff] duration-300 w-[300px] group overflow-hidden"
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
              <h3 class="text-[18px] font-semibold">${name}</h3>
              <h4 class="text-[15px]">
               ${description}
              </h4>
              <div class="flex mt-2 w-full justify-between">
                <div class="flex gap-4 items-center">
                  <p class="text-[18px] font-[500]">$${price}</p>
                  <p class="text-[16px] text-[#727374] font-[400] line-through">
                    $${price + 5}
                  </p>
                </div>
                <h3><i class="ri-star-fill text-[#ff6b38]"></i> | ${rating}</h3>
              </div>
            </div>
            <div
              class="mt-2 flex flex-col space-y-3 justify-between w-full items-center"
            >
              <button
                class="px-4 flex items-center gap-4 py-2 bg-[#ff6b38] hover:bg-[#eb5f2f] rounded-sm text-white text-[16px] sm:text-[16px] duration-300 w-full justify-center"
              >
                Add to Cart <i class="ri-shopping-bag-line"></i>
              </button>
              <button
                class="px-4 flex items-center gap-4 py-2 duration-300 bg-[#3284e8] hover:bg-[#0d6efd] rounded-sm text-white text-[16px] sm:text-[16px] w-full justify-center"
              >
                Buy Now <i class="ri-restaurant-fill"></i>
              </button>
            </div>
          </div>
    `;
  });

  let ratedFoods = food_list.filter(food => food.rating >= 4.6);
  let rated_foods_container = document.querySelector("#rated_foods_container");

  ratedFoods.forEach((item, ind) => {
    let { _id, category, description, image, name, price, rating } = item;
    rated_foods_container.innerHTML += `
     <div data-category="${category}"
            data-id="${_id}"
            class="card bg-[#f6f6f6] p-5 rounded-md hover:shadow-lg hover:bg-[#ffffff] duration-300 w-[300px] group overflow-hidden"
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
              <h3 class="text-[18px] font-semibold">${name}</h3>
              <h4 class="text-[15px]">
               ${description}
              </h4>
              <div class="flex mt-2 w-full justify-between">
                <div class="flex gap-4 items-center">
                  <p class="text-[18px] font-[500]">$${price}</p>
                  <p class="text-[16px] text-[#727374] font-[400] line-through">
                    $${price + 5}
                  </p>
                </div>
                <h3><i class="ri-star-fill text-[#ff6b38]"></i> | ${rating}</h3>
              </div>
            </div>
            <div
              class="mt-2 flex flex-col space-y-3 justify-between w-full items-center"
            >
              <button
                class="px-4 flex items-center gap-4 py-2 bg-[#ff6b38] hover:bg-[#eb5f2f] rounded-sm text-white text-[16px] sm:text-[16px] duration-300 w-full justify-center"
              >
                Add to Cart <i class="ri-shopping-bag-line"></i>
              </button>
              <button
                class="px-4 flex items-center gap-4 py-2 duration-300 bg-[#3284e8] hover:bg-[#0d6efd] rounded-sm text-white text-[16px] sm:text-[16px] w-full justify-center"
              >
                Buy Now <i class="ri-restaurant-fill"></i>
              </button>
            </div>
          </div>
    `
  })


}
displayMenu()

