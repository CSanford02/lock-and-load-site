const categories = [
{
category: "Deep Engraving",
items: [
{ name: "Handgun Slide", price: 249.99, image: "images/handgun-slide2.jpg", desc: "Standard 7x5 engraving area" },
{ name: "Handgun Lower (Full)", price: 249.99, image: "images/handgun-lower.jpg", desc: "Price adjustable depending on work" },
{ name: "Handgun Small Parts", price: 79.99, image: "images/handgun-parts.jpg", desc: "Trigger, safety, grip safety, hammer, slide release" },
{ name: "Handgun Magazine", price: 29.99, image: "images/handgun-mag.jpg", desc: "Magazine engraving" },
{ name: "AR-15 Upper Receiver", price: 149.99, image: "images/ar-upper.jpg", desc: "Deep engraved upper receiver (Prices vary based on complexity)" },
{ name: "AR-15 Lower Receiver", price: 149.99, image: "images/ar-lower.jpg", desc: "Deep engraved lower receiver (Prices vary based on complexity)" },
{ name: "AR-15 Handguard / Forend", price: 129.99, image: "images/ar-handguard.jpg", desc: "6x4 engraving area (price adjustable)" },
{ name: "AR-15 Pistol Grip", price: 29.99, image: "images/ar-grip.jpg", desc: "Grip engraving" },
{ name: "AR-15 Small Parts", price: 59.99, image: "images/ar-small.jpg", desc: "Trigger, safety, magazine release" },
{ name: "Lever Action Rifle Receiver + Lever", price: 249.99, image: "images/lever-rifle.jpg", desc: "Receiver and lever combo engraving" },
{ name: "Shotgun Receiver", price: 249.99, image: "images/shotgun.jpg", desc: "Deep receiver engraving" },
{ name: "Revolver Receiver", price: 199.99, image: "images/revolver-receiver.jpg", desc: "Receiver engraving" },
{ name: "Revolver Cylinder", price: 79.99, image: "images/revolver-cylinder.jpg", desc: "Cylinder engraving" },
{ name: "Revolver Small Parts", price: 79.99, image: "images/revolver-parts.jpg", desc: "Small parts engraving" }
]
},
{
category: "Polishing",
items: [
{ name: "Professional Polishing", price: 374.99, image: "images/polish.jpg", desc: "7x5 area. Price varies depending on size and finish quality." }
]
},
{
category: "Porting",
items: [
{ name: "Laser Slide and Barrel Porting", price: 179.99, image: "images/slide-port.jpg", desc: "Slide and barrel porting. Price adjustable depending on design." },
{ name: "Barrel Port", price: 79.99, image: "images/barrel-port.jpg", desc: "Barrel only porting." }
]
},
{
category: "Cerakote",
items: [
{ name: "Handgun Slide + Lower", price: 199.99, image: "images/cerakote-handgun.jpg", desc: "1 color Cerakote finish" },
{ name: "Rifle Lower + Upper", price: 269.99, image: "images/cerakote-rifle.jpg", desc: "1 color Cerakote finish" },
{ name: "Complete Rifle", price: 299.99, image: "images/cerakote-complete.jpg", desc: "1 color Cerakote finish" }
]
},
{
category: "Nickel / Gold Plating",
items: [
{ name: "Nickel or Gold Plating", price: null, image: "images/plating.jpg", desc: "Enter a custom quote price." }
]
}
];

const container = document.getElementById("product-list");

categories.forEach(section => {

const title = document.createElement("h2");
title.textContent = section.category;
container.appendChild(title);

const grid = document.createElement("div");
grid.className = "grid";

section.items.forEach(product => {

const card = document.createElement("div");
card.className = "product";

let priceSection = "";

if(product.price !== null){

priceSection = `<p class="price">$${product.price.toFixed(2)}</p>`;

}else{

priceSection = `<input type="number" class="custom-price" placeholder="Enter Price">`;

}

card.innerHTML = `
<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>${product.desc}</p>

${priceSection}

<div class="product-options">

<button class="notes-toggle" onclick="toggleNotes(this)">
Project Notes
</button>

<label class="upload-btn">
Reference Image
<input type="file" class="ref-image" accept="image/*" multiple hidden>
</label>

</div>

<textarea class="project-notes" style="display:none;" placeholder="Project notes (optional)"></textarea>

<button class="add-cart" onclick="addProductToCart(this,'${product.name}')">
Add to Cart
</button>
`;

grid.appendChild(card);

});

container.appendChild(grid);

});

function toggleNotes(button){

const card = button.closest(".product");
const notesBox = card.querySelector(".project-notes");

if(notesBox.style.display === "none" || notesBox.style.display === ""){
notesBox.style.display = "block";
}else{
notesBox.style.display = "none";
}

}

function addProductToCart(button,name){

const card = button.closest(".product");

let price = 0;

const customPrice = card.querySelector(".custom-price");

if(customPrice){
price = parseFloat(customPrice.value);

if(isNaN(price)){
alert("Please enter a price before adding to cart.");
return;
}

}else{
const priceElement = card.querySelector(".price");
price = parseFloat(priceElement.textContent.replace("$",""));
}

const notesBox = card.querySelector(".project-notes");
const notes = notesBox ? notesBox.value : "";

const item = {
name: name,
price: price,
quantity: 1,
notes: notes
};

cart.push(item);

saveCart();
updateCartCount();

alert("Added to cart");

}

// IMAGE MODAL ZOOM

document.addEventListener("DOMContentLoaded", function(){

const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close-modal");

// open modal when product image clicked
document.addEventListener("click", function(e){

if(e.target.tagName === "IMG" && e.target.closest(".product")){

modal.style.display = "block";
modalImg.src = e.target.src;

}

});

// close modal with X
closeBtn.addEventListener("click", function(){

modal.style.display = "none";

});

// close modal when clicking outside image
modal.addEventListener("click", function(e){

if(e.target === modal){
modal.style.display = "none";
}

});

});
