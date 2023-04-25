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
let amazonCart = []
let user = null
let amountToPay = null
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
let currentAmazonUser = null;
let currentAmazonUserId = null




onAuthStateChanged(auth, (user) => {
  if (user) {
    currentAmazonUserId = user.uid;	        
  } else{
    Swal.fire({
      icon: "error",
      title: "Not Signed In",
      text: "You need to sign in before you can proceed to checkout",
      footer:
        "For further assistance or enquiry, please call us at +2347015886456 or email us at adegbitejoshua07@gmail.com",
    })
    .then(()=>{
      window.location.href = "signIn.html"
    })
     
  }
});

const allAmazonCustomersRef = ref(database, `allAmazonCustomers`);
onValue(allAmazonCustomersRef, (snapshot) => {
    allAmazonCustomers = JSON.parse(snapshot.val());
    allAmazonCustomers.map((user, index)=>{
        if (user.userId === currentAmazonUserId) {
            currentAmazonUser = index
        }
    })
    // if (data) {
    // allAmazonCustomers = data
    console.log(allAmazonCustomers);
  // }
  
  const allAmazonProductsRef = ref(database, `allAmazonProducts`);
  onValue(allAmazonProductsRef, (snapshot) => {
    allAmazonProducts = JSON.parse(snapshot.val());
    // if (data) {
    // allAmazonProducts = JSON.parse(data)
    lastProductIndex = allAmazonProducts.length       
    // }
    amazonCart = JSON.parse(localStorage.getItem("amazonCart"))
    displayDetails()
    });
});


// let amazonCart = allAmazonCustomers[currentAmazonUser].cart

const displayDetails =()=>{
  user = allAmazonCustomers[currentAmazonUser]
  if (user.address===true && user.card===false) {
    addressDiv.style.display = "none"
    paymentDiv.style.display = "block"
    checkOutDiv.style.display = "none"
  } else if(user.address===true&&user.card===true){
    addressDiv.style.display ="none"
    paymentDiv.style.display = "none"
    checkOutDiv.style.display = "block"
  }
  if (amazonCart==[] || amazonCart==null) {
    Swal.fire({
      icon: "info",
      title: "Dear " + `${user.name}`,
      text: "You have no item in your cart yet, kindly add some items to your cart, then you can proceed to checkout",
      footer:
        "For further assistance or enquiry, please call us at +2347015886456 or email us at adegbitejoshua07@gmail.com",
    })
    .then(()=>{
      window.location.href = "index.html"
    })
  }
  
  const response = {"DZ":{"country":"Algeria","region":"Africa"},"AO":{"country":"Angola","region":"Africa"},"BJ":{"country":"Benin","region":"Africa"},"BW":{"country":"Botswana","region":"Africa"},"BF":{"country":"Burkina Faso","region":"Africa"},"BI":{"country":"Burundi","region":"Africa"},"CV":{"country":"Cabo Verde","region":"Africa"},"CM":{"country":"Cameroon","region":"Africa"},"CF":{"country":"Central African Republic (the)","region":"Africa"},"TD":{"country":"Chad","region":"Africa"},"KM":{"country":"Comoros (the)","region":"Africa"},"CD":{"country":"Congo (the Democratic Republic of the)","region":"Africa"},"CG":{"country":"Congo (the)","region":"Africa"},"CI":{"country":"Côte d'Ivoire","region":"Africa"},"DJ":{"country":"Djibouti","region":"Africa"},"EG":{"country":"Egypt","region":"Africa"},"GQ":{"country":"Equatorial Guinea","region":"Africa"},"ER":{"country":"Eritrea","region":"Africa"},"SZ":{"country":"Eswatini","region":"Africa"},"ET":{"country":"Ethiopia","region":"Africa"},"GA":{"country":"Gabon","region":"Africa"},"GM":{"country":"Gambia (the)","region":"Africa"},"GH":{"country":"Ghana","region":"Africa"},"GN":{"country":"Guinea","region":"Africa"},"GW":{"country":"Guinea-Bissau","region":"Africa"},"KE":{"country":"Kenya","region":"Africa"},"LS":{"country":"Lesotho","region":"Africa"},"LR":{"country":"Liberia","region":"Africa"},"LY":{"country":"Libya","region":"Africa"},"MG":{"country":"Madagascar","region":"Africa"},"MW":{"country":"Malawi","region":"Africa"},"ML":{"country":"Mali","region":"Africa"},"MR":{"country":"Mauritania","region":"Africa"},"MU":{"country":"Mauritius","region":"Africa"},"YT":{"country":"Mayotte","region":"Africa"},"MA":{"country":"Morocco","region":"Africa"},"MZ":{"country":"Mozambique","region":"Africa"},"NA":{"country":"Namibia","region":"Africa"},"NE":{"country":"Niger (the)","region":"Africa"},"NG":{"country":"Nigeria","region":"Africa"},"RE":{"country":"Réunion","region":"Africa"},"RW":{"country":"Rwanda","region":"Africa"},"SH":{"country":"Saint Helena, Ascension and Tristan da Cunha","region":"Africa"},"ST":{"country":"Sao Tome and Principe","region":"Africa"},"SN":{"country":"Senegal","region":"Africa"},"SC":{"country":"Seychelles","region":"Africa"},"SL":{"country":"Sierra Leone","region":"Africa"},"SO":{"country":"Somalia","region":"Africa"},"ZA":{"country":"South Africa","region":"Africa"},"SS":{"country":"South Sudan","region":"Africa"},"SD":{"country":"Sudan (the)","region":"Africa"},"TZ":{"country":"Tanzania, the United Republic of","region":"Africa"},"TG":{"country":"Togo","region":"Africa"},"TN":{"country":"Tunisia","region":"Africa"},"UG":{"country":"Uganda","region":"Africa"},"EH":{"country":"Western Sahara*","region":"Africa"},"ZM":{"country":"Zambia","region":"Africa"},"ZW":{"country":"Zimbabwe","region":"Africa"},"AQ":{"country":"Antarctica","region":"Antarctic"},"BV":{"country":"Bouvet Island","region":"Antarctic"},"TF":{"country":"French Southern Territories (the)","region":"Antarctic"},"HM":{"country":"Heard Island and McDonald Islands","region":"Antarctic"},"GS":{"country":"South Georgia and the South Sandwich Islands","region":"Antarctic"},"AF":{"country":"Afghanistan","region":"Asia"},"AM":{"country":"Armenia","region":"Asia"},"AZ":{"country":"Azerbaijan","region":"Asia"},"BD":{"country":"Bangladesh","region":"Asia"},"BT":{"country":"Bhutan","region":"Asia"},"IO":{"country":"British Indian Ocean Territory (the)","region":"Asia"},"BN":{"country":"Brunei Darussalam","region":"Asia"},"KH":{"country":"Cambodia","region":"Asia"},"CN":{"country":"China","region":"Asia"},"GE":{"country":"Georgia","region":"Asia"},"HK":{"country":"Hong Kong","region":"Asia"},"IN":{"country":"India","region":"Asia"},"ID":{"country":"Indonesia","region":"Asia"},"JP":{"country":"Japan","region":"Asia"},"KZ":{"country":"Kazakhstan","region":"Asia"},"KP":{"country":"Korea (the Democratic People's Republic of)","region":"Asia"},"KR":{"country":"Korea (the Republic of)","region":"Asia"},"KG":{"country":"Kyrgyzstan","region":"Asia"},"LA":{"country":"Lao People's Democratic Republic (the)","region":"Asia"},"MO":{"country":"Macao","region":"Asia"},"MY":{"country":"Malaysia","region":"Asia"},"MV":{"country":"Maldives","region":"Asia"},"MN":{"country":"Mongolia","region":"Asia"},"MM":{"country":"Myanmar","region":"Asia"},"NP":{"country":"Nepal","region":"Asia"},"PK":{"country":"Pakistan","region":"Asia"},"PH":{"country":"Philippines (the)","region":"Asia"},"SG":{"country":"Singapore","region":"Asia"},"LK":{"country":"Sri Lanka","region":"Asia"},"TW":{"country":"Taiwan (Province of China)","region":"Asia"},"TJ":{"country":"Tajikistan","region":"Asia"},"TH":{"country":"Thailand","region":"Asia"},"TL":{"country":"Timor-Leste","region":"Asia"},"TM":{"country":"Turkmenistan","region":"Asia"},"UZ":{"country":"Uzbekistan","region":"Asia"},"VN":{"country":"Viet Nam","region":"Asia"},"BZ":{"country":"Belize","region":"Central America"}}
  // const allCoun = response
  // const allCountries = [allCoun]
  // const person = response;
  
  for (const key in response) {
      // console.log(`${key} => ${response[key].country}`);
      countrySelect.innerHTML += `
      <option value="${response[key].country}" class="${response[key].country}"> ${response[key].country}</option>
      `
  }
  
  if (user.address===true) {
    addressDiv.style.display = "none"
  } else{
    paymentDiv.style.display = "none"
    checkOutDiv.style.display = "none"
    userName.value = `${user.name}`
    if (user.country) {
      document.getElementById("countrySelect").getElementsByClassName(user.country)[0].selected = "true"
    } else{
      document.getElementById("countrySelect").getElementsByClassName("Nigeria")[0].selected = "true"
    }
    if (user.state) {
      state.value= "Oyo State"
    }
    if (user.city) {
      city.value = user.city
    }
    if (user.zipCode) {
      zipCode.value = user.zipCode
    }
    if (user.street) {
      street.value = user.street
    }
    if (user.buildingNumber) {
      buildingNo.value = user.buildingNumber
    }
    if (user.phoneNumber!= "null") {
      phoneNumber.value = user.phoneNumber
    }
  }
  month.innerHTML = ""
  for (let i = 1; i <= 12; i++) {
    month.innerHTML += `
    <option value="${i}">${i}</option>
  `  
  }
  year.innerHTML = ""
  for (let j = 2023; j <= 2030; j++) {
    year.innerHTML += `
    <option value="${j}">${j}</option>
  `  
  }
  let totalProductAmount = 0
  let totalProductPrice = 0
  amazonCart.map((product, index)=>{
    totalProductAmount += Number(product.productAmount)
    totalProductPrice += product.productAmount*allAmazonProducts[product.categoryIndex][product.productIndex].currentPrice 
  })
  itemsNumber.innerHTML = `Items(${totalProductAmount})`
  checkOutItemNumber.innerHTML = `${totalProductAmount} items`
  itemsPrice.innerHTML = `#${totalProductPrice}`
  shipping.innerHTML = `#${totalProductPrice/100*10}`
  beforeTax.innerHTML = `#${totalProductPrice + totalProductPrice/100*10}`
  taxAmount.innerHTML = `#${totalProductPrice/100*6}`
  amountToPay = (totalProductPrice + totalProductPrice/100*10) + totalProductPrice/100*6
  totalPayment.innerHTML = `#${amountToPay}`
  

  isFetchingData = false
  if (!isFetchingData) {
      loadingData.style.display = "none"
  }
}


const makePayment =()=>{
  document.getElementById("popup").classList.add("open-popup")
}

const addAddress =()=>{
  if (countrySelect.value.trim() != ""&&state.value.trim() != ""&&zipCode.value.trim() != ""&&street.value.trim() != ""&&buildingNo.value.trim() != "") {
    let newUserDetails = {
      name: userName.value.trim(),
      phoneNumber: phoneNumber.value,
      email: user.email,
      userId: user.userId,
      password: "AMAZON",
      index: user.index,
      todo: user.todo,
      address: true,
      cart: user.cart,
      card: false,
      country: countrySelect.value,
      state: state.value,
      city: city.value,
      zipCode: zipCode.value,
      street: street.value,
      buildingNumber: buildingNo.value
      }
      if (user.password) {
        newUserDetails.password = user.password
      }
      allAmazonCustomers[currentAmazonUser] = newUserDetails
      addressDiv.style.display = "none"
      paymentDiv.style.display = "block"
      saveData()
  } else{
    errorInput.innerHTML = "Please fill all the necessary information required"
    setTimeout(()=>{errorInput.innerHTML=""}, 3000)
  }
}
const addCard =()=>{
  if (cardNumber.value.trim()!=""&&cardNumber.value.trim().length==16&&month.value!=""&&year.value!=""&&ccv.value!="") {
    let newUserDetails = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: "AMAZON",
      userId: user.userId,
      index: user.index,
      todo: user.todo,
      address: true,
      card: true,
      cart: user.cart,
      country: user.country,
      state: user.state,
      city: user.city,
      zipCode: user.zipCode,
      street: user.street,
      buildingNumber: user.buildingNumber,
      cardDetails: {
        cardNumber: cardNumber.value,
        cardExpiryDate: month.value + year.value,
        cardCCV: ccv.value
      }
    }
    if (user.password) {
      newUserDetails.password = user.password
    }
    allAmazonCustomers[currentAmazonUser] = newUserDetails
    saveData()
    document.getElementById("popup").classList.remove("open-popup")
    addressDiv.style.display = "none"
    paymentDiv.style.display = "none"
    checkOutDiv.style.display = "block"
  } else{
    errorInput2.innerHTML = "Please fill all the necessary information required in correct value"
    setTimeout(()=>{errorInput2.innerHTML=""}, 3000)
  }
}

const payWithPaystack= ()=> {
  let handler = PaystackPop.setup({
    key: "pk_test_020bedb6004bb3a95bb5589b33405add7e4e79a2",
    email: user.email,
    amount: amountToPay * 100,
    ref: "PROADE" + Math.floor(Math.random() * 10000000 + 1),
    onClose: ()=> {
      Swal.fire({
        icon: "error",
        title: "Dear " + `${user.name}`,
        text: "Transaction cancelled",
        footer:
          "For further assistance or enquiry, please call us at +2347015886456 or email us at adegbitejoshua07@gmail.com",
      });
      // alert("Thanks for transacting with us")
      
    },
    callback: (response)=> {
      Swal.fire({
        icon: "success",
        title: "Thank You " + `${user.name}`,
        text: `Payment completed! Your Reference Number is: ${response.reference}`,
        footer: 'Your Order is on the way. Your order is expected to be deliverd to you on or before the agreed date. Click <a href="#">here</a> '+"to track your order"
      });
      localStorage.removeItem("amazonCart")
      window.location.href = "index.html"
    },
  });

  handler.openIframe();
}

// window.onclick =(event)=>{
//     if (event.target == popup){
//       console.log(event.target)
//     document.getElementById("popup").classList.remove("open-popup")
//   }
// }


const saveData = () => {
  let allAmazonCustomersString = JSON.stringify(allAmazonCustomers)
  let allAmazonCustomersRef = ref(database, `allAmazonCustomers`);
  set(allAmazonCustomersRef, allAmazonCustomersString)
}
window.makePayment = makePayment
window.addAddress = addAddress
window.addCard = addCard
window.payWithPaystack = payWithPaystack