// script.js

// Select all divs with the class 'clickable-box'
const clickableBoxes = document.querySelectorAll('.restaurant');

// Iterate through each clickable box and add an event listener
clickableBoxes.forEach(box => {
    box.addEventListener('click', function() {
        // Get the URL from the data-url attribute
        const url = this.getAttribute('data-url');
        // Navigate to the specified URL
        window.location.href = url;
    });
});