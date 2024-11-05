function alterarStatus(selectElement) {
    // Obtém o novo valor selecionado
    const novoStatus = selectElement.value;
    // Encontra o elemento de status correspondente
    const statusElement = selectElement.previousElementSibling;
    // Atualiza o texto do status
    statusElement.textContent = novoStatus;
    // Atualiza a classe para o novo status (opcional)
    statusElement.className = 'status ' + novoStatus.toLowerCase().replace(" ", "-");
}
