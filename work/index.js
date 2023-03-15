let allAmazonProducts = JSON.parse(localStorage.getItem("allAmazonProducts"))

allAmazonProducts.map((category)=>{
    // console.log(category)
    if (category.length>0) {
            category.map((product)=>{
                console.log(product)
                displayProductDiv.innerHTML += `
                <div class="border border-2" style="height: 400px;">
                    <h3>${product.productName}</h3>
                    <img src="../61TD5JLGhIL._SX3000_.jpg" class="h-75 d-block mx-auto w-100" alt="">
                </div>                ` 
            })
    }
})