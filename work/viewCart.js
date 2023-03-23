let allAmazonProducts = JSON.parse(localStorage.getItem("allAmazonProducts"))
let productCategoryIndex = Number(localStorage.getItem("productCategoryIndex"))
let amazonCart = JSON.parse(localStorage.getItem("amazonCart"))

const displayCarts =()=>{
  displayCart.innerHTML = ""
  amazonCart.map((item, index)=>{
    console.log(item)
    displayCart.innerHTML += `
    <div class="w-100 d-flex pt-3">
    <img src="${allAmazonProducts[item.categoryIndex][item.productIndex].photoURL}" class="w-25 h-100" alt="">
    <div class="">
      <h3>${allAmazonProducts[item.categoryIndex][item.productIndex].productInformation}</h3>
      <small>In Stock</small>
      <p>Eligible for FREE Shipping & <a href="">FREE Returns</a></p>
      <input type="checkbox" name="" id="" class="mt-1"><p class="d-inline ms-2 mt-1">This is a gift <a href="">Learn more</a></p>
      <p><strong>Style:</strong> Basic</p>
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
    <div class="ms-auto">
      $${allAmazonProducts[item.categoryIndex][item.productIndex].currentPrice}
    </div>
  </div>
  <hr class="my-2">
    `
})
displayDetails()
}

const displayDetails =()=>{
  let allOrderedAmount = 0
  let priceSum = 0
  amazonCart.map((item, index)=>{
    allOrderedAmount += Number(item.productAmount)
    // console.log(allAmazonProducts[item.categoryIndex][item.productIndex].productAmount)
    // console.log(allAmazonProducts[item.categoryIndex][item.productIndex].productAmount*allAmazonProducts[item.categoryIndex][item.productIndex].currentPrice);
    priceSum += amazonCart[index].productAmount*allAmazonProducts[item.categoryIndex][item.productIndex].currentPrice 
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
      amazonCart[cartIndex].productAmount = item.value
      saveData()
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
    saveData()
    displayCarts()
}

const updateAmount =(index)=>{
    amazonCart[index].productAmount = document.getElementById("inputFile"+index).value
    saveData()
    displayDetails()
    document.getElementById("inputFile"+index).style.display = "none"
    document.getElementById("updateButton"+index).style.display = "none"
    document.getElementById(`productAmount${String(amazonCart[index].categoryIndex) + String(amazonCart[index].productIndex)}`).style.display = "inline"
}

const saveData =()=>{
    localStorage.setItem("amazonCart", JSON.stringify(amazonCart))
}
window.onload =displayCarts()