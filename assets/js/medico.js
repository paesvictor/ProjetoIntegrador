function toggleMenu() {
    var menu = document.getElementById('menuLateral');
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    } else {
        menu.classList.add('open');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const usuarioPrincipal = JSON.parse(localStorage.getItem('usuarioPrincipal'));
    const paciente = JSON.parse(localStorage.getItem('paciente'));

    if (usuarioPrincipal && paciente) {
        document.getElementById('medico').value = usuarioPrincipal.nome;
        document.getElementById('paciente').value = paciente.nome;
    } else {
        console.error('Dados do médico ou paciente não encontrados');
    }
});

document.getElementById('formularioDieta').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Recupera os dados do médico e do paciente do localStorage
    const usuarioPrincipal = JSON.parse(localStorage.getItem('usuarioPrincipal'));
    const paciente = JSON.parse(localStorage.getItem('paciente'));

    if (!usuarioPrincipal || !paciente) {
        alert('Dados do médico ou paciente não encontrados.');
        return;
    }

    // Captura os dados do formulário
    const formData = {
        idFormulario: 0,
        medico: usuarioPrincipal,
        paciente: paciente,
        tipoDieta: document.querySelector('input[name="objetivos"]:checked').value,
        viaAdministracao: document.querySelector('input[name="sintomas"]:checked').value,
        observacao: document.getElementById('observacao').value
    };

    // Faz a requisição POST para a API
    fetch('http://localhost:8080/formulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Formulário enviado com sucesso!');
        } else {
            alert('Erro ao enviar o formulário.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar o formulário.');
    });
});
