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

  food_list.forEach((food, ind) => {
    let { _id, category, description, image, name, selling_price, rating } = food;
    item_container.innerHTML += `
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
              <h3 class="text-[18px] font-semibold">${name}</h3>
              <h4 class="text-[15px]">${description}</h4>
              <div class="flex mt-2 w-full justify-between">
                <div class="flex gap-4 items-center">
                  <p class="text-[18px] font-[500]">$${selling_price}</p>
                  <p class="text-[16px] text-[#727374] font-[400] line-through">
                    $${selling_price + 5}
                  </p>
                </div>
                <h3><i class="ri-star-fill text-[#ff6b38]"></i> | ${rating}</h3>
              </div>
            </div>
            <div
              class="mt-2 flex flex-col space-y-3 justify-between w-full items-center"
            >
              <div
                class="px-4 flex items-center py-1 duration-300 border border-[#0d6efd] text-white text-[16px] sm:text-[16px] w-full justify-between rounded"
              >
                <button
                  class="decreaseQuantity text-black bg-[#f6f6f6] text-[18px] px-2 py-1 rounded-sm"
                >
                  <i class="decreaseQuantity ri-subtract-line"></i>
                </button>
                <p class="foodQuantity text-[15px] text-black font-[400]">1</p>
                <button
                  class="increaseQuantity px-2 bg-[#f6f6f6] text-black text-[16px] py-1 rounded-sm"
                >
                  <i class="increaseQuantity ri-add-large-fill"></i>
                </button>
              </div>
              <button
                class="addToCart px-4 flex items-center gap-4 py-[10px] bg-[#ff6b38] hover:bg-[#eb5f2f] rounded text-white text-[16px] sm:text-[16px] duration-300 justify-center w-full"
              >
                Add to Cart <i class="ri-shopping-bag-line"></i>
              </button>
            </div>
          </div>
    `;
  });

  let menuItems = document.querySelectorAll(".foodMenu");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      let menu = item.getAttribute("data-menu");
      window.location.href = `../html/filterFood.html?menu=${menu}`;
    });
  });
}
displayMenu();
