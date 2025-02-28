import { showToastNotify } from "./showToast.js";
import { getCartLength } from "../../js/getCartLength.js";
export const addToCart = (productId, quantity) => {
    const getCart = () => JSON.parse(localStorage.getItem("myCart")) || [];
    const updateCart = (cart) => localStorage.setItem("myCart", JSON.stringify(cart));
    const getFoodList = () => JSON.parse(localStorage.getItem("FoodList")) || [];
    const FoodList = getFoodList();

    if (!FoodList.length) {
        showToast("FoodList not found in localStorage!", "error");
        return;
    }
    if (quantity <= 0) {
        showToastNotify("Invalid quantity!", "error");
        return;
    }

    const cart = getCart();
    const productInCart = cart.find((product) => product._id === productId);

    let stock = FoodList.find((product) => product._id === productId);
    if (!stock) {
        console.error("Product not found in FoodList!");
        return;
    }

    if (stock.stock === 0) {
        showToastNotify("Out of Stock!", "error");
        return;
    }

    if (stock.stock < quantity) {
        quantity = stock.stock;
    }

    if (productInCart) {
        productInCart.quantity += quantity;
    } else {
        const productToAdd = FoodList.find((product) => product._id === productId);
        if (productToAdd) {
            cart.push({ ...productToAdd, quantity });
        } else {
            console.error("Product not found in FoodList!");
            return;
        }
    }

    updateCart(cart);
    getCartLength();
    showToastNotify(`${quantity} Item added to your cart!`, "success");
    console.log("FoodList:", FoodList);
    console.log("Cart before update:", cart);

};