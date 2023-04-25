import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

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
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase();
let allAmazonCustomers = [];
let lastUserIndex = 0;
let customerDetails = null;
let isFetchingData = true
if (isFetchingData) {
    loadingData.style.display = "block"
}

function viewSignUp() {
    signInDiv.style.display = "none"
    signUpDiv.style.display = "block"
}
function viewSignIn() {
    signInDiv.style.display = "block"
    signUpDiv.style.display = "none"
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user);
        window.location.href = "chooseAddress.html"         
    }
});


const allAmazonCutomersRef = ref(database, `allAmazonCustomers`);
onValue(allAmazonCutomersRef, (snapshot) => {
    const data = JSON.parse(snapshot.val());
    if (data) {
    // console.log(data);
    allAmazonCustomers = data;
    lastUserIndex = allAmazonCustomers.length        
    }
    isFetchingData = false
    if (!isFetchingData) {
        loadingData.style.display = "none"
    }
});
document.getElementById("signInGoogle").addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const userInfo = result.user;
            let foundUser = false
            console.log(userInfo);
            allAmazonCustomers.map((user) => {
                if (userInfo.uid == user.userId) {
                    foundUser = true
                }
            })
            if (foundUser) {            
                Swal.fire({
                    icon: "success",
                    title: "Account Exists",
                    text: "Found User. Welcome Back!",
                    button: {
                        text: "Continue",
                        className: "btn btn-succes d-block mx-auto",
                    },
                    footer: '',
                  }).then((result) => {
                    // window.location.href = "chooseAddress.html"
                  });
            } else {
                customerDetails = {
                    name: userInfo.displayName,
                    phoneNumber: `${userInfo.phoneNumber}`,
                    email: userInfo.email,
                    userId: userInfo.uid,
                    index: lastUserIndex,
                    address: false,
                    card: false,
                    todo: "",
                    cart: []
                }
                allAmazonCustomers.push(customerDetails)
                saveData()
                Swal.fire({
                    icon: "success",
                    title: "",
                    text: "Signed up successfully!",
                    button: {
                        text: "Continue",
                        className: "btn btn-succes d-block mx-auto",
                    },
                    footer: '',
                  }).then((result) => {
                    // window.location.href = "chooseAddress.html"
                  });
            }
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "There is error signing you in, please try again later",
                button: {
                    text: "Okay",
                    className: "btn btn-succes d-block mx-auto",
                },
                footer: '',
              })
        });
})

const saveData = () => {
    let allAmazonCustomersString = JSON.stringify(allAmazonCustomers)
    let allAmazonCustomersRef = ref(database, `allAmazonCustomers`);
    set(allAmazonCustomersRef, allAmazonCustomersString)
}



// const signUp =()=>{
//     // let info = null
//     // if (document.getElementById('showNumber').style.display==='none') {
//     //     info = document.getElementById('number').value
//     //     console.log(info)
//     // } else if (document.getElementById('showMail').style.display==='none') {
//     //     info = document.getElementById('mail').value
//     //     console.log(info)
//     // }
//     let customerDetails = {
//         firstName: firstName.value,
//         lastName: lastName.value,
//         contactInfo: info,
//         password: password.value,
//         address: false,
//         card: false
//     }
//     allAmazonCustomers.push(customerDetails)
//     localStorage.setItem('allAmazonCustomers', JSON.stringify(allAmazonCustomers))
// }
// const changeContact =(show, hide, showing, hidding)=>{
//     document.getElementById(hide).style.display='none';
//     document.getElementById(show).style.display='block';
//     document.getElementById(showing).style.display='inline'
//     document.getElementById(hidding).style.display='none'

// }

// const signIn =()=>{
//     // alert('yes')
//     allAmazonCustomers.map((user, index)=>{
//         if (user.contactInfo==loginInput.value) {
//             localStorage.setItem('currentAmazonUser', index)
//             window.location.href = "chooseAddress.html"
//         }
//     })
// }

window.viewSignIn = viewSignIn
window.viewSignUp = viewSignUp