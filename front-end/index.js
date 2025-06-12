const formularioTarefa = document.getElementById('form-tarefa');
const entradaTarefa = document.getElementById('entrada-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const botaoExcluirTodas = document.getElementById('botao-excluir-todas');
const mensagemVazia = document.getElementById('mensagem-vazia');
const loading = document.getElementById('loading');

let tarefas = [];

// Funções auxiliares
function mostrarCarregamento() {
    loading.style.display = 'flex';
}

function esconderCarregamento() {
    loading.style.display = 'none';
}

function mostrarMensagemVazia() {
    mensagemVazia.style.display = tarefas.length === 0 ? 'block' : 'none';
}

// Busca tarefas do back-end ao iniciar
async function carregarTarefas() {
    try {
        mostrarCarregamento();
        const resposta = await fetch('/tarefas');
        if (!resposta.ok) {
            throw new Error('Erro ao carregar tarefas');
        }
        tarefas = await resposta.json();
        renderizarTarefas();
        mostrarMensagemVazia();
    } catch (erro) {
        console.error('Erro ao carregar tarefas:', erro);
        alert('Erro ao carregar tarefas. Verifique a conexão.');
    } finally {
        esconderCarregamento();
    }
}

function renderizarTarefas() {
    listaTarefas.innerHTML = '';

    tarefas.forEach((tarefa, indice) => {
        const li = document.createElement('li');
        li.classList.add('item-tarefa');

        const span = document.createElement('span');
        span.classList.add('texto-tarefa');
        span.textContent = tarefa.descricao;

        const divBotoes = document.createElement('div');
        divBotoes.classList.add('botoes-tarefa');

        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.classList.add('botao-editar');
        botaoEditar.addEventListener('click', () => editarTarefa(indice));

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.classList.add('botao-excluir');
        botaoExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));

        divBotoes.appendChild(botaoEditar);
        divBotoes.appendChild(botaoExcluir);

        li.appendChild(span);
        li.appendChild(divBotoes);
        listaTarefas.appendChild(li);
    });
}

formularioTarefa.addEventListener('submit', async e => {
    e.preventDefault();
    const novaTarefa = entradaTarefa.value.trim();
    if (novaTarefa) {
        try {
            mostrarCarregamento();
            const resposta = await fetch('/tarefas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descricao: novaTarefa })
            });
            
            if (!resposta.ok) {
                throw new Error('Erro ao adicionar tarefa');
            }
            
            entradaTarefa.value = '';
            await carregarTarefas();
        } catch (erro) {
            console.error('Erro ao adicionar tarefa:', erro);
            alert('Erro ao adicionar tarefa. Tente novamente.');
        } finally {
            esconderCarregamento();
        }
    }
});

async function excluirTarefa(id) {
    if (!confirm('Deseja realmente excluir esta tarefa?')) {
        return;
    }
    
    try {
        mostrarCarregamento();
        const resposta = await fetch(`/tarefas/${id}`, {
            method: 'DELETE'
        });
        
        if (!resposta.ok) {
            throw new Error('Erro ao excluir tarefa');
        }
        
        await carregarTarefas();
    } catch (erro) {
        console.error('Erro ao excluir tarefa:', erro);
        alert('Erro ao excluir tarefa. Tente novamente.');
    } finally {
        esconderCarregamento();
    }
}

botaoExcluirTodas.addEventListener('click', async () => {
    if (tarefas.length === 0) {
        alert('Não há tarefas para excluir!');
        return;
    }
    
    if (confirm('Deseja realmente excluir todas as tarefas?')) {
        try {
            mostrarCarregamento();
            for (const tarefa of tarefas) {
                await fetch(`/tarefas/${tarefa.id}`, {
                    method: 'DELETE'
                });
            }
            await carregarTarefas();
        } catch (erro) {
            console.error('Erro ao excluir todas as tarefas:', erro);
            alert('Erro ao excluir tarefas. Tente novamente.');
        } finally {
            esconderCarregamento();
        }
    }
});

function editarTarefa(indice) {
    const li = listaTarefas.children[indice];
    const span = li.querySelector('.texto-tarefa');
    const divBotoes = li.querySelector('.botoes-tarefa');

    const inputEdicao = document.createElement('input');
    inputEdicao.type = 'text';
    inputEdicao.value = tarefas[indice].descricao;
    inputEdicao.classList.add('input-edicao');

    li.insertBefore(inputEdicao, span);
    li.removeChild(span);

    divBotoes.innerHTML = '';

    const botaoSalvar = document.createElement('button');
    botaoSalvar.textContent = 'Salvar';
    botaoSalvar.classList.add('botao-editar');
    botaoSalvar.addEventListener('click', async () => {
        const valorEditado = inputEdicao.value.trim();
        if (valorEditado) {
            try {
                mostrarCarregamento();
                const resposta = await fetch(`/tarefas/${tarefas[indice].id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ descricao: valorEditado })
                });
                
                if (!resposta.ok) {
                    throw new Error('Erro ao editar tarefa');
                }
                
                await carregarTarefas();
            } catch (erro) {
                console.error('Erro ao editar tarefa:', erro);
                alert('Erro ao editar tarefa. Tente novamente.');
            } finally {
                esconderCarregamento();
            }
        } else {
            alert('A tarefa não pode ficar vazia!');
        }
    });

    const botaoCancelar = document.createElement('button');
    botaoCancelar.textContent = 'Cancelar';
    botaoCancelar.classList.add('botao-excluir');
    botaoCancelar.addEventListener('click', () => renderizarTarefas());

    divBotoes.appendChild(botaoSalvar);
    divBotoes.appendChild(botaoCancelar);
    
    inputEdicao.focus();
    inputEdicao.select();
}

// Inicia carregando as tarefas
carregarTarefas();