const cartItems = [];

function addToCart(product) {
    const existingItem = cartItems.find(item => item.product ===
        product);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({
            product,
            quantity: 1
        });
    }
    displayCart();
}

function removeFromCart(product) {
    const itemIndex = cartItems.findIndex(item => item.product ===
        product);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        displayCart();
    }
}

//thêm
function displayCart() {
    const cartList = document.getElementById("cart-items").querySelector("ul");
    cartList.innerHTML = "";
    cartItems.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.product} x ${item.quantity}
        <button onclick="editCartItem('${item.product}')">Sửa</button>
        <button onclick="removeFromCart('${item.product}')">Xóa</button>`;
        cartList.appendChild(li);

    })
}
//xóa
function removeFromCart(product) {
    const itemIndex = cartItems.findIndex(item => item.product === product);
    if (itemIndex !== -1) {
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity--;
        } else {
            cartItems.splice(itemIndex, 1);
        }
        displayCart();
    }
}

//sửa
const productPrices = {
    'Thơm': 15.0,
    'Xoài': 20.0,
    'Mận': 10.0,
    'Cam':5.0,
    'Quýt':5.0,
    'Táo':25.0,
};

function addToCart(product) {
    const existingItem = cartItems.find(item => item.product === product);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({
            product,
            quantity: 1
        });
    }

    displayCart();
    updateTotalPrice();
}

function removeFromCart(product) {
    const itemIndex = cartItems.findIndex(item => item.product === product);
    if (itemIndex !== -1) {
        if (cartItems[itemIndex].quantity > 1) {
            cartItems[itemIndex].quantity--;
        } else {
            cartItems.splice(itemIndex, 1);
        }
        displayCart();
        updateTotalPrice();
    }
}

function updateTotalPrice() {
    const totalPrice = cartItems.reduce((total, item) => total + (productPrices[item.product] * item.quantity), 0);
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = `Tổng giá tiền: $${totalPrice.toFixed(2)}`;
}

function placeOrder() {
    const orderDetailsList = document.getElementById("orderDetails");
    orderDetailsList.innerHTML = "";

    let totalPrice = 0;
    cartItems.forEach(item => {
        const row = document.createElement("tr");
        const productNameCell = document.createElement("td");
        productNameCell.textContent = item.product;
        const quantityCell = document.createElement("td");
        quantityCell.textContent = item.quantity;
        const priceCell = document.createElement("td");
        const itemPrice = productPrices[item.product] * item.quantity;
        priceCell.textContent = `$${itemPrice.toFixed(2)}`;
        row.appendChild(productNameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        orderDetailsList.appendChild(row);
        totalPrice += itemPrice;
    });

    const orderSummary = document.getElementById("orderSummary");
    orderSummary.style.display = "block";
    const totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.textContent = `Tổng giá tiền: $${totalPrice.toFixed(2)}`;
}

function displayCart() {
    const cartList = document.getElementById("cart-items").querySelector("ul");
    cartList.innerHTML = "";
    cartItems.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.product} x ${item.quantity}
        <button onclick="editCartItem('${item.product}')">Sửa</button>
        <button onclick="removeFromCart('${item.product}')">Xóa</button>`;
        cartList.appendChild(li);
    })
}

function editCartItem(product) {
    const itemToEdit = cartItems.find(item => item.product === product);
    if (itemToEdit) {
        const updatedQuantity = parseInt(prompt(`Nhập số lượng mới cho ${product}:`), 10);
        if (!isNaN(updatedQuantity) && updatedQuantity >= 0) {
            itemToEdit.quantity = updatedQuantity;
            displayCart();
            updateTotalPrice();
        } else {
            alert("Số lượng không hợp lệ.");
        }
    }
}

//kiểm tra số lượng tồn kho
const inventory = {
    'Thơm': 10,
    'Xoài': 15,
    'Mận': 20,
    'Cam':5,
    'Quýt':5,
    'Táo':2,
};

function addToCart(product) {
    const existingItem = cartItems.find(item => item.product === product);
    if (inventory[product] > 0) {
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({
                product,
                quantity: 1
            });
        }
        inventory[product]--;
    } else {
        alert(`Sản phẩm ${product} đã hết hàng.`);
    }

    displayCart();
    updateTotalPrice();
}