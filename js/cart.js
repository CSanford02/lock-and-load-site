let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Normalize old cart data so it doesn't break totals/quantities
cart = cart.map(item => ({
  name: item.name || "Unnamed Item",
  price: Number(item.price) || 0,
  quantity: Number(item.quantity) || 1,
  notes: item.notes || ""
}));

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const counters = document.querySelectorAll("#cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  counters.forEach(counter => {
    counter.textContent = totalItems;
  });
}

function addProductToCart(button, name) {
  const card = button.closest(".product");
  if (!card) return;

  let price = 0;
  const customPriceInput = card.querySelector(".custom-price");

  if (customPriceInput) {
    price = parseFloat(customPriceInput.value);

    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price before adding this item.");
      return;
    }
  } else {
    const priceElement = card.querySelector(".price");
    if (!priceElement) {
      alert("Price could not be found for this item.");
      return;
    }
    price = parseFloat(priceElement.textContent.replace("$", ""));
  }

  const notesBox = card.querySelector(".project-notes");
  const notes = notesBox ? notesBox.value.trim() : "";

  const existing = cart.find(
    item => item.name === name && item.notes === notes && item.price === price
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
      notes
    });
  }

  saveCart();
  updateCartCount();
  displayCart();
  updateCheckoutSummary();
}

function displayCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const subtotalP = document.getElementById("cart-subtotal");
  const taxP = document.getElementById("cart-tax");
  const cartTotalP = document.getElementById("cart-total");

  if (!cartItemsDiv || !cartTotalP) return;

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalP.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <div class="cart-info">
        <span class="cart-name">${item.name}</span>
        ${item.notes ? `<p class="cart-notes"><strong>Project Notes:</strong> ${escapeHtml(item.notes)}</p>` : ""}
      </div>

      <div class="cart-qty">
        <button type="button" onclick="changeQty(${index}, -1)">−</button>
        <span>${item.quantity}</span>
        <button type="button" onclick="changeQty(${index}, 1)">+</button>
      </div>

      <span class="cart-price">$${itemTotal.toFixed(2)}</span>

      <button type="button" class="remove-btn" onclick="removeItem(${index})">Remove</button>
    `;

    cartItemsDiv.appendChild(div);
  });

  const taxRate = 0.0675;
  const tax = total * taxRate;
  const finalTotal = total + tax;

  subtotalP.textContent = `Subtotal: $${total.toFixed(2)}`;
  taxP.textContent = `Sales Tax (6.75%): $${tax.toFixed(2)}`;
  cartTotalP.textContent = `Total: $${finalTotal.toFixed(2)}`;
}

function changeQty(index, amount) {
  if (!cart[index]) return;

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  updateCartCount();
  displayCart();
  updateCheckoutSummary();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  displayCart();
  updateCheckoutSummary();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  displayCart();
  updateCheckoutSummary();
}

function buildOrderSummary() {
  if (cart.length === 0) {
    return "Cart is empty.";
  }

  let total = 0;

  const lines = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    let line = `${item.name} — Qty: ${item.quantity} — Unit Price: $${item.price.toFixed(2)} — Item Total: $${itemTotal.toFixed(2)}`;

    if (item.notes) {
      line += `\n  Project Notes: ${item.notes}`;
    }

    return line;
  });

  lines.push("");
  const taxRate = 0.0675;
  const tax = total * taxRate;
  const finalTotal = total + tax;

  lines.push(`Subtotal: $${total.toFixed(2)}`);
  lines.push(`Sales Tax (6.75%): $${tax.toFixed(2)}`);
  lines.push(`Grand Total: $${finalTotal.toFixed(2)}`);

  return lines.join("\n");
}

function updateCheckoutSummary() {
  const summaryText = buildOrderSummary();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const summaryField = document.getElementById("order-summary-field");
  const totalField = document.getElementById("order-total-field");
  const preview = document.getElementById("checkout-summary-preview");

  if (summaryField) summaryField.value = summaryText;
  if (totalField) totalField.value = `$${total.toFixed(2)}`;
  if (preview) preview.textContent = summaryText;
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();
  updateCheckoutSummary();

  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearCart);
  }

  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      if (cart.length === 0) {
        e.preventDefault();
        alert("Your cart is empty.");
        return;
      }

      updateCheckoutSummary();
    });
  }
});
