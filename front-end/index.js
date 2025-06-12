const formularioTarefa = document.getElementById('form-tarefa');
const entradaTarefa = document.getElementById('entrada-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
const botaoExcluirTodas = document.getElementById('botao-excluir-todas');
const mensagemVazia = document.getElementById('mensagem-vazia');
const loading = document.getElementById('loading');
const totalTasks = document.getElementById('total-tasks');
const taskCounter = document.getElementById('task-counter');

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

function atualizarContadores() {
    totalTasks.textContent = tarefas.length;
    taskCounter.textContent = tarefas.length;
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
        atualizarContadores();
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
        li.classList.add('task-item');

        const taskIcon = document.createElement('div');
        taskIcon.classList.add('task-icon');

        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');
        taskContent.textContent = tarefa.descricao;

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.classList.add('task-btn', 'edit-btn');
        editBtn.addEventListener('click', () => editarTarefa(indice));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.classList.add('task-btn', 'delete-btn');
        deleteBtn.addEventListener('click', () => excluirTarefa(tarefa.id));

        taskActions.appendChild(editBtn);
        taskActions.appendChild(deleteBtn);

        li.appendChild(taskIcon);
        li.appendChild(taskContent);
        li.appendChild(taskActions);
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
    const taskContent = li.querySelector('.task-content');
    const taskActions = li.querySelector('.task-actions');

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = tarefas[indice].descricao;
    editInput.classList.add('task-edit-input');

    li.insertBefore(editInput, taskContent);
    li.removeChild(taskContent);

    taskActions.innerHTML = '';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Salvar';
    saveBtn.classList.add('task-btn', 'save-btn');
    saveBtn.addEventListener('click', async () => {
        const valorEditado = editInput.value.trim();
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

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.classList.add('task-btn', 'cancel-btn');
    cancelBtn.addEventListener('click', () => renderizarTarefas());

    taskActions.appendChild(saveBtn);
    taskActions.appendChild(cancelBtn);
    
    editInput.focus();
    editInput.select();
}

// Inicia carregando as tarefas
carregarTarefas();