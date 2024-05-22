document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountSpan = document.getElementById('total-amount');
    const payButton = document.getElementById('pay-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');

            const itemInfoDiv = document.createElement('div');
            itemInfoDiv.classList.add('item-info');

            const itemName = document.createElement('h3');
            itemName.textContent = item.name;
            itemInfoDiv.appendChild(itemName);

            const itemPrice = document.createElement('p');
            itemPrice.classList.add('price');
            itemPrice.textContent = `₹${item.price * item.quantity}`;
            itemInfoDiv.appendChild(itemPrice);

            itemDiv.appendChild(itemInfoDiv);

            const itemActionDiv = document.createElement('div');
            itemActionDiv.classList.add('item-action');

            const quantityControl = document.createElement('div');
            quantityControl.classList.add('quantity-control');

            const minusButton = document.createElement('span');
            minusButton.textContent = '−';
            quantityControl.appendChild(minusButton);

            const quantity = document.createElement('span');
            quantity.textContent = item.quantity;
            quantityControl.appendChild(quantity);

            const plusButton = document.createElement('span');
            plusButton.textContent = '+';
            quantityControl.appendChild(plusButton);

            itemActionDiv.appendChild(quantityControl);
            itemDiv.appendChild(itemActionDiv);
            cartItemsContainer.appendChild(itemDiv);

            minusButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart = cart.filter(cartItem => cartItem.name !== item.name);
                }
                updateCart();
            });

            plusButton.addEventListener('click', () => {
                item.quantity++;
                updateCart();
            });

            total += item.price * item.quantity;
        });

        totalAmountSpan.textContent = total;
        payButton.textContent = `Pay 50% (${total * 0.5})`;
    }

    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    renderCartItems();
});
