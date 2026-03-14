let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Update cart count in header
function updateCartCount(){

  const counterSpans = document.querySelectorAll("#cart-count");

  let totalItems = 0;

  cart.forEach(item=>{
    totalItems += item.quantity;
  });

  counterSpans.forEach(counter=>{
    counter.textContent = totalItems;
  });

}

// Display cart items and total on cart page
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

let imageHTML = "";

if(item.images && item.images.length > 0){

item.images.forEach(img=>{
imageHTML += `<img src="${img}" class="cart-ref">`;
});

}

let notesHTML = "";

if(item.notes){
notesHTML = `<p class="cart-notes">${item.notes}</p>`;
}

div.innerHTML = `

<div class="cart-images">
${imageHTML}
</div>

<div class="cart-info">

<span class="cart-name">${item.name}</span>

${notesHTML}

<div class="cart-qty">
<button onclick="changeQty(${index}, -1)">−</button>
<span>${item.quantity}</span>
<button onclick="changeQty(${index}, 1)">+</button>
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

// Remove a specific item from the cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// Clear the cart completely
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

function changeQty(index, amount){

  cart[index].quantity += amount;

  if(cart[index].quantity <= 0){
    cart.splice(index,1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  displayCart();
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }
});

function addCustomPrice(button, name){

const priceInput = button.parentElement.querySelector(".custom-price");

const price = parseFloat(priceInput.value);

if(isNaN(price) || price <= 0){
alert("Please enter a valid price.");
return;
}

addToCart(name, price);

priceInput.value = "";

}

function addProductToCart(button, name, basePrice){

const card = button.parentElement;

let price = basePrice;

if(price === null){

const priceInput = card.querySelector(".custom-price");

price = parseFloat(priceInput.value);

if(isNaN(price) || price <= 0){
alert("Please enter a valid price.");
return;
}

}

const notes = card.querySelector(".project-notes").value;

const fileInput = card.querySelector(".ref-image");

let images = [];

if(fileInput.files.length > 0){

let filesLoaded = 0;

for(let i=0;i<fileInput.files.length;i++){

const reader = new FileReader();

reader.onload = function(e){

images.push(e.target.result);

filesLoaded++;

if(filesLoaded === fileInput.files.length){
saveItem(name, price, notes, images);
}

};

reader.readAsDataURL(fileInput.files[i]);

}

}else{

saveItem(name, price, notes, images);

}

}
function addItemToCart(name, price, notes, images){

cart.push({
name: name,
price: price,
quantity: 1,
notes: notes,
images: images
});

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

}

function saveItem(name, price, notes, images){

cart.push({
name: name,
price: price,
quantity: 1,
notes: notes,
images: images
});

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();

}