// Get elements
const foodImage = document.getElementById("foodImage");
const itemRating = document.getElementById("itemRating");
const itemPrice = document.getElementById("itemPrice");
const itemStock = document.getElementById("itemStock");
const itemName = document.getElementById("itemName");
const itemDescription = document.getElementById("itemDescription");
const itemReviews = document.getElementById("itemReviews");

// Clear previous reviews
itemReviews.innerHTML = "";

// Get product details from localStorage
const params = new URLSearchParams(window.location.search);
const productId = String(params.get("id"));
const foodList = JSON.parse(localStorage.getItem("FoodList"));
const product = foodList.find((p) => p._id === productId);

console.log(product);

// Calculate average rating
const userReview = product.reviews.map((review) => review.rating);
const finalRating = userReview.reduce((total, rating) => total + rating, 0) / userReview.length || 0;
const rating = finalRating || "No rating available";

// Update food details
const updateFoodDetails = () => {
    foodImage.src = product.image;
    itemRating.innerHTML = `
        <span class="text-orange-500 text-[20px] flex items-center">
            <i class="ri-star-fill"></i>
            <span class="ml-1 text-gray-800"> | ${rating}</span>
        </span>
        <span class="text-gray-600">(${product.reviews.length} Reviews)</span>
    `;
    itemPrice.innerHTML = `
        <span class="text-[18px] font-semibold text-gray-800">$${product.selling_price}</span>
        <span class="line-through text-gray-400 text-[16px]">$${product.original_price}</span>
    `;
    itemStock.innerHTML = `
        <span>In Stock:</span>
        <span class="text-gray-700 z-10 font-semibold"> ${product.stock}</span>
        <span class="inStock w-3 h-3 rounded-full inline-block"></span>
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
                class="tabContent hidden p-6 rounded-lg shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] max-w-md w-[500px]"
            >
                <div class="flex items-center mb-4">
                    <img
                        class="w-12 h-12 rounded-full object-cover border border-r-red-500 mr-4"
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

console.log(itemReviews);