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
      // Redirecionar ou tomar alguma ação após o sucesso do login
  })
  .catch(error => {
      console.error('Erro:', error);
      document.getElementById("msgError").innerText = error.message;
  });
}