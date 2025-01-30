import { getWishlistLength } from "../assets/utility/getWishlistLength.js";
import { addToWishList } from "../assets/utility/addToWishList.js";

document.addEventListener("DOMContentLoaded", () => {
    getWishlistLength();

    const foodItems = document.querySelectorAll(".foodItem");
    foodItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            const id = item.id;
            if (!id) {
                console.error("ID not found for food item!", item);
                return;
            }

            if (e.target.closest(".addToWishList")) {
                addToWishList(id);
            }
        });
    });
});
