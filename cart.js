// Simpan data keranjang di localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Format harga ke dalam Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);
}

// Render items keranjang
function renderCart() {
    const cartItems = document.querySelector('.cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Keranjang belanja Anda kosong</p>
                <button class="continue-shopping" onclick="window.location.href='index.html#products'">
                    Mulai Belanja
                </button>
            </div>
        `;
        updateSummary();
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Size: ${item.size}</p>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" 
                           onchange="updateQuantity(${index}, this.value - ${item.quantity})">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="item-actions">
                <div class="item-price">${formatPrice(item.price * item.quantity)}</div>
                <button class="remove-item" onclick="removeItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    updateSummary();
}

// Update jumlah item
function updateQuantity(index, change) {
    const newQuantity = cart[index].quantity + (typeof change === 'number' ? change : parseInt(change));
    
    if (newQuantity < 1) return;
    
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Hapus item dari keranjang
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Update ringkasan belanja
function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 50000 : 0; // Biaya pengiriman flat Rp 50.000
    const total = subtotal + shipping;

    document.getElementById('total-items').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('shipping').textContent = formatPrice(shipping);
    document.getElementById('total').textContent = formatPrice(total);
}

// Tambahkan fungsi validasi
function validateCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Keranjang belanja Anda kosong!');
        return false;
    }
    return true;
}

// Update fungsi goToCheckout
function goToCheckout() {
    if (validateCheckout()) {
        window.location.href = 'checkout.html';
    }
}

// Update event listener untuk tombol checkout
document.querySelector('.checkout-button').addEventListener('click', function(e) {
    e.preventDefault();
    goToCheckout();
});

// Initialize cart
renderCart(); 

function displayCartItems() {
    const cartContainer = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">${formatPrice(item.price)}</p>
                <p class="item-size">Size: ${item.size}</p>
                <div class="quantity-controls">
                    <button class="qty-btn minus" onclick="updateQuantity(${item.id}, ${item.size}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="qty-btn plus" onclick="updateQuantity(${item.id}, ${item.size}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.size}')">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartContainer.appendChild(cartItem);
    });
    
    updateCartTotal();
} 