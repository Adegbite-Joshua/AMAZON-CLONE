let allAmazonProducts = JSON.parse(localStorage.getItem("allAmazonProducts"))
let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))
let productIndex = Number(localStorage.getItem("productIndex"))
let amazonCart = []
if (localStorage.amazonCart) {
    amazonCart = JSON.parse(localStorage.getItem("amazonCart"))
}
let allOrderedAmount;
let priceSum;
amazonCart.map((item, index)=>{
    allOrderedAmount += Number(item.productAmount)
    // console.log(allAmazonProducts[item.categoryIndex][item.productIndex].productAmount)
    // console.log(allAmazonProducts[item.categoryIndex][item.productIndex].productAmount*allAmazonProducts[item.categoryIndex][item.productIndex].currentPrice);
    priceSum += item.productAmount*allAmazonProducts[item.categoryIndex][item.productIndex].currentPrice 
  })
totalProductNumber.innerText = `${allOrderedAmount} items`
allProductPrice.innerText = priceSum
productPicture.src = allAmazonProducts[productCategoryIndex][productIndex].photoURL
allAmazonProducts[productCategoryIndex].map((item , index)=>{
    let allStar = "";
    for (let i = 1; i <= (5-item.productRating); i++) {
        allStar += `<i class="fas fa-star"></i>`
    }
    for (let j = 0; j < item.productRating; j++) {
        allStar += `<i class="fas fa-star checked"></i>`        
    }
    document.querySelector(".relatedGrid").innerHTML += `
    <div style="width: 200px; height: auto;" class="word-break">
        <img src="${item.photoURL}" class="w-100 h-50" alt="">
        <a href="" class="text-decoration-none"><h5>${item.productName}</h5></a>
        <h6>${allStar}</h6>
        <p>Last Price: <span class="text-decoration-line-through fw-bold">${item.initialPrice}</span> </p>
        <button class="btn btn-warning smallDeviceButton w-50 rounded-pill my-1" style="font-size: 14px;" onclick="addToCart(${productCategoryIndex},${index})">Add to Cart</button>
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
    if (allAmazonProducts[productCategoryIndex][productIndex]<5) {
        allAmazonProducts[productCategoryIndex][productIndex] += 0.5
    }
    amazonCart.push(productDetails)
    localStorage.setItem("allAmazonProducts", JSON.stringify(allAmazonProducts))
    localStorage.setItem("amazonCart", JSON.stringify(amazonCart))
    localStorage.setItem("productIndex", productIndexC)
    localStorage.setItem("productCategoryIndex", categoryIndexC)
    window.location.reload();
}