import { getCartLength } from "./getCartLength.js";
document.addEventListener("DOMContentLoaded", () => {

  getCartLength();
  function addToCart() {
    const foodItems = document.querySelectorAll(".foodItem");
    foodItems.forEach((item) => {

      let cart = JSON.parse(localStorage.getItem("myCart")) || [];

      const FoodList = JSON.parse(localStorage.getItem("FoodList"));
      if (!FoodList) {
        console.error("FoodList not found in localStorage!");
        return;
      }


      item.addEventListener("click", (e) => {
        const id = item.id || item.getAttribute("data-id");


        console.log(item)
        let foodQuantity = item.querySelector('.foodQuantity');

        let quantity = parseInt(foodQuantity.getAttribute("data-quantity")) || 1;

        console.log(quantity);
        console.log(e.target.classList.contains('increaseQuantity'))

        if (e.target.classList.contains('increaseQuantity')) {
          quantity++;
        }
        if (e.target.classList.contains('decreaseQuantity')) {

          quantity--;
          if (quantity < 1) {
            alert("ente valid quantity")
            return;
          }
        }



        foodQuantity.innerHTML = quantity;
        foodQuantity.setAttribute('data-quantity', quantity);
        if (
          e.target.innerHTML.trim() ===
          `Add to Cart <i class="ri-shopping-bag-line"></i>`
        ) {
          let productInCart = cart.find((product) => product._id === id);

          if (productInCart) {
            productInCart.quantity += 1;
          }

          if (!productInCart) {
            cart.push({ ...FoodList[id], quantity: quantity });
          }

          localStorage.setItem("myCart", JSON.stringify(cart));
          getCartLength();

        }
      });
    });
  }

  addToCart();
});
