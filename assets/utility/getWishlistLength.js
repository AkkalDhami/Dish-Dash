export function getWishlistLength() {
    let cart = JSON.parse(localStorage.getItem("myWishlist")) || [];
    let wishlistItems = document.querySelectorAll(".wishlistItems");
    wishlistItems.forEach((item) => {
        item.innerHTML = cart.length;
    });
}
