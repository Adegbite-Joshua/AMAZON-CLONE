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


const addProduct =()=>{
    let productDetails = {
        productName: productName.value,
        productDescription: productDescription.value,
        productAmount: amountAvailable.value,
        productCategory: productCategory.value,
        productInformation: productInformation.value,
        photoURL: pictureURL,
        initialPrice: initialPrice.value,
        currentPrice: currentPrice.value,
        productColor: productColor.value,
        productBrand: productBrand.value,
        productCompatibleDevices: compatibleDevices.value,
        productCompatiblePhone: compatiblePhone.value,
        productModels: productModels.value,
        productMaterial: productMaterial.value,
        productRating: initialStarRating.value
    }
    if (productCategory.value=="computers") {
        allAmazonProducts[0].push(productDetails)
    } else if (productCategory.value=="boysFashion") {
        allAmazonProducts[1].push(productDetails)
    } else if (productCategory.value=="electronics") {
        allAmazonProducts[2].push(productDetails)
    } else if (productCategory.value=="girlsFashion") {
        allAmazonProducts[3].push(productDetails)
    } else if (productCategory.value=="mensFashion") {
        allAmazonProducts[4].push(productDetails)
    }
    console.log(productDetails)
    saveData()
   
    const videoStorageRef = storageRef(storage, `${newName}`);
    const uploadTask = uploadBytesResumable(videoStorageRef, productFile.files[0]);
    uploadTask.on("state-changed", (snapshot) => {
        let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        displayProgress.innerHTML = `
            <div style="height: 30px; width: 100%;" class="progress" role="progressbar" aria-label="Animated striped" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
                <div style="height: 30px; width: ${progress}%;" class="progress-bar progress-bar-striped progress-bar-animated">Your post progress is ${progress} %</div>
            </div>
            `
    }, (error) => {
        
    }, () => {
        displayProgress.innerHTML = ""
        alert("Upload successful")
    })

    productForm.reset()
    productPicture.style.backgroundImage = ""
    productPicture.innerHTML =`<h3 class="text-center animate__animated animate__wobble text-white">Product Image</h3>`
}

document.getElementById("productFile").addEventListener('change', ()=>{
    const file = productFile.files[0]
    const reader = new FileReader()

    reader.addEventListener('load', ()=>{
        productPicture.style.backgroundImage = `url(${reader.result})`
        productPicture.innerHTML = ""
    })
    reader.readAsDataURL(file)
})
const saveData = () => {
    let allAmazonProductsRef = ref(database, `allAmazonProducts`)
    set(allAmazonProductsRef, allAmazonProducts)
}


window.addProduct = addProduct