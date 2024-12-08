document.addEventListener("DOMContentLoaded", function() {
    fetchPacientes();
});

function fetchPacientes() {
    fetch('http://localhost:8080/usuario/')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                populateTable(data.data);
            } else {
                console.error('Nenhum dado encontrado');
            }
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

function populateTable(pacientes) {
    const tableBody = document.querySelector('#paciente-table tbody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de preencher

    pacientes.forEach(paciente => {
        const row = document.createElement('tr');

        const nomeCell = document.createElement('td');
        nomeCell.textContent = paciente.nome;
        row.appendChild(nomeCell);

        const sexoCell = document.createElement('td');
        sexoCell.textContent = paciente.sexo;
        row.appendChild(sexoCell);

        const nascimentoCell = document.createElement('td');
        nascimentoCell.textContent = new Date(paciente.dataNascimento).toLocaleDateString('pt-BR');
        row.appendChild(nascimentoCell);

        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => editPaciente(paciente));
        actionsCell.appendChild(editButton);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}

function editPaciente(paciente) {
    localStorage.setItem('paciente', JSON.stringify(paciente));
    window.location.href = 'medico.html';
}