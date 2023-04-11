let allAmazonProducts = JSON.parse(localStorage.getItem("allAmazonProducts"))
let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))

allAmazonProducts[productCategoryIndex].map((product, index)=>{
    console.log(product)
    document.querySelector(".grid_Lists").innerHTML += `
        <div class="inner">
            <img src="${product.photoURL}" onclick="viewProduct(${index})" class=""/> 
            <div>
                <p>${product.productName}</p>
                <p>#${product.currentPrice}</p>
            </div>
        </div>
    `
}) 

const viewProduct =(productIndex)=>{
    localStorage.setItem("productIndex", productIndex)
    window.location.href = "buyProduct.html"
}