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
let isFetchingData = true
if (isFetchingData) {
    loadingData.style.display = "block"
}
let lastUserIndex = 0;
let lastProductIndex = 0;
let currentAmazonUser = null
let currentAmazonUserId = null


onAuthStateChanged(auth, (user) => {
    if (user) {
        currentAmazonUserId = user.uid;	          
    }
  });
const chatRef = ref(database, `allAmazonCustomers`);
onValue(chatRef, (snapshot) => {
    allAmazonCustomers = JSON.parse(snapshot.val());
    allAmazonCustomers.map((user, index)=>{
        if (user.userId === currentAmazonUserId) {
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
        lastProductIndex = allAmazonProducts.length        
        // }
        displayAllProducts()
    });
});



let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))
let productIndex = Number(localStorage.getItem("productIndex"))
let amazonCart = []
if (localStorage.amazonCart) {
    amazonCart = JSON.parse(localStorage.getItem("amazonCart"))
}
let allOrderedAmount = 0;
let priceSum = 0;

const displayAllProducts =()=>{
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
    isFetchingData = false
    if (!isFetchingData) {
        loadingData.style.display = "none"
    }
}


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
    if (allAmazonProducts[productCategoryIndex][productIndex].productRating < 5) {
        let newStarRating = Number(allAmazonProducts[productCategoryIndex][productIndex].productRating) + Number(0.5)
        allAmazonProducts[productCategoryIndex][productIndex].productRating = newStarRating
        saveData()
    }
    amazonCart.push(productDetails)
    localStorage.setItem("allAmazonProducts", JSON.stringify(allAmazonProducts))
    localStorage.setItem("amazonCart", JSON.stringify(amazonCart))
    allAmazonCustomers[currentAmazonUser].cart = JSON.parse(localStorage.getItem("amazonCart"))
    saveData2()
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

const focusYellowBorder =()=>{
    document.querySelectorAll('yellowBorderHover').classList.add("yellowBorderHover")
}

const closePop =()=>{
    sideNav2.style.display = "none"
}

window.closePop = closePop
window.focusYellowBorder = focusYellowBorder
window.addToCart = addToCart

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