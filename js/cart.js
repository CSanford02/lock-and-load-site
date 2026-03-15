let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in header
function updateCartCount(){

  const counters = document.querySelectorAll("#cart-count");

  let total = 0;

  cart.forEach(item=>{
    total += item.quantity;
  });

  counters.forEach(counter=>{
    counter.textContent = total;
  });

}

// Save cart
function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addProductToCart(button, name){

  const card = button.closest(".product");

  let price = 0;

  const customPrice = card.querySelector(".custom-price");

  if(customPrice){
    price = parseFloat(customPrice.value);

    if(isNaN(price)){
      alert("Please enter a price.");
      return;
    }

  }else{

    const priceText = card.querySelector(".price").textContent;
    price = parseFloat(priceText.replace("$",""));

  }

  const notesBox = card.querySelector(".project-notes");
  const notes = notesBox ? notesBox.value : "";

  const existing = cart.find(item => item.name === name && item.notes === notes);

  if(existing){
    existing.quantity += 1;
  }else{
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      notes: notes
    });
  }

  saveCart();
  updateCartCount();

  alert("Added to cart");

}

// Display cart
function displayCart(){

  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalP = document.getElementById("cart-total");

  if(!cartItemsDiv || !cartTotalP) return;

  cartItemsDiv.innerHTML = "";

  if(cart.length === 0){
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalP.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((item,index)=>{

    const div = document.createElement("div");
    div.className = "cart-item";

    const itemTotal = item.price * item.quantity;

    div.innerHTML = `

    <div class="cart-info">

    <span class="cart-name">${item.name}</span>

    ${item.notes ? `<p class="cart-notes">${item.notes}</p>` : ""}

    <div class="cart-qty">
      <button onclick="changeQty(${index},-1)">−</button>
      <span>${item.quantity}</span>
      <button onclick="changeQty(${index},1)">+</button>
    </div>

    <span class="cart-price">$${itemTotal.toFixed(2)}</span>

    <button onclick="removeItem(${index})">Remove</button>

    </div>
    `;

    cartItemsDiv.appendChild(div);

    total += itemTotal;

  });

  cartTotalP.textContent = `Total: $${total.toFixed(2)}`;

}

function removeItem(index){

  cart.splice(index,1);

  saveCart();

  updateCartCount();

  displayCart();

}

function changeQty(index, amount){

  cart[index].quantity += amount;

  if(cart[index].quantity <= 0){
    cart.splice(index,1);
  }

  saveCart();

  updateCartCount();

  displayCart();

}

function clearCart(){

  cart = [];

  saveCart();

  updateCartCount();

  displayCart();

}

document.addEventListener("DOMContentLoaded", ()=>{

  updateCartCount();

  displayCart();

  const clearBtn = document.getElementById("clear-cart");

  if(clearBtn){
    clearBtn.addEventListener("click", clearCart);
  }

});
