let computers = []
let boysFashion = []
let electronics = []
let girlsFashion = []
let mensFashion = []
let pictureURL = null
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
        productAmount: amountAvailable.value,
        productCategory: productCategory.value,
        productInformation: productInformation.value,
        photoURL: pictureURL,
        initialPrice: initialPrice.value,
        currentPrice: currentPrice.value
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
    console.log(productDetails)
    localStorage.setItem("allAmazonProducts", JSON.stringify(allAmazonProducts))
    productForm.reset()
    productPicture.style.backgroundImage = ""
    productPicture.innerHTML =`<h3 class="text-center animate__animated animate__wobble text-white">Product Image</h3>`
}

document.getElementById("productFile").addEventListener('change', ()=>{
    const file = productFile.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', ()=>{
        productPicture.style.backgroundImage = `url(${reader.result})`
        productPicture.innerHTML = ""
        pictureURL = reader.result
    })
    reader.readAsDataURL(file)
})