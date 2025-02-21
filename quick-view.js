document.addEventListener('DOMContentLoaded', function() {
    // Ambil ID produk dari URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        loadProductDetails(productId);
    }

    // Setup quantity controls
    setupQuantityControls();
    
    // Setup size selection
    setupSizeSelection();
    
    // Setup thumbnail gallery
    setupThumbnailGallery();
});

function loadProductDetails(productId) {
    const product = products[productId];
    if (!product) return;

    // Update product details
    document.getElementById('productImage').src = product.image;
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = formatPrice(product.price);
    document.getElementById('productDescription').textContent = product.description;

    // Setup thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.src = product.image; // In real case, you would have multiple images
    });

    // Setup Add to Cart button
    document.getElementById('addToCartBtn').onclick = () => {
        const quantity = parseInt(document.querySelector('.qty-input').value);
        const selectedSize = document.querySelector('.size-btn.active')?.textContent || 'M';
        addToCart(product.id, product.name, product.price, product.image, quantity, selectedSize);
    };
}

function setupQuantityControls() {
    const qtyInput = document.querySelector('.qty-input');
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');

    minusBtn.onclick = () => {
        let value = parseInt(qtyInput.value);
        if (value > 1) qtyInput.value = value - 1;
    };

    plusBtn.onclick = () => {
        let value = parseInt(qtyInput.value);
        qtyInput.value = value + 1;
    };
}

function setupSizeSelection() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.onclick = () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });
}

function setupThumbnailGallery() {
    const mainImage = document.getElementById('productImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumb => {
        thumb.onclick = () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImage.src = thumb.src;
        };
    });
}

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);
} 