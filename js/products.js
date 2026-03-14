const categories = [
{
category: "Deep Engraving",
items: [
{ name: "Handgun Slide", price: 249.99, image: "images/handgun-slide.jpg", desc: "Standard 7x5 engraving area" },
{ name: "Handgun Lower (Full)", price: 249.99, image: "images/handgun-lower.jpg", desc: "Price adjustable depending on work" },
{ name: "Handgun Small Parts", price: 79.99, image: "images/handgun-parts.jpg", desc: "Trigger, safety, grip safety, hammer, slide release" },
{ name: "Handgun Magazine", price: 29.99, image: "images/handgun-mag.jpg", desc: "Magazine engraving" },
{ name: "AR-15 Upper Receiver", price: 249.99, image: "images/ar-upper.jpg", desc: "Deep engraved upper receiver" },
{ name: "AR-15 Lower Receiver", price: 249.99, image: "images/ar-lower.jpg", desc: "Deep engraved lower receiver" },
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

priceSection = `<p class="price">$${product.price}</p>`;

}else{

priceSection = `<input type="number" class="custom-price" placeholder="Enter Price">`;

}

card.innerHTML = `
<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>${product.desc}</p>

${priceSection}

<button class="notes-toggle" onclick="toggleNotes(this)">
Add Project Notes
</button>

<textarea class="project-notes" style="display:none;" placeholder="Project notes (optional)"></textarea>

<input type="file" class="ref-image" accept="image/*" multiple>

<button onclick="addProductToCart(this,'${product.name}',${product.price})">
Add to Cart
</button>
`;

grid.appendChild(card);

});

container.appendChild(grid);

});

function toggleNotes(button){

  const notesBox = button.nextElementSibling;

  if(notesBox.style.display === "none"){
    notesBox.style.display = "block";
    button.textContent = "Hide Project Notes";
  } else {
    notesBox.style.display = "none";
    button.textContent = "Add Project Notes";
  }

}
