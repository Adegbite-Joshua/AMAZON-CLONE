let allAmazonProducts = JSON.parse(localStorage.getItem("allAmazonProducts"))

allAmazonProducts.map((category, index)=>{
    if (category.length>0) {
        displayProductDiv.innerHTML += `
        <div class="border border-2 productDiv" onclick="viewCategory(${index})" id="productDiv${category[0].productName}"></div>
    `
    let filteredCategory = category.filter((items, index)=>index<=3)
    filteredCategory.map((item, iteemIndex)=>{
            document.getElementById("productDiv"+ category[0].productName).innerHTML += `
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
const focusYellowBorder =()=>{
    yellowBorderHover.classList.add("yellowBorderHover")
}
const viewCategory =(productCategoryIndex)=>{
    localStorage.setItem("productCategoryIndex", productCategoryIndex)
    window.location.href = "productCategory.html"
}
let gridIndex = Math.round(Math.random()*4);
if (allAmazonProducts[gridIndex].length>0) {
    allAmazonProducts[gridIndex].map((item, index)=>{
        gridList.innerHTML = `<img src="${item.photoURL}" onclick="viewProduct(${gridIndex}, ${index})" class="h-100 m-2" style="width: 100px;" alt="">`
    })
}

if (allAmazonProducts[gridIndex+1].length>0) {
    allAmazonProducts[gridIndex+1].map((item, index)=>{
        gridList1.innerHTML = `<img src="${item.photoURL}" onclick="viewProduct(${gridIndex+1}, ${index})" class="h-100 m-2" style="width: 100px;" alt="">`
    })
}

const viewProduct =(productCategoryIndex, productIndex)=>{
    localStorage.setItem("productCategoryIndex", productCategoryIndex)
    localStorage.setItem("productIndex", productIndex)
    window.location.href = "buyProduct.html"
}
