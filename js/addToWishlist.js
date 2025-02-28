import { getWishlistLength } from "../assets/utility/getWishlistLength.js";
import { addToWishList } from "../assets/utility/addToWishList.js";

document.addEventListener("DOMContentLoaded", () => {
    getWishlistLength();

    let item_container = document.querySelector("#item_container") || document.querySelector("#foodMenuContainer") || document.querySelector("#recommendedItemContainer");

    item_container?.addEventListener("click", (e) => {
        const foodItem = e.target.closest(".foodItem");
        const id = foodItem.id;
        const wishlistItem = e.target.closest(".addToWishList");
        if (!id) {
            console.error("ID not found for food item!", e.target);
            return;
        }
        if (wishlistItem) {
            console.log(wishlistItem);
            addToWishList(id);
        }
    });
});
