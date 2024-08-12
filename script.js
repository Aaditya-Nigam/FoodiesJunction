const dessertContainer=document.querySelector(".desserts_container");

fetch("./data.json")
.then(res=>{
    return res.json();
})
.then(data=>{
    data.forEach(element => {
        console.log(element.name);
        let div=document.createElement("div");
        div.classList.add("dessert_card")
        div.innerHTML=`
                        <div class="img_container">
                            <img src="${element.image.desktop}" alt="sweet">
                            <div class="add_to_cart">
                                <div class="add">
                                    <img src="assets/images/icon-add-to-cart.svg" alt="cart">
                                    <p>Add to Cart</p>
                                </div>
                                <div class="added">
                                    <img src="assets/images/icon-increment-quantity.svg" alt="plus">
                                    <p>1</p>
                                    <img src="assets/images/icon-decrement-quantity.svg" alt="minus">
                                </div>
                            </div>
                        </div>
                        <div class="dessert_details">
                            <h4 class="dessert_category">${element.category}</h4>
                            <h3 class="dessert_name">${element.name}</h3>
                            <p class="dessert_price">$${element.price}</p>
                        </div>
        `
        dessertContainer.append(div);
    });
})