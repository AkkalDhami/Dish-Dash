import { getCartLength } from "./getCartLength.js";
import { showToast } from "../assets/utility/showToast.js";

document.addEventListener("DOMContentLoaded", () => {

  const getCart = () => JSON.parse(localStorage.getItem("myCart")) || [];
  const updateCart = (cart) => localStorage.setItem("myCart", JSON.stringify(cart));
  const getFoodList = () => JSON.parse(localStorage.getItem("FoodList")) || [];

  getCartLength();

  const addToCart = () => {
    const foodItems = document.querySelectorAll(".foodItem");
    const FoodList = getFoodList();

    if (!FoodList.length) {
      showToast("FoodList not found in localStorage!", "error");
      return;
    }

    foodItems.forEach((item) => {
      const id = item.id;
      if (!id) {
        console.error("ID not found for food item!");
        return;
      }

      item.addEventListener("click", (e) => {
        const cart = getCart();
        let quantity = 1;


        if (e.target.classList.contains("addToCart")) {

          const productInCart = cart.find((product) => product._id === id);

          showToast("Product added to your cart!", "success");
          if (productInCart) {
            productInCart.quantity += quantity;
          } else {
            const productToAdd = FoodList.find((product) => product._id === id);
            if (productToAdd) {
              cart.push({ ...productToAdd, quantity });
            } else {

              console.error("Product not found in FoodList!");
              return;
            }
          }

          updateCart(cart);
          getCartLength();
          console.log("Cart updated:", cart);
        }


      });
    });
  };

  addToCart();
});
