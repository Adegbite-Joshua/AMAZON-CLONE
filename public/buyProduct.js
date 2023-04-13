import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";




const firebaseConfig = {
    apiKey: "AIzaSyDz-T57-l5UejPf9OCZka4FlQHbwhx6OEY",
    authDomain: "proade-39b34.firebaseapp.com",
    databaseURL: "https://proade-39b34-default-rtdb.firebaseio.com",
    projectId: "proade-39b34",
    storageBucket: "proade-39b34.appspot.com",
    messagingSenderId: "772406186375",
    appId: "1:772406186375:web:553c2601fc076fc3fd4322"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();
let allAmazonCustomers = [];
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
let lastUserIndex = 0;
let lastProductIndex = 0;


const chatRef = ref(database, `allAmazonCustomers`);
onValue(chatRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
    allAmazonCustomers = data
    }
});
const allAmazonProductsRef = ref(database, `allAmazonProducts`);
onValue(allAmazonProductsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
    allAmazonProducts = data
    lastProductIndex = allAmazonProducts.length        
    }
});


let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))
let productIndex = Number(localStorage.getItem("productIndex"))
// let user = allAmazonCustomers[currentAmazonUser]
let product = allAmazonProducts[productCategoryIndex][productIndex]
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
document.querySelectorAll("#color").forEach(element => {
    element.innerText = product.productColor
});
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
      email: "adegbitejoshua07@gmail.com",//user.contactInfo,
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
        window.location.href = "index.html"
      },
    });
  
    handler.openIframe();
  }
