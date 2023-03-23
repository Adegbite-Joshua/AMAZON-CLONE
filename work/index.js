let allAmazonProducts = JSON.parse(localStorage.getItem("allAmazonProducts"))

    allAmazonProducts.map((category, index)=>{
        // console.log(allAmazonProducts)
        if (category.length>0) {
            displayProductDiv.innerHTML += `
            <div class="border border-2 productDiv" onclick="viewCategory(${index})" id="productDiv${category[0].productName}"></div>
        `
        let filteredCategory = category.filter((items, index)=>index<=3)
        filteredCategory.map((item, iteemIndex)=>{
                document.getElementById("productDiv"+ category[0].productName).innerHTML += `
                <img src="${item.photoURL}" class="w-100 h-100" />
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