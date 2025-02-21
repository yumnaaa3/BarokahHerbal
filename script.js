// Inisialisasi AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animasi untuk tombol beli
const buyButtons = document.querySelectorAll('.buy-button');
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            alert('Produk ditambahkan ke keranjang!');
        }, 100);
    });
});

// Efek parallax untuk hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('#home');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Tambahkan efek parallax yang lebih smooth
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Animasi untuk product cards
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.product-overlay').style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.product-overlay').style.opacity = '0';
    });
});

// Smooth scroll dengan easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Animasi loading
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Update AOS settings
AOS.init({
    duration: 1200,
    once: false,
    mirror: true,
    offset: 120
});

// Tambahkan fungsi untuk update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Update fungsi addToCart
function addToCart(productId, name, price, image, quantity = 1, size) {
    // Gunakan nilai default untuk price jika harganya xxx
    const actualPrice = price || 0; // Anda bisa mengatur harga default di sini
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId && item.size === size);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: name,
            price: actualPrice,
            image: image,
            quantity: quantity,
            size: size
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Tampilkan pesan sukses
    showSuccessMessage('Produk berhasil ditambahkan ke keranjang!');
}

// Panggil updateCartCount saat halaman dimuat
document.addEventListener('DOMContentLoaded', updateCartCount);

// Data produk lengkap
const products = {
    1: {
        name: "Madu Sehat Lambung An Nasr",
        category: "Madu Herbal",
        price: "Rp xxx",
        image: "img/lambung.jpeg",
        description: "Madu Sehat Lambung An Nasr adalah produk herbal berkualitas yang dirancang khusus untuk menjaga kesehatan lambung. Terbuat dari madu pilihan yang dikombinasikan dengan bahan-bahan herbal alami.",
        sizes: ["250g"]
    },
    2: {
        name: "Zalfira Dates Honey",
        category: "Madu Herbal",
        price: "Rp xxx",
        image: "img/zalfira.jpeg",
        description: "Zalfira Dates Honey merupakan kombinasi sempurna antara madu murni dan kurma pilihan. Memiliki rasa yang lezat dan kaya akan manfaat untuk kesehatan.",
        sizes: ["150g"]
    },
    3: {
        name: "Madu Batuk An Nars",
        category: "Madu Batuk",
        price: "Rp xxx",
        image: "img/madubatuk.jpeg",
        description: "Madu Batuk An Nars adalah solusi alami untuk meredakan batuk dan menjaga kesehatan tenggorokan. Dibuat dari madu berkualitas dengan tambahan bahan herbal pilihan.",
        sizes: ["175g"]
    },
    4: {
        name: "Habbatussauda Hulbah 4 in 1",
        category: "Habbatussauda",
        price: "Rp xxx",
        image: "img/hulbah60.jpeg",
        description: "Kombinasi sempurna dari Habbatussauda dan Hulbah dalam bentuk kapsul. Memiliki berbagai manfaat untuk meningkatkan sistem kekebalan tubuh.",
        sizes: ["60 kapsul"]
    },
    5: {
        name: "Habbatussauda Hulbah 4 in 1",
        category: "Habbatussauda",
        price: "Rp xxx",
        image: "img/hulbah100.jpeg",
        description: "Habbatussauda Hulbah 4 in 1 kemasan 100 kapsul. Kombinasi sempurna untuk meningkatkan imunitas dan stamina tubuh.",
        sizes: ["100 kapsul"]
    },
    6: {
        name: "Habbatussauda Hulbah 4 in 1",
        category: "Habbatussauda",
        price: "Rp xxx",
        image: "img/hulbah200.jpeg",
        description: "Habbatussauda Hulbah 4 in 1 kemasan ekonomis 200 kapsul. Solusi lengkap untuk kesehatan Anda.",
        sizes: ["200 kapsul"]
    },
    7: {
        name: "Habbatussauda SPR",
        category: "Habbatussauda",
        price: "Rp xxx",
        image: "img/spr60.jpeg",
        description: "Habbatussauda SPR kemasan 60 kapsul. Diperkaya dengan bahan-bahan herbal pilihan untuk hasil yang maksimal.",
        sizes: ["60 kapsul"]
    },
    8: {
        name: "Habbatussauda SPR",
        category: "Habbatussauda",
        price: "Rp xxx",
        image: "img/spr120.jpeg",
        description: "Habbatussauda SPR kemasan 120 kapsul. Kualitas premium untuk kesehatan optimal.",
        sizes: ["120 kapsul"]
    },
    9: {
        name: "Habbatussauda SPR",
        category: "Habbatussauda",
        price: "Rp xxx",
        image: "img/spr200.jpeg",
        description: "Habbatussauda SPR kemasan hemat 200 kapsul. Solusi herbal terpercaya untuk keluarga.",
        sizes: ["200 kapsul"]
    },
    10: {
        name: "Madu Mazalt Gold",
        category: "Madu Herbal",
        price: "Rp xxx",
        image: "img/mazalt.jpeg",
        description: "Madu Mazalt Gold dengan kualitas premium. Madu murni yang diperkaya dengan bahan herbal pilihan.",
        sizes: ["150g"]
    },
    11: {
        name: "Madu Kurma Ajaban Gold",
        category: "Madu Kurma",
        price: "Rp xxx",
        image: "img/ajaban.jpeg",
        description: "Madu Kurma Ajaban Gold, perpaduan madu berkualitas dengan sari kurma pilihan. Memberikan energi dan nutrisi optimal.",
        sizes: ["150g"]
    },
    12: {
        name: "Sari Kurma Al Sabira",
        category: "Sari Kurma",
        price: "Rp xxx",
        image: "img/alsabira.jpeg",
        description: "Sari Kurma Al Sabira, terbuat dari kurma pilihan dengan proses ekstraksi modern. Kaya akan nutrisi dan energi alami.",
        sizes: ["330g"]
    }
};

// Handle Quick View
document.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        const product = products[productId];
        
        // Update modal content
        document.getElementById('modalImage').src = product.image;
        document.getElementById('modalCategory').textContent = product.category;
        document.getElementById('modalName').textContent = product.name;
        document.getElementById('modalPrice').textContent = product.price;
        document.getElementById('modalDescription').textContent = product.description;
        
        // Update size options
        const sizeOptions = document.getElementById('modalSizeOptions');
        sizeOptions.innerHTML = product.sizes.map(size => 
            `<button class="size-btn">${size}</button>`
        ).join('');
        
        // Update add to cart button
        const addToCartBtn = document.getElementById('modalAddToCart');
        addToCartBtn.onclick = () => addToCart(
            productId,
            product.name,
            parseInt(product.price.replace(/\D/g, '')),
            product.image
        );
        
        // Show modal
        document.getElementById('quickViewModal').style.display = 'block';
    });
});

// Close modal
document.querySelector('.close-modal').onclick = function() {
    document.getElementById('quickViewModal').style.display = 'none';
};

// Menu Toggle Function
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });
});

// Game variables (single declaration)
let score = 0;
let timeLeft = 30;
let level = 1;
let combo = 0;
let isPlaying = false;
let isFreeze = false;
let isSlow = false;
let gameInterval;
let obstacleInterval;
let powerUps = {
    freeze: true,
    slow: true,
    double: false
};

// Get DOM elements
const startGame = document.getElementById('startGame');
const jacket = document.getElementById('jacket');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const gameResult = document.getElementById('gameResult');

// Initialize game elements
document.addEventListener('DOMContentLoaded', () => {
    if (startGame && jacket && scoreDisplay && timeDisplay && gameResult) {
        // Add event listeners for power-up buttons
        const freezeBtn = document.querySelector('.freeze-btn');
        const slowBtn = document.querySelector('.slow-btn');
        
        freezeBtn.addEventListener('click', () => {
            activateFreeze();
        });
        
        slowBtn.addEventListener('click', () => {
            activateSlow();
        });

        // Set initial jacket properties
        jacket.style.position = 'absolute';
        jacket.style.width = '50px';
        jacket.style.height = '50px';
        jacket.style.cursor = 'pointer';
        jacket.style.zIndex = '1000';
        
        // Add click event for jacket
        jacket.addEventListener('click', () => {
            if (isPlaying) {
                combo++;
                let points = 1;
                
                if (combo > 2) points *= 2;
                if (powerUps.double) points *= 2;
                
                score += points;
                scoreDisplay.textContent = score;
                document.getElementById('combo').textContent = combo;
                
                // Visual effects
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = jacket.style.left;
                sparkle.style.top = jacket.style.top;
                document.querySelector('.game-area').appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
                
                scoreDisplay.style.animation = 'scorePopup 0.5s ease';
                setTimeout(() => {
                    scoreDisplay.style.animation = '';
                }, 500);
                
                updateLevel();
                moveJacket();
                
                // Reset combo if not clicked within 1 second
                clearTimeout(window.comboTimeout);
                window.comboTimeout = setTimeout(() => {
                    combo = 0;
                    document.getElementById('combo').textContent = combo;
                }, 1000);
            }
        });

        // Add click event for start button
        startGame.addEventListener('click', () => {
            // Reset game state
            score = 0;
            timeLeft = 30;
            level = 1;
            combo = 0;
            
            // Reset displays
            scoreDisplay.textContent = score;
            timeDisplay.textContent = timeLeft;
            document.getElementById('level').textContent = level;
            document.getElementById('combo').textContent = combo;
            gameResult.textContent = '';
            
            // Reset power-ups
            resetPowerUps();
            
            // Clear existing obstacles
            document.querySelector('.obstacles').innerHTML = '';
            
            // Start game
            isPlaying = true;
            startGame.disabled = true;
            startGame.textContent = 'Bermain...';
            
            // Initialize game mechanics
            moveJacket();
            gameInterval = setInterval(updateTime, 1000);
            obstacleInterval = setInterval(addObstacle, 3000);
        });
    }
});

// Power-up functions
function activateFreeze() {
    if (!isPlaying || !powerUps.freeze) return;
    
    // Visual feedback
    const freezeBtn = document.querySelector('.freeze-btn');
    freezeBtn.disabled = true;
    freezeBtn.style.opacity = '0.5';
    freezeBtn.classList.add('active');
    
    // Efek freeze
    isFreeze = true;
    powerUps.freeze = false;
    
    // Stop timer
    clearInterval(gameInterval);
    
    // Visual effect pada game area
    const gameArea = document.querySelector('.game-area');
    gameArea.style.filter = 'brightness(1.2) saturate(0.8)';
    
    // Freeze effect animation
    const freezeEffect = document.createElement('div');
    freezeEffect.className = 'freeze-effect';
    gameArea.appendChild(freezeEffect);
    
    // Unfreeze after 5 seconds
    setTimeout(() => {
        if (isPlaying) {
            gameInterval = setInterval(updateTime, 1000);
            isFreeze = false;
            gameArea.style.filter = '';
            freezeEffect.remove();
            freezeBtn.classList.remove('active');
        }
    }, 5000);
}

function activateSlow() {
    if (!isPlaying || !powerUps.slow) return;
    
    // Visual feedback
    const slowBtn = document.querySelector('.slow-btn');
    slowBtn.disabled = true;
    slowBtn.style.opacity = '0.5';
    slowBtn.classList.add('active');
    
    // Efek slow
    isSlow = true;
    powerUps.slow = false;
    
    // Slow down jacket movement
    jacket.style.transition = 'all 0.5s ease';
    
    // Visual effect pada game area
    const gameArea = document.querySelector('.game-area');
    gameArea.style.filter = 'sepia(0.3)';
    
    // Slow effect animation
    const slowEffect = document.createElement('div');
    slowEffect.className = 'slow-effect';
    gameArea.appendChild(slowEffect);
    
    // Return to normal after 5 seconds
    setTimeout(() => {
        jacket.style.transition = 'all 0.1s ease';
        isSlow = false;
        gameArea.style.filter = '';
        slowEffect.remove();
        slowBtn.classList.remove('active');
    }, 5000);
}

// Reset power-ups when starting new game
function resetPowerUps() {
    const freezeBtn = document.querySelector('.freeze-btn');
    const slowBtn = document.querySelector('.slow-btn');
    
    freezeBtn.disabled = false;
    slowBtn.disabled = false;
    freezeBtn.style.opacity = '1';
    slowBtn.style.opacity = '1';
    freezeBtn.classList.remove('active');
    slowBtn.classList.remove('active');
    
    powerUps = {
        freeze: true,
        slow: true,
        double: false
    };
}

// Add obstacles
function addObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    const size = Math.random() * 50 + 20;
    obstacle.style.width = size + 'px';
    obstacle.style.height = size + 'px';
    
    const gameArea = document.querySelector('.game-area');
    const maxX = gameArea.offsetWidth - size;
    const maxY = gameArea.offsetHeight - size;
    
    obstacle.style.left = Math.random() * maxX + 'px';
    obstacle.style.top = Math.random() * maxY + 'px';
    
    document.querySelector('.obstacles').appendChild(obstacle);
    
    setTimeout(() => obstacle.remove(), 3000);
}

// Update move jacket function
function moveJacket() {
    const gameArea = document.querySelector('.game-area');
    const maxX = gameArea.clientWidth - 50; // 50 adalah lebar jacket
    const maxY = gameArea.clientHeight - 50; // 50 adalah tinggi jacket
    
    // Pastikan jaket terlihat
    jacket.style.display = 'block';
    jacket.style.opacity = '1';
    
    let newX, newY;
    // Posisi random yang lebih sederhana
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
    
    // Set posisi langsung
        jacket.style.left = newX + 'px';
        jacket.style.top = newY + 'px';
    jacket.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
}

// Update game logic
function updateLevel() {
    if (score > 0 && score % 5 === 0) {
        level++;
        document.getElementById('level').textContent = level;
        
        // Show level up animation
        const levelUp = document.createElement('div');
        levelUp.className = 'level-up';
        levelUp.textContent = 'Level Up!';
        document.querySelector('.game-area').appendChild(levelUp);
        
        setTimeout(() => levelUp.remove(), 1000);
        
        // Make game harder
        if (obstacleInterval) clearInterval(obstacleInterval);
        obstacleInterval = setInterval(addObstacle, 3000 / level);
    }
}

// Update time function
function updateTime() {
    timeDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
        endGame();
    }
    timeLeft--;
}

// End game function
function endGame() {
    clearInterval(gameInterval);
    if (obstacleInterval) clearInterval(obstacleInterval);
    isPlaying = false;
    startGame.textContent = 'Main Lagi';
    startGame.disabled = false;
    
    // Tampilkan hasil dan hadiah
    let message = '';
    if (score >= 15) {
        message = '🎉 Selamat! Anda mendapat diskon 25%! Kode: JACKET25';
    } else if (score >= 10) {
        message = '🎉 Anda mendapat diskon 15%! Kode: JACKET15';
    } else if (score >= 5) {
        message = '🎉 Anda mendapat diskon 10%! Kode: JACKET10';
    } else {
        message = 'Coba lagi untuk mendapatkan diskon!';
    }
    gameResult.textContent = message;
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') activateFreeze();
    if (e.key === 's' || e.key === 'S') activateSlow();
});

// Add sparkle effect style
const style = document.createElement('style');
style.textContent = `
    .sparkle {
        position: absolute;
        width: 50px;
        height: 50px;
        pointer-events: none;
        background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
        animation: sparkleAnim 1s ease-out forwards;
    }

    @keyframes sparkleAnim {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 