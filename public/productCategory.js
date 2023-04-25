import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
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


const allAmazonCustomersRef = ref(database, `allAmazonCustomers`);
onValue(allAmazonCustomersRef, (snapshot) => {
    allAmazonCustomers = JSON.parse(snapshot.val());
    // if (data) {
    // allAmazonCustomers = JSON.parse(snapshot.val());
    // }
    const allAmazonProductsRef = ref(database, `allAmazonProducts`);
    onValue(allAmazonProductsRef, (snapshot) => {
        allAmazonProducts = JSON.parse(snapshot.val());
        // if (data) {
        // allAmazonProducts = JSON.parse(data)
        lastProductIndex = allAmazonProducts.length 
        displayCategory()       
        // }
    });
});
let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))

const displayCategory =()=>{
    console.log(allAmazonProducts)
    console.log(productCategoryIndex)
    allAmazonProducts[productCategoryIndex].map((product, index)=>{
        console.log(product)
        let allStar = "";
        for (let i = 1; i <= product.productRating; i++) {
            allStar += `<i class="fas fa-star"></i>`
        }
        for (let j = 0; j < Math.abs((product.productRating-5)); j++) {
            allStar += `<i class="fas fa-star checked"></i>`        
        }
        document.querySelector(".grid_Lists").innerHTML += `
            <div class="inner">
                <img src="${product.photoURL}" onclick="viewProduct(${index})" class=""/> 
                <div class="p-3">
                    <p>${product.productName}</p>
                    <p><span>${allStar}</span> Ratings</p>
                    <p>#${product.currentPrice} - #${product.initialPrice}</p>
                </div>
            </div>
        `
    }) 
    isFetchingData = false
    if (!isFetchingData) {
        loadingData.style.display = "none"
    }
}

const viewProduct =(productIndex)=>{
    localStorage.setItem("productIndex", productIndex)
    window.location.href = "buyProduct.html"
}


window.viewProduct = viewProduct