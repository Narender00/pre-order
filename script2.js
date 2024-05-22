document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-button');
    const cartPopup = document.querySelector('.cart-popup');
    const itemCountSpan = document.getElementById('item-count');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    updateCartCount();

    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            const menuItem = parent.parentElement;
            const itemName = menuItem.dataset.name;
            const itemPrice = parseFloat(menuItem.dataset.price);

            button.style.display = 'none';

            const quantityControl = document.createElement('div');
            quantityControl.classList.add('quantity-control');

            const minusButton = document.createElement('span');
            minusButton.textContent = '−';
            quantityControl.appendChild(minusButton);

            const quantity = document.createElement('span');
            quantity.textContent = '1';
            quantityControl.appendChild(quantity);

            const plusButton = document.createElement('span');
            plusButton.textContent = '+';
            quantityControl.appendChild(plusButton);

            parent.appendChild(quantityControl);

            addToCart(itemName, itemPrice);

            minusButton.addEventListener('click', () => {
                let count = parseInt(quantity.textContent, 10);
                if (count > 1) {
                    count--;
                    quantity.textContent = count;
                    updateCartItem(itemName, count);
                } else {
                    parent.removeChild(quantityControl);
                    button.style.display = 'block';
                    removeFromCart(itemName);
                }
                updateCartCount();
            });

            plusButton.addEventListener('click', () => {
                let count = parseInt(quantity.textContent, 10);
                count++;
                quantity.textContent = count;
                updateCartItem(itemName, count);
                updateCartCount();
            });
        });
    });

    function updateCartCount() {
        itemCountSpan.textContent = cart.length;
        cartPopup.style.display = cart.length > 0 ? 'block' : 'none';
    }

    function addToCart(name, price) {
        cart.push({ name, price, quantity: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartItem(name, quantity) {
        cart = cart.map(item => item.name === name ? { ...item, quantity } : item);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});

function goToCartPage() {
    window.location.href = 'cart.html';
}
