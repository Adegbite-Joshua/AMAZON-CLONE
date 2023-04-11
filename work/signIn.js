function viewSignUp() {
    signInDiv.style.display = "none"
    signUpDiv.style.display = "block"
}
function viewSignIn() {
    signInDiv.style.display = "block"
    signUpDiv.style.display = "none"
}

let allAmazonCustomers = [];
let currentAmazonUser;
if (localStorage.allAmazonCustomers) {
    allAmazonCustomers = JSON.parse(localStorage.getItem("allAmazonCustomers"))
}
if (localStorage.currentAmazonUser){
    window.location.href = "chooseAddress.html"
}


const signUp =()=>{
    let info = null
    if (document.getElementById('showNumber').style.display==='none') {
        info = document.getElementById('number').value
        console.log(info)
    } else if (document.getElementById('showMail').style.display==='none') {
        info = document.getElementById('mail').value
        console.log(info)
    }
    let customerDetails = {
        firstName: firstName.value,
        lastName: lastName.value,
        contactInfo: info,
        password: password.value,
        address: false,
        card: false,
        // country: null,
        // state: null,
        // city: null,
        // zipCode: null,
        // street: null,
        // buildingNumber: null,
        // cardDetails: {
        //     cardNumber: null,
        //     cardExpiryDate: null,
        //     cardCCV: null,
        // }
    }
    allAmazonCustomers.push(customerDetails)
    localStorage.setItem('allAmazonCustomers', JSON.stringify(allAmazonCustomers))
}
const changeContact =(show, hide, showing, hidding)=>{
    document.getElementById(hide).style.display='none';
    document.getElementById(show).style.display='block';
    document.getElementById(showing).style.display='inline'
    document.getElementById(hidding).style.display='none'

}

const signIn =()=>{
    // alert('yes')
    allAmazonCustomers.map((user, index)=>{
        if (user.contactInfo==loginInput.value) {
            localStorage.setItem('currentAmazonUser', index)
            window.location.href = "chooseAddress.html"
        }
    })
}