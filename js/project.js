// 1. Data Object
const menuData = [
    { id: 1, title: "jollof rice", category: "meals", price: 45, desc: "Prime cut ribeye with truffle butter." },
    { id: 2, title: "shawarma", category: "starters", price: 18, desc: "Local squid with citrus aioli." }
];

// 2. Theme Toggle
const themeBtn = document.querySelector('#theme-btn');
themeBtn.onclick = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
};

// 3. Dynamic Menu Filtering
function displayMenu(items) {
    const grid = document.querySelector('.menu-grid');
    grid.innerHTML = items.map(item => `
        <div class="menu-item">
            <h3>#1000{item.title} - #2000{item.price}</h3>
            <p>#{item.desc}</p>
            <button onclick="addToOrder(${item.id})">Add to Order</button>
        </div>
    `).join('');
}

// 4. Cart Logic
let cart = [];
function addToOrder(id) {
    const item = menuData.find(p => p.id === id);
    cart.push(item);
    document.querySelector('.cart-sidebar').classList.add('open');
    document.querySelector('.cart-overlay').classList.add('active');
    updateCartUI();
}

function updateCartUI() {
    const container = document.querySelector('.cart-items');
    container.innerHTML = cart.map(i => `<p>${i.title} - $${i.price}</p>`).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.querySelector('.cart-total').innerText = `$${total.toFixed(2)}`;
}

// Navbar Scroll Effect
window.onscroll = () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
};

// Initial Load
window.onload = () => displayMenu(menuData);
const checkoutBtn = document.querySelector(".checkout-btn");
const modal = document.querySelector(".checkout-modal");
const summary = document.querySelector(".checkout-summary");
const confirmBtn = document.querySelector(".confirm-order");
const closeCheckout = document.querySelector(".close-checkout");

// OPEN MODAL
checkoutBtn.onclick = () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    summary.textContent = `Total: $${totalPrice.toFixed(2)}`;
    modal.classList.add("active");
};

// CLOSE MODAL
closeCheckout.onclick = () => {
    modal.classList.remove("active");
};

// CONFIRM ORDER
confirmBtn.onclick = () => {
    alert("Order placed successfully! 🎉");

    cart = [];
    updateCart();

    modal.classList.remove("active");
    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");
};