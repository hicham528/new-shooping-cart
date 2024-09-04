// Get variables
let open_shoopin_cart = document.getElementById("open_shoopin_cart");
let shoop_cart = document.querySelector(".shoop_cart");
let close_cart = document.querySelector(".close_cart");
let products_container = document.querySelector(".products_container");
let quantity_btn = document.querySelector(".quantity_btn");
let add_button = document.querySelector(".add_button");
let btn_content = document.querySelectorAll(".btn_content");
let title_cart_shooping = document.querySelector(".title_cart_shooping");
let quantity_value = document.querySelector(".quantity_value");
let shoop_container = document.querySelector(".shoop_container");
let totale_shoop_price = document.querySelector(".totale_shoop_price");
const start_new_order = document.querySelector(".start_new_order");
open_shoopin_cart.onclick = () => {
  shoop_cart.classList.add("new_shoop_cart");
};

close_cart.onclick = () => {
  shoop_cart.classList.remove("new_shoop_cart");
};

// The first value
let data_array = [];
let count = 0;
let newArray = [];

// Contact JSON file
const contactJsonFile = () => {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      data_array = data;
      console.log(data_array);
      creatAllProducts();
    });
};
contactJsonFile();

// Create all products shop
const creatAllProducts = () => {
  products_container.innerHTML = "";
  if (data_array.length > 1) {
    data_array.forEach((item, index) => {
      const parentDiv = document.createElement("div");
      parentDiv.classList.add("products_content");
      parentDiv.innerHTML = `
        <img src="${item.image.desktop}" alt="${item.name}" />
        <div class="btn_content">
          <button class="add_to_cart" onclick="add_to_cart(${index})">add to cart</button>
          <div class="quantity_btn">
            <div class="minus"><i class="fa-solid fa-minus"></i></div>
            <div class="quantity">0</div>
            <div class="plus"><i class="fa-solid fa-plus"></i></div>
          </div>
        </div>
        <div class="details">
          <h4 class="category">${item.category}</h4>
          <h3 class="name_products">${item.name}</h3>
          <h2 class="price">${item.price}dh</h2>
        </div>
      `;
      products_container.appendChild(parentDiv);
    });
  }
};

// Add to cart function
const add_to_cart = (index) => {
  let btn_content = document.querySelectorAll(".btn_content");
  let btn = btn_content[index];
  if (btn) {
    let quantity_btn = btn.querySelector(".quantity_btn");
    let add_button = btn.querySelector(".add_to_cart");
    quantity_btn.style.display = "flex";
    add_button.style.display = "none";
    count++;
    document.querySelector(".quantity_value").innerHTML = count;
    document.querySelector(
      ".title_cart_shooping"
    ).innerHTML = `Your cart shopping (${count})`;
  }

  btn.querySelector(".plus").onclick = () => {
    let quantity = btn.querySelector(".quantity");
    let num_quantity = parseInt(quantity.textContent);
    quantity.textContent = num_quantity + 1;
    if (!newArray[index]) {
      newArray[index] = { ...data_array[index], quantity: 1 };
    } else {
      newArray[index].quantity++;
    }
    creatProductList();
  };

  btn.querySelector(".minus").onclick = () => {
    let quantity = btn.querySelector(".quantity");
    let num_quantity = parseInt(quantity.textContent);
    if (num_quantity > 1) {
      quantity.textContent = num_quantity - 1;
      newArray[index].quantity--;
    } else {
      let quantity_btn = btn.querySelector(".quantity_btn");
      let add_button = btn.querySelector(".add_to_cart");
      quantity_btn.style.display = "none";
      add_button.style.display = "block";
      count = 0;
      document.querySelector(".quantity_value").innerHTML = count;
      document.querySelector(
        ".title_cart_shooping"
      ).innerHTML = `Your cart shopping (${count})`;
    }
    creatProductList();
  };
};
// creat products list ========
const creatProductList = () => {
  shoop_container.innerHTML = "";
  let totalePrice = 0;
  if (newArray.length > 1) {
    newArray.forEach((item, index) => {
      const parentDiv = document.createElement("div");
      parentDiv.classList.add("shoop_content");
      parentDiv.innerHTML = `
           <img src="${item.image.desktop}" alt="${item.name}" />
            <div class="text_shoop">
              <h3 class="name_shoop">${item.name}</h3>
              <div class="shooop_price_and_quantity">
                <h5 class="quantity_shoop">${item.quantity} x</h5>
                <h5 class="price_shoop">${item.price} DH</h5>

                <h5 class="totale_shoop">${item.price * item.quantity}DH</h5>
              </div>
            </div>
            <i class="fa-solid fa-xmark" onclick="removeProduct(${index})"></i>
      `;
      shoop_container.appendChild(parentDiv);
      totalePrice += item.price * item.quantity;
      totale_shoop_price.innerHTML = totalePrice + "DH";
    });
  }
};

const removeProduct = (index) => {
  newArray.splice(index, 1);
  creatProductList();
  count--;
  document.querySelector(".quantity_value").innerHTML = count;
  document.querySelector(
    ".title_cart_shooping"
  ).innerHTML = `Your cart shopping (${count})`;

  if (count === 0) {
    document.querySelector(".totale_shoop_price").innerHTML = 0;
    let products_content = document.querySelectorAll(".products_content");
    products_content.forEach((item) => {
      let quantity_btn = item.querySelector(".quantity_btn");
      let add_button = item.querySelector(".add_to_cart");
      quantity_btn.style.display = "none";
      add_button.style.display = "block";
    });
  }
};

//add to order cart ==============
let add_to_order = document.querySelector(".add_to_order");
let order_container = document.querySelector(".order_container");
let close_order_cart = document.getElementById("close_order_cart");
let finel_order_container = document.querySelector(".finel_order_container");
let totale_order = document.querySelector(".totale_order");
add_to_order.onclick = () => {
  order_container.style.display = "flex";
  finel_order_container.innerHTML = "";
  totale_order.innerHTML = "";
if(newArray.length>1){
  start_new_order.style.display = "block";
  newArray.forEach((item, index) => {
    const parenElement = document.createElement("div");
    parenElement.classList.add("only_order");
    parenElement.innerHTML = `
    <div class="new-details">
              <img src="${item.image.desktop}" alt="${item.name}">
              <div class="textOrder">
                <h3>${item.name}</h3>
                <div class="details_price">
                  <p class="quantity">${item.quantity}x</p>
                  <h4 class="price">${item.price}dh</h4>
                </div>
              </div>
            </div>
            <h2>${item.quantity * item.price}dh</h2>
  `;
    finel_order_container.appendChild(parenElement);
    totale_order.innerHTML =
      newArray.reduce(
        (totale, item) => totale + (item ? item.quantity * item.price : 0),
        0
      ) + "DH";
  });
}else{
  start_new_order.style.display = "none";
  finel_order_container.innerHTML =
  '<p class="error_order">oh sorry you need to order somthing </p>';
}
};

close_order_cart.onclick = () => {
  order_container.style.display = "none";
};

// start new order================

start_new_order.onclick = () => {
  newArray.splice(0);
  creatProductList();
  start_new_order.style.display = "none";
  finel_order_container.innerHTML =
    '<p class="thanks_order">thank you for your order <img src="images/cart_add_new_shop_ecommerce_icon_150698.png" alt=""/></p>';
    count=0;
    document.querySelector(".quantity_value").innerHTML = count;
    document.querySelector(
      ".title_cart_shooping"
    ).innerHTML = `Your cart shopping (${count})`;
    totale_shoop_price.innerHTML = 0 + "DH";
    let products_content = document.querySelectorAll(".products_content");
    products_content.forEach((item) => {
      let quantity_btn = item.querySelector(".quantity_btn");
      let add_button = item.querySelector(".add_to_cart");
      quantity_btn.style.display = "none";
      add_button.style.display = "block";
    });
};
