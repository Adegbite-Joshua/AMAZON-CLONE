import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";




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
const storage = getStorage();
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
    // allAmazonCustomers = data
    // }
    const allAmazonProductsRef = ref(database, `allAmazonProducts`);
    onValue(allAmazonProductsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
        allAmazonProducts = JSON.parse(data)
        lastProductIndex = allAmazonProducts.length        
        }
        isFetchingData = false
        if (!isFetchingData) {
            loadingData.style.display = "none";
        }
    });
});


const addProduct =()=>{
    let newName = Math.round(Math.random()*1000000)+`${productFile.files[0].name}`
    const imageStorageRef = storageRef(storage, `${newName}`);
    const uploadTask = uploadBytesResumable(imageStorageRef, productFile.files[0]);
    uploadTask.on("state-changed", (snapshot) => {
        console.log(snapshot);
        let progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        displayProgress.innerHTML = `
            <div style="height: 30px; width: 100%;" class="progress" role="progressbar" aria-label="Animated striped" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
                <div style="height: 30px; width: ${progress}%;" class="progress-bar progress-bar-striped progress-bar-animated">Your post progress is ${progress} %</div>
            </div>
            `
    }, (error) => {
          
    }, (res) => {
        displayProgress.innerHTML = ""
        alert("Upload successful")
        console.log(res)
        getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
            console.log(url)
            let productDetails = {
                productName: productName.value,
                productDescription: productDescription.value,
                productAmount: amountAvailable.value,
                productCategory: productCategory.value,
                productInformation: productInformation.value,
                photoName: newName,
                photoURL: url,
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
            console.log(allAmazonProducts)
            saveData()
            console.log(newName);
            productForm.reset()
            productPicture.style.backgroundImage = ""
            productPicture.innerHTML =`<h3 class="text-center animate__animated animate__wobble text-white">Product Image</h3>`
        })
        .catch((error) => {
            console.log(error)
            // Handle any errors
        });
    })
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
    let allAmazonProductsString = JSON.stringify(allAmazonProducts)
    let allAmazonProductsRef = ref(database, `allAmazonProducts`)
    set(allAmazonProductsRef, allAmazonProductsString)
}


window.addProduct = addProduct