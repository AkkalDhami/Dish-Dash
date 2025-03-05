let myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];

function getFormattedDate(date) {
  let day = date.toLocaleDateString('en-GB', { dateStyle: 'full' }).split(' ')[0];
  const day2 = date.toLocaleDateString('en-GB', { dateStyle: 'medium' });
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
  Cancelled: "ri-close-line me-1 text-red-300"
};

let orderItemContainer = document.querySelector("#orderItemContainer");

function renderOrders(filterStatus = "All orders") {
  orderItemContainer.innerHTML = "";
  myOrders.forEach((element) => {
    if (filterStatus !== "All orders" && element.orderStatus !== filterStatus) {
      return;
    }
    element.items.forEach((item) => {
      let { _id, quantity, image, name, selling_price } = item;
      orderItemContainer.innerHTML += `
        <div id="${_id}" data-orderId="${element.orderId}" class="flex flex-wrap gap-y-4 py-6">
          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-400">Item Name:</dt>
            <dd class="mt-1.5 text-base">
              <img src="${image}" class="w-20 rounded-sm" alt="item image" />
              <p class="mt-2 text-gray-300 text-sm">${name}</p>
            </dd>
          </dl>
          <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
            <dt class="text-base font-medium text-gray-400">Order Date:</dt>
            <dd class="mt-1 text-[14px] text-orange-500">${getFormattedDate(new Date())}</dd>
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
     
          ${element.orderStatus === "Pending" ? '<button type="button" class="cancelOrder cursor-pointer w-full rounded-lg border px-3 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto border-red-500 text-red-500 hover:bg-red-600 hover:text-white focus:ring-red-900">Cancel order</button>' : element.orderStatus === "Completed" ? '<button type="button" class="orderAgain cursor-pointer w-full rounded-lg border px-3 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto border-[#ff6b38] text-[#ff6b38] hover:bg-[#ff6b38] hover:text-white focus:ring-red-900">Order Again</button>' : '<button type="button" class="orderAgain cursor-pointer w-full rounded-lg border px-3 py-2 text-center text-sm font-medium focus:outline-none focus:ring-4 lg:w-auto border-[#ff6b38] text-[#ff6b38] hover:bg-[#ff6b38] hover:text-white focus:ring-red-900">Order Again</button>'}


            <a href="#" class="w-full inline-flex justify-center rounded-lg border px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 border-gray-600 bg-gray-800 text-gray-400 hover:bg-[#0d6efd] hover:text-white focus:ring-gray-700 lg:w-auto">View details</a>
          </div>
        </div>
      `;
    });
  });
}

function cancelOrder(orderId) {
  const order = myOrders.find((order) => order.orderId === orderId);
  if (order) {
    order.orderStatus = "Cancelled";
    localStorage.setItem("myOrders", JSON.stringify(myOrders));
    renderOrders();
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cancelOrder")) {
    const orderId = e.target.closest("div").getAttribute("data-orderId");
    cancelOrder(orderId);
  } else if (e.target.classList.contains("orderAgain")) {
    const orderId = e.target.closest("div").getAttribute("data-orderId");
    const orderToReorder = myOrders.find((order) => order.orderId === orderId);
    if (orderToReorder) {
      const newOrder = {
        ...orderToReorder,
        orderId: Date.now().toString(), // Generate new order ID
        orderStatus: "Pending",
      };
      myOrders.push(newOrder);
      localStorage.setItem("myOrders", JSON.stringify(myOrders));
      renderOrders();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderOrders();

  const orderTypeSelect = document.getElementById("order-type");
  orderTypeSelect.addEventListener("change", (e) => {
    const filterStatus = e.target.value === "All orders" ? "All orders" : e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    renderOrders(filterStatus);
  });
});



//   Confirmed : <i class="ri-check-line me-1"></i> ,  bg-green-900 text-green-300

// Cancelled : <i class="ri-close-line me-1"></i> , bg-red-900 text-red-300

// pending: <i class="ri-truck-line me-1"></i> , bg-[#a74220] text-orange-300

// cancel order: border-red-500 text-red-500 hover:bg-red-600 hover:text-white focus:ring-red-900
// `order again: border-[#ff6b38] text-[#ff6b38] hover:bg-[#ff6b38] hover:text-white focus:ring-red-900`