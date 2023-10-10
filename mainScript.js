var products = [];

var currentSignedEmail = localStorage.getItem("emailAddress");
var cart;
if (localStorage.getItem(currentSignedEmail)) {
    cart = JSON.parse(localStorage.getItem(currentSignedEmail));
} else {
    cart = [];
}

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            products = JSON.parse(this.responseText).items;
            display();
            showDataInAllProductsPage();
        }
    };
    xhttp.open("GET", "./products.json", false);
    xhttp.send();
}
loadDoc();
function display() {
    var cartona = '';
    for (let i = 0; i < 3; i++) {
        cartona += `
        <div class="row">
        <img src="${products[i].image}" alt="">
        <div class="product-text">
        </div>
        <div class="heart-icon">
        <ul>
        </ul>
                <i class='bx bx-cart' onclick="addToCart(${products[i].id})"></i>
        </div>
        <div class="ratting">
            <i class='bx bx-star'></i>
            <i class='bx bx-star'></i>
            <i class='bx bx-star'></i>
            <i class='bx bx-star'></i>
            <i class='bx bxs-star-half' ></i>
        </div>

        <div class="price">
            <h4>${products[i].name}</h4>
            <p>${products[i].price}</p>
        </div>
    </div>

        `
    }
    document.getElementById('productsFromJsonHere').innerHTML = cartona;
}

function searchData(data) {
    var box = '';
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.includes(data.toLowerCase())) {
            console.log(products[i].name)
            box += `
            <!-- Single Product -->
            <div class="col-md-6 col-lg-4 col-xl-3">
                <div id="product-1" class="single-product">

                    <div class="part-1">
                        <img src="${products[i].image}" class="img-fluid" alt="">
                        <ul>
                            <li onclick="addToCart(${products[i].id})"><i  class="fas fa-shopping-cart"></i></li>
                            <!-- <li><a href="#"><i class="fas fa-heart"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-plus"></i></a></li>
                                                    <li><a href="#"><i class="fas fa-expand"></i></a></li> -->
                        </ul>
                    </div>
                    <div class="part-2">
                        <h3 class="product-title">${products[i].name}</h3>
                        <h4 class="product-old-price">$79.99</h4>
                        <h4 class="product-price">$${products[i].price}</h4>
                    </div>
                </div>
            </div>
               `
        }
    }
    document.getElementById('row').innerHTML = box;
    console.log(box);
}

function showDataInAllProductsPage() {
    var box = '';
    for (let i = 0; i < products.length; i++) {
        box += `
				<div class="col-md-6 col-lg-4 col-xl-3">
					<div id="product-1" class="single-product">

						<div class="part-1">
							<img src="${products[i].image}" class="img-fluid" alt="">
							<ul>
								<li onclick="addToCart(${products[i].id})"><i  class="fas fa-shopping-cart"></i></li>
								<!-- <li><a href="#"><i class="fas fa-heart"></i></a></li>
														<li><a href="#"><i class="fas fa-plus"></i></a></li>
														<li><a href="#"><i class="fas fa-expand"></i></a></li> -->
							</ul>
						</div>
						<div class="part-2">
							<h3 class="product-title">${products[i].name}</h3>
							<h4 class="product-old-price">$79.99</h4>
							<h4 class="product-price">$49.99</h4>
						</div>
					</div>
				</div>
               `;
    }
    document.getElementById('row').innerHTML = box;
    //console.log(box);
}
showDataInAllProductsPage();
//window.onload = showDataInAllProductsPage();

function showCartItemsInCartPage() {
    var cartSubTotal = 0;
    var box = '';
    for (let i = 0; i < cart.length; i++) {
        cartSubTotal+=cart[i].price;
        box += `
        <tr>
        <td data-th="Product">
            <div class="row">
                <div class="col-md-3 text-left">
                    <img src="${cart[i].image}" alt=""
                        class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                </div>
                <div class="col-md-9 text-left mt-sm-2">
                    <h4>${cart[i].name}</h4>
                    <p class="font-weight-light">Brand &amp; Name</p>
                </div>
            </div>
        </td>
        <td data-th="Price" class="priceClass">$${cart[i].price}</td>

        <td class="actions" data-th="">
            <div class="text-right">
                <button class="btn btn-white border-secondary bg-white btn-md mb-2" onclick="deleteCartItemAndFromLocalStorage(${cart[i].id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    </tr>
        `
    }
    
    document.getElementById('cartItemsHere').innerHTML = box;
    displayCartSubTotal(cartSubTotal);
}
showCartItemsInCartPage();
function displayCartSubTotal(total){
    document.getElementById('subTotal').innerHTML = '$'+ parseFloat(total.toFixed(2));
}
function showNumberOfItemsInCart(){
    document.getElementById('numberOfItems').innerHTML = cart.length;
}
function filterByLowesPrice() {
    var searchItem = document.getElementById('searchInput').value;
    var sortedArrOfProducts = [];
    var box = '';
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.includes(searchItem.toLowerCase())) {
            sortedArrOfProducts.push(products[i]);
        }
    }
    for (let i = 0; i < sortedArrOfProducts.length; i++) {
        sortedArrOfProducts.sort(compare)
    }
    for (let i = 0; i < sortedArrOfProducts.length; i++) {
        box += `
        <div class="col-md-6 col-lg-4 col-xl-3">
        <div id="product-1" class="single-product">

            <div class="part-1">
                <img src="${sortedArrOfProducts[i].image}" class="img-fluid" alt="">
                <ul>
                    <li onclick="addToCart(${sortedArrOfProducts[i].id})"><i  class="fas fa-shopping-cart"></i></li>
                    <!-- <li><a href="#"><i class="fas fa-heart"></i></a></li>
                                            <li><a href="#"><i class="fas fa-plus"></i></a></li>
                                            <li><a href="#"><i class="fas fa-expand"></i></a></li> -->
                </ul>
            </div>
            <div class="part-2">
                <h3 class="product-title">${sortedArrOfProducts[i].name}</h3>
                <h4 class="product-old-price">$79.99</h4>
                <h4 class="product-price">${sortedArrOfProducts[i].price}</h4>
            </div>
        </div>
    </div>
               `
    }
    document.getElementById('row').innerHTML = box;
    console.log(sortedArrOfProducts)
}
function compare(a, b) {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
}
function addToCart(proId) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == proId) {
            cart.push(products[i]);
            localStorage.setItem(localStorage.getItem("emailAddress"), JSON.stringify(cart));
        }
    }
}
function showCart() {
    var savedItemsInLocalForEmail;
    if (JSON.parse(localStorage.getItem(currentSignedEmail))) {
        savedItemsInLocalForEmail = JSON.parse(localStorage.getItem(currentSignedEmail));
    }
    else {
        savedItemsInLocalForEmail = [];
    }

    var box = '';
    for (let i = 0; i < savedItemsInLocalForEmail.length; i++) {
        box += `
            <p>
            <h3>${savedItemsInLocalForEmail[i].name}</h3>
            <p>${savedItemsInLocalForEmail[i].price}</p>
            </p>
            <button onclick="deleteCartItemAndFromLocalStorage(${savedItemsInLocalForEmail[i].id})">Delete From Cart</button>
        `
    }
    document.getElementById('cartItesm').innerHTML = box;
    console.log(savedItemsInLocalForEmail);
}
function deleteCartItemAndFromLocalStorage(itemID) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == itemID) {
            cart.splice(i, 1);
            localStorage.setItem(currentSignedEmail, JSON.stringify(cart));
        }
    }
    showCartItemsInCartPage();
    showNumberOfItemsInCart();
}

function signOut() {
    //aconsole.log("hey");
    location.replace("./loginpageindex.html");
}