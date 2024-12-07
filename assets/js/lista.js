document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        const nomeCell = row.querySelector('.nome');
        const sexoCell = row.querySelector('.sexo');
        const nascimentoCell = row.querySelector('.nascimento');
        const buttonCell = event.target;

        if (button.textContent === 'Editar') {
            // Transformar as células em campos editáveis
            const nomeInput = document.createElement('input');
            nomeInput.type = 'text';
            nomeInput.value = nomeCell.textContent;
            nomeCell.innerHTML = '';
            nomeCell.appendChild(nomeInput);

            const sexoSelect = document.createElement('select');
            ['Masculino', 'Feminino'].forEach(optionText => {
                const option = document.createElement('option');
                option.value = optionText;
                option.textContent = optionText;
                if (optionText === sexoCell.textContent) {
                    option.selected = true;
                }
                sexoSelect.appendChild(option);
            });
            sexoCell.innerHTML = '';
            sexoCell.appendChild(sexoSelect);

            const nascimentoInput = document.createElement('input');
            nascimentoInput.type = 'date';
            nascimentoInput.value = nascimentoCell.textContent.split('/').reverse().join('-');
            nascimentoCell.innerHTML = '';
            nascimentoCell.appendChild(nascimentoInput);

            // Alterar botão para "Salvar"
            button.textContent = 'Salvar';
        } else {
            // Salvar os valores editados
            const nomeInput = nomeCell.querySelector('input');
            const sexoSelect = sexoCell.querySelector('select');
            const nascimentoInput = nascimentoCell.querySelector('input');

            nomeCell.textContent = nomeInput.value;
            sexoCell.textContent = sexoSelect.value;
            nascimentoCell.textContent = nascimentoInput.value.split('-').reverse().join('/');

            // Voltar botão para "Editar"
            button.textContent = 'Editar';
        }
    });
});
