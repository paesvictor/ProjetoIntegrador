$(document).ready(function(){
  $('#usuario').inputmask('999.999.999-99'); // Adiciona a máscara de CPF

  $('#usuario').on('input', function() {
    const usuario = $(this).val().replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    console.log(usuario); // Exibe apenas os números do CPF
  });
});

function cadastrar() {
  const nome = document.getElementById("nome").value
  const usuario = document.getElementById("usuario").value.replace(/\D/g, '');
  const senha = document.getElementById("senha").value;
  const confirmacaoSenha = document.getElementById("confirmSenha").value;

  console.log(senha);
  console.log(confirmacaoSenha);

  const usuarioData = {
      nome: nome,
      cpf: usuario,
      senha: senha,
  };

  if(senha != confirmacaoSenha) {
    throw new Error('Senhas não estão iguais.')
  }

  fetch('http://localhost:8080/usuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuarioData)
  })
  .then(response => {
    if (response.ok) {
        return response.json(); // Se a resposta for positiva, converte o retorno para JSON
    } else {
        throw new Error('Erro desconhecido.');
    }
  })
  .then(data => {
    console.log('Usuário cadastrado:', data);
    //TODO: Redirecionar ou tomar alguma ação após o sucesso do login
  })
  .catch(error => {
    console.error('Erro:', error);
    document.getElementById("msgError").innerText = error.message;
  });
}