document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8080/refeicao/')
        .then(response => response.json())
        .then(data => {
            const menuGrid = document.getElementById('menu-grid');
            data.data.forEach((refeicao, index) => {
                const menuItem = document.createElement('div');
                menuItem.classList.add('menu-item');

                // Adicionando conteúdo ao menuItem
                menuItem.innerHTML = `
                    <img src="../images/refeicao${index + 1}.jpg" alt="" class="menu-item-image"/>
                    <div>
                        <p class="item-title">${refeicao.nome}</p>
                        <p class="item-description">${refeicao.descricao}</p>
                        <div class="item-controls">
                            <button class="add-to-cart-btn" data-id="${refeicao.idRefeicao}" data-name="${refeicao.nome}" data-descricao="${refeicao.descricao}">
                                <i class="fa fa-cart-plus text-lg text-white"></i>
                            </button>
                        </div>
                    </div>
                `;

                // Adicionando o menuItem ao menuGrid
                menuGrid.appendChild(menuItem);
            });

            // Adiciona evento aos botões de adicionar ao carrinho
            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', addToCart);
            });
        })
        .catch(error => console.error('Erro ao buscar dados da API:', error));
});

let cart = [];

function addToCart(event) {
    const button = event.target.closest('button');
    const id = button.getAttribute('data-id');
    const name = button.getAttribute('data-name');
    const descricao = button.getAttribute('data-descricao');

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, descricao, quantity: 1 });
    }

    updateCartCounter();
    showToast(`${name} adicionado ao carrinho`);
}

function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;
}

function showToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4CAF50",
    }).showToast();
}

document.getElementById('cart-btn').addEventListener('click', function() {
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - ${item.descricao} (x${item.quantity})</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartModal.style.display = 'block';
});

document.getElementById('close-modal-btn').addEventListener('click', function() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
});

document.getElementById('checkout-btn').addEventListener('click', function() {
    const addressInput = document.getElementById('address');
    const addressWarn = document.getElementById('address-warn');

    if (addressInput.value.trim() === '') {
        addressWarn.style.display = 'block';
        return;
    }

    addressWarn.style.display = 'none';

    const pedidoRequest = {
        idPedido: 0,
        statusPedido: "Em preparo",
        numeroQuarto: addressInput.value,
        pedidoRefeicoes: cart.map(item => ({
            refeicao: {
                idRefeicao: item.id,
                nome: item.name,
                descricao: item.descricao,
                disponibilidade: "Ativo"
            },
            quantidadeRefeicao: item.quantity
        }))
    };

    fetch('http://localhost:8080/pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoRequest)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Pedido realizado com sucesso!');
            cart = [];
            updateCartCounter();
            const cartModal = document.getElementById('cart-modal');
            cartModal.style.display = 'none';
        } else {
            alert('Erro ao realizar o pedido.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao realizar o pedido.');
    });
});