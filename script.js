let cart = [];
let total = 0;

// 🛒 Add to Cart Function - with cute toast
function addToCart(name, price){
    cart.push({name, price});
    total += price;
    
    // ✨ Update Cart Text
    document.getElementById('cartText').innerText = `🛒 Your Cart (${cart.length}) — Total: Rs ${total} 💸`;
    
    // 💫 Add Item with Animation
    let itemsDiv = document.getElementById('cartItems');
    if(cart.length === 1) itemsDiv.innerHTML = ""; // Clear empty message
    
    let item = document.createElement('p');
    item.style.cssText = "background:#f8f9ff; padding:8px 12px; border-radius:20px; margin:5px 0; animation: slideIn 0.3s ease;";
    item.innerHTML = `✅ ${name} - <b>Rs ${price}</b> 💙`;
    itemsDiv.appendChild(item);

    // 🎉 Tiny popup
    showToast(`✨ ${name} added to cart! 🦐`);
}

// 💳 Pay Now Function
function payNow(){
    if(cart.length === 0){
        showToast("🛒 Oops! Your cart is empty bro! Add something yummy 🦐😋", true);
        return;
    }
    
    // 🎊 Success Message - Aesthetic
    alert(`🎉 Payment Successful! 💳\n\n💰 Total Paid: Rs ${total}/-\n🛒 Items: ${cart.length}\n\nThank you for shopping at 🌊 AzureBay Seafood! 🦈💙\nYour order will be delivered fresh! ✨🚚`);
    
    // 🔄 Reset Cart
    cart = [];
    total = 0;
    document.getElementById('cartText').innerText = `🛒 Your Cart (0) — Total: Rs 0 💸`;
    document.getElementById('cartItems').innerHTML = `✨ Your cart is empty — Add some yummy seafood! 🦐💙`;
}

// 🍞 Toast Notification - Aesthetic
function showToast(msg, isError = false){
    let toast = document.createElement('div');
    toast.innerText = msg;
    toast.style.cssText = `
        position:fixed;
        bottom:30px;
        left:50%;
        transform:translateX(-50%);
        background:${isError ? 'linear-gradient(135deg,#ff6b6b,#ee5a6f)' : 'linear-gradient(135deg,#667eea,#764ba2)'};
        color:white;
        padding:12px 25px;
        border-radius:25px;
        box-shadow:0 10px 25px rgba(0,0,0,0.2);
        font-family:'Segoe UI';
        font-size:14px;
        font-weight:600;
        z-index:9999;
        animation: popUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(()=> toast.remove(), 2500);
}

// 💅 Add keyframes for animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes slideIn{
    from{opacity:0; transform:translateY(10px);}
    to{opacity:1; transform:translateY(0);}
}
@keyframes popUp{
    from{opacity:0; transform:translate(-50%, 20px);}
    to{opacity:1; transform:translate(-50%, 0);}
}
`;
document.head.appendChild(style);

console.log("🌊 AzureBay Script Loaded Successfully! 🦈✨");