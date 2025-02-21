document.addEventListener('DOMContentLoaded', function() {
    // Load cart items
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    displayOrderItems(cartItems);

    // Handle form submission
    document.querySelector('.place-order-btn').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validasi form
        const form = document.getElementById('checkoutForm');
        if (form.checkValidity()) {
            // Clear cart
            localStorage.removeItem('cartItems');
            
            // Redirect ke halaman success
            window.location.href = 'order-success.html';
        } else {
            alert('Mohon lengkapi semua data pengiriman');
        }
    });
});

function displayOrderItems(items) {
    const orderItems = document.querySelector('.order-items');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    let subtotal = 0;
    const shipping = 50000; // Biaya pengiriman

    items.forEach(item => {
        subtotal += item.price;
    });

    // Update total
    const total = subtotal + shipping;
    subtotalEl.textContent = `Rp ${subtotal.toLocaleString()}`;
    totalEl.textContent = `Rp ${total.toLocaleString()}`;

    // Display items
    orderItems.innerHTML = items.map(item => `
        <div class="order-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>Rp ${item.price.toLocaleString()}</p>
            </div>
        </div>
    `).join('');
} 