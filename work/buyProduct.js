let allAmazonProducts = JSON.parse(localStorage.getItem("allAmazonProducts"))
let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))
let productIndex = Number(localStorage.getItem("productIndex"))
// let user = allAmazonCustomers[currentAmazonUser]
let product = allAmazonProducts[productCategoryIndex][productIndex]
let allAmazonCustomers;
let currentAmazonUser;


productImage.src = product.photoURL
productName.innerText = product.productName
productDescription.innerText = product.productInformation
document.querySelectorAll("#productPrice").forEach(element => {
    element.innerText = product.currentPrice
})
document.querySelectorAll("#brand").forEach(element => {
    element.innerText = product.productBrand
})
color.innerText = product.productColor
document.querySelectorAll("#compatibleDevices").forEach(element => {
    element.innerText = product.productCompatibleDevices
})
compatiblePhone.innerText = product.productCompatiblePhone
material.innerText = product.productMaterial
let allStar = "";
for (let i = 1; i <= product.productRating; i++) {
    allStar += `<i class="fas fa-star"></i>`
}
for (let j = 0; j < Math.abs((product.productRating-5)); j++) {
    allStar += `<i class="fas fa-star checked"></i>`        
}
console.log(allStar);
starRating.innerHTML = `${allStar}`
let productDiscount = ((product.initialPrice - product.currentPrice)/product.initialPrice)*100
discount.innerText = `-${productDiscount}%`
for(let i=1; i<=100; i++){
    productAmounts.innerHTML += `
    <option value="${i}">${i}</option>
    `
}
console.log(window.navigator)
let amazonCart = []

document.querySelectorAll("#carouselImg").forEach(element =>{
    element.src = product.photoURL
})

const addToCart =()=>{
    if (localStorage.amazonCart) {
        amazonCart = JSON.parse(localStorage.getItem("amazonCart"))
    }
    let productDetails ={
        categoryIndex: productCategoryIndex,
        productIndex: productIndex,
        productAmount: productAmounts.value
    } 
    if (allAmazonProducts[productCategoryIndex][productIndex]<5) {
        allAmazonProducts[productCategoryIndex][productIndex] += 0.5
    }
    amazonCart.push(productDetails)
    localStorage.setItem("allAmazonProducts", JSON.stringify(allAmazonProducts))
    localStorage.setItem("amazonCart", JSON.stringify(amazonCart))
    window.location.href = "addToCart.html"
}

const buyNow =()=>{
    if (!localStorage.currentAmazonUser) {
        alert("You have to sign in first to be able to buy product")
        window.location.href = "signIn.html"
    } else {
        payWithPaystack()
    }

}
const payWithPaystack= ()=> {
    allAmazonCustomers = JSON.parse(localStorage.getItem("allAmazonCustomers"))
    currentAmazonUser = Number(localStorage.getItem("currentAmazonUser"))
    let user = allAmazonCustomers[currentAmazonUser]
    let handler = PaystackPop.setup({
      key: "pk_test_020bedb6004bb3a95bb5589b33405add7e4e79a2",
      email: user.contactInfo,
      amount: (product.currentPrice*productAmounts.value) * 100,
      ref: "PROADE" + Math.floor(Math.random() * 10000000 + 1),
      onClose: ()=> {
        let message = "You just cancel this transaction";
        Swal.fire({
          icon: "error",
          title: "Dear " + `${user.firstName} ${user.lastName}`,
          text: message,
          footer:
            "For further assistance or enquiry, please call us at +2347015886456 or email us at adegbitejoshua07@gmail.com",
        });
        alert("We will love to have you back")
        // window.location.href = "ïndex.html"
      },
      callback: (response)=> {
        let message ="Payment completed! Your Reference Number is: " + response.reference;
        Swal.fire({
          icon: "success",
          title: "Thank You " + `${user.firstName} ${user.lastName}`,
          text: message,
          footer: 'Your Order is on the way. Your order is expected to be deliverd to you on or before the agreed date. Click <a href="#">here</a> '+"to track your order"
        });
        alert("Thanks for transacting with us")
        window.location.href = "ïndex.html"
      },
    });
  
    handler.openIframe();
  }
