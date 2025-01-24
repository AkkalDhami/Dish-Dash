document.addEventListener("DOMContentLoaded", () => {
    const ordersContainer = document.getElementById("ordersContainer");

    // Fetch orders from localStorage (mock data if empty)
    let myOrders = JSON.parse(localStorage.getItem("myOrders")) || [
        {
            orderId: "12345",
            items: [
                { name: "Laptop", image: "https://via.placeholder.com/80", price: 1000, quantity: 1 },
                { name: "Headphones", image: "https://via.placeholder.com/80", price: 50, quantity: 2 }
            ],
            totalAmount: 1100,
            paymentMethod: "Credit Card",
            orderStatus: "Pending"
        },
        {
            orderId: "67890",
            items: [
                { name: "Smartphone", image: "https://via.placeholder.com/80", price: 800, quantity: 1 }
            ],
            totalAmount: 800,
            paymentMethod: "PayPal",
            orderStatus: "Cancelled"
        },
        {
            orderId: "13579",
            items: [
                { name: "Tablet", image: "https://via.placeholder.com/80", price: 600, quantity: 1 }
            ],
            totalAmount: 600,
            paymentMethod: "UPI",
            orderStatus: "Completed"
        }
    ];

    // Save mock data to localStorage for demonstration
    localStorage.setItem("myOrders", JSON.stringify(myOrders));

    // Icons based on order status
    const statusIcons = {
        Pending: "ri-truck-line text-yellow-500",
        Completed: "ri-check-line text-green-500",
        Cancelled: "ri-close-line text-red-500"
    };

    // Render orders
    const renderOrders = (filteredOrders = myOrders) => {
        ordersContainer.innerHTML = ""; // Clear the container

        myOrders.forEach(order => {
            const orderHTML = `
          <div class="bg-white p-4 rounded-lg shadow-md">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-sm text-gray-500">Order ID: <span class="font-medium">${order.orderId}</span></p>
                <p class="text-sm text-gray-500">Payment Method: <span class="font-medium">${order.paymentMethod}</span></p>
              </div>
              <div class="flex items-center">
                <i class="${statusIcons[order.orderStatus]} text-2xl"></i>
                <p class="ml-2 text-sm font-medium text-gray-700">${order.orderStatus}</p>
              </div>
            </div>
            <div class="space-y-4">
              ${order.items.map(item => `
                <div class="flex items-center space-x-4">
                  <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-800">${item.name}</h3>
                    <p class="text-sm text-gray-500">Price: $${item.price}</p>
                    <p class="text-sm text-gray-500">Quantity: ${item.quantity}</p>
                  </div>
                  <p class="font-semibold text-gray-800">$${item.price * item.quantity}</p>
                </div>
              `).join('')}
            </div>
            <div class="mt-4 border-t pt-2 flex justify-between">
              <p class="text-sm text-gray-500">Total Amount:</p>
              <p class="font-semibold text-gray-800">$${order.totalAmount}</p>
            </div>
            <div class="mt-4 flex justify-end space-x-4">
              ${order.orderStatus === "Pending" ? `
                <button 
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cancelOrderBtn" 
                  data-order-id="${order.orderId}">
                  Cancel Order
                </button>` : ""}
              ${(order.orderStatus === "Cancelled" || order.orderStatus === "Completed") ? `
                <button 
                  class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 reorderBtn" 
                  data-order-id="${order.orderId}">
                  Order Again
                </button>` : ""}
                ${order.orderStatus === "Completed" ? `
                    <button 
                      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 reviewOrderBtn" 
                      data-order-id="${order.orderId}">
                      Leave Review
                    </button>` : ""}
                  
            </div>
          </div>
        `;
            ordersContainer.innerHTML += orderHTML;
        });

        addEventListeners();
    };

    // Add event listeners to cancel and reorder buttons
    const addEventListeners = () => {
        document.querySelectorAll(".cancelOrderBtn").forEach(button => {
            button.addEventListener("click", e => {
                const orderId = e.target.getAttribute("data-order-id");
                myOrders = myOrders.map(order =>
                    order.orderId === orderId ? { ...order, orderStatus: "Cancelled" } : order
                );
                localStorage.setItem("myOrders", JSON.stringify(myOrders));
                renderOrders();
            });
        });

        document.querySelectorAll(".reorderBtn").forEach(button => {
            button.addEventListener("click", e => {
                const orderId = e.target.getAttribute("data-order-id");
                const orderToReorder = myOrders.find(order => order.orderId === orderId);
                if (orderToReorder) {
                    const newOrder = {
                        ...orderToReorder,
                        orderId: Date.now().toString(), // Generate new order ID
                        orderStatus: "Pending"
                    };
                    myOrders.push(newOrder);
                    localStorage.setItem("myOrders", JSON.stringify(myOrders));
                    renderOrders();
                }
            });
        });
    };





    // Initial render
    renderOrders(myOrders);
});
