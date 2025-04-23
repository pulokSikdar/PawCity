document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.products-grid');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    
    // Initialize cart and wishlist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Product database
    const products = {
        food: [
            {
                id: 1,
                name: 'PEDIGREE Grilled',
                price: '450 BDT',
                image: 'pedigree.jpg',
                category: 'Dog Food'
            },
            {
                id: 2,
                name: 'Dry pet food',
                price: '700 BDT',
                image: 'dry-food.jpg',
                category: 'Dog Food'
            },
            {
                id: 3,
                name: 'Beef, Vegeta',
                price: '380 BDT',
                image: 'beef-food.jpg',
                category: 'Dog Food'
            },
            {
                id: 4,
                name: 'Can Farmers',
                price: '545 BDT',
                image: 'can-farmers.jpg',
                category: 'Cat Food'
            }
        ],
        accessories: [
            {
                id: 5,
                name: 'Pet Collar',
                price: '150 BDT',
                image: 'collar.jpg',
                category: 'Accessories'
            }
            // Add more accessories...
        ]
        // Add more categories...
    };

    // Function to render products
    function renderProducts(category) {
        productsGrid.innerHTML = '';
        products[category].forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <div class="product-actions">
                    <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                        Add to Cart
                    </button>
                    <button onclick="addToWishlist(${product.id})" class="add-to-wishlist-btn">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
    }

    // Function to find product by ID
    function findProduct(productId) {
        for (let category in products) {
            const product = products[category].find(p => p.id === productId);
            if (product) return product;
        }
        return null;
    }

    // Add to Cart function
    window.addToCart = function(productId) {
        const product = findProduct(productId);
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Added to cart!');
            renderCart();
        }
    };

    // Add to Wishlist function
    window.addToWishlist = function(productId) {
        const product = findProduct(productId);
        if (product && !wishlist.some(item => item.id === productId)) {
            wishlist.push(product);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            alert('Added to wishlist!');
            renderWishlist();
        }
    };

    // Render Cart
    function renderCart() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <p>Your cart is empty</p>
                </div>
            `;
            cartTotal.textContent = '0 BDT';
            return;
        }

        let total = 0;
        cartItems.innerHTML = cart.map((item, index) => {
            const price = parseInt(item.price);
            total += price;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>${item.price}</p>
                        <button onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            `;
        }).join('');

        cartTotal.textContent = `${total} BDT`;
    }

    // Render Wishlist
    function renderWishlist() {
        const wishlistItems = document.getElementById('wishlistItems');
        if (!wishlistItems) return;

        if (wishlist.length === 0) {
            wishlistItems.innerHTML = '<p>Your wishlist is empty</p>';
            return;
        }

        wishlistItems.innerHTML = wishlist.map((item, index) => `
            <div class="wishlist-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                    <button onclick="moveToCart(${index})">Add to Cart</button>
                    <button onclick="removeFromWishlist(${index})">Remove</button>
                </div>
            </div>
        `).join('');
    }

    // Remove from Cart
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    // Remove from Wishlist
    window.removeFromWishlist = function(index) {
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        renderWishlist();
    };

    // Move from Wishlist to Cart
    window.moveToCart = function(index) {
        const item = wishlist[index];
        cart.push(item);
        wishlist.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        renderCart();
        renderWishlist();
    };

    // Event Listeners
    document.getElementById('cartLink').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('cartOverlay').style.display = 'flex';
        renderCart();
    });

    document.getElementById('wishlistLink').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('wishlistOverlay').style.display = 'flex';
        renderWishlist();
    });

    // Category click handlers
    document.querySelectorAll('.category-list li').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.category-list li').forEach(cat => 
                cat.classList.remove('active')
            );
            item.classList.add('active');
            renderProducts(item.dataset.category);
        });
    });

    // Initial render
    renderProducts('food');

    // Add this checkout button event listener
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            } else {
                alert('Your cart is empty!');
            }
        });
    }
});

// Add these functions to your existing shop.js
function showCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    cartOverlay.style.display = 'flex';
    renderCart();
}

function showWishlist() {
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    wishlistOverlay.style.display = 'flex';
    renderWishlist();
}

function closeCart() {
    document.getElementById('cartOverlay').style.display = 'none';
}

function closeWishlist() {
    document.getElementById('wishlistOverlay').style.display = 'none';
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <small>Add items to your cart to see them here</small>
            </div>
        `;
        cartTotal.textContent = '0 BDT';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => {
        const price = parseInt(item.price);
        total += price;
        return `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-header">
                        <h4>${item.name}</h4>
                        <span class="item-category">${item.category}</span>
                    </div>
                    <div class="item-price">${item.price}</div>
                    <div class="item-description">${item.description || ''}</div>
                    <div class="item-actions">
                        <div class="quantity-controls">
                            <button onclick="updateQuantity(${index}, -1)">-</button>
                            <span class="quantity">1</span>
                            <button onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    cartTotal.textContent = `${total} BDT`;
}

function renderWishlist() {
    const wishlistItems = document.getElementById('wishlistItems');

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <p>Your wishlist is empty</p>
                <small>Save items you like to your wishlist</small>
            </div>
        `;
        return;
    }

    wishlistItems.innerHTML = wishlist.map((item, index) => `
        <div class="wishlist-item">
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-header">
                    <h4>${item.name}</h4>
                    <span class="item-category">${item.category}</span>
                </div>
                <div class="item-price">${item.price}</div>
                <div class="item-description">${item.description || ''}</div>
                <div class="item-actions">
                    <button class="add-to-cart-btn" onclick="moveToCart(${index})">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="remove-btn" onclick="removeFromWishlist(${index})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounters();
    renderCart();
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateCounters();
    renderWishlist();
}

function moveToCart(index) {
    const item = wishlist[index];
    cart.push(item);
    wishlist.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateCounters();
    renderWishlist();
}

function updateQuantity(index, change) {
    const quantity = document.querySelectorAll('.quantity')[index];
    let newQuantity = parseInt(quantity.textContent) + change;
    if (newQuantity > 0) {
        quantity.textContent = newQuantity;
        // Update total price
        renderCart();
    }
}

function checkout() {
    proceedToCheckout();
}

// Update your cart and wishlist click handlers
document.getElementById('cartLink').onclick = (e) => {
    e.preventDefault();
    showCart();
};

document.getElementById('wishlistLink').onclick = (e) => {
    e.preventDefault();
    showWishlist();
};

// Add this function to your existing shop.js
window.proceedToCheckout = function() {
    if (cart.length > 0) {
        window.location.href = 'checkout.html';
    } else {
        alert('Your cart is empty!');
    }
}; 