
import showToast from '/toastify-js-notification';

showToast({
  message: "Hello, Toastify!",
  duration: 3000,
  position: "top-right",
  backgroundColor: "green",
  textColor: "white"
});
// Initialize variables
let wishlistItems = JSON.parse(localStorage.getItem("myWishlist")) || [];
let currentPage = 1;
const itemsPerPage = 9;
let selectedItems = new Set();

// DOM Elements
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const categoryFilter = document.getElementById("categoryFilter");
const stockFilter = document.getElementById("stockFilter");
const selectAllCheckbox = document.getElementById("selectAll");
const bulkShareBtn = document.getElementById("bulkShare");
const bulkMoveBtn = document.getElementById("bulkMove");
const bulkDeleteBtn = document.getElementById("bulkDelete");
const wishlistGrid = document.getElementById("wishlistGrid");
const emptyState = document.getElementById("emptyState");
const notification = document.getElementById("notification");
const clearAllBtn = document.getElementById("clearAll");
const addAllToCartBtn = document.getElementById("addAllToCart");

// Initialize categories
function initializeCategories() {
  const categories = [
    ...new Set(wishlistItems.map((item) => item.category)),
  ];
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
        return a.selling_price - b.selling_price;
      case "price-high":
        return b.selling_price - a.selling_price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
}



function handleBulkMoveToCart() {
  const selectedProducts = wishlistItems.filter((item) =>
    selectedItems.has(item._id)
  );
  const inStockItems = selectedProducts.filter((item) => item.stock > 0);

  if (inStockItems.length > 0) {
    // Add to cart logic here
    wishlistItems = wishlistItems.filter(
      (item) => !selectedItems.has(item._id)
    );
    selectedItems.clear();
    renderWishlist();
    showNotification(`${inStockItems.length} items moved to cart`);
  } else {
    showNotification("Selected items are out of stock", "error");
  }
}

// Initialize
async function initialize() {
  try {
    // Sample wishlist items
    wishlistItems = JSON.parse(localStorage.getItem("myWishlist")) || [];
    initializeCategories();
    setupEventListeners();
    renderWishlist();
  } catch (error) {
    console.error("Failed to initialize wishlist:", error);
    showNotification("Failed to load wishlist", "error");
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", initialize);

// Render wishlist items
function renderWishlist() {
  let items = [...wishlistItems];

  // Apply search and filters
  items = getFilteredItems();

  // Apply sorting
  items = getSortedItems(items);

  // Apply pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Update grid
  const grid = document.getElementById("wishlistGrid");
  grid.innerHTML = paginatedItems
    .map((item) => createWishlistItem(item))
    .join("");

  // Setup pagination
  setupPagination(items.length);

  // Update item count
  document.getElementById(
    "itemCount"
  ).textContent = `${items.length} Items`;

  // Show/hide empty state
  document
    .getElementById("emptyState")
    .classList.toggle("hidden", items.length > 0);
}

// Show notification
function showNotification(message, type = "success") {
  const notificationText = document.getElementById("notificationText");
  const icon = notification.querySelector("i");

  // Update icon and colors based on type
  if (type === "success") {
    icon.className = "ri-check-line text-green-500";
    icon.parentElement.className =
      "w-8 h-8 bg-green-100 rounded-full flex items-center justify-center";
  } else if (type === "error") {
    icon.className = "ri-error-warning-line text-red-500";
    icon.parentElement.className =
      "w-8 h-8 bg-red-100 rounded-full flex items-center justify-center";
  }

  notificationText.textContent = message;
  notification.classList.remove("translate-y-full", "opacity-0");

  setTimeout(() => {
    notification.classList.add("translate-y-full", "opacity-0");
  }, 3000);
}

// Remove item from wishlist
function removeFromWishlist(id) {
  wishlistItems = wishlistItems.filter((item) => item._id !== id);
  renderWishlist();
  showNotification("Item removed from wishlist");
}

// Add item to cart
function addToCart(id) {
  const item = wishlistItems.find((item) => item._id === id);
  // Add your cart logic here
  removeFromWishlist(id);
  showNotification("Item moved to cart");
}

// Modal Elements
const clearModal = document.getElementById("clearModal");
const closeModalBtn = document.getElementById("closeModal");
const cancelClearBtn = document.getElementById("cancelClear");
const confirmClearBtn = document.getElementById("confirmClear");

// Show Modal Function
function showClearModal() {
  clearModal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Hide Modal Function
function hideClearModal() {
  clearModal.classList.add("hidden");
  document.body.style.overflow = ""; // Restore scrolling
}

// Update Clear All button click handler
clearAllBtn.addEventListener("click", () => {
  showClearModal();
});

// Close button click handler
closeModalBtn.addEventListener("click", hideClearModal);

// Cancel button click handler
cancelClearBtn.addEventListener("click", hideClearModal);

// Confirm clear button click handler
confirmClearBtn.addEventListener("click", () => {
  wishlistItems = [];
  localStorage.setItem("myWishlist", JSON.stringify([]));
  renderWishlist();

  showNotification("Wishlist cleared");
  hideClearModal();
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
  // Add your cart logic here
  wishlistItems = wishlistItems.filter((item) => item.stock === 0);
  renderWishlist();
  showNotification(`${inStockItems.length} items moved to cart`);
});

// Item Action Modal Elements
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

let selectedItemId = null;

// Show Item Action Modal
function showItemActionModal(itemId) {
  const item = wishlistItems.find((item) => item._id === itemId);
  if (!item) return;

  selectedItemId = item._id;

  // Update modal content
  modalProductImage.src = item.image;
  modalProductImage.alt = item.name;
  modalProductName.textContent = item.name;
  modalProductPrice.textContent = `$${item.price}`;
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
    const modalContent =
      itemActionModal.querySelector("div:nth-child(2)");
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
      // Add to cart logic here
      removeFromWishlist(selectedItemId);
      showNotification("Item moved to cart");
      hideItemActionModal();
    } else if (item && item.stock === 0) {
      // Notify me logic here
      showNotification(
        "We'll notify you when this item is back in stock"
      );
      hideItemActionModal();
    }
  }
});

// Remove Item Action
removeItemBtn.addEventListener("click", () => {
  if (selectedItemId) {
    removeFromWishlist(selectedItemId);
    showNotification("Item removed from wishlist");
  }
  hideItemActionModal();
});

// Close Modal Events
closeItemModalBtn.addEventListener("click", hideItemActionModal);

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    !itemActionModal.classList.contains("hidden")
  ) {
    hideItemActionModal();
  }
});

// Close on scroll
window.addEventListener("scroll", () => {
  if (!itemActionModal.classList.contains("hidden")) {
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

function goToPage(page) {
  currentPage = page;
  renderWishlist();
  // Scroll to top of grid smoothly
  document
    .getElementById("wishlistGrid")
    .scrollIntoView({ behavior: "smooth" });
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
            <div class="bg-white rounded-md shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <!-- Product Image Container -->
                <div class="relative aspect-[4/3]">
                   

                    <!-- Product Image -->
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
                            <span class="bg-red-500/90 text-white px-4 py-2 rounded-xl font-medium">
                                Out of Stock
                            </span>
                        </div>
                    `
      : ""
    }

                    <!-- Quick Actions -->
                    <div class="absolute top-3 right-3 flex flex-col gap-2">
                        <button onclick="showItemActionModal(${item._id})" 
                            class="bg-white/90 p-2 w-[40px] h-[40px] flex item-center justify-center rounded-full shadow-md hover:bg-[#ff6b38] hover:text-white 
                            transition-all duration-300 transform hover:scale-110">
                         <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>

                    <!-- Price Badge -->
                    <div class="absolute bottom-3 left-3">
                        <span class="bg-[#ff6b38] text-white px-3 py-1 rounded-full text-sm font-medium">
                            $${item.selling_price.toFixed(2)}
                        </span>
                    </div>
                </div>

                <!-- Product Details -->
                <div class="p-4">
                    <!-- Category & Rating -->
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm text-gray-500">${item.category
    }</span>
                        <div class="flex items-center gap-1">
                            <i class="ri-star-fill text-yellow-400"></i>
                            <span class="text-sm font-medium">${item.rating.toFixed(
      1
    )}</span>
                        </div>
                    </div>

                    <!-- Product Name -->
                    <h3 class="text-lg font-semibold mb-2 line-clamp-1">${item.name
    }</h3>
                    
                    <!-- Description -->
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${item.description
    }</p>

                    <!-- Action Buttons -->
                    <div class="flex gap-2">
                        ${item.stock > 0
      ? `
                            <button onclick="moveToCart(${item._id})"
                                  class="addToCart bg-[#0d6efd] w-full hover:bg-transparent border-2 hover:text-gray-800 border-[#0d6efd] text-white px-6 py-3 rounded-full shadow-md flex justify-center items-center space-x-2 transition text-[16px]">
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


function closeShareModal() {
  document.getElementById("shareModal").classList.add("hidden");
}
