// Simulating a simple database with products and user data
const products = [
    { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop.' },
    { id: 2, name: 'Smartphone', price: 599.99, description: 'Latest model smartphone.' },
    { id: 3, name: 'Headphones', price: 199.99, description: 'Noise-cancelling headphones.' },
];

const users = [
    { username: 'user1', password: 'password1' },
];

const admins = [
    { username: 'admin', password: 'adminpass' },
];

// Display products on the product page
function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="addToFavorites(${product.id})">Add to Favorites</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Handle user login
document.getElementById('login-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Login successful');
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'product.html'; // Redirect to product page
    } else {
        alert('Invalid credentials');
    }
});

// Handle admin login
document.getElementById('admin-login-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    const admin = admins.find(a => a.username === username && a.password === password);
    if (admin) {
        alert('Admin login successful');
        localStorage.setItem('loggedInAdmin', username);
        window.location.href = 'admin-dashboard.html'; // Redirect to admin dashboard
    } else {
        alert('Invalid credentials');
    }
});

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to your cart`);
}

function addToFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Product added to favorites');
}

// Display products when the page is loaded
if (document.getElementById('product-list')) {
    displayProducts();
}
