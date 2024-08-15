const dessertContainer=document.querySelector(".desserts_container");

fetch("./data.json")
.then(res=>{
    return res.json();
})
.then(data=>{
    data.forEach(element => {
        // console.log(element.name);
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
                                    <img src="assets/images/icon-increment-quantity.svg" alt="plus" class="plus">
                                    <p>1</p>
                                    <img src="assets/images/icon-decrement-quantity.svg" alt="minus" class="minus">
                                </div>
                            </div>
                        </div>
                        <div class="dessert_details">
                            <h4 class="dessert_category">${element.category}</h4>
                            <h3 class="dessert_name">${element.name}</h3>
                            <p class="dessert_price">$ <span>${element.price}<span></p>
                        </div>
        `
        dessertContainer.append(div);
    });
    main();
})

function main(){
    const addToCart=document.querySelectorAll(".add_to_cart");
    let cartItems=JSON.parse(localStorage.getItem("cartItemsKey")) || {};
    const cartItemsContainer=document.querySelector(".cart_items_container");
    const increamentBtn=document.querySelectorAll(".plus");
    const confirmOrder=document.querySelector(".confirm_order");
    // console.log(increamentBtn);
    
    function totalPrice(){
        let itemDetails=Object.values(cartItems);
        // console.log(itemDetails)
        let sum=0;
        itemDetails.forEach(item=>{
            sum+=item.quantity*item.price
        })
        // console.log(sum);
        document.querySelector(".order_total").innerText=`$${sum}`
    }

    function cartUpdate(){
        let itemNames=Object.keys(cartItems);
        if(itemNames.length!=0){
            document.querySelector(".empty_card").style.display="none"
            document.querySelector(".confirm_order_container").style.display="flex"
            cartItemsContainer.innerHTML='';
            // console.log(itemNames);
            itemNames.forEach(item=>{
                let div=document.createElement("div");
                div.classList.add("cart_item");
                // console.log(JSON.parse(localStorage.getItem("cartItemsKey"))[item]);
                div.innerHTML=`
                                <div class="details">
                                    <div class="dessert_name">
                                        <h3>${item}</h3>
                                    </div>
                                    <div class="item_details">
                                        <p class="quantity">${JSON.parse(localStorage.getItem("cartItemsKey"))[item].quantity}x</p>
                                        <p class="price">@ $${JSON.parse(localStorage.getItem("cartItemsKey"))[item].price}</p>
                                        <p class="total_price">$${JSON.parse(localStorage.getItem("cartItemsKey"))[item].quantity * JSON.parse(localStorage.getItem("cartItemsKey"))[item].price}</p>
                                    </div>
                                </div>
                                <div class="cancel">
                                    <img src="assets/images/icon-remove-item.svg" alt="">
                                </div>       
                `
                cartItemsContainer.append(div);
            })
            totalPrice();
        }else{
            document.querySelector(".empty_card").style.display="flex"
            document.querySelector(".confirm_order_container").style.display="none"
            // console.log("hello")
        }
    };
    cartUpdate();

    addToCart.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            // console.log("hi");
            btn.querySelector(".add").style.display="none";
            btn.querySelector(".added").style.display="flex";
            cartItems[btn.parentElement.nextElementSibling.querySelector(".dessert_name").innerText]={"quantity":2,"price":Number(btn.parentElement.nextElementSibling.querySelector(".dessert_price span").innerText)};
            localStorage.setItem("cartItemsKey",JSON.stringify(cartItems));
            cartUpdate();
        })
    })

    
    increamentBtn.forEach(btn=>{
        btn.addEventListener("click",()=>{
            // let itemName=btn.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".dessert_name").innerText;
            // let itemDetail=JSON.parse(localStorage.getItem("cartItemsKey"))[itemName];
            // itemDetail.quantity=1;
            // cartItems[itemName]=itemDetail;
            let lst=JSON.parse(localStorage.getItem("cartItemsKey"));
            // console.log(lst);
            let itemName=btn.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".dessert_name").innerText;
            // console.log(itemName)
            let itemDetail=lst[itemName];
            // console.log(itemDetail);
            itemDetail.quantity=10;
            // console.log(itemDetail);
            lst[itemName]=itemDetail;
            console.log(lst)
            // localStorage["cartItemsKeys"]=JSON.stringify(lst);
            localStorage.setItem("cartItemsKeys",JSON.stringify(lst));
            localStorage.setItem("cartItemsKey",JSON.stringify(lst));
        })
    })

    confirmOrder.addEventListener("click",()=>{
        document.querySelector(".order_confirmed_container").style.display="flex";
        document.addEventListener("click",()=>{
            document.querySelector(".tick_container .cancel").addEventListener("click",()=>{
                document.querySelector(".order_confirmed_container").style.display="none";
            })
        })
    })

}

