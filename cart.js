let div = document.querySelector('#container');

let globalArray = [];
let cartItems = JSON.parse(localStorage.getItem('cartItem')) || [];

console.log(cartItems);
 cartItems.forEach((itemId) => {
    fetch(`https://fakestoreapi.com/products/${itemId}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        res.quantity = 1; 
        globalArray.push(res); 
        renderCartItem(); 
      })
      .catch((err) => {
        console.error(`Error fetching product with ID ${itemId}:`, err);
      });
  });


  function renderCartItem(){
    div.innerHTML = "";  // Clear the cart content
    globalArray.map((item, index) => {
        div.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${item.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <h3 class="card-price mt-2 fw-bold fs-3">$${(item.price * item.quantity).toFixed(2)}</h3>
                <div>
                    <p class="fs-5 fw-bold mt-5 text-center">QUANTITY:
                        <button class="btn btn-primary" onclick="decBtn(${index})">-</button>
                        ${item.quantity}
                        <button class="btn btn-primary" onclick="incBtn(${index})">+</button>
                    </p>
                </div>
            </div>
        </div>
        `;
    });
}

// Increment quantity
function incBtn(index) {
    globalArray[index].quantity += 1;  // Increase quantity by 1
    renderCartItem();  // Re-render cart
    updateLocalStorage();  // Update local storage with new cart items
}

// Decrement quantity
function decBtn(index) {
    if (globalArray[index].quantity <= 1) {
        globalArray.splice(index, 1);  // Remove item from cart if quantity is 1
    } else {
        globalArray[index].quantity -= 1;  // Decrease quantity by 1
    }
    renderCartItem();  // Re-render cart
    updateLocalStorage();  // Update local storage with new cart items
}

// Update local storage with the latest cart items
function updateLocalStorage() {
    const updatedCartItems = globalArray.map((item) => item.id);  // Get item IDs from globalArray
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));  // Store updated cart items
}

// If no cart items are present, display a message
if (globalArray.length === 0) {
    div.innerHTML = "<p>No items in your cart.</p>";
}
