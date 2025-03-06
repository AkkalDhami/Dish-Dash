let searchResultBox = document.querySelector(".search_results");
let inputBox = document.querySelector("#searchInput")
let searchResults = document.querySelector("#searchResults");
let food_list = JSON.parse(localStorage.getItem("FoodList"));
let searchButton = document.getElementById('searchButton');
let searchBottomButton = document.getElementById('searchBottomButton');
let searchResultsContainer = document.getElementById('searchResultsContainer');
let overlay1 = document?.querySelector(".overlay");

searchBottomButton?.addEventListener('click', () => {
  overlay1.classList.remove('overlayActive');
  searchResultsContainer.classList.add("top-1/2");
  searchResultsContainer.classList.remove("-top-1/2");
})

searchButton?.addEventListener('click', () => {
  overlay1.classList.remove('overlayActive');
  searchResultsContainer.classList.add("top-1/2");
  searchResultsContainer.classList.remove("-top-1/2");
})

overlay1.addEventListener('click', () => {
  overlay1.classList.add('overlayActive');
  inputBox.value = "";
  searchResults.innerHTML = "";
  searchResultsContainer.classList.remove("top-1/2");
  searchResultsContainer.classList.add("-top-1/2");
})

inputBox?.addEventListener('input', () => {
  searchResults.innerHTML = '';
  let inputValue = inputBox.value.trim().toLowerCase();

  if (inputValue === '') {
    return;
  }
  let productsFound = food_list.filter((product) => {
    return product.name.toLowerCase().includes(inputValue) || product.category.toLowerCase().includes(inputValue);
  });
  renderSearchResults(productsFound);

})
function renderSearchResults(productsFound) {

  if (productsFound.length === 0) {
    searchResults.innerHTML = `
        <div class="flex flex-col items-center justify-center min-h-[30vh] text-center p-6">
    <img src="https://cdn-icons-png.flaticon.com/512/1178/1178479.png" 
         alt="Not Found" 
         class="w-[40px] h-[40px] mb-4 opacity-80">
    
    <h2 class="text-2xl font-semibold text-gray-800 ">Product Not Found</h2>
    
    <p class="text-gray-600 text-[18px] mt-2">Oops! We couldn’t find any products matching your search.</p>
</div>
        `
  }

  productsFound.forEach((product) => {
    const { _id, category, description, image, name, selling_price, original_price, rating } = product;
    searchResults.innerHTML += `
            <div
          class="searchResultItem flex justify-between items-center gap-2 px-4 py-3 border-b border-gray-200 hover:bg-[#fff] cursor-pointer duration-300"
          data-id="${_id}"
          data-category="${category}"
        >
          <div class="flex items-center gap-2">
            <img
              src="${image}"
              class="w-[50px] h-[50px] object-cover rounded-md"
              alt="searchImage"
            />
            <div class="flex items-start flex-col">
              <h3 class="text-[16px] text-gray-800">${name}</h3>
              <h4 class="text-[14px] text-gray-600">
              ${description}
              </h4>
            </div>
          </div>
          <h3 class="text-[22px] font-[500] text-blue-500">
            <i class="ri-search-line"></i>
          </h3>
        </div>
          `;
  });
  let searchproducts = document.querySelectorAll(".searchResultItem");
  searchproducts.forEach((item) => {
    item.addEventListener("click", () => {
      inputBox.value = "";
      window.location.href = `../html/foodDetails.html?id=${item.dataset.id}&category=${item.dataset.category}`;
    });
  });
}