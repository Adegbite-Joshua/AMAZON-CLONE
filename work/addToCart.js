let allAmazonProducts = JSON.parse(localStorage.getItem("allAmazonProducts"))
let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))
let productIndex = Number(localStorage.getItem("productIndex"))
let amazonCart = []
if (localStorage.amazonCart) {
    amazonCart = JSON.parse(localStorage.getItem("amazonCart"))
}

productPicture.src = allAmazonProducts[productCategoryIndex][productIndex].photoURL
allAmazonProducts[productCategoryIndex].map((item , index)=>{
    document.querySelector(".relatedGrid").innerHTML += `
    <div style="width: 200px; height: auto;" class="word-break">
        <img src="${item.photoURL}" class="w-100 h-50" alt="">
        <a href="" class="text-decoration-none"><h5>${item.productInformation}</h5></a>
        <h6>Stars 23456</h6>
        <p>Last Price: <span class="text-decoration-line-through fw-bold">3848</span> </p>
        <button class="btn btn-warning w-50 rounded-pill my-1" style="font-size: 14px;" onclick="addToCart(${productCategoryIndex},${index})">Add to Cart</button>
    </div>
    `   
})

const addToCart =(categoryIndexC, productIndexC)=>{
    if (localStorage.amazonCart) {
        amazonCart = JSON.parse(localStorage.getItem("amazonCart"))
    }
    let productDetails ={
        // console.log(productCategoryIndex, productIndex)
        categoryIndex: categoryIndexC,
        productIndex: productIndexC,
        productAmount: 1
    } 
    amazonCart.push(productDetails)
    localStorage.setItem("amazonCart", JSON.stringify(amazonCart))
    window.location.href = "addToCart.html"
}