let allAmazonProducts = JSON.parse(localStorage.getItem("allAmazonProducts"))
let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))
let productIndex = Number(localStorage.getItem("productIndex"))

productImage.src = allAmazonProducts[productCategoryIndex][productIndex].photoURL
productDescription.innerText = allAmazonProducts[productCategoryIndex][productIndex].productInformation
document.querySelectorAll("#productPrice").innerText = allAmazonProducts[productCategoryIndex][productIndex].currentPrice
console.log(window.navigator)
let amazonCart = []

const addToCart =()=>{
    if (localStorage.amazonCart) {
        amazonCart = JSON.parse(localStorage.getItem("amazonCart"))
    }
    let productDetails ={
        // console.log(productCategoryIndex, productIndex)
        categoryIndex: productCategoryIndex,
        productIndex: productIndex
    } 
    amazonCart.push(productDetails)
    localStorage.setItem("amazonCart", JSON.stringify(amazonCart))
    window.location.href = "addToCart.html"
}
