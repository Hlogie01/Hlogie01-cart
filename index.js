// Selecting elements
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Event listeners
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

// Products array with sizes
let products = [
    {
        id: 1,
        name: 'Nike Waffles',
        image: 'nike1.png',
        price: 160000, 
        sizes: ['5', '6', '7', '8', '9'] // Available sizes
    },
    {
        id: 2,
        name: 'Nike AirMax X OffWhite',
        image: 'nike2.png',
        price: 480000,
        sizes: ['5', '6', '7', '8', '9'] // Available sizes
    },
    {
        id: 3,
        name: 'Nike AirMax',
        image: 'nike3.png',
        price: 230000,
        sizes: ['5', '6', '7', '8', '9'] // Available sizes
    },
    {
        id: 4,
        name: 'Nike VapourMax',
        image: 'nike4.png',
        price: 260000,
        sizes: ['5', '6', '7', '8', '9'] // Available sizes
    },
    {
        id: 5,
        name: 'Nike AirMax 1.7',
        image: 'nike5.png',
        price: 220000,
        sizes: ['5', '6', '7', '8', '9'] // Available sizes
    },
    {
        id: 6,
        name: 'Nike Runners',
        image: 'nike6.png',
        price: 160000,
        sizes: ['5', '6', '7', '8', '9'] // Available sizes
    }
];

// Array to hold selected products
let listCards = [];

// Function to initialize the application
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}" class="product-image">
            <div class="title">${value.name}</div>
            <div class="price">R${(value.price / 100).toFixed(2)}</div>`; // Convert cents to rands
        
        // Create a label for available sizes
        let sizeLabel = document.createElement('label');
        sizeLabel.textContent = "Available Sizes: ";
        newDiv.appendChild(sizeLabel);

        // Create a select element for size selection
        let sizeSelect = document.createElement('select');
        sizeSelect.classList.add('size-select');
        value.sizes.forEach(size => {
            let option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            sizeSelect.appendChild(option);
        });
        newDiv.appendChild(sizeSelect);

        newDiv.innerHTML += `<button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}

// Initialize the application
initApp();

// Function to add product to the card
function addToCard(key) {
    let selectedSize = list.querySelectorAll('.size-select')[key].value;
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
        listCards[key].size = selectedSize;
    }
    reloadCard();
}

// Function to reload the card with updated quantities and prices
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice += value.price;
        count += value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>Size: ${value.size}</div>
                <div>Price: R${(value.price / 100).toFixed(2)}</div>`; // Convert cents to rands
            newDiv.innerHTML += `
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = `Total: R${(totalPrice / 100).toFixed(2)}`; // Convert cents to rands
    quantity.innerText = count;
}

// Function to change quantity of a product in the card
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
