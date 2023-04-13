import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

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
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
const database = getDatabase();
let allAmazonCustomers = [];
let lastUserIndex = 0;


function viewSignUp() {
    signInDiv.style.display = "none"
    signUpDiv.style.display = "block"
}
function viewSignIn() {
    signInDiv.style.display = "block"
    signUpDiv.style.display = "none"
}

const chatRef = ref(database, `allAmazonCustomers`);
onValue(chatRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
    allAmazonCustomers = data
    lastUserIndex = allAmazonCustomers.length        
    }
});
document.getElementById("signInGoogle").addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const userInfo = result.user;
            let foundUser = false
            allAmazonCustomers.map((user) => {
                if (userInfo.uid == user.userId) {
                    alert("found user")
                    foundUser = true
                }
            })
            if (foundUser) {
                alert("Welcome back!!!")
                window.location.href = "index.html"
            } else {
                let customerDetails = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    contactInfo: info,
                    password: password.value,
                    index: lastUserIndex,
                    address: false,
                    card: false,
                    todo: ""
                }
                allAmazonCustomers.push(customerDetails)
                saveData()
                alert("you have successfully created an account")
                window.location.href = "index.html"
            }
        }).catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // const emailError = error.customData.email;
            // const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(error);

        });
})

const saveData = () => {
    let allAmazonCustomersRef = ref(database, `allAmazonCustomers`)
    set(allAmazonCustomersRef, allAmazonCustomers)
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