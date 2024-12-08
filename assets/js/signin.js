function entrar() {
    // Captura os valores dos campos de entrada
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    // Cria o objeto de login que será enviado para o backend
    const loginData = {
        cpf: usuario,  // Supondo que 'usuario' seja equivalente a 'cpf' no seu backend
        senha: senha
    };

    // Configura a requisição para enviar os dados para o backend
    fetch('http://localhost:8080/usuario/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Se a resposta for positiva, converte o retorno para JSON
        } else if (response.status === 401) {
            throw new Error('Usuário ou senha incorretos.');
        } else {
            throw new Error('Erro desconhecido.');
        }
    })
    .then(data => {
        console.log('Usuário autenticado:', data);
        if (data.success) {
            // Salva os dados do usuário no localStorage
            localStorage.setItem('usuarioPrincipal', JSON.stringify(data.data));
            // Verifica se o perfil do usuário é "Médico"
            if (data.data.perfil.descricao === "Médico") {
                // Redireciona para a página lista_pacientes.html
                window.location.href = 'lista_pacientes.html';
            } 
            if (data.data.perfil.descricao === "Paciente") {
                window.location.href = 'cardapio.html'
            } else {
                throw new Error('Usuário não autorizado.');
            }
        } else {
            throw new Error('Erro na autenticação.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById("msgError").innerText = error.message;
    });
}