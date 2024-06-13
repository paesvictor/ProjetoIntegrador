const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-counter")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

// ABRIR O MODAL DO CARRINHO
cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex"
    updateCartModal();
})

// FECHAR O MODAL QUADNO CLICAR FORA
cartModal.addEventListener("click", function(event){
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

// FECHAR O MODAL CLICANDO EM "FECHAR"
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

// ADICIONAR ITEM AO CARRINHO
menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if (parentButton){
        const name = parentButton.getAttribute("data-name")
        //console.log(name)
        addToCart(name)

    }
})

// FUNCAO P/ ADC AO CARRINHO
function addToCart(name) {
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
    } else{
        cart.push({
            name,
            quantity: 1,
        })
    }

   updateCartModal()
}

// ATUALIZA O CARRINHO
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                </div>

                
                <button class="remove-cart-btn" data-name="${item.name}">
                    Remover
                </button>
                
                
            </div>
        
        `

        cartItemsContainer.appendChild(cartItemElement)

    })

    cartCounter.innerHTML = cart.length;
}

//FUNCAO P/ REMOVER ITEM DO CARRINHO
cartItemsContainer.addEventListener("click", function(event){
    if (event.target.classList.contains("remove-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];
        
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})


//FINALIZAR PEDIDO
checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
        Toastify ({
            text: "Ops! A cozinha está fechada no momento :(",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
        }).showToast();

        
        return;
    }


    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

//ENVIAR PEDIDO P/ API WHATS
const cartItems = cart.map((item) => {
    return (` ${item.name} Quantidade: (${item.quantity}) |`)
}).join("")

const message = encodeURIComponent(cartItems)
const phone = "61992757981"

window.open(`https://wa.me/${phone}?text=${message} Quarto: ${addressInput.value}`, "_blank")

cart = [];
updateCartModal();

})

//VERIFICAR A HORA E MANIPULAR O CARD DO HORARIO 
function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 20 && hora < 22;
    // true = cozinha aberta 
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if (isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-500")
}

