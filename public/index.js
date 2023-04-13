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


allAmazonProducts.map((category, index)=>{
    if (category.length>0) {
        displayProductDiv.innerHTML += `
        <div class="border border-2 productDiv" onclick="viewCategory(${index})" id="productDiv${category[0].productName}"></div>
    `
    let filteredCategory = category.filter((items, index)=>index<=3)
    filteredCategory.map((item, iteemIndex)=>{
            document.getElementById("productDiv"+ category[0].productName).innerHTML += `
            <img src="${item.photoURL}" class="w-100 h-100 mainPics" />
        `
    })
    }
})
document.querySelector(".buttonLeft").addEventListener("click", ()=>{
    gridList.scrollLeft = -gridList.scrollWidth/1.5;
})
document.querySelector(".buttonRight").addEventListener("click", ()=>{
    gridList.scrollLeft = gridList.scrollWidth/1.5;
})
document.querySelector(".buttonLeft1").addEventListener("click", ()=>{
    gridList1.scrollLeft = -gridList1.scrollWidth/1.5;
})
document.querySelector(".buttonRight1").addEventListener("click", ()=>{
    gridList1.scrollLeft = gridList1.scrollWidth/1.5;
})
const focusYellowBorder =()=>{
    yellowBorderHover.classList.add("yellowBorderHover")
}
const viewCategory =(productCategoryIndex)=>{
    localStorage.setItem("productCategoryIndex", productCategoryIndex)
    window.location.href = "productCategory.html"
}
let gridIndex = Math.round(Math.random()*4);
if (allAmazonProducts[gridIndex].length>0) {
    allAmazonProducts[gridIndex].map((item, index)=>{
        gridList.innerHTML = `<img src="${item.photoURL}" onclick="viewProduct(${gridIndex}, ${index})" class="h-100 m-2" style="width: 100px;" alt="">`
    })
}

if (allAmazonProducts[gridIndex+1].length>0) {
    allAmazonProducts[gridIndex+1].map((item, index)=>{
        gridList1.innerHTML = `<img src="${item.photoURL}" onclick="viewProduct(${gridIndex+1}, ${index})" class="h-100 m-2" style="width: 100px;" alt="">`
    })
}
if (allAmazonProducts[gridIndex+2].length>0) {
    allAmazonProducts[gridIndex+2].map((item, index)=>{
        if (index<=3) {
            categoryBlock.innerHTML += `
            <div class="border border-2" style="height: 400px;" onclick="viewProduct(${gridIndex+2}, ${index})">
                <h3>${item.productName}</h3>
                <img src="../61TD5JLGhIL._SX3000_.jpg" class="h-75 d-block mx-auto w-100" alt="">
            </div>
            `
        } else{
            return;
        }
    })
    
}


const viewProduct =(productCategoryIndex, productIndex)=>{
    localStorage.setItem("productCategoryIndex", productCategoryIndex)
    localStorage.setItem("productIndex", productIndex)
    window.location.href = "buyProduct.html"
}
