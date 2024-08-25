document.addEventListener("DOMContentLoaded", function() {
    const menu = document.getElementById("menu");
    const beveragesMenu = document.getElementById("beverages-menu");
    const cartBtn = document.getElementById("cart-btn");
    const cartModal = document.getElementById("cart-modal");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const cartCounter = document.getElementById("cart-counter");
    const addressInput = document.getElementById("address");
    const addressWarn = document.getElementById("address-warn");

    let cart = [];

    // ABRIR O MODAL DO CARRINHO
    cartBtn.addEventListener("click", function() {
        cartModal.style.display = "flex";
        updateCartModal();
    });

    // FECHAR O MODAL QUANDO CLICAR FORA
    cartModal.addEventListener("click", function(event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    // FECHAR O MODAL CLICANDO EM "FECHAR"
    closeModalBtn.addEventListener("click", function() {
        cartModal.style.display = "none";
    });

    // ADICIONAR ITEM AO CARRINHO
    menu.addEventListener("click", function(event) {
        let parentButton = event.target.closest(".add-to-cart-btn");

        if (parentButton) {
            const name = parentButton.getAttribute("data-name");
            addToCart(name);
        }
    });

    beveragesMenu.addEventListener("click", function(event) {
        let parentButton = event.target.closest(".add-to-cart-btn");

        if (parentButton) {
            const name = parentButton.getAttribute("data-name");
            addToCart(name);
        }
    });

    function addToCart(name) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name,
                quantity: 1,
            });
        }

        updateCartModal();
    }

    function updateCartModal() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

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
            `;

            cartItemsContainer.appendChild(cartItemElement);
        });

        cartCounter.innerHTML = cart.length;
    }

    cartItemsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-cart-btn")) {
            const name = event.target.getAttribute("data-name");
            removeItemCart(name);
        }
    });

    function removeItemCart(name) {
        const index = cart.findIndex(item => item.name === name);

        if (index !== -1) {
            const item = cart[index];

            if (item.quantity > 1) {
                item.quantity -= 1;
                updateCartModal();
                return;
            }

            cart.splice(index, 1);
            updateCartModal();
        }
    }

    addressInput.addEventListener("input", function(event) {
        let inputValue = event.target.value;

        if (inputValue !== "") {
            addressInput.classList.remove("border-red-500");
            addressWarn.classList.add("hidden");
        }
    });

    checkoutBtn.addEventListener("click", function() {
        const isOpen = checkRestaurantOpen();
        if (!isOpen) {
            Toastify({
                text: "Ops! A cozinha está fechada no momento :(",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#ef4444",
                },
            }).showToast();

            return;
        }

        if (cart.length === 0) return;
        if (addressInput.value === "") {
            addressWarn.classList.remove("hidden");
            addressInput.classList.add("border-red-500");
            return;
        }

        const cartItems = cart.map((item) => {
            return (` ${item.name} Quantidade: (${item.quantity}) |`);
        }).join("");

        const message = encodeURIComponent(cartItems);
        const phone = "61992757981";

        window.open(`https://wa.me/${phone}?text=${message} Quarto: ${addressInput.value}`, "_blank");

        cart = [];
        updateCartModal();
    });

    function checkRestaurantOpen() {
        const data = new Date();
        const hora = data.getHours();
        return hora >= 6 && hora < 14;
    }
    
    const spanItem = document.getElementById("date-span");
    const isOpen = checkRestaurantOpen();
    
    if (isOpen) {
        spanItem.classList.remove("closed-bg");
        spanItem.classList.add("open-bg");
    } else {
        spanItem.classList.remove("open-bg");
        spanItem.classList.add("closed-bg");
    }
});
