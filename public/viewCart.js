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
let currentAmazonUserId = null
let currentAmazonUser = null



onAuthStateChanged(auth, (user) => {
  if (user) {
     console.log(user);
     currentAmazonUserId = user.uid;
  //    window.user = user	          
  }
});
const allAmazonCustomersRef = ref(database, `allAmazonCustomers`);
onValue(allAmazonCustomersRef, (snapshot) => {
  console.log(snapshot.val());
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
        lastProductIndex = allAmazonProducts.length
        displayCarts()        
        // }
    });
});



let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))
let amazonCart = JSON.parse(localStorage.getItem("amazonCart"))
console.log(allAmazonProducts)
console.log(productCategoryIndex);
console.log(amazonCart);


const displayCarts =()=>{
  displayCart.innerHTML = ""
  if (amazonCart.length>0) {
    amazonCart.map((item, index)=>{
        console.log(item)
        displayCart.innerHTML += `
        <div class="w-100 d-flex pt-3">
        <img src="${allAmazonProducts[item.categoryIndex][item.productIndex].photoURL}" class="w-25 h-100" alt="">
        <div class="">
          <h3>${allAmazonProducts[item.categoryIndex][item.productIndex].productInformation}</h3>
          <small>In Stock</small>
          <p>Eligible for FREE Shipping & <a href="">FREE Returns</a></p>
          <input type="checkbox" name="" id="" class="mt-1 d-none d-md-inline"><p class="d-none d-md-inline ms-2 mt-1">This is a gift <a href="">Learn more</a></p>
          <p class="d-none d-md-block"><strong>Style:</strong> Basic</p>
          <p class="d-md-none">#${allAmazonProducts[item.categoryIndex][item.productIndex].currentPrice}</p>
          <select name="" id="productAmount${String(item.categoryIndex) + String(item.productIndex)}" onchange="changeQuantity(${item.categoryIndex}, ${item.productIndex}, ${index})" class="form-control" style="width: 70px; display: inline;">
            <option value="0">0(Delete)</option>
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10+">10+</option>
          </select> 
          <input type="number" value="${amazonCart[index].productAmount}" id="inputFile${index}" style="display: none; width: 70px;"  class="form-control">
          <button id="updateButton${index}" onclick="updateAmount(${index})" style="display: none;" class="btn btn-warning"><small>Update</small></button>
          |
          <small onclick="deleteItem(${index})"> Delete</small> |
          <small> Save for later</small>|
          <small> Compare with similar Items</small>|
          <small> Share</small>
        </div>
        <div class="d-none d-md-block ms-auto">
          #${allAmazonProducts[item.categoryIndex][item.productIndex].currentPrice}
        </div>
      </div>
      <hr class="my-2">
        `
    })
  } else{
    displayCart.innerHTML = `
      <div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <div>
          <h3>No items in your cart yet, kindly add products to your carts to view them here</h3>
          <p class="text-center"><small>No product has been added yet</small></p>
        </div>
      </div>
    `
        
  }
displayDetails()
displayRelated()
isFetchingData = false
if (!isFetchingData) {
    loadingData.style.display = "none"
}
}

const displayDetails =()=>{
  let allOrderedAmount = 0
  let priceSum = 0
  amazonCart.map((item, index)=>{
    allOrderedAmount += Number(item.productAmount)
    priceSum += item.productAmount*allAmazonProducts[item.categoryIndex][item.productIndex].currentPrice 
    if (item.productAmount>=1 || item.productAmount<= 9) {
      document.getElementById(`productAmount${String(item.categoryIndex) + String(item.productIndex)}`)[item.productAmount].selected = true
    }
  })
  for (let i = 0; i < document.querySelectorAll(".itemNumber").length; i++) {
    if (allOrderedAmount==1) {
      document.querySelectorAll(".itemNumber")[i].innerText = `${allOrderedAmount} item`
    } else if (allOrderedAmount>=2) {
      document.querySelectorAll(".itemNumber")[i].innerText = `${allOrderedAmount} items`
    }
  }
  for (let j = 0; j < document.querySelectorAll(".allProductPrice").length; j++) {
      document.querySelectorAll(".allProductPrice")[j].innerText = priceSum
  }
    
}

const changeQuantity =(categoryIndex, productIndex, cartIndex)=>{
    const item = document.getElementById(`productAmount${String(categoryIndex) + String(productIndex)}`)
    if (item.value==0) {
        deleteItem(cartIndex)
    } else if (item.value>=1 && item.value<=9) {
      // console.log(item.value)
      amazonCart[cartIndex].productAmount = Number(item.value)
      localStorage.setItem("amazonCart", JSON.stringify(amazonCart))
      saveData2()
    } else if (item.value== "10+") {
      document.getElementById("inputFile"+cartIndex).style.display = "inline"
      document.getElementById("inputFile"+cartIndex).focus()
      document.getElementById("updateButton"+cartIndex).style.display = "inline"
      item.style.display = "none"
    }
    displayDetails()
}

const deleteItem =(index)=>{
    amazonCart.splice(index, 1)
    localStorage.setItem("amazonCart", JSON.stringify(amazonCart))
    saveData2()
    displayCarts()
}

const displayRelated =()=>{
    let number = Math.round((Math.round(Math.random()*4)))
    console.log(number)
    if (productCategoryIndex!=number) {
      displayRelatedGrid.innerHTML = ""
      allAmazonProducts[number].map((item, index)=>{
        // amazonCart.map((items)=>{
          // if (index!=) {
            displayRelatedGrid.innerHTML +=`
              <div class="d-flex w-100 mb-2" style="height: 300px;">
                <img src="${item.photoURL}" class="w-50 h-100" alt="">
                <div class="h-100 w-50">
                  <a href="">${item.productInformation}</a>
                  <p>Stars 6789</p>
                  <p class="text-danger">$123</p>
                  <button class="btn btn-warning w-75 rounded-pill my-1" onclick="addToCart(${number}, ${index})">Add to Cart</button>
                </div>
              </div>
          `
          // }
        // })
      })
    } else{
      displayRelated()
    }
}

const addToCart =(categoryIndexC, productIndexC)=>{
  let productDetails = {
      categoryIndex: categoryIndexC,
      productIndex: productIndexC,
      productAmount: 1
  } 
  if (allAmazonProducts[productCategoryIndex][productIndex].productRating <5) {
      allAmazonProducts[productCategoryIndex][productIndex].productRating += Number(0.5)
      saveData()
  }
  amazonCart.push(productDetails)
  localStorage.setItem("amazonCart", JSON.stringify(amazonCart))
  saveData2()
  window.location.href = "addToCart.html"
}

const updateAmount =(index)=>{
    amazonCart[index].productAmount = document.getElementById("inputFile"+index).value
    saveData2()
    displayDetails()
    document.getElementById("inputFile"+index).style.display = "none"
    document.getElementById("updateButton"+index).style.display = "none"
    document.getElementById(`productAmount${String(amazonCart[index].categoryIndex) + String(amazonCart[index].productIndex)}`).style.display = "inline"
}

const saveData = () => {
  let allAmazonProductsString = JSON.stringify(allAmazonProducts)
  let allAmazonProductsRef = ref(database, `allAmazonProducts`)
  set(allAmazonProductsRef, allAmazonProductsString)
}

const saveData2 = () => {
  allAmazonCustomers[currentAmazonUser].cart = JSON.parse(localStorage.getItem("amazonCart"))
  let allAmazonCustomersString = JSON.stringify(allAmazonCustomers)
  let allAmazonCustomersRef = ref(database, `allAmazonCustomers`)
  set(allAmazonCustomersRef, allAmazonCustomersString)
}



window.deleteItem = deleteItem
window.changeQuantity = changeQuantity
window.addToCart = addToCart
window.updateAmount = updateAmount
// window.onload = displayCarts()