import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
// import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";


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
// const storage = getStorage();
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
let isFetchingData = true
if (isFetchingData) {
    loadingData.style.display = "block"
}

const allAmazonCustomersRef = ref(database, `allAmazonCustomers`);
onValue(allAmazonCustomersRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
    allAmazonCustomers = data
    }
});
const allAmazonProductsRef = ref(database, `allAmazonProducts`);
onValue(allAmazonProductsRef, (snapshot) => {
    console.log(snapshot);
    allAmazonProducts = JSON.parse(snapshot.val());
    // if (data) {
    // allAmazonProducts = data
    // console.log(data)
    console.log(allAmazonProducts)
    displayAllProducts()
    lastProductIndex = allAmazonProducts.length        
    // }
});



const displayAllProducts =()=>{
    
    allAmazonProducts.map((category, index)=>{
        if (category.length>0) {
            displayProductDiv.innerHTML += `
            <div class="border border-2 productDiv" onclick="viewCategory(${index})" id="productDiv${category[0].productName}"></div>
        `
        console.log(`productDiv${category[0].productName}`)
        let filteredCategory = category.filter((items, index)=>index<=3)
        filteredCategory.map((item, itemIndex)=>{

                document.getElementById(`productDiv${category[0].productName}`).innerHTML += `
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
    
    let gridIndex = Math.round(Math.random()*2);
    if (allAmazonProducts[gridIndex-1].length>0) {
        allAmazonProducts[gridIndex-1].map((item, index)=>{
            gridList.innerHTML = `<img src="${item.photoURL}" onclick="viewProduct(${gridIndex}, ${index})" class="h-100 m-2" style="width: 100px;" alt="">`
        })
    }
    
    if (allAmazonProducts[gridIndex].length>0) {
        allAmazonProducts[gridIndex].map((item, index)=>{
            gridList1.innerHTML = `<img src="${item.photoURL}" onclick="viewProduct(${gridIndex+1}, ${index})" class="h-100 m-2" style="width: 100px;" alt="">`
        })
    }
    
    if (allAmazonProducts[gridIndex+1].length>0) {
        allAmazonProducts[gridIndex+1].map((item, index)=>{
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
    isFetchingData = false;
    if (!isFetchingData) {
        loadingData.style.display = 'none';
    }
}


const viewProduct =(productCategoryIndex, productIndex)=>{
    localStorage.setItem("productCategoryIndex", productCategoryIndex)
    localStorage.setItem("productIndex", productIndex)
    window.location.href = "buyProduct.html"
}
const viewCategory =(productCategoryIndex)=>{
    localStorage.setItem("productCategoryIndex", productCategoryIndex)
    window.location.href = "productCategory.html"
}
const focusYellowBorder =()=>{
    yellowBorderHover.classList.add("yellowBorderHover")
}


window.focusYellowBorder = focusYellowBorder
window.viewCategory = viewCategory
window.viewProduct = viewProduct



sideTrigger.addEventListener("click", ()=>{
    sideNav2.className = "sideNav"
    sideNav2.style.display = "block"
    document.querySelector("#sideNav3").innerHTML = sideNav.innerHTML
  })

  window.onclick = (e)=>{
    // sideNav3.innerHTML = ""
    if (e.target.id=="sideNav2") {
      sideNav2.style.display = "none"
    }
  }