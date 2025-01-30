import { showToast } from "./showToast.js";
import { getWishlistLength } from "../assets/utility/getWishlistLength.js";
import { getCartLength } from "../assets/utility/getCartLength.js";

export const moveToCart = (productId) => {
    const getWishlist = () => JSON.parse(localStorage.getItem("myWishlist")) || [];
    const getCart = () => JSON.parse(localStorage.getItem("myCart")) || [];
    const updateWishlist = (wishlist) => localStorage.setItem("myWishlist", JSON.stringify(wishlist));
    const updateCart = (cart) => localStorage.setItem("myCart", JSON.stringify(cart));

    let wishlist = getWishlist();
    let cart = getCart();

    const productIndex = wishlist.findIndex((product) => product._id === productId);

    if (productIndex === -1) {
        showToast("Product not found in wishlist!", "error");
        return;
    }

    const [product] = wishlist.splice(productIndex, 1);

    if (!product) {
        console.error("Product could not be retrieved from wishlist!");
        return;
    }

    const cartItem = cart.find((item) => item._id === productId);

    if (cartItem) {
        cartItem.quantity += 1; 
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    updateWishlist(wishlist);
    updateCart(cart);

    getWishlistLength();
    getCartLength();

    showToast("Item moved to cart!", "success");

    console.log("Updated Wishlist:", wishlist);
    console.log("Updated Cart:", cart);
};
