let div = document.querySelector("#container");
let icon = document.querySelector("#icon");
let iconCount = 0
 globalArray = []
fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then((res)=>{
                res.map((item)=>{
                    div.innerHTML+=`<div class="card" style="width: 18rem; ">
        <img  src="${item.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${item.title.slice(0,20)}</h5>
          <h5 class="card-price  mt-3">${item.price}$</h5>
          <ul class="list-group list-group-flush">
          <li class="list-group-item fw-bold fs-5">${item.category}</li>
        </ul>
        <div>
        <button id="butn" class="btn mt-3 m-2" onclick="seeBtn(${item.id})">See More</button>
        <button id="btn" class="btn mt-3 m-2" onclick="addBtn(${item.id})">Add To Cart</button>
        </div>
        </div>
        
        
    </div>`
  })
}).catch((err) => {
  console.log('Error:', err);
});



function seeBtn(id){
var data = JSON.stringify(id)
localStorage.setItem(`card` ,data)
console.log(data);
window.location = `card.html`
}

function addBtn(id){
  if (globalArray.includes(id)) {
    Swal.fire({
      text: "Already in the cart!",
      icon: "success"
    }); 
    return; 
  }

  iconCount++; 
  globalArray.push(id);
  console.log("Items in Cart:", globalArray);
  icon.innerHTML = `
    <a class="nav-link" href="#" id="icon">
      <i class="fa-solid fa-truck"></i> <span>${iconCount}</span>
    </a>
  `;

  console.log(`Item added to cart: ${id}`);

  Swal.fire({
    title: "Good job!",
    text: "Item added to the cart!",
    icon: "success"
  }); 
}

function checkout(id) {
  localStorage.setItem('cartItem', JSON.stringify(globalArray)); 
  window.location = 'cart.html'; 
}