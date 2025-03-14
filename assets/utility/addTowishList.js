import { showToastNotify } from "./showToast.js";
import { getWishlistLength } from "../../assets/utility/getWishlistLength.js";

export const addToWishList = (productId) => {
    const getWishlist = () => JSON.parse(localStorage.getItem("myWishlist")) || [];
    const updateWishlist = (wishlist) => localStorage.setItem("myWishlist", JSON.stringify(wishlist));
    const getFoodList = () => JSON.parse(localStorage.getItem("FoodList")) || [];
    const FoodList = getFoodList();

    console.log("FoodList:", FoodList);

    if (!FoodList.length) {
        showToastNotify("FoodList not found in localStorage!", "error");
        return;
    }

    const wishlist = getWishlist();
    const productExists = wishlist.some((product) => product._id === productId);

    if (productExists) {
        showToastNotify("Item already in your wishlist!", "warn");
        return;
    }

    if (!productExists) {
        const productToAdd = FoodList.find((product) => product._id === productId);
        if (productToAdd) {
            wishlist.push(productToAdd);
        } else {
            console.error("Product not found in FoodList!");
            return;
        }
    }

    updateWishlist(wishlist);
    getWishlistLength();
    showToastNotify("Item added to your wishlist!", "success");

    console.log("Wishlist updated:", wishlist);
};

