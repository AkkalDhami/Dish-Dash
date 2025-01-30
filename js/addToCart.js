import { getCartLength } from "./getCartLength.js";
import { addToCart } from "../assets/utility/addToCart.js";

document.addEventListener("DOMContentLoaded", () => {
    getCartLength();

    const foodItems = document.querySelectorAll(".foodItem");
    foodItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            const id = item.id;
            if (!id) {
                console.error("ID not found for food item!", item);
                return;
            }

            if (e.target.closest(".addToCart")) {
                addToCart(id, 1);
            }

        });
    });
});
