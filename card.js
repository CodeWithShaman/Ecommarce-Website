let userdata = JSON.parse(localStorage.getItem('card'));
let div = document.querySelector("#container");
let icon = document.querySelector("#icon");
let iconCount = 0
 globalArray = []

fetch(`https://fakestoreapi.com/products/${userdata}`)
  .then(res => res.json())
  .then((res) => {
    
    const rating = Math.round(res.rating.rate); 
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="text-warning">&#9733;</span>'; 
        } else {
            stars += '<span class="text-secondary">&#9733;</span>'; 
        }
    }
    div.innerHTML = `<div class="row g-0 d-flex align-items-center">
      <div class="col-md-4">
        <img src="${res.image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title fw-bold fs-4 mt-2">${res.title}</h5>
        <P class="fs-6 mt-2">${res.description.slice(0,199)}</P>
        <h3 class="card-price fw-bold fs-2 mt-3">$${res.price}</h3>
        <h5 class="card-title mt-3 fw-bold fs-3">${stars}</h5>
        </div>
        <div>
          <button onclick="buyBtn(${res.id})" id="butn" class="btn mt-2 m-4">Buy Now</button>
          </div>
      </div>
    </div>`
}).catch((err)=>console.log(`Data not found`, err))


function buyBtn(id){
    Swal.fire({
        title: "Good job!",
        text: "Your order has been placed",
        icon: "success"
      });
}