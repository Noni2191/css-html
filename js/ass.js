
// ===============================
// 1. MOBILE NAV TOGGLE
// ===============================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ===============================
// 2. CART SIDEBAR
// ===============================
const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");
const overlay = document.getElementById("overlay");

cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
});

closeCart.addEventListener("click", closeCartUI);
overlay.addEventListener("click", closeCartUI);

function closeCartUI() {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
}

// ===============================
// 3. CART SYSTEM
// ===============================
let cart = [];

const cartContainer = document.getElementById("cart-items-container");
const cartTotal = document.getElementById("cart-total-price");
const cartCount = document.querySelector(".cart-count");

// Add to cart
function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartUI();
}

// Update UI
function updateCartUI() {
  localStorage.setItem("cart", JSON.stringify(cart)); // SAVE

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
    cartTotal.innerText = "$0.00";
    cartCount.innerText = "0";
    return;
  }

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn minus" data-id="${item.id}">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn plus" data-id="${item.id}">+</button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  cartTotal.innerText = `$${total.toFixed(2)}`;
  cartCount.innerText = count;
}

// Quantity controls
cartContainer.addEventListener("click", (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("plus")) {
    const item = cart.find(i => i.id == id);
    item.qty++;
  }

  if (e.target.classList.contains("minus")) {
    const item = cart.find(i => i.id == id);
    item.qty--;

    if (item.qty <= 0) {
      cart = cart.filter(i => i.id != id);
    }
  }

  updateCartUI();
});

// ===============================
// 4. SAMPLE MENU DATA (Replace with API later)
// ===============================
const menuData = [
  { id: 1, name: "Grilled Steak", price: 25, category: "meals", img: "https://images.unsplash.com/photo-1555992336-03a23c7b20ee" },
  { id: 2, name: "Pasta Alfredo", price: 18, category: "meals", img: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8c6f" },
  { id: 3, name: "Fresh Juice", price: 8, category: "drinks", img: "https://images.unsplash.com/photo-1542444459-db63c3c3f2f5" },
];

// ===============================
// 5. RENDER MENU
// ===============================
const menuContainer = document.getElementById("menu-container");

function renderMenu(filter = "all") {
  menuContainer.innerHTML = "";

  const filtered = filter === "all"
    ? menuData
    : menuData.filter(item => item.category === filter);

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("menu-item");

    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>$${item.price}</p>
      <button class="btn btn-primary add-btn">Add to Cart</button>
    `;

    // Add to cart click
    card.querySelector(".add-btn").addEventListener("click", () => {
      addToCart(item);
    });

    // Open modal
    card.addEventListener("click", () => openModal(item));

    menuContainer.appendChild(card);
  });
}

renderMenu();

// ===============================
// 6. FILTER TABS
// ===============================
const tabs = document.querySelectorAll(".tab-btn");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab-btn.active").classList.remove("active");
    tab.classList.add("active");

    renderMenu(tab.dataset.category);
  });
});

// ===============================
// 7. MODAL
// ===============================
const modal = document.getElementById("item-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const modalBtn = document.getElementById("modal-add-btn");
const closeModal = document.getElementById("close-modal");

function openModal(item) {
  modal.classList.add("active");

  modalImg.src = item.img;
  modalTitle.innerText = item.name;
  modalPrice.innerText = `$${item.price}`;

  modalBtn.onclick = () => addToCart(item);
}

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

// ===============================
// 8. RESERVATION FORM
// ===============================
const resForm = document.getElementById("reservation-form");
const successMsg = document.getElementById("reservation-success");

resForm.addEventListener("submit", (e) => {
  e.preventDefault();

  resForm.style.display = "none";
  successMsg.classList.remove("hidden");
});

// ===============================
// 9. CONTACT FORM
// ===============================
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("Message sent successfully!");
  contactForm.reset();
});

// ===============================
// 10. THEME TOGGLE
// ===============================
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});
const checkoutBtn = document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Cart is empty!");
    return;
  }

  showToast("Processing order...");

  setTimeout(() => {
    cart = [];
    updateCartUI();
    closeCartUI();
    showToast("Order placed successfully!");
  }, 2000);
});
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}