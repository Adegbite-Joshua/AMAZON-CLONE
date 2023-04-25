import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
// import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-storage.js";




const firebaseConfig = {
    apiKey: "AIzaSyBiG0j2LsAD46QAci4vAYQ2nSRLGAUApNI",
    authDomain: "proade-3e60a.firebaseapp.com",
    databaseURL: "https://proade-3e60a-default-rtdb.firebaseio.com",
    projectId: "proade-3e60a",
    storageBucket: "proade-3e60a.appspot.com",
    messagingSenderId: "590803437805",
    appId: "1:590803437805:web:8633073abee114c61de4e4"
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
let amazonCart = []
let pictureURL = null
let allAmazonProducts = [
    computers,
    boysFashion,
    electronics,
    girlsFashion,
    mensFashion
]
let isFetchingData = true
if (isFetchingData) {
    loadingData.style.display = "block"
}
let lastUserIndex = 0;
let lastProductIndex = 0;
let currentAmazonUser = null
let currentAmazonUserId = null
let foundUser = false


onAuthStateChanged(auth, (user) => {
    if (user) {
       console.log(user);
       currentAmazonUserId = user.uid;
       foundUser = true;
    //    window.user = user	          
    }
});
const allAmazonCustomersRef = ref(database, `allAmazonCustomers`);
onValue(allAmazonCustomersRef, (snapshot) => {
    allAmazonCustomers = JSON.parse(snapshot.val());
    console.log(allAmazonCustomers);
    allAmazonCustomers.map((user, index)=>{
        if (user.userId == currentAmazonUserId) {
            currentAmazonUser = index
        }
    })
    // if (data) {
    // allAmazonCustomers = data
    // }

    const allAmazonProductsRef = ref(database, `allAmazonProducts`);
    onValue(allAmazonProductsRef, (snapshot) => {
        allAmazonProducts = JSON.parse(snapshot.val());
        // if (data) {
        // allAmazonProducts = JSON.parse(data)
        console.log(allAmazonProducts);
        lastProductIndex = allAmazonProducts.length
        displayAllProducts()        
        // }
    });
});



let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))
let productIndex = Number(localStorage.getItem("productIndex"))
let user = null

const displayAllProducts =()=>{
    user = allAmazonCustomers[currentAmazonUser]
    let product = allAmazonProducts[productCategoryIndex][productIndex]
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

    document.querySelectorAll("#carouselImg").forEach(element =>{
        element.src = product.photoURL
    })
    isFetchingData = false
    if (!isFetchingData) {
        loadingData.style.display = "none"
    }
}

const addToCart =()=>{
    if (localStorage.amazonCart) {
        amazonCart = JSON.parse(localStorage.getItem("amazonCart"))
    }
    let productDetails ={
        categoryIndex: productCategoryIndex,
        productIndex: productIndex,
        productAmount: productAmounts.value
    } 
    if (allAmazonProducts[productCategoryIndex][productIndex].productRating <5) {
        allAmazonProducts[productCategoryIndex][productIndex].productRating += Number(0.5)
        saveData()
    }
    amazonCart.push(productDetails)
    localStorage.setItem("amazonCart", JSON.stringify(amazonCart))
    console.log(allAmazonCustomers[currentAmazonUser]);
    allAmazonCustomers[currentAmazonUser].cart = JSON.parse(localStorage.getItem("amazonCart"))
    saveData2()
    window.location.href = "addToCart.html"
}

const buyNow =()=>{
    if (!foundUser) {
        Swal.fire({
            icon: "info",
            title: "Dear Customer",
            text: "You have to sign in first to be able to buy product",
            footer:
              "For further assistance or enquiry, please call us at +2347015886456 or email us at adegbitejoshua07@gmail.com",
        })
        .then(()=>{
        window.location.href = "index.html"
        })
        // alert("You have to sign in first to be able to buy product")
        // window.location.href = "signIn.html"
    } else {
        payWithPaystack()
    }

}

const payWithPaystack= ()=> {
    // allAmazonCustomers = JSON.parse(localStorage.getItem("allAmazonCustomers"))
    // currentAmazonUser = Number(localStorage.getItem("currentAmazonUser"))
    let user = allAmazonCustomers[currentAmazonUser]
    let handler = PaystackPop.setup({
      key: "pk_test_020bedb6004bb3a95bb5589b33405add7e4e79a2",
      email: "adegbitejoshua07@gmail.com",  //user.contactInfo,
      amount: (product.currentPrice*productAmounts.value) * 100,
      ref: "PROADE" + Math.floor(Math.random() * 10000000 + 1),
      onClose: ()=> {
        Swal.fire({
          icon: "error",
          title: "Dear " + `${user.name}`,
          text: "You just cancel this transaction.",
          footer: "For further assistance or enquiry, please call us at +2347015886456 or email us at adegbitejoshua07@gmail.com",
        });
        // alert("We will love to have you back")
        // window.location.href = "index.html"
      },
      callback: (response)=> {
        Swal.fire({
          icon: "success",
          title: "Thank You " + `${user.name}`,
          text: `Payment completed! Your Reference Number is: ${response.reference}`,
          footer: 'Your Order is on the way. Your order is expected to be deliverd to you on or before the agreed date. Click <a href="#">here</a> '+"to track your order"
        });
        // alert("Thanks for transacting with us")
        window.location.href = "index.html"
      },
    });
  
    handler.openIframe();
  }


const saveData = () => {
    let allAmazonProductsString = JSON.stringify(allAmazonProducts)
    let allAmazonProductsRef = ref(database, `allAmazonProducts`)
    set(allAmazonProductsRef, allAmazonProductsString)
}
const saveData2 = () => {
    let allAmazonCustomersString = JSON.stringify(allAmazonCustomers)
    let allAmazonCustomersRef = ref(database, `allAmazonCustomers`)
    set(allAmazonCustomersRef, allAmazonCustomersString)
}


window.addToCart = addToCart
window.buyNow = buyNow
window.payWithPaystack = payWithPaystack
