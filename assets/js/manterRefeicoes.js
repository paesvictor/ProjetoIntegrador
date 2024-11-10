document.addEventListener('DOMContentLoaded', function () {
    const mealForm = document.getElementById('meal-form');
    const mealList = document.getElementById('meal-list');

    // Função para carregar todas as refeições
    function loadMeals() {
        fetch('http://localhost:8080/refeicao/')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    mealList.innerHTML = '';
                    data.data.forEach(meal => {
                        const mealItem = document.createElement('div');
                        mealItem.className = 'meal-item';
                        mealItem.innerHTML = `
                        <h3>${meal.nome}</h3>
                        <p>${meal.descricao}</p>
                        <button onclick="editMeal(${meal.idRefeicao})">Editar</button>
                        <button onclick="deleteMeal(${meal.idRefeicao})">Excluir</button>
                    `;
                        mealList.appendChild(mealItem);
                    });
                } else {
                    console.error('Erro ao carregar refeições:', data.message);
                    Toastify({
                        text: "Erro ao carregar refeições!",
                        duration: 3000,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "#FF0000"
                    }).showToast();
                }
            })
            .catch(error => {
                console.error('Erro ao carregar refeições:', error);
                Toastify({
                    text: "Erro ao carregar refeições!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#FF0000"
                }).showToast();
            });
    }

    // Função para salvar uma refeição
    mealForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const id = document.getElementById('meal-id').value;
    const nome = document.getElementById('name').value;
    const descricao = document.getElementById('description').value;
    
    const meal = { 
        idRefeicao: id ? parseInt(id) : null, // Se for edição, inclui o id da refeição, senão é null
        nome: nome, 
        descricao: descricao 
    };
    
    const url = 'http://localhost:8080/refeicao'; // Sempre usa POST

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(meal)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Toastify({
                    text: "Refeição salva com sucesso!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#4CAF50"
                }).showToast();
                loadMeals();
                mealForm.reset();
                document.getElementById('meal-id').value = ''; // Limpa o campo de ID
            } else {
                console.error('Erro ao salvar refeição:', data.message);
                Toastify({
                    text: "Erro ao salvar refeição!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#FF0000"
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Erro ao salvar refeição:', error);
            Toastify({
                text: "Erro ao salvar refeição!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#FF0000"
            }).showToast();
        });
    });


    // Função para editar uma refeição
    window.editMeal = function (id) {
    fetch(`http://localhost:8080/refeicao/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const meal = data.data;
                document.getElementById('meal-id').value = meal.idRefeicao;
                document.getElementById('name').value = meal.nome;
                document.getElementById('description').value = meal.descricao;
            } else {
                console.error('Erro ao carregar refeição:', data.message);
                Toastify({
                    text: "Erro ao carregar refeição!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#FF0000"
                }).showToast();
            }
        })
        .catch(error => {
            console.error('Erro ao carregar refeição:', error);
            Toastify({
                text: "Erro ao carregar refeição!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#FF0000"
            }).showToast();
        });
};
    // Função para excluir uma refeição
    window.deleteMeal = function (id) {
        fetch(`http://localhost:8080/refeicao/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                Toastify({
                    text: "Refeição excluída com sucesso!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#FF0000"
                }).showToast();
                loadMeals();
            })
            .catch(error => {
                console.error('Erro ao excluir refeição:', error);
                Toastify({
                    text: "Erro ao excluir refeição!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "#FF0000"
                }).showToast();
            });
    };

    // Carregar as refeições ao carregar a página
    loadMeals();
});

