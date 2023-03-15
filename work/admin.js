let computers = []
let boysFashion = []
let electronics = []
let girlsFashion = []
let mensFashion = []
let allAmazonProducts = [
    computers,
    boysFashion,
    electronics,
    girlsFashion,
    mensFashion
]

if (localStorage.allAmazonProducts) {
    allAmazonProducts = JSON.parse(localStorage.getItem("allAmazonProducts"))
}

const addProduct =()=>{
    let productDetails = {
        productName: productName.value,
        productDescription: productDescription.value,
        productAmount: amountAvailable,
        productCategory: productCategory.value,
        productInformation: productInformation.value
    }
    if (productCategory.value=="computers") {
        allAmazonProducts[0].push(productDetails)
    } else if (productCategory.value=="boysFashion") {
        allAmazonProducts[1].push(productDetails)
    } else if (productCategory.value=="electronics") {
        allAmazonProducts[2].push(productDetails)
    } else if (productCategory.value=="girlsFashion") {
        allAmazonProducts[3].push(productDetails)
    } else if (productCategory.value=="mensFashion") {
        allAmazonProducts[4].push(productDetails)
    }
    console.log(allAmazonProducts)
    productForm.reset()
    localStorage.setItem("allAmazonProducts", JSON.stringify(allAmazonProducts))
}