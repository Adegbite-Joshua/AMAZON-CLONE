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
let amazonCart = []
if (localStorage.amazonCart) {
    amazonCart = JSON.parse(localStorage.getItem("amazonCart"))
}
let allOrderedAmount = 0;
let priceSum = 0;
amazonCart.map((item, index)=>{
    allOrderedAmount += Number(item.productAmount)
    console.log(item.productAmount);
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
document.querySelector(".buttonGrid1").addEventListener("click", ()=>{
    gridList.scrollLeft = -gridList.scrollWidth/1.5;
})
document.querySelector(".buttonGrid2").addEventListener("click", ()=>{
    gridList.scrollLeft = gridList.scrollWidth/1.5;
})