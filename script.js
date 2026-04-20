
let cart = [];
let total = 0;
let selectedProduct = "";
let selectedPrice = 0;


function openStore() {
    document.getElementById("startPage").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("startPage").style.display = "none";
    }, 500);
}


function scrollToCart() {
    document.getElementById("cartSection").scrollIntoView({ behavior: 'smooth' });
}


function chooseWeight(name, price) {
    selectedProduct = name;
    selectedPrice = price;
    document.getElementById("weightPopup").style.display = "flex";
}


function addWeight(weight, multiplier) {
    let finalPrice = selectedPrice * multiplier;
    let productName = `${selectedProduct} (${weight})`;
    addToCart(productName, finalPrice);
    closePopup('weightPopup');
}


function addToCart(name, price) {
    cart.push({ name: name, price: price });
    total += price;
    updateCart();
    
   
    let cartIcon = document.getElementById("cartCount");
    cartIcon.style.transform = "scale(1.5)";
    setTimeout(() => cartIcon.style.transform = "scale(1)", 300);
}


function updateCart() {
    let cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name}</span>
            <span><b>${item.price}</b> ج.م <button class="remove-btn" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button></span>
        `;
        cartItems.appendChild(li);
    });

    document.getElementById("total").textContent = total;
    document.getElementById("cartCount").textContent = cart.length;
}


function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}


function showOrderForm() {
    
    if (cart.length === 0) {
        alert("السلة فارغة! أضف بعض المنتجات أولاً ☕");
    } else {
        document.getElementById("orderPopup").style.display = "flex";
    }
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}


function confirmOrder() {
    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;

    if (!name || !phone || !address) {
        alert("برجاء إكمال بيانات التوصيل الأساسية!");
        return;
    }

    let orderText = `*☕ طلب جديد من قهوة نوح ☕*\n\n`;
    orderText += `👤 *الاسم:* ${name}\n`;
    orderText += `📞 *الموبايل:* ${phone}\n`;
    orderText += `📍 *العنوان:* ${city} - ${address}\n\n`;
    orderText += `*🛍️ المنتجات:*\n`;

    cart.forEach(item => {
        orderText += `▫️ ${item.name} - ${item.price} ج.م\n`;
    });

    orderText += `\n💰 *الإجمالي المطلوب:* ${total} ج.م\n`;

   
    let whatsappNumber = "201091673329"; 
    
   
    let encodedText = encodeURIComponent(orderText);
    let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(whatsappURL, "_blank");
    closePopup('orderPopup');
}
function toggleCart() {
    const cartSection = document.getElementById("cartSection");

    if (cartSection.style.display === "none" || cartSection.style.display === "") {
        cartSection.style.display = "block";
        cartSection.scrollIntoView({ behavior: "smooth" });
    } else {
        cartSection.style.display = "none";
    }
}
