import { showToastNotify } from "../assets/utility/showToast.js";
import { getCartLength } from "../js/getCartLength.js"
import { addToCart } from "../assets/utility/addToCart.js"
import { addToWishList } from "../assets/utility/addTowishList.js"
import { getWishlistLength  } from "../assets/utility/getWishlistLength.js"
function foodCollection() {
    return {
        foods: [],
        filteredFoods: [],
        searchQuery: "",
        selectedCategories: [],
        priceRange: {
            min: 0,
            max: 50,
        },
        selectedDiscount: "all",
        sortBy: "name-asc",
        currentPage: 1,
        itemsPerPage: 9,
        categories: [],
        showFilters: window.innerWidth >= 768,

        async init() {
            try {
                const response = await fetch("../../assets/json/api.json");
                const data = await response.json();
                this.foods = data.food_list;
                this.filteredFoods = [...this.foods];
                this.categories = [
                    ...new Set(this.foods.map((food) => food.category)),
                ];
                this.filterFoods();

                // Add event listeners for cart and wishlist buttons
                this.initializeEventListeners();
            } catch (error) {
                console.error("Error loading food data:", error);
            }
        },

        initializeEventListeners() {
            // Use event delegation for all click events
            document.addEventListener('click', handleGlobalClick);

            // Input and change events
            document.getElementById('searchInput').addEventListener('input', filterAndDisplayFoods);
            document.getElementById('minPrice').addEventListener('input', updatePriceRange);
            document.getElementById('maxPrice').addEventListener('input', updatePriceRange);
            document.getElementById('sortSelect').addEventListener('change', filterAndDisplayFoods);

            // Mobile filter toggle
            document.getElementById('filterToggle')?.addEventListener('click', () => {
                const filtersPanel = document.getElementById('filtersPanel');
                filtersPanel.classList.toggle('hidden');
            });
        },

        handleGlobalClick(e) {
            const target = e.target;

            // Handle category label clicks
            if (target.closest('.category-label')) {
                const label = target.closest('.category-label');
                const checkbox = document.querySelector(`input[value="${label.dataset.category}"]`);
                
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    
                    // Update visual feedback
                    if (checkbox.checked) {
                        label.classList.add('text-blue-600', 'font-semibold');
                    } else {
                        label.classList.remove('text-blue-600', 'font-semibold');
                    }
                    
                    filterAndDisplayFoods();
                }
            }

            // Handle add to cart
            if (target.closest('.addToCart')) {
                const foodItem = target.closest('.foodItem');
                const foodId = foodItem.getAttribute('data-food-id');
                handleAddToCart(foodId);
                e.preventDefault();
            }

            // Handle add to wishlist
            if (target.closest('.addToWishList')) {
                const foodItem = target.closest('.foodItem');
                const foodId = foodItem.getAttribute('data-food-id');
                handleAddToWishlist(foodId);
                e.preventDefault();
            }

            // Handle view details
            if (target.closest('.viewMore')) {
                const foodItem = target.closest('.foodItem');
                const foodId = foodItem.getAttribute('data-food-id');
                const category = foodItem.getAttribute('data-category');
                window.location.href = `../html/foodDetails.html?id=${foodId}&category=${category}`;
            }

            // Handle reset filters button
            if (target.closest('[onclick="resetFilters()"]')) {
                resetFilters();
                e.preventDefault();
            }

            // Handle pagination clicks
            if (target.closest('[onclick^="changePage"]')) {
                const page = parseInt(target.closest('button').getAttribute('onclick').match(/\d+/)[0]);
                changePage(page);
                e.preventDefault();
            }
        },

        handleAddToCart(foodId) {
            try {
                // Call the addToCart function with foodId and default quantity
                addToCart(foodId, 1);
                // Update cart length
                getCartLength();
                // Show success notification
                showToastNotify("Item added to cart successfully!", "success");
            } catch (error) {
                console.error('Error adding to cart:', error);
                showToastNotify("Failed to add item to cart", "error");
            }
        },

        handleAddToWishlist(foodId) {
            try {
                // Call the addToWishList function
                addToWishList(foodId);
                // Update wishlist length
                getWishlistLength();
                // Show success notification
                showToastNotify("Item added to wishlist successfully!", "success");
            } catch (error) {
                console.error('Error adding to wishlist:', error);
                showToastNotify("Failed to add item to wishlist", "error");
            }
        },

        filterFoods() {
            let result = [...this.foods];

            // Search filter
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(
                    (food) =>
                        food.name.toLowerCase().includes(query) ||
                        food.category.toLowerCase().includes(query)
                );
            }

            // Category filter
            if (this.selectedCategories.length > 0) {
                result = result.filter((food) =>
                    this.selectedCategories.includes(food.category)
                );
            }

            // Price range filter
            result = result.filter(
                (food) =>
                    food.selling_price >= this.priceRange.min &&
                    food.selling_price <= this.priceRange.max
            );

            // Discount filter
            if (this.selectedDiscount !== "all") {
                const [min, max] = this.selectedDiscount.split("-").map(Number);
                result = result.filter((food) => {
                    const discount = this.calculateDiscount(
                        food.original_price,
                        food.selling_price
                    );
                    if (max) {
                        return discount >= min && discount < max;
                    }
                    return discount >= min;
                });
            }

            // Sorting
            result = this.sortFoods(result);

            this.filteredFoods = result;
            this.currentPage = 1;
        },

        sortFoods(foods) {
            switch (this.sortBy) {
                case "name-asc":
                    return foods.sort((a, b) => a.name.localeCompare(b.name));
                case "name-desc":
                    return foods.sort((a, b) => b.name.localeCompare(a.name));
                case "price-asc":
                    return foods.sort((a, b) => a.selling_price - b.selling_price);
                case "price-desc":
                    return foods.sort((a, b) => b.selling_price - a.selling_price);
                case "rating-desc":
                    return foods.sort((a, b) => b.rating - a.rating);
                default:
                    return foods;
            }
        },

        calculateDiscount(original, selling) {
            return Math.round(((original - selling) / original) * 100);
        },

        get paginatedFoods() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredFoods.slice(start, end);
        },

        get totalPages() {
            return Math.ceil(this.filteredFoods.length / this.itemsPerPage);
        },

        viewDetails(foodId, category) {
            window.location.href = `../html/foodDetails.html?id=${foodId}&category=${category}`;
        }
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    let foods = [];
    let filteredFoods = [];
    const itemsPerPage = 9;
    let currentPage = 1;

    // Define handleGlobalClick first
    function handleGlobalClick(e) {
        const target = e.target;

        // Handle category label clicks
        if (target.closest('.category-label')) {
            const label = target.closest('.category-label');
            const checkbox = document.querySelector(`input[value="${label.dataset.category}"]`);
            
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                
                // Update visual feedback
                if (checkbox.checked) {
                    label.classList.add('text-blue-600', 'font-semibold');
                } else {
                    label.classList.remove('text-blue-600', 'font-semibold');
                }
                
                filterAndDisplayFoods();
            }
        }

        // Handle add to cart
        if (target.closest('.addToCart')) {
            const foodItem = target.closest('.foodItem');
            const foodId = foodItem.getAttribute('data-food-id');
            handleAddToCart(foodId);
            e.preventDefault();
        }

        if (target.closest('.addToWishList')) {
            const foodItem = target.closest('.foodItem');
            const foodId = foodItem.getAttribute('data-food-id');
            handleAddToWishlist(foodId);
            e.preventDefault();
        }

        if (target.closest('.viewMore')) {
            const foodItem = target.closest('.foodItem');
            const foodId = foodItem.getAttribute('data-food-id');
            const category = foodItem.getAttribute('data-category');
            window.location.href = `../html/foodDetails.html?id=${foodId}&category=${category}`;
        }

        // Handle reset filters button
        if (target.closest('[onclick="resetFilters()"]')) {
            resetFilters();
            e.preventDefault();
        }

        // Handle pagination clicks
        if (target.closest('[onclick^="changePage"]')) {
            const page = parseInt(target.closest('button').getAttribute('onclick').match(/\d+/)[0]);
            changePage(page);
            e.preventDefault();
        }
    }

    function setupEventListeners() {
        // Use event delegation for all click events
        document.addEventListener('click', handleGlobalClick);
        
        // Input and change events
        document.getElementById('searchInput').addEventListener('input', filterAndDisplayFoods);
        document.getElementById('minPrice').addEventListener('input', updatePriceRange);
        document.getElementById('maxPrice').addEventListener('input', updatePriceRange);
        document.getElementById('sortSelect').addEventListener('change', filterAndDisplayFoods);
        
        // Mobile filter toggle
        document.getElementById('filterToggle')?.addEventListener('click', () => {
            const filtersPanel = document.getElementById('filtersPanel');
            filtersPanel.classList.toggle('hidden');
        });
    }

    function updatePriceRange(e) {
        const minInput = document.getElementById('minPrice');
        const maxInput = document.getElementById('maxPrice');
        const minValue = document.getElementById('minPriceValue');
        const maxValue = document.getElementById('maxPriceValue');

        if (e.target.id === 'minPrice' && parseInt(minInput.value) > parseInt(maxInput.value)) {
            minInput.value = maxInput.value;
        }
        if (e.target.id === 'maxPrice' && parseInt(maxInput.value) < parseInt(minInput.value)) {
            maxInput.value = minInput.value;
        }

        minValue.textContent = minInput.value;
        maxValue.textContent = maxInput.value;
        filterAndDisplayFoods();
    }

    function filterAndDisplayFoods() {
        let result = [...foods];

        // Search filter
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        if (searchQuery) {
            result = result.filter(food => 
                food.name.toLowerCase().includes(searchQuery) ||
                food.category.toLowerCase().includes(searchQuery)
            );
        }

        // Category filter
        const selectedCategories = Array.from(document.querySelectorAll('.category-checkbox:checked'))
            .map(checkbox => checkbox.value);
        if (selectedCategories.length > 0) {
            result = result.filter(food => selectedCategories.includes(food.category));
        }

        // Price range filter
        const minPrice = parseInt(document.getElementById('minPrice').value);
        const maxPrice = parseInt(document.getElementById('maxPrice').value);
        result = result.filter(food => 
            food.selling_price >= minPrice && 
            food.selling_price <= maxPrice
        );

        // Sort
        const sortBy = document.getElementById('sortSelect').value;
        result = sortFoods(result, sortBy);

        filteredFoods = result;
        currentPage = 1;
        displayFoods();
        updatePagination();
    }

    function sortFoods(foods, sortBy) {
        switch (sortBy) {
            case 'name-asc':
                return foods.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return foods.sort((a, b) => b.name.localeCompare(a.name));
            case 'price-asc':
                return foods.sort((a, b) => a.selling_price - b.selling_price);
            case 'price-desc':
                return foods.sort((a, b) => b.selling_price - a.selling_price);
            case 'rating-desc':
                return foods.sort((a, b) => b.rating - a.rating);
            default:
                return foods;
        }
    }

    function displayFoods() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedFoods = filteredFoods.slice(start, end);
        const grid = document.getElementById('foodGrid');

        if (filteredFoods.length === 0) {
            grid.innerHTML = `
                <div class="w-full flex flex-col items-center justify-center py-16 px-4">
                    <div class="relative w-72 h-72 mb-8">
                        <!-- Background Circle -->
                        <div class="absolute inset-0 bg-blue-50 rounded-full animate-pulse"></div>
                        
                        <!-- Animated Icons -->
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="relative">
                                <!-- Main Search Icon -->
                                <i class="ri-search-line text-7xl text-blue-500/30 animate-bounce"></i>
                                
                                <!-- Floating Food Icons -->
                                <i class="ri-restaurant-line absolute -top-8 -right-8 text-4xl text-orange-400/50 animate-float-delay-1"></i>
                                <i class="ri-cake-3-line absolute -bottom-8 -left-8 text-4xl text-purple-400/50 animate-float-delay-2"></i>
                                <i class="ri-cup-line absolute -top-8 -left-8 text-4xl text-green-400/50 animate-float-delay-3"></i>
                                <i class="ri-burger-line absolute -bottom-8 -right-8 text-4xl text-red-400/50 animate-float-delay-4"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Text Content -->
                    <div class="text-center max-w-md mx-auto">
                        <h3 class="text-2xl font-bold text-gray-800 mb-3">Oops! No Matches Found</h3>
                        <p class="text-gray-600 mb-8 leading-relaxed">
                            We couldn't find any foods matching your criteria. Try adjusting your filters or try a different search term.
                        </p>
                        
                        <!-- Action Buttons -->
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <button 
                                onclick="resetFilters()"
                                class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 hover:shadow-lg group"
                            >
                                <i class="ri-refresh-line transition-transform group-hover:rotate-180 duration-500"></i>
                                Reset All Filters
                            </button>
                            <button 
                                onclick="document.getElementById('searchInput').focus()"
                                class="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full hover:border-blue-500 hover:text-blue-500 transition-all duration-300 group"
                            >
                                <i class="ri-search-line group-hover:scale-110 transition-transform"></i>
                                Try New Search
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('pagination').style.display = 'none';
            return;
        }

        // Show pagination when there are results
        document.getElementById('pagination').style.display = 'flex';

        grid.innerHTML = paginatedFoods.map((food, i) => createFoodCard(food, i)).join('');
    }

    function createFoodCard(food, ind) {
        const userReview = food.reviews.map((review) => review.rating);
        const finalRating = userReview.reduce((total, rating) => total + rating, 0) / userReview.length || 0;
        const rating = finalRating || "No rating available";
        let { _id, category, description, image, name, stock, selling_price, original_price } = food;
        const discount = calculateDiscount(food.original_price, food.selling_price);
        return `
            <div 
                class="foodItem bg-[#f6f6f6] rounded-md hover:shadow-lg hover:bg-[#ffffff] duration-300 w-[300px] group overflow-hidden relative"
                data-food-id="${_id}"
                data-category="${category}"
            >
                <div class="absolute top-3 opacity-100 group-hover:opacity-100 right-2 flex space-y-2 duration-300 flex-col">
                    <i title="Add to wishlist" class="addToWishList ri-heart-line z-30 duration-500 w-[30px] h-[30px] flex items-center justify-center p-5 cursor-pointer shadow-[0px_0px_16px_3px_#a19393] hover:bg-[#ff6b38] bg-white rounded-full hover:text-white text-2xl text-[#ff6b38]"></i>
                    <i title="View Details" class="viewMore ri-eye-line z-30 w-[30px] h-[30px] flex items-center justify-center p-5 cursor-pointer hover:bg-[#0d6efd] bg-white rounded-full hover:text-white duration-300 shadow-[0px_0px_16px_3px_#a19393] text-2xl text-[#3284e8]"></i>
                </div>

                <div class="img cursor-pointer max-w-full max-h-[280px] overflow-hidden relative viewMore">
                    <div class="px-2 ${stock === 0 ? "opacity-100" : "opacity-0"} py-1 z-30 bg-red-500 text-white rounded-full absolute top-1/2 left-1/2 -translate-x-1/2">Out of Stock</div>
                    <img
                        src="${image}"
                        alt="food-${ind} image"
                        class="w-full h-full object-cover ${stock === 0 ? "blur-[2px]" : "opacity-100"}  object-center scale-100 group-hover:scale-110 duration-300 transition-all"
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
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
        const pagination = document.getElementById('pagination');

        let html = `
            <button 
                onclick="changePage(${currentPage - 1})"
                class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors flex items-center gap-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                ${currentPage === 1 ? 'disabled' : ''}
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                <span class="hidden sm:inline">Previous</span>
            </button>
        `;

        for (let i = 1; i <= totalPages; i++) {
            html += `
                <button 
                    onclick="changePage(${i})"
                    class="px-4 py-2 border rounded-lg font-medium transition-colors ${currentPage === i
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }"
                >${i}</button>
            `;
        }

        html += `
            <button 
                onclick="changePage(${currentPage + 1})"
                class="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-colors flex items-center gap-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
                ${currentPage === totalPages ? 'disabled' : ''}
            >
                <span class="hidden sm:inline">Next</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
        `;

        pagination.innerHTML = html;
    }

    function changePage(page) {
        const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            displayFoods();
            updatePagination();
        }
    }

    function calculateDiscount(original, selling) {
        return Math.round(((original - selling) / original) * 100);
    }

    function handleAddToCart(foodId) {
        try {
            addToCart(foodId, 1);
            getCartLength();
        } catch (error) {
            console.error('Error adding to cart:', error);
            showToastNotify("Failed to add item to cart", "error");
        }
    }

    function handleAddToWishlist(foodId) {
        try {
            addToWishList(foodId);
            getWishlistLength();
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            showToastNotify("Failed to add item to wishlist", "error");
        }
    }

    // Add resetFilters function
    function resetFilters() {
        // Reset search
        document.getElementById('searchInput').value = '';

        // Reset categories
        document.querySelectorAll('.category-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.querySelectorAll('.category-label').forEach(label => {
            label.classList.remove('text-blue-600', 'font-semibold');
        });

        // Reset price range
        document.getElementById('minPrice').value = 0;
        document.getElementById('maxPrice').value = 50;
        document.getElementById('minPriceValue').textContent = '0';
        document.getElementById('maxPriceValue').textContent = '50';

        // Reset sort
        document.getElementById('sortSelect').value = 'name-asc';

        // Reset filters and display
        filteredFoods = [...foods];
        currentPage = 1;
        displayFoods();
        updatePagination();
    }

    window.changePage = changePage;
    window.resetFilters = resetFilters;

    try {
        const response = await fetch("../../assets/json/api.json");
        const data = await response.json();
        foods = data.food_list;
        filteredFoods = [...foods];

        // Initialize UI
        setupCategories();
        setupEventListeners();
        filterAndDisplayFoods();
    } catch (error) {
        console.error("Error loading food data:", error);
    }

    
    function setupCategories() {
        const categories = [...new Set(foods.map(food => food.category))];
        const container = document.getElementById('categoryContainer');
        
        container.innerHTML = categories.map(category => `
            <div class="flex items-center gap-2 hover:text-blue-600 transition-colors">
                <input type="checkbox" value="${category}" class="category-checkbox custom-checkbox">
                <label class="text-gray-700 cursor-pointer category-label" data-category="${category}">${category}</label>
            </div>
        `).join('');

        // Add click handlers using event delegation (already handled in handleGlobalClick)
    }
});