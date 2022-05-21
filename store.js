// TODO: Change all functions to arrow-functions

// Checking to see if the HTML page is still loading
if (document.readyState == 'loading') {
    // Running and 'if' statment to see if the page is loading or not
    document.addEventListener('DOMContentLoaded', ready)
    // If the page is loading then this statement will execute 
} else {
    // If the page has already loaded then this will execute the function
    ready()
}

function ready() {
    // Grabbing the button element by class name and saving it to a variable 
    let removeCartItemButtons = document.getElementsByClassName('btn-warning') 
    // Need to add an event listener to each button, then loop over them to grab each button so that way the buttons on the screen will actually execute their function
    for (let i = 0; i < removeCartItemButtons.length; i++) { 
        // Assigning button to the i'th element in the loop
        let button = removeCartItemButtons[i]               
        // Adding an event listener to the button assigned, once clicked the function 'buttonClicked' will execute
        // Once clicked then the function removeCartItem will execute
        button.addEventListener('click', removeCartItem)
    }
    let removeAllItems = document.getElementsByClassName('btn-danger') 
    // Need to add an event listener to each button, then loop over them to grab each button so that way the buttons on the screen will actually execute their function
    for (let i = 0; i < removeAllItems.length; i++) { 
        // Assigning button to the i'th element in the loop
        let button = removeAllItems
        // Adding an event listener to the button assigned, once clicked the function 'buttonClicked' will execute
        // Once clicked then the function removeCartItem will execute
        button.addEventListener('click', removeAllItems)
    }


    // Grabbing the quantity inputs to prevent users from entering in negative quantities and setting default value to 1
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    // Creating a for loop to grab all quantity inputs available
    for (let i = 0; i < quantityInputs.length; i++) {
        // Grabbing the i'th element of the loop to execute action
        let input = quantityInputs[i]
        // Adding an event listener to see if any changes are being made to this field and execute the function
        input.addEventListener('change', quantityChanged)
    }
    // Grabbing the 'add to cart' button and assigning a function to it so the user can add items to the cart
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    // Have to loop over the button, to ensure that each button is being grabbed
    for (let i = 0; i < addToCartButtons.length; i++) {
        // Grabbing the actual button and grabbing the i'th element
        let button = addToCartButtons[i]
        // Calling the 'addToCartClicked' function so when the user clicks the button the function will execute
        button.addEventListener('click', addToCartClicked)

    // Adding an event listener to activate when the purchase button has been pressed
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

    }
}

function purchaseClicked() {
    // Displaying a message for when the user clicks purchase
    alert('Thanks for contributing to Lord Kanye')
    // Seleting the container that the cart items are in
    let cartItems = document.getElementsByClassName('cart-items')[0]
    // Looping over all the children elements inside the cart to check them
    while (cartItems.hasChildNodes()) {
        // This should remove all chilc nodes that are inside of the cart - need to update the cart total
        cartItems.removeChild(cartItems.firstChild)
    }
    // Calling function so we can update the cart total
    updateCartTotal()


}

function removeCartItem(event) { 
    let buttonClicked = event.target                    
            // Assigning the buttonClicked variable to event.target so the event can be passed into it
            buttonClicked.parentElement.parentElement.remove() 
            // buttonClicked is grabbing the parent element, of the parent element so that the user can remove the item that's in the cart
            updateCartTotal()
            // Calling our 'updateCartTotal' function here so when the event has been triggered, the cart total will be updated with any items that have been removed
}

function removeAllItems(event) {
    let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove().all()
        updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    // Grabbing the event that the event listener initiated
    if (isNaN(input.value) || input.value <= 0) {
    // Need to check to see if the change that was made was even a number and as well that the user doesn't have any negatives of something
        input.value = 1
        // Always setting the value to a default of 1
    }
    updateCartTotal()
    //Calling the 'updateCartTotal' function to make sure changes are saved
}

// 'addToCartFunction' when executed, should add whichever item the user clicks on to the cart and update the qty and price accordingly
function addToCartClicked(event) {
    // Assigning the button to the event.target so it can be executed when clicked
    let button = event.target
    // Adding the elements needed from the actual item by referencing the elements parent, parent element
    let shopItem = button.parentElement.parentElement
    // Grabbing the item by class name grabbing the first one in the index and the innerText
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    // Now have to grab the price of the item, grabbing the first one in the index and the innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    // Grabbing image source now so that when the user adds to cart, they can see what has been added to the cart, grabbing it by the source
    let imageSource = shopItem.getElementsByClassName('shop-item-image')[0].src
    // Calling the addItemToCart method here once the event has been triggered
    addItemToCart(title, price, imageSource)
    // Updating the cart total
    updateCartTotal()
}

function addItemToCart(title, price, imageSource) {
    // Have to create a row for when the user adds an item to their cart, the createElement will create a div that can be used in the HTML later 
    let cartRow = document.createElement('div')
    // Adding the class list to the cartRow variable so when the user adds something to the cart, it will inherit the style properties
    cartRow.classList.add('cart-row')
    // Grabbing the first cart item 
    let cartItems = document.getElementsByClassName('cart-items')[0]
    // Have to check to see if the item has already been added to the cart or not 
    let cartItemsNames = cartItems.getElementsByClassName('cart-item-title')
    // Looping through all the cart items
    for (let i = 0; i < cartItemsNames.length; i++) {
        // Creating an if statement to check if the item is in the cart or not
            // grabbing the i'th element of what's in the cart - checking it against the title because that is what was passed in
        if (cartItemsNames[i].innerText == title) {
            // Alerting the user that the item is already in their cart
            alert('This item is already added to the cart')
            // Calling return will prevent the code from continuing to make a row or other functions executing and 
            return
        }
    }
    // Have to create a function that will create an HTML row everytime the user adds an item to the cart, need to provide some HTML code 
    // Using an f-string to bring in the title, price and imageSource that was grabbing in the addToCartClicked method
    let cartRowContents = `
                        <div class="cart-item cart-column">
                            <img class="cart-item-title" src="${imageSource}"
                            width="100" height="100">
                                <span class="cart-item-title">${title}</span>
                        </div>
                        <span class="cart-price cart-column">${price}</span>
                        <div class="cart-quantity cart-column">
                            <input class="cart-quantity-input" type="number" value="1">
                                <button class="btn btn-danger"
                                type="button">REMOVE</button>
                        </div>`
    // Setting the variable cartRow.innerHTML to cartRowContents in order to create a row with the user items added to cart and create it with the HTML element
    cartRow.innerHTML = cartRowContents
    // Appending the cart item, which will add this cart row to the very end of the cart items
    cartItems.append(cartRow)
    // Adding an event listener so remove button will function correctly after the page has loaded
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    // Will allow the quantity to function properly
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function updateCartTotal() {
    // Grabbing an element by its class name in the HTML and only want to grab the first line by indexing in at position 0
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    // Using the 'getElementsByClassName' method on an object will only get the elements inside of that object that have a different class
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    // Have to set total to 0, so that functino has something to start with when calculating the quantity and price total of the cart and continuing to update it 
    let total = 0
    // Have to loop over all the items to grab each of them individually
    for (let i = 0; i < cartRows.length; i++) { 
        // Grabbing whichever array that the loop is on by grabbing the i'th element in the loop
        let cartRow = cartRows[i]
        // Updating the pricing now by grabbing the element by class name and indexing in at the 0th position
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        // Updating the quantity now by grabbing the element by class name and indexing in at the 0th position
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        // Have to calculate the price for each item added to the cart. Have to remove the '$' and replace it with nothing and convert it into an integer to do calculations against it
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        // Grabbing the quantity now to calculate the total price correctly. Have to grab to value element from the HTML page
        let quantity = quantityElement.value
        // Everytime that the loop is ran, it will take the current total that was added and then add any sort of quantity change and
        // with it being on a loop it will continue to update that total
        total = total + (price * quantity)
    }
    // Creating a solution now that will us from having any strange rounding errors that might occur
    total = Math.round(total * 100) / 100

    // Grabbing the element with the cart total price in order to update it on the customer-side so that they can see it
    document.getElementsByClassName('cart-total-price')[0].innerText = total = '$' + total
    
}