export function getCartLength() {
    let cart = JSON.parse(localStorage.getItem("myCart")) || [];
    let cartItems = document.querySelectorAll(".cartItems");
    let cartLength = cart.reduce((total, product) => total + product.quantity, 0);
    cartItems.forEach((item) => {
        item.innerHTML = cartLength
    })
}
