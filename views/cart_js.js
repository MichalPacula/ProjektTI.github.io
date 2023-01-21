function openCart(){
    let cart = document.querySelector(".cart");
    cart.style.visibility = "visible";
    cart.style.right = "0";
}

function closeCart(){
    let cart = document.querySelector(".cart");
    cart.style.visibility = "hidden";
    cart.style.right = "-100%";
}

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}
else{
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName("cart_remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    var addCart = document.getElementsByClassName("add_cart_button");
    for (var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    updateTotal()
    document.getElementsByClassName("button_buy")[0].addEventListener("click", buyButtonClicked);

}

function buyButtonClicked(event){
    alert("Przyjeliśmy twoje zamówienie.")
    var cartContent = document.getElementsByClassName("cart_content")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.closest(".popup");
    var title_query = shopProducts.querySelectorAll(".product_title");
    var title = title_query[0].innerText;
    var price_query = shopProducts.querySelectorAll(".product_price");
    var price = price_query[0].innerHTML;
    var image_query = shopProducts.querySelectorAll(".product_image");
    var image = image_query[0].src;
    addProductToCart(title, price, image);
    updateTotal()
}

function addProductToCart(title, price, image){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart_box");
    var cartItems = document.getElementsByClassName("cart_content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart_product_title");
    for (var i=0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
            alert("Już dodałeś ten produkt do koszyka!");
            return;
        }
    }
    var cartBoxContent = `  <img src="${image}" alt="" class="cart_image">
                    <div class="detail_box">
                        <div class="cart_product_title">${title}</div>
                        <div class="price">${price}</div>
                        <div class="quantity">1</div>
                    </div>
                    <i class="bx bxs-trash-alt cart_remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart_remove")[0].addEventListener("click", removeCartItem)
}


function updateTotal(){
    try{
        var total = 0;
        var cartContent = document.getElementsByClassName("cart_content")[0];
        var cartBoxes = cartContent.getElementsByClassName("cart_box");
        for (var i = 0; i < cartBoxes.length; i++){
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName("price")[0];
            var price = parseInt(priceElement.innerHTML.replace("zł", ""));
            total += (price);
        }
        document.querySelector(".total_price").innerText = total + "zł";
    }catch (error){
        document.querySelector(".total_price").innerText = 0 + "zł";
    }

}