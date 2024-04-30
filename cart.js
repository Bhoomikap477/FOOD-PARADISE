let bagitemObjects =[];

onload();

function onload() {
  loadBagItems();
  displayBagItem();
}

function loadBagItems() {
  // Correct variable name from bagItems to items
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  bagitemObjects = bagItems.map(itemId => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
}

function displayBagItem() {
  let containerElement = document.querySelector('.container');
  let innerHTML = '';

  // Generate HTML for items
  let itemsHTML = '';
  bagitemObjects.forEach(item => {
    itemsHTML += generateHTML(item);
  });
  innerHTML += itemsHTML;

  // Generate HTML for order summary
  let orderSummaryHTML = generateOrderSummary();
  innerHTML += orderSummaryHTML;

  containerElement.innerHTML = innerHTML;
}

function removefromBag(itemId) {
  bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItems();
  displayBagItem();
}

function generateHTML(item) {
  console.log(item);
  let Total = item.originalPrice - item.currentPrice;
  return `
  <div class="one">
   
    <div class="imageitem">
      <img
        src="${item.item_image}"
        width="200px"
        height="200px"
      />
    </div>
    <div class="information">
      <span id="deletes" onclick="removefromBag(${item.id})"><img src="delete.jpg" width="60px" /></span>
      <h1>${item.itemName}</h1>
      <h3>${item.rating.stars} ⭐ (${item.rating.noOfReviews}+)</h3>
      <span class="current">Rs ${item.currentPrice}</span>
      <span class="original" style="text-decoration: line-through">Rs ${item.originalPrice}</span>
      <span class="discount">( ${item.discount} %)</span>
      <span><h4>Total Price - Rs ${Total}</h4></span>
    </div>
  </div>
  `;
}

function generateOrderSummary() {
  let totalAmount = 0;
  let count=0;
  bagitemObjects.forEach(item => {
    totalAmount += (item.originalPrice - item.currentPrice);
    count+=1;
  });

  let orderSummaryHTML = `
  <h2 style='  font-size: 35px;
  text-align: center;
  color: rgb(1, 35, 1); '>Order Summary</h2>
  <div class="one">
  
    <table style="font-size: 23px;" cellspacing="40">
      <tr>
        <th><u>Item Name</u></th>
        <th><u>Original Amount</u></th>
        <th><u>Discount</u></th>
        <th><u>Total Amount</u></th>
      </tr>
  `;
  bagitemObjects.forEach(item => {
    orderSummaryHTML += `
      <tr>
        <td>${item.itemName}</td>
        <td>${item.originalPrice}</td>
        <td>${item.discount}%</td>
        <td>${item.originalPrice - item.currentPrice}</td>
      </tr>
      
    `;
  });

  orderSummaryHTML += `
      <tr>
        <td colspan="3">Total Amount:</td>
        <td>${totalAmount}</td>
      </tr>

      <tr>
        <td colspan='3'>Pay Using</td>
        <td><select id='choice'  >
              <option> Select</option>
              <option> Google Pay</option>
              <option> Paytm</option>
              <option> Phone Pay</option>
            </select>
        </td>
      </tr>  

      <tr>
        <td colspan='3'></td>
        <td style='color: green;' onclick='openModal()'><u>Make Payment</u></td>
      </tr>  
    </table>
  </div>`;

  return orderSummaryHTML;
}




