import { getCartLength } from "./getCartLength.js";
import { getWishlistLength } from "../assets/utility/getWishlistLength.js";
import { addToCart } from "../assets/utility/addToCart.js";
import { showToastNotify } from "../assets/utility/showToast.js";

document.addEventListener("DOMContentLoaded", () => {
    getWishlistLength();
    getCartLength();

    let wishlistItems = JSON.parse(localStorage.getItem("myWishlist")) || [];
    let currentPage = 1;

    const itemsPerPage = 9;
    let selectedItems = new Set();

    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const categoryFilter = document.getElementById("categoryFilter");
    const stockFilter = document.getElementById("stockFilter");

    const wishlistGrid = document.getElementById("wishlistGrid");
    const clearAllBtn = document.getElementById("clearAll");
    const addAllToCartBtn = document.getElementById("addAllToCart");

    const itemActionModal = document.getElementById("itemActionModal");
    const closeItemModalBtn = document.getElementById("closeItemModal");
    const moveToCartBtn = document.getElementById("moveToCartBtn");
    const removeItemBtn = document.getElementById("removeItemBtn");
    const modalProductImage = document.getElementById("modalProductImage");
    const modalProductName = document.getElementById("modalProductName");
    const modalProductPrice = document.getElementById("modalProductPrice");
    const modalOriginalPrice = document.getElementById("modalOriginalPrice");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");

    // Modal Elements
    const clearModal = document.getElementById("clearModal");
    const closeModalBtn = document.getElementById("closeModal");
    const cancelClearBtn = document.getElementById("cancelClear");
    const confirmClearBtn = document.getElementById("confirmClear");

    function initializeCategories() {
        const categories = [...new Set(wishlistItems.map((item) => item.category))];
        categoryFilter.innerHTML = `
        <option value="">All Categories</option>
        ${categories
                .map(
                    (category) => `
          <option value="${category}">${category}</option>
        `
                )
                .join("")}
      `;
    }
    initializeCategories();

    // Filter and Sort Functions
    function getFilteredItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const stockStatus = stockFilter.value;

        return wishlistItems.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || item.category === category;
            const matchesStock =
                !stockStatus ||
                (stockStatus === "in-stock" && item.stock > 0) ||
                (stockStatus === "out-of-stock" && item.stock === 0);

            return matchesSearch && matchesCategory && matchesStock;
        });
    }

    function getSortedItems(items) {
        return [...items].sort((a, b) => {
            switch (sortSelect.value) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "price-low":
                    return a.price - b.price;
                case "price-high":
                    return b.price - a.price;
                case "rating":
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
    }

    // save wishlist to local storage
    function saveWishlist(items) {
        localStorage.setItem("myWishlist", JSON.stringify(items));
    }

    // Initialize
    async function initialize() {
        try {
            wishlistItems = JSON.parse(localStorage.getItem("myWishlist")) || [];

            initializeCategories();
            setupEventListeners();
            renderWishlist();
        } catch (error) {
            console.error("Failed to initialize wishlist:", error);
            showToastNotify("Failed to load wishlist", "error");
        }
    }

    initialize();

    // Render wishlist items
    function renderWishlist() {
        let items = [...wishlistItems];

        // Apply search and filters
        items = getFilteredItems();

        // Apply sorting
        items = getSortedItems(items);

        // Apply pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

        // Update grid
        const grid = document.getElementById("wishlistGrid");
        grid.innerHTML = paginatedItems
            .map((item) => createWishlistItem(item))
            .join("");

        // Setup pagination
        setupPagination(items.length);

        // Update item count
        document.getElementById("itemCount").textContent = `${items.length} Items`;

        document
            .getElementById("emptyState")
            .classList.toggle("hidden", items.length > 0);
    }



    function moveToCart(itemId) {
        const item = wishlistItems.find((item) => item._id === itemId);
        if (!item) return;

        let quantity = 1;

        if (item.stock > 0) {
            addToCart(itemId, quantity);
            showToastNotify(`${item.name} moved to cart`, "success");
            wishlistItems = wishlistItems.filter((i) => i._id !== itemId);
            selectedItems.delete(itemId);
            renderWishlist();
            saveWishlist(wishlistItems);
            getWishlistLength();
        } else {
            showToastNotify("Item is out of stock", "error");
        }
    }

    // Show Modal Function
    function showClearModal() {
        clearModal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    // Hide Modal Function
    function hideClearModal() {
        clearModal.classList.add("hidden");
        document.body.style.overflow = "";
    }

    // Update Clear All button click handler
    clearAllBtn.addEventListener("click", () => {
        showClearModal();
    });

    // Close button click handler
    closeModalBtn.addEventListener("click", hideClearModal);

    cancelClearBtn.addEventListener("click", hideClearModal);

    // Confirm clear button click handler
    confirmClearBtn.addEventListener("click", () => {
        wishlistItems = [];
        localStorage.setItem("myWishlist", JSON.stringify([]));
        renderWishlist();
        showToastNotify("Your Wishlist has been cleared", "success");
        hideClearModal();
        getWishlistLength();
    });

    // Close modal when clicking outside
    clearModal.addEventListener("click", (e) => {
        if (e.target === clearModal) {
            hideClearModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !clearModal.classList.contains("hidden")) {
            hideClearModal();
        }
    });

    // Add all to cart
    addAllToCartBtn.addEventListener("click", () => {
        const inStockItems = wishlistItems.filter((item) => item.stock > 0);

        if (inStockItems.length === 0) {
            showToastNotify("No items in stock", "error");
            return;
        }

        wishlistItems = wishlistItems.filter((item) => item.stock === 0);
        renderWishlist();
        showToastNotify(`${inStockItems.length} items moved to cart`, "success");
        saveWishlist(wishlistItems);
        getWishlistLength();
        getCartLength();
    });

    // Item Action Modal Elements

    let selectedItemId = null;

    // Show Item Action Modal
    function showItemActionModal(itemId) {
        const item = wishlistItems.find((item) => item._id === itemId);
        if (!item) return;
        console.log(wishlistItems);

        console.log(item);
        selectedItemId = item._id;

        modalProductImage.src = item.image;
        modalProductImage.alt = item.name;
        modalProductName.textContent = item.name;
        modalProductPrice.textContent = `$${item.selling_price}`;
        modalOriginalPrice.textContent = item.originalPrice
            ? `$${item.originalPrice}`
            : "";
        modalCategory.textContent = item.category || "General";
        modalDescription.textContent =
            item.description || "No description available";

        // Update stock status and button
        const stockStatus = document.getElementById("modalStockStatus");
        const moveToCartBtn = document.getElementById("moveToCartBtn");

        if (item.stock > 0) {
            stockStatus.innerHTML = `
                <span class="inline-flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                    <i class="ri-checkbox-circle-fill"></i>
                    In Stock
                </span>
            `;
            moveToCartBtn.innerHTML = `
              <i class="ri-shopping-bag-line"></i>
              <span>  Move to Cart</span>
            `;
            moveToCartBtn.className = `
                flex-1 px-4 py-3.5 bg-gradient-to-r from-[#ff6b38] to-[#ff8b38] text-white rounded-md 
                hover:shadow-lg hover:shadow-[#ff6b38]/20 transition-all duration-300 
                flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]
            `;
            moveToCartBtn.disabled = false;
        } else {
            stockStatus.innerHTML = `
                <span class="inline-flex items-center gap-1.5 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-medium">
                    <i class="ri-error-warning-fill"></i>
                    Out of Stock
                </span>
            `;
            moveToCartBtn.innerHTML = `
                <i class="ri-notification-line text-lg"></i>
                Notify When Available
            `;
            moveToCartBtn.className = `
                flex-1 px-4 py-3.5 bg-gray-100 text-gray-400 rounded-xl 
                cursor-not-allowed flex items-center justify-center gap-2
            `;
            moveToCartBtn.disabled = true;
        }

        // Show modal with enhanced animation
        itemActionModal.classList.remove("hidden");
        requestAnimationFrame(() => {
            const modalContent = itemActionModal.querySelector("div:nth-child(2)");
            modalContent.classList.remove("translate-y-full", "opacity-0");
        });
    }

    // Hide Item Action Modal
    function hideItemActionModal() {
        const modalContent = itemActionModal.querySelector("div:nth-child(2)");
        modalContent.classList.add("translate-y-full", "opacity-0");

        setTimeout(() => {
            itemActionModal.classList.add("hidden");
            selectedItemId = null;
        }, 300);
    }

    // Move to Cart Action
    moveToCartBtn.addEventListener("click", () => {
        if (selectedItemId) {
            const item = wishlistItems.find((item) => item._id === selectedItemId);
            if (item && item.stock > 0) {
                moveToCart(selectedItemId);

                hideItemActionModal();
            } else if (item && item.stock === 0) {
                showToastNotify("We'll notify you when this item is back in stock", "success");
                hideItemActionModal();
            }
        }
    });


    // Close Modal Events
    closeItemModalBtn.addEventListener("click", hideItemActionModal);

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !itemActionModal.classList.contains("hidden")) {
            hideItemActionModal();
        }
    });


    // Close modal when clicking on backdrop
    itemActionModal.addEventListener("click", (e) => {
        if (
            e.target === itemActionModal ||
            e.target === itemActionModal.firstElementChild
        ) {
            hideItemActionModal();
        }
    });

    function goToPage(page) {
        currentPage = page;
        renderWishlist();
        // Scroll to top of grid smoothly
        document
            .getElementById("wishlistGrid")
            .scrollIntoView({ behavior: "smooth" });
    }

    // Pagination Functions
    function updatePagination(totalItems) {
        const pageNumbers = document.getElementById("pageNumbers");
        const prevButton = document.getElementById("prevPage");
        const nextButton = document.getElementById("nextPage");

        if (!pageNumbers || !prevButton || !nextButton) {
            console.error("Pagination elements not found");
            return;
        }

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Update buttons state
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        // Generate page numbers
        let paginationHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // First page
                i === totalPages || // Last page
                (i >= currentPage - 1 && i <= currentPage + 1) // Pages around current
            ) {
                paginationHTML += `
                  <button onclick="goToPage(${i})" 
                      class="px-4 py-2 rounded-xl transition-all duration-300 
                      ${currentPage === i
                        ? "bg-[#ff6b38] text-white"
                        : "text-gray-600 hover:text-[#ff6b38] hover:bg-[#ff6b38]/10"
                    }">
                      ${i}
                  </button>
              `;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                paginationHTML += `
                  <span class="px-2 text-gray-400">...</span>
              `;
            }
        }

        pageNumbers.innerHTML = paginationHTML;

        // Update URL
        const url = new URL(window.location);
        url.searchParams.set("page", currentPage);
        window.history.replaceState({}, "", url);
    }

    // Update Item Count
    function updateItemCount(count) {
        const itemCount = document.getElementById("itemCount");
        itemCount.textContent = `${count} ${count === 1 ? "Item" : "Items"}`;
    }

    // Initialize pagination from URL
    function initializePagination() {
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get("page")) || 1;
        currentPage = page;
    }

    // Event listener for browser back/forward
    window.addEventListener("popstate", () => {
        initializePagination();
        renderWishlist();
    });

    // Create Wishlist Item Card
    function createWishlistItem(item) {
        return `
          <div id="${item._id
            }" class="bg-white foodItem  rounded-md shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <!-- Product Image Container -->
              <div class="relative aspect-[4/3]">

                  <!-- Product Image -->
                 <div class="overflow-hidden">
                      <img src="${item.image}" 
                          alt="${item.name}" 
                          onerror="this.src='../../assets/images/default-food.png'"
                          class="w-full h-full object-cover ${item.stock === 0 ? "filter grayscale" : ""
            } 
                          group-hover:scale-105 transition-transform duration-500"/>
                      
                      <!-- Stock Badge -->
                      ${item.stock === 0
                ? `
                          <div class="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                              <span class="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                                  Out of Stock!!
                              </span>
                          </div>
                      `
                : ""
            }
                 </div>

                  <div class="absolute top-3 right-3 flex flex-col gap-3">
                      <button  title="Remove From Wishlist" 
                          class="bg-white/90 removeFromWishlist p-2 w-[40px] h-[40px] flex item-center justify-center rounded-full shadow-md hover:bg-red-600 hover:text-white 
                          transition-all duration-300 transform hover:scale-110">
                       <i class="ri-delete-bin-line removeFromWishlist"></i>
                      </button>
                      <button title="View Details" onclick="window.location.href='foodDetails.html?id=${item._id
            }'" 
                          class="bg-white/90 p-2 w-[40px] h-[40px] flex item-center justify-center rounded-full shadow-md hover:bg-[#0d6efd] hover:text-white 
                          transition-all duration-300 transform hover:scale-110">
                     <i class="ri-eye-line"></i>
                      </button>
                  </div>

                  
              </div>

              <!-- Product Details -->
              <div class="p-4">

                  <div class="flex items-center justify-between mb-2">
                      <div class="flex gap-4 items-center justify-center">
                      <span class=" text-gray-800 rounded-full text-[16px] font-medium">
                          $${item.selling_price.toFixed(2)}
                      </span>
                      <span class=" text-gray-500 line-through rounded-full text-[16px] font-medium">
                          $${item.original_price.toFixed(2)}
                      </span>
                  </div>
                      <div class="flex items-center gap-1">
                          <i class="ri-star-fill text-[#ff6b38]"></i> | 
                          <span class="text-sm font-medium">${item.rating.toFixed(
                1
            )}</span>
                      </div>
                  </div>

                   <div class="flex items-center justify-between mb-1">
                  <h3 class="text-lg duration-300 group-hover:text-[#0d6efd] font-semibold mb-2 line-clamp-1">${item.name
            }</h3> <span class="text-sm px-3 py-1 bg-orange-50 rounded-full text-[#ff6b38]">${item.category
            }</span>
             </div>
                  
                  <!-- Description -->
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">${item.description
            }</p>

                  <!-- Action Buttons -->
                  <div class="flex gap-2">
                      ${item.stock > 0
                ? `
                          <button 
                                class="moveToCart bg-[#0d6efd] w-full hover:bg-transparent border-2 hover:text-gray-800 border-[#0d6efd] text-white px-6 py-3 rounded-full shadow-md flex justify-center items-center space-x-2 transition text-[16px]">
                            <i class="ri-shopping-bag-line"></i>
                            <span>  Move to Cart</span>
                          </button>
                        
                      `
                : `
                          <button disabled onclick="setStockAlert(${item._id})"
                              class="flex-1 px-3 py-3 bg-gray-100 text-gray-600 rounded-full  cursor-not-allowed
                              transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                              <i class="ri-notification-line"></i>
                              Notify When Available
                          </button>
                      `
            }
                  </div>
              </div>
          </div>
      `;
    }

    function renderWishlist() {
        const filteredItems = getFilteredItems();
        const sortedItems = getSortedItems(filteredItems);

        // Pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedItems = sortedItems.slice(
            startIndex,
            startIndex + itemsPerPage
        );

        // Update grid
        const grid = document.getElementById("wishlistGrid");
        grid.innerHTML = paginatedItems
            .map((item) => createWishlistItem(item))
            .join("");

        // Update UI states
        updateBulkActionButtons();
        updatePagination(sortedItems.length);
        updateItemCount(sortedItems.length);

        // Show/hide empty state
        document
            .getElementById("emptyState")
            .classList.toggle("hidden", sortedItems.length > 0);
    }

    // Function to remove item from wishlist
    function removeFromWishlist(id) {
        wishlistItems = wishlistItems.filter((item) => item._id !== id);
        renderWishlist();
        showToastNotify("Item removed from wishlist", "success");
        saveWishlist(wishlistItems);
        getWishlistLength();
    }

    // Remove Item Action
    removeItemBtn.addEventListener("click", () => {
        if (selectedItemId) {
            removeFromWishlist(selectedItemId);
        }

        hideItemActionModal();
        getWishlistLength();
    });

    // Function to set stock alert
    function setStockAlert(id) {
        console.log("sadf");
        console.log(wishlistItems);
        const item = wishlistItems.find((item) => item._id === id);
        if (item) {
            showToastNotify(
                `Item "${item.name}" is out of stock. Notify when available.`,
                "error"
            );
        } else {
            showToastNotify("Item not found in wishlist", "error");
        }
        console.log(item);
    }



    // Event Listeners
    function setupEventListeners() {
        searchInput.addEventListener(
            "input",
            debounce(() => {
                currentPage = 1; // Reset to first page on search
                renderWishlist();
                // Update URL with search params
                const url = new URL(window.location);
                url.searchParams.set("search", searchInput.value);
                window.history.replaceState({}, "", url);
            }, 300)
        );

        // Filters
        categoryFilter.addEventListener("change", () => {
            currentPage = 1;
            renderWishlist();
            const url = new URL(window.location);
            url.searchParams.set("category", categoryFilter.value);
            window.history.replaceState({}, "", url);
        });

        stockFilter.addEventListener("change", () => {
            currentPage = 1;
            renderWishlist();
            const url = new URL(window.location);
            url.searchParams.set("stock", stockFilter.value);
            window.history.replaceState({}, "", url);
        });

        // Sorting
        sortSelect.addEventListener("change", () => {
            renderWishlist();
            const url = new URL(window.location);
            url.searchParams.set("sort", sortSelect.value);
            window.history.replaceState({}, "", url);
        });

        // remove item from wishlist
        wishlistGrid.addEventListener("click", (e) => {
            const item = e.target.closest(".foodItem");
            const itemId = item.id;
            if (e.target.classList.contains("removeFromWishlist")) {
                showItemActionModal(itemId);
                getWishlistLength();
            }
            if (e.target.classList.contains("moveToCart")) {
                if (itemId) {
                    const item = wishlistItems.find((item) => item._id === itemId);
                    if (item && item.stock > 0) {
                        moveToCart(itemId);
                        hideItemActionModal();
                    }
                }
                getWishlistLength();

            }
        });
    }

    // Search and Filter Functions
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const stockStatus = stockFilter.value;
        const sortBy = sortSelect.value;

        let filteredItems = wishlistItems.filter((item) => {
            // Search term filter
            const matchesSearch =
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm);

            // Category filter
            const matchesCategory =
                !selectedCategory || item.category === selectedCategory;

            // Stock status filter
            const matchesStock =
                stockStatus === "" ||
                (stockStatus === "in-stock" && item.stock > 0) ||
                (stockStatus === "out-of-stock" && item.stock === 0);

            return matchesSearch && matchesCategory && matchesStock;
        });
        // Apply sorting
        filteredItems = sortItems(filteredItems, sortBy);

        return filteredItems;
    }

    function sortItems(items, sortBy) {
        return [...items].sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                case "price-low":
                    return a.selling_price - b.selling_price;
                case "price-high":
                    return b.selling_price - a.selling_price;
                case "rating":
                    return b.rating - a.rating;
                case "stock":
                    return b.stock - a.stock;
                default:
                    return 0;
            }
        });
    }

    // Update the filter dropdowns
    function updateFilterOptions() {
        // Update category filter
        const categories = [...new Set(wishlistItems.map((item) => item.category))];
        categoryFilter.innerHTML = `
          <option value="">All Categories</option>
          ${categories
                .map(
                    (category) => `
              <option value="${category}">${category}</option>
          `
                )
                .join("")}
      `;

        // Update sort options
        sortSelect.innerHTML = `
          <option value="name">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
          <option value="stock">Stock: High to Low</option>
      `;

        // Update stock filter
        stockFilter.innerHTML = `
          <option value="">All Items</option>
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
      `;
    }

    // Debounce function for search
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Update the renderWishlist function
    function renderWishlist() {
        const filteredItems = applyFilters();

        // Update item count with filter info
        const itemCount = document.getElementById("itemCount");
        itemCount.innerHTML = `
          ${filteredItems.length} ${filteredItems.length === 1 ? "Item" : "Items"
            }
          ${searchInput.value ? `matching "${searchInput.value}"` : ""}
          ${categoryFilter.value ? `in ${categoryFilter.value}` : ""}
          ${stockFilter.value === "in-stock"
                ? "(In Stock)"
                : stockFilter.value === "out-of-stock"
                    ? "(Out of Stock)"
                    : ""
            }
      `;

        // Pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedItems = filteredItems.slice(
            startIndex,
            startIndex + itemsPerPage
        );

        // Render items
        const grid = document.getElementById("wishlistGrid");
        if (filteredItems.length === 0) {
            grid.innerHTML = `
              <div class="col-span-full p-8 text-center bg-white rounded-2xl">
                  <div class="text-gray-400 mb-4">
                      <i class="ri-search-line text-5xl"></i>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
                  <p class="text-gray-500">Try adjusting your search or filters</p>
              </div>
          `;
        } else {
            grid.innerHTML = paginatedItems
                .map((item) => createWishlistItem(item))
                .join("");
        }

        // Update pagination
        updatePagination(filteredItems.length);

        // Show/hide empty state
        document
            .getElementById("emptyState")
            .classList.toggle("hidden", wishlistItems.length > 0);
    }

    // Initialize from URL params
    function initializeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);

        searchInput.value = urlParams.get("search") || "";
        categoryFilter.value = urlParams.get("category") || "";
        stockFilter.value = urlParams.get("stock") || "";
        sortSelect.value = urlParams.get("sort") || "name";
        currentPage = parseInt(urlParams.get("page")) || 1;
    }

    // Update initialize function
    async function initialize() {
        try {
            const requiredElements = [
                "wishlistGrid",
                "pageNumbers",
                "prevPage",
                "nextPage",
                "searchInput",
                "sortSelect",
                "categoryFilter",
                "stockFilter",
            ];

            for (const elementId of requiredElements) {
                if (!document.getElementById(elementId)) {
                    throw new Error(`Required element #${elementId} not found`);
                }
            }

            if (wishlistItems.length === 0) {
                wishlistItems = JSON.parse(localStorage.getItem("myWishlist")) || [];
            }

            updateFilterOptions();
            initializeFromURL();
            setupEventListeners();
            renderWishlist();
            getWishlistLength();
        } catch (error) {
            console.error("Failed to initialize wishlist:", error);
            showToastNotify("Failed to load wishlist", "error");
        }
    }
});
