import { getCartLength } from "./getCartLength.js";
import { addToCart } from "../assets/utility/addToCart.js";

document.addEventListener("DOMContentLoaded", () => {
    getCartLength();

    let item_container = document.querySelector("#item_container") || document.querySelector("#foodMenuContainer") || document.querySelector("#recommendedItemContainer");

    item_container?.addEventListener("click", (e) => {
        const foodItem = e.target.closest(".foodItem");
        const id = foodItem.id;
        const addToCartt = e.target.closest(".addToCart");
        if (!id) {
            console.error("ID not found for food item!", e.target);
            return;
        }
        if (addToCartt) {
            addToCart(id, 1);
        }
    });
});
