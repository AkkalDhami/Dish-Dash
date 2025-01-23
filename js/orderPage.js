let myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];

console.log(myOrders);

myOrders.forEach((element, i) => {
    console.log(element[1]);
});