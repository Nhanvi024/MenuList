let menuContainer = document.querySelector(".Menu");
let orderListContainer = document.querySelector(".dishOrderlist");
let popupPayment = document.querySelector(".popupPayment");
let paymentOrderList = document.querySelector(".paymentOrderList");
let orderList = document.querySelector(".orderList");
let priceOrderList = document.querySelector(".priceOrderList");
let fullScreen = document.querySelector(".fullScreen");

let totalPrice = document.querySelector("#totalPrice");
let textPage = document.querySelector("#textPage");
let numberOrder = document.querySelector("#numberOrder");
let iconList = document.querySelector("#iconList");
let pay_totalPrice = document.querySelector("#pay_totalPrice");
let pay_btnOrder = document.querySelector("#pay_btnOrder");

let listMenu = [];
let dishOrderList = [];
let inforCustomer = [];
let numPage = 0;

let numberofPage;
const dishofPage = 10;

let fullName = document.querySelector("#fullName");
let errorName = document.querySelector("#errorName");
let phoneNumber = document.querySelector("#phoneNumber");
let errorPhone = document.querySelector("#errorPhone");
let emailAdd = document.querySelector("#emailAdd");
let errorEmail = document.querySelector("#errorEmail");
let address = document.querySelector("#address");
let errorAdd = document.querySelector("#errorAdd");


let checkName = false;
let checkPhone = false;
let checkEmail = false;
let checkAdd = false;



fullName.addEventListener("input", () => {
    let nameRegex = /^[^\d]+$/;
    console.log(nameRegex.test(fullName.value));
    if (!fullName.value) {
        errorName.textContent = "Vui lòng nhập tên.";
        checkName = false;
    } else if (!nameRegex.test(fullName.value)) {
        errorName.textContent = "Tên không hợp lệ.";
        checkName = false;
    } else {
        errorName.textContent = "";
        checkName = true;
    }
})

phoneNumber.addEventListener("input", () => {
    let phoneRegex = /^[\d]{10}$/;
    if (!phoneNumber.value) {
        errorPhone.textContent = "Vui lòng nhập số điện thoại.";
        checkPhone = false;
    } else if (!phoneRegex.test(phoneNumber.value)) {
        errorPhone.textContent = "Số điện thoại không hợp lệ.";
        checkPhone = false;
    } else {
        errorPhone.textContent = "";
        checkPhone = true;
    }
})

emailAdd.addEventListener("input", () => {
    let mailRegex = /^[^\s]+@[^\s]+\.[^\s]+$/;
    if (!emailAdd.value) {
        errorEmail.textContent = "Vui lòng nhập Email.";
        checkEmail = false;

    } else if (!mailRegex.test(emailAdd.value)) {
        errorEmail.textContent = "Email không hợp lệ.";
        checkEmail = false;

    } else {
        errorEmail.textContent = "";
        checkEmail = true;
    }
})

address.addEventListener("input", () => {
    if (!address.value) {
        errorAdd.textContent = "Vui lòng nhập địa chỉ.";
        checkAdd = false;

    } else {
        errorAdd.textContent = "";
        checkAdd = true;
    }
})


// Hidden and show dishes cart
iconList.addEventListener("click", function () {
    console.log(orderList.style.display);
    if (orderList.style.display.localeCompare("block") != 0) {
        orderList.style.display = "block";
        setTimeout(() => {
            orderList.style.visibility = "visible";
            orderList.style.opacity = "100%";
        }, 100);
    } else {

        orderList.style.display = "none";
        orderList.style.visibility = "hidden";
        orderList.style.opacity = "0%";
    }
})
/***************************************************************/
// Read menu from Json file and show it first time
function showMenu(data) {
    let listDish = "";
    data.map((item, index) => {
        listMenu.push(item);

        if (index < dishofPage) {
            listDish += `<div class="menuCard">
                         <figure>
                     <img src="${item.image}" alt="${item.name}">
                                </figure>
                    <h4>${item.name}</h4>
                <p>${item.price_text}</p>
                <button onclick=handleAddDish(${index})>Đặt món</button>
                </div>`
        }
    })
    menuContainer.innerHTML = listDish;
    numberofPage = Math.ceil(listMenu.length / dishofPage);
    textPage.innerHTML = "Trang " + parseInt(numPage + 1) + "/" + numberofPage;

}
fetch('./Json/Menu.json')
    .then(res => res.json())
    .then(data => showMenu(data.dishes));

/***************************************************************/
// Show Menu after Sort or Search
function showListMenu(numpage) {
    let listDish = "";
    listMenu.map((item, index) => {
        if (index >= numpage * dishofPage && index < (numpage + 1) * dishofPage) {
            listDish += `<div class="menuCard">
                 <figure>
                <img src="${item.image}" alt="${item.name}">
               </figure>
                <h4>${item.name}</h4>
                <p>${item.price_text}</p>
                <button onclick=handleAddDish(${index})>Đặt món</button>
                </div>`
        }

    })
    menuContainer.innerHTML = listDish;

}
/***************************************************************/
// Add and Delete Dish function
function handleAddDish(index) {
    if (!dishOrderList.includes(listMenu[index])) {
        dishOrderList.push(listMenu[index]);
    } else if (dishOrderList[dishOrderList.indexOf(listMenu[index])].quantities < 10) {
        dishOrderList[dishOrderList.indexOf(listMenu[index])].quantities++;
    } else {
        alert("Số lượng không lớn hơn 10");
    }
    showOrderList();

}
function handleDelDish(index) {
    dishOrderList[index].quantities = 1;
    dishOrderList.splice(index, 1);
    showOrderList();
}
/***************************************************************/

// Show order list function
function showOrderList() {
    let orderList = "";
    let priceList = "";
    dishOrderList.map((item, index) => {
        orderList +=
            `<div class="orderCard">
                        <figure>
                            <img src="${item.image}" alt="">
                        </figure>
                        <div class="infoDish">
                            <h4>${item.name}</h4>
                            <p>${item.price_text}</p>
                        </div>
                        <div class="qtyDish">
                            <button onclick=hadleIncrease(${index})>&#8679;</button>
                            <input id="qtyDish_${index}" value="${item.quantities}" type="number" onchange=handleChangeInput(${index})>
                            <button onclick=hadleDecrease(${index})>&#8681;</button>
                        </div>
                        <button class="Del" onclick=handleDelDish(${index})>&#10006;</button>
                    </div>`;

        priceList +=
            `<div class="pay_OrderCard" id="pay_OrderCard_${index}">
                        <figure>
                            <img src="${item.image}" alt="">
                        </figure>
                        <div class="pay_infoDish">
                            <h4>${item.name}</h4>
                            <p>${item.price_text}</p>
                        </div>
                        <div class="pay_qtyDish">
                        <button onclick=hadleIncrease(${index})>&#8679;</button>
                        <input id="pay_qtyDish_${index}" value="${item.quantities}" type="number" onchange=handlePayChangeInput(${index})>
                        <button onclick=hadleDecrease(${index})>&#8681;</button>
                        </div>
                        <div class="pay_priceDish">
                            <p id="eachPrice_${index}"></p>
                        </div>
                        <button class="Del" onclick=handleDelDish(${index})>&#10006;</button>
                    </div>`;

    })
    if (!orderList) {
        orderListContainer.innerHTML = '<p class="orderList_blank">Vui lòng chọn món</p>';
        priceOrderList.innerHTML = "";
        handleHidePopup();
    } else {
        orderListContainer.innerHTML = orderList;
        priceOrderList.innerHTML = priceList;
    }
    if (dishOrderList.length == 0) {
        numberOrder.innerHTML = "";
    } else {
        numberOrder.innerHTML = `<p id="number">${dishOrderList.length}</p>`;
    }
    eachBill();
    totalBill();

    dragRemove();

}

function dragRemove() {
    let dragItems = document.querySelectorAll(".pay_OrderCard");
    let dropContainer = document.querySelector(".fullScreen");


    dragItems.forEach((item, index) => {
        let run = 0;
        item.setAttribute("draggable", true);
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", index);
            run = 1;

            dropContainer.addEventListener("drop", function (e) {
                e.preventDefault();

                let index_str = e.dataTransfer.getData("text/plain");
                if (run == 1) {

                    console.log(run);
                    let index = parseInt(index_str);

                    handleDelDish(index);
                    run = 0;
                }

            })
        })
    })
    dropContainer.addEventListener("dragover", function (e) {
        e.preventDefault();
    })


}

/***************************************************************/
// Change input quantity of order dishes
function hadleIncrease(index) {
    let orderQuantity = document.querySelector("#qtyDish_" + index);
    let pay_orderQuantity = document.querySelector("#pay_qtyDish_" + index);

    if (orderQuantity.value < 10) {
        orderQuantity.value++;
    } else {
        alert("Số lượng không lớn hơn 10");
    }

    pay_orderQuantity.value = orderQuantity.value;
    dishOrderList[index].quantities = parseInt(orderQuantity.value);
    eachBill();
    totalBill();
}
function hadleDecrease(index) {
    let orderQuantity = document.querySelector("#qtyDish_" + index);
    let pay_orderQuantity = document.querySelector("#pay_qtyDish_" + index);

    if (orderQuantity.value > 1) {
        orderQuantity.value--;
    } else {
        alert("Số lượng không bé hơn 1");
    }
    pay_orderQuantity.value = orderQuantity.value;
    dishOrderList[index].quantities = parseInt(orderQuantity.value);
    eachBill()
    totalBill();
}
function handleChangeInput(index) {
    let orderQuantity = document.querySelector("#qtyDish_" + index);
    console.log(orderQuantity.value);
    if (parseInt(orderQuantity.value) > 10) {
        alert("Số lượng không lớn hơn 10");
        orderQuantity.value = 10;
    } else if (parseInt(orderQuantity.value) < 1) {
        alert("Số lượng không bé hơn 1");
        orderQuantity.value = 1;
    } else {
        dishOrderList[index].quantities = parseInt(orderQuantity.value);
    }
    eachBill();
    totalBill();
}

function handlePayChangeInput(index) {
    let pay_orderQuantity = document.querySelector("#pay_qtyDish_" + index);
    let orderQuantity = document.querySelector("#qtyDish_" + index);
    // pay_orderQuantity.value = dishOrderList[index].quantities;
    if (!pay_orderQuantity.value) {
        alert("Không được bỏ trống");
        pay_orderQuantity.value = 1;
    } else if (parseInt(pay_orderQuantity.value) > 10) {
        alert("Số lượng không lớn hơn 10");
        pay_orderQuantity.value = 10;
    } else if (parseInt(pay_orderQuantity.value) < 1) {
        alert("Số lượng không bé hơn 1");
        pay_orderQuantity.value = 1;
    } else {
        orderQuantity.value = pay_orderQuantity.value;
        dishOrderList[index].quantities = parseInt(pay_orderQuantity.value);
        console.log(dishOrderList[index].quantities);
    }
    eachBill();
    totalBill();
}
/***************************************************************/
// Calculate total bill
function totalBill() {
    let totalBill = 0;
    dishOrderList.map((item, index) => {
        let orderQuantity = document.querySelector("#qtyDish_" + index);
        totalBill += item.price * item.quantities;
    })
    totalPrice.innerHTML = totalBill.toLocaleString({ style: "currency" }) + " VND";
    pay_totalPrice.innerHTML = totalBill.toLocaleString({ style: "currency" }) + " VND";
}
// Calculate each dish
function eachBill() {
    dishOrderList.map((item, index) => {
        let pay_orderQuantity = document.querySelector("#pay_qtyDish_" + index);
        let eachPrice = document.querySelector("#eachPrice_" + index);
        let price = item.price * item.quantities;
        eachPrice.innerHTML = price.toLocaleString({ style: "currency" }) + " VND";
    })
}
/***************************************************************/
// Selection Sort Menu function
function handleSortSelect() {
    numPage = 0;
    let inputSelect = document.querySelector("#sortDishes");
    switch (inputSelect.value) {
        case "1":
            listMenu.sort((a, b) => {
                return a.price - b.price;
            });
            showListMenu(numPage);
            break;
        case "2":
            listMenu.sort((a, b) => {
                return b.price - a.price;
            });
            showListMenu(numPage);
            break;
        case "3":
            listMenu.sort((a, b) => {
                return a.name.localeCompare(b.name)

            });
            showListMenu(numPage);

            break;
        case "4":
            console.log("4");
            listMenu.sort((a, b) => {
                return b.name.localeCompare(a.name)

            });
            showListMenu(numPage);

            break;

        default:
            break;
    }
    textPage.innerHTML = "Trang " + parseInt(numPage + 1) + "/" + numberofPage;
}
// Go to Next and Previous Page
function handleNextPage() {
    if (numPage < numberofPage - 1) {
        numPage++;
        showListMenu(numPage);
    }
    textPage.innerHTML = "Trang " + parseInt(numPage + 1) + "/" + numberofPage;


}
function handlePrePage() {
    if (numPage > 0) {
        numPage--;
        showListMenu(numPage);
    }
    textPage.innerHTML = "Trang " + parseInt(numPage + 1) + "/" + numberofPage;

}
/***************************************************************/
// Show Payment popup to input customer's information and Accept payment
function handleOrderAccept() {
    if (totalPrice.innerHTML != "0 VND") {
        console.log(popupPayment.style);
        fullScreen.style.visibility = "visible";
        fullScreen.style.opacity = "70%";
        popupPayment.style.visibility = "visible";
        popupPayment.style.opacity = "100%";

        dishOrderList.forEach((item, index) => {
            let pay_orderQuantity = document.querySelector("#pay_qtyDish_" + index);
            pay_orderQuantity.value = dishOrderList[index].quantities;
        })

    } else {
        alert("Vui lòng chọn món.")
    }
    eachBill();
}
/***************************************************************/
// Hide Payment popup 
function handleHidePopup() {
    popupPayment.style.visibility = 'hidden';
    popupPayment.style.opacity = "0%";
    fullScreen.style.visibility = "hidden";
    fullScreen.style.opacity = "0%";
}
/***************************************************************/
// Accept payment
pay_btnOrder.addEventListener("click", () => {
    if (checkName && checkPhone && checkEmail && checkAdd) {
        alert("Đơn hàng đã được xác nhận.\n Xin cảm ơn quý khách!");
        
    checkName = false;
    checkPhone = false;
    checkEmail = false;
    checkAdd = false;
    } else {
        alert("Xin kiểm tra lại thông tin.");
    }
})




totalBill();
showOrderList();

