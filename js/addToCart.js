import { getCartLength } from "./getCartLength.js";
import { showToast } from "../assets/utility/showToast.js";
import { addToCart } from "../assets/utility/addToCart.js";

document.addEventListener("DOMContentLoaded", () => {
    getCartLength();

    const foodItems = document.querySelectorAll(".foodItem");
    foodItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            const id = item.id;
            console.log(item)
            console.log(id)
            if (!id) {
                console.error("ID not found for food item!");
                return;
            }
            if (e.target.classList.contains("addToCart")) {
                let quantity = 1;
                addToCart(id, quantity);
            }
        });
    });

    // addToCartBtn.addEventListener("click", () => {
    //   const quantity = parseInt(quantityInput.value, 10);
    //   const productId = product._id;
    //   addToCart(productId, quantity);
    // });
});