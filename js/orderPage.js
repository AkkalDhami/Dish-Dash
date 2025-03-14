import { showToastNotify } from "../assets/utility/showToast.js";

let myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
const overlay = document.querySelector(".overlay");
const cancelOrderAlert = document.querySelector("#cancelOrder");

function getFormattedDate(date) {
  let day = date
    .toLocaleDateString("en-GB", { dateStyle: "full" })
    .split(" ")[0];
  const day2 = date.toLocaleDateString("en-GB", { dateStyle: "medium" });
  return `${day} ${day2}`;
}

function getFutureDate(daysToAdd) {
  const now = new Date();
  now.setDate(now.getDate() + daysToAdd);
  return now;
}
const futureDate = getFutureDate(1200000);

const statusIcons = {
  Pending: "ri-truck-line me-1 text-orange-300",
  Completed: "ri-check-line me-1 text-green-300",
  Cancelled: "ri-close-line me-1 text-red-300",
};

let orderItemContainer = document.querySelector("#orderItemContainer");

function renderOrders(filterStatus = "All orders") {
  orderItemContainer.innerHTML = "";
  let ordersFound = false;

  myOrders.forEach((element) => {
    if (filterStatus !== "All orders" && element.orderStatus !== filterStatus) {
      return;
    }

    ordersFound = true;

    element.items.forEach((item) => {
      let { _id, quantity, image, name, selling_price } = item;
      orderItemContainer.innerHTML += `
        <div data-prductId="${_id}" data-orderId="${element.orderId}" class="cardOrders flex flex-wrap gap-y-4 py-6">
          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-400">Item Name:</dt>
            <dd class="mt-1.5 text-base">
              <img src="${image}" class="w-20 rounded-sm" alt="item image" />
              <p class="mt-2 text-gray-300 text-sm">${name}</p>
            </dd>
          </dl>
          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-400">Order Date:</dt>
            <dd class="mt-1 text-[14px] text-orange-500">${getFormattedDate(new Date(element.orderDate))}</dd>
            <dt class="text-base mt-2 font-medium text-gray-400">Delivery Date:</dt>
            <dd class="mt-1 text-[14px] text-blue-500">${getFormattedDate(futureDate)}</dd>
          </dl>
          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-400">Quantity:</dt>
            <dd class="mt-1.5 text-[14px] text-gray-300">${quantity}</dd>
            <dt class="text-base mt-2 font-medium text-gray-500 dark:text-gray-400">Sub total:</dt>
            <dd class="mt-1 text-[14px] text-gray-900 dark:text-white">$${selling_price * quantity}</dd>
          </dl>
          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-400">Payment Method:</dt>
            <dd class="text-[14px] mt-1 text-gray-300">${element.paymentMethod}</dd>
            <dt class="text-base font-medium mt-2 text-gray-500 dark:text-gray-400">Status:</dt>
            <dd class="me-2 mt-1 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${element.orderStatus === "Pending" ? "bg-[#a74220] text-orange-300" : element.orderStatus === "Completed" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}">
              <i class="${statusIcons[element.orderStatus]} ${element.orderStatus === "Pending" ? "text-orange-300" : element.orderStatus === "Completed" ? "text-green-300" : "text-red-300"}"></i> ${element.orderStatus}
            </dd>
          </dl>
          <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
            ${element.orderStatus === "Pending" ? '<button type="button" class="cancelOrder cursor-pointer w-full rounded-lg border px-3 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto border-red-500 text-red-500 hover:bg-red-600 hover:text-white focus:ring-red-900">Cancel order</button>' : element.orderStatus === "Completed" ? '<button type="button" class="orderAgain cursor-pointer w-full rounded-lg border px-3 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto border-[#ff6b38] text-[#ff6b38] hover:bg-[#ff6b38] hover:text-white focus:ring-red-900">Order Again</button>' : '<button type="button" class="orderAgain cursor-pointer w-full rounded-lg border px-3 py-2.5 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto border-[#ff6b38] text-[#ff6b38] hover:bg-[#ff6b38] hover:text-white focus:ring-red-900">Order Again</button>'}
            <a href="#" class="w-full inline-flex justify-center rounded-lg border px-3 py-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 border-gray-600 bg-gray-800 text-gray-400 hover:bg-[#0d6efd] hover:text-white focus:ring-gray-700 lg:w-auto">View details</a>
          </div>
        </div>
      `;
    });
  });

  if (!ordersFound) {
    orderItemContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center py-10">
        <img src="../assets/images/orderNotFound.avif" alt="No orders found" class="w-40 h-40 mb-4">
        <h2 class="text-2xl sm:text-3xl font-semibold text-red-500">No orders found</h2>
        <p class="text-gray-300 text-center">You have no orders matching the selected status.</p>
        <a href="/#menu_container" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Continue Shopping
        </a>
      </div>
    `;
  }
}

function hideCancelorderAlert() {
  overlay.classList.add("overlayActive");
  cancelOrderAlert.classList.add("-top-1/2");
  cancelOrderAlert.classList.remove("top-1/2");
}

function showCancelorderAlert() {
  overlay.classList.remove("overlayActive");
  cancelOrderAlert.classList.remove("-top-1/2");
  cancelOrderAlert.classList.add("top-1/2");
}

function handleCancelOrder(orderId, productId) {
  const yesSureBtn = document.querySelector("#yesSureCancelOrder");
  const cancelButtons = document.querySelectorAll(".notCancelOrder");

  const handleConfirm = () => {
    const order = myOrders.find((order) => order.orderId === orderId);
    if (order) {
      order.items = order.items.filter((item) => item._id !== productId);
      if (order.items.length === 0) {
        myOrders = myOrders.filter((order) => order.orderId !== orderId);
      }
      console.log("order: ", order)
      localStorage.setItem("myOrders", JSON.stringify(myOrders));
      renderOrders();
      showToastNotify("Item cancelled successfully", "success");
    } else {
      showToastNotify("Error in cancelled item", "error");
    }

  };

  cancelButtons.forEach((btn) => {
    btn.addEventListener("click", hideCancelorderAlert, { once: true });
  });

  yesSureBtn.addEventListener(
    "click",
    () => {
      handleConfirm();
      hideCancelorderAlert();
    },
    { once: true }
  );
}

let productImage = document.querySelector("#productImage");
let productName = document.querySelector("#productName");
let productQuantity = document.querySelector("#productQuantity");
let productPrice = document.querySelector("#productPrice");

function removeCardHTML() {
  productImage.src = "";
  productName.innerHTML = "";
  productPrice.innerHTML = "";
  productQuantity.innerHTML = "";
}

orderItemContainer.addEventListener("click", (e) => {
  removeCardHTML();
  if (e.target.classList.contains("cancelOrder")) {
    showCancelorderAlert();
    const orderId = e.target.closest("[data-orderId]").getAttribute("data-orderId");
    const productId = e.target.closest("[data-prductId]").getAttribute("data-prductId");
    const item = myOrders.filter((item) => item.orderId == orderId);

    productImage.src = item[0].items[0].image;
    productName.innerHTML = item[0].items[0].name;
    productQuantity.innerHTML = `Quantity: ${item[0].items[0].quantity}`;
    productPrice.innerHTML = `Subtotal: $${item[0].items[0].original_price * item[0].items[0].quantity}`;

    console.log("Order ID:", orderId);
    console.log("Product ID:", productId);
    handleCancelOrder(orderId, productId);
    console.log(item)
    // removeCardHTML();
    overlay.addEventListener("click", hideCancelorderAlert);
  } else if (e.target.classList.contains("orderAgain")) {
    const orderId = e.target.closest("[data-orderId]").getAttribute("data-orderId");

    const orderToReorder = myOrders.find((order) => order.orderId === orderId);
    if (orderToReorder) {
      const newOrder = {
        ...orderToReorder,
        orderId: Date.now().toString(),
        orderStatus: "Pending",
      };
      myOrders.push(newOrder);
      localStorage.setItem("myOrders", JSON.stringify(myOrders));
      renderOrders();
      showToastNotify("Order reOrdered successfully", "success");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderOrders();

  const orderTypeSelect = document.getElementById("order-type");
  orderTypeSelect.addEventListener("change", (e) => {
    const filterStatus =
      e.target.value === "All orders"
        ? "All orders"
        : e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    renderOrders(filterStatus);
  });
});