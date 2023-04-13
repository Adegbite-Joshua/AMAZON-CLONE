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

const viewProduct =(productIndex)=>{
    localStorage.setItem("productIndex", productIndex)
    window.location.href = "buyProduct.html"
}