// ----------------- Start Global
var documentHtml = document,
   productName = documentHtml.getElementById("productName"),
   productPrice = documentHtml.getElementById("productPrice"),
   productCategory = documentHtml.getElementById("productCategory"),
   porductDescription = documentHtml.getElementById("porductDescription"),
   btnAdd = documentHtml.getElementById("btnAdd"),
   btnUpdate = documentHtml.getElementById("btnUpdate"),
   ProductsContainer = [],
   indexUpdate = 0,
   searchInput = documentHtml.getElementById("searchProduct"),
   alertName = documentHtml.getElementById("alertName"),
   alertPrice = documentHtml.getElementById("alertPrice"),
   alertCategory = documentHtml.getElementById("alertCategory");
   alertDescription = documentHtml.getElementById("alertDescription");

// ----------------- When  Start
if (getLocal() !== null) {
   ProductsContainer = getLocal();
   displayData();
}
// ----------------- Start Events
btnAdd.onclick = function () {
   addProducts();
};
btnUpdate.onclick = function () {
   updateProduct();
};
searchInput.oninput = function () {
   searchProduct(this.value);
};
// ----------------- Start Function
function addProducts() {
   if (nameValidation() & priceValidation() & categoryValidation() ) {
      var Product = {
         name: productName.value,
         price: productPrice.value,
         category: productCategory.value,
         description:porductDescription.value,
      };
      ProductsContainer.unshift(Product);
      setLocal();
      displayData();
      resetForm();
   }
}
function deleteProductMark(index) {
   ProductsContainer.splice(index, 1);
   displayData();
   setLocal();
}
function setUpdateInfo(index) {
   indexUpdate = index;
   productName.value = ProductsContainer[index].name;
   productPrice.value = ProductsContainer[index].price;
   productCategory.value = ProductsContainer[index].category;
   porductDescription.value = ProductsContainer[index].description;
   btnAdd.classList.add("d-none");
   btnUpdate.classList.remove("d-none");
}
function updateProduct() {
   if (nameValidation() & priceValidation() & categoryValidation() ) {
      var Product = {
         name: productName.value,
         price: productPrice.value,
         category: productCategory.value,
         description: porductDescription.value,
      };
      ProductsContainer.splice(indexUpdate, 1, Product);
      displayData();
      setLocal();
      resetForm();
      btnAdd.classList.remove("d-none");
      btnUpdate.classList.add("d-none");
   }
}
function searchProduct() {
   displayData();
}
function displayData() {
   var tableBody = "";
   var term = searchInput.value.toLowerCase();
   for (var i = 0; i < ProductsContainer.length; i++) {
      if (ProductsContainer[i].name.toLowerCase().includes(term)) {
         tableBody += `
         <tr>
         <td scope="row">${ProductsContainer[i].name.toLowerCase().replaceAll(term, `<span class="text-bg-info text-center m-auto">${term}</span>`)}</td>
         <td>
            <p class="small text-truncate text-center m-auto" style="max-width: 300px">
              ${ProductsContainer[i].price}
            </p>
         </td>
         <td>
            <p class="small text-truncate text-center m-auto" style="max-width: 300px">
              ${ProductsContainer[i].category}
            </p>
         </td>
         <td>
            <p class="small text-center m-auto text-truncate" style="max-width: 300px">
              ${ProductsContainer[i].description}
            </p>
         </td>
        
            <div class="hstack justify-content-center gap-2">
   <td>     <button class="btn btn-outline-warning btn-sm text-center m-auto" onclick="setUpdateInfo(${i})">
                  Update
               </button></td>
   <td>
               <button class="btn btn-outline-danger btn-sm text-center m-auto" onclick="deleteProductMark(${i})">
               Delete
               </button></td>
            </div>
      
      </tr>
         `;
      }
   }

   documentHtml.getElementById("tableBody").innerHTML = tableBody;
}
function resetForm() {
   productName.value = "";
   productPrice.value = "";
   productCategory.value = "";
   porductDescription.value = "";
}
function setLocal() {
   localStorage.setItem("ProductsData", JSON.stringify(ProductsContainer));
}
function getLocal() {
   return JSON.parse(localStorage.getItem("ProductsData"));
}
// ----------------- Start Validation
function nameValidation() {
   if (productName.value !== "") {
      alertName.classList.add("d-none");
      return true;
   } else {
      alertName.classList.remove("d-none");
      return false;
   }
}
function priceValidation() {
   if (productPrice.value !== "") {
      alertPrice.classList.add("d-none");
      return true;
   } else {
      alertPrice.classList.remove("d-none");
      return false;
   }
}
function categoryValidation() {
   if (productCategory.value !== "") {
      alertCategory.classList.add("d-none");
      return true;
   } else {
      alertCategory.classList.remove("d-none");
      return false;
   }
}

