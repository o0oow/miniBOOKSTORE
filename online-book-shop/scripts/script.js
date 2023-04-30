'use strict';

// initial variables

let books = [
    {
        id: 0,
        name: '1984',
        price: 10.50,
        amount: 30
    },
    {
        id: 1,
        name: 'Beyound good and evil',
        price: 12.90,
        amount: 20
    },
    {
        id: 2,
        name: 'Crime and punishment',
        price: 21.80,
        amount: 10
    },
    {
        id: 3,
        name: 'Portraint of Dorian Gray',
        price: 22.00,
        amount: 40
    },
    {
        id: 4,
        name: 'The old man and sea',
        price: 23.50,
        amount: 19
    },  {
        id: 5,
        name: 'The little prince',
        price: 13.30,
        amount: 16
    },  {
        id: 6,
        name: 'The Great Gatsby',
        price: 17.90,
        amount: 9
    },  {
        id: 7,
        name: 'Oliver Twist',
        price: 21.60,
        amount: 14
    },  {
        id: 8,
        name: 'Atomic Habits',
        price: 19.90,
        amount: 6
    },  {
        id: 9,
        name: 'Pride and Prejudice',
        price: 29.70,
        amount: 11
    },
]

const productBlock = document.getElementById('products-block');
const actionBlock = document.getElementById('action-block');
const dropdown = document.getElementById('select-id');
let totalCost = 0;

if (books.length > 0) {
    productBlock.style.display = 'block';
    actionBlock.style.display = 'flex';
}

for (let i = 0; i < books.length; i++) {
    // добавляет product в productBlock
    const product = document.createElement('div');
    product.className = 'product';
    product.id = "bookID-" + books[i].id;

    const productImg = document.createElement('img');

    productImg.src = `./images/${books[i].name}.jpg`;
    productImg.alt = books[i].name;
    productImg.classList.add('product-photo');

    const productName = document.createElement('span');
    productName.className = 'product-name';
    productName.textContent = books[i].name;

    const productPrice = document.createElement('span');
    productPrice.className = 'product-price';
    productPrice.textContent = '$' + books[i].price.toFixed(2);

    const productAmount = document.createElement('span');
    productAmount.className = 'product-amount';
    productAmount.textContent = 'left ' + books[i].amount + ' pcs.';

    product.appendChild(productImg);
    product.appendChild(productName);
    product.appendChild(productPrice);
    product.appendChild(productAmount);

    productBlock.appendChild(product);

    // добавляет option в select
    const selectOption = document.createElement('option');
    selectOption.value = books[i].id;
    selectOption.textContent = books[i].name;

    dropdown.appendChild(selectOption);
}

// button which adds elements to cart
const addButton = document.getElementById('add-to-cart-button');

//function which holds all operations related to adding elements
function addToCart() {
    // getting the book and its' amount                                      
    const selectedOption = document.getElementById('select-id');
    const productNumber = document.getElementById('product-number');

    const product = books.find(book => book.id === +selectedOption.value);

    if (+productNumber.value <= product.amount) {

        product.amount -= +productNumber.value;

        const productHTML = document.getElementById('bookID-' + product.id);
        const productHTMLAmount = productHTML.querySelector('.product-amount');
        productHTMLAmount.textContent = 'left ' + product.amount + ' pcs.';

        // updating total cost of purchase                                       (step 3)    
        totalCost = totalCost + +productNumber.value * product.price;

        // getting access to cart table                                          (step 4.1)
        const cartTable = document.getElementById('cart-table');

        // creating new list item                                                (step 4.2)
        const cartProduct = document.createElement('li');
        // adding "cart-product" class to list item [class="cart-product"]
        cartProduct.classList.add('cart-product');

        // creating new span for name of product                                 (step 4.3)               
        const cartProductName = document.createElement('span');
        // adding "cart-product-name" class to span [class="cart-product-name"]
        cartProductName.classList.add('cart-product-name');
        // setting the text of span to name of book                            
        cartProductName.textContent = product.name;
        // adding span to list item                                            
        cartProduct.appendChild(cartProductName);

        // creating new span for amount of product                              (step 4.4)          
        const cartProductNumber = document.createElement('span');
        // adding "cart-product-number" class to span [class="cart-product-number"]
        cartProductNumber.classList.add('cart-product-number');
        // setting the text of span to amount of book                            
        cartProductNumber.textContent = productNumber.value + ' pcs.';
        // adding span to list item                                            
        cartProduct.appendChild(cartProductNumber);

        // creating new span for cost of product                               (step 4.5)
        const cartProductCost = document.createElement('span');
        // adding "cart-product-cost" class to span [class="cart-product-cost"]
        cartProductCost.classList.add('cart-product-cost');
        // setting the text of span to cost of book                            
        cartProductCost.textContent = '$' + (+productNumber.value * product.price).toFixed(2);
        // adding span to list item                                            
        cartProduct.appendChild(cartProductCost);

        // adding new purchase to cart                                         (step 5)
        cartTable.appendChild(cartProduct);


        //accessing the total cost element & updating the text                 (step 6)
        const totalCostBlock = document.getElementById('total-cost');
        totalCostBlock.textContent = 'Total Cost: $' + totalCost.toFixed(2);

        // accessing the cart block and making it visible                      (step 7)
        document.getElementById('cart-block').style.display = 'block';

        // and clearing the input and select                                   (step 8)
        productNumber.value = '1';

    } else {
        alert(`Sorry the selected book (${product.name}) left only ${product.amount} pcs`);
    }

}

//linking function with click event of button
addButton.addEventListener('click', addToCart);

const deliveryCheckBox = document.getElementById('delivery-checkbox');

deliveryCheckBox.addEventListener('click', (event) => {
    if (deliveryCheckBox.checked) {
        totalCost += 10.00;
        document.getElementById('total-cost').textContent = 'Total Cost: $' + totalCost.toFixed(2);
    } else {
        totalCost -= 10.00;
        document.getElementById('total-cost').textContent = 'Total Cost: $' + totalCost.toFixed(2);
    }
})