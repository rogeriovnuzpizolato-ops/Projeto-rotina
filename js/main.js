let tarefas = [];

document.addEventListener('DOMContentLoaded', () => {
  if (!exigirLogin()) return;

  document.getElementById('dataHoje').textContent = formatarDataHoje();
  document.getElementById('btnSair').addEventListener('click', sair);
  document.getElementById('formNova').addEventListener('submit', aoCriar);
  document.getElementById('listaHoje').addEventListener('click', aoClicarNaLista);
  document.getElementById('listaVencidas').addEventListener('click', aoClicarNaLista);

  carregar();
});

async function carregar() {
  try {
    tarefas = await listarTarefas();
    renderizar(tarefas);
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

async function aoCriar(event) {
  event.preventDefault();
  esconderErro();

  const campoTitulo = document.getElementById('titulo');
  const campoDescricao = document.getElementById('descricao');
  const titulo = campoTitulo.value.trim();

  if (!titulo) return;

  try {
    const nova = await criarTarefa({
      titulo: titulo,
      descricao: campoDescricao.value.trim()
    });
    tarefas.push(nova);
    renderizar(tarefas);
    event.target.reset();
    campoTitulo.focus();
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

async function aoClicarNaLista(event) {
  const botao = event.target.closest('button[data-acao]');
  if (!botao) return;

  const id = Number(botao.closest('.tarefa').dataset.id);
  const tarefa = tarefas.find((t) => t.id === id);
  if (!tarefa) return;

  esconderErro();

  try {
    if (botao.dataset.acao === 'alternar') await alternar(tarefa);
    if (botao.dataset.acao === 'excluir') await excluir(tarefa);
    if (botao.dataset.acao === 'recriar') await recriar(tarefa);
  } catch (erro) {
    mostrarErro(erro.message);
  }
}

async function alternar(tarefa) {
  const novoStatus = tarefa.status === 'CONCLUIDA' ? 'PENDENTE' : 'CONCLUIDA';

  const atualizada = await atualizarTarefa(tarefa.id, {
    titulo: tarefa.titulo,
    descricao: tarefa.descricao,
    status: novoStatus,
    dataCriacao: tarefa.dataCriacao
  });

  tarefa.status = atualizada.status;
  renderizar(tarefas);
}

async function excluir(tarefa) {
  if (!confirm('Excluir esta tarefa?')) return;

  await deletarTarefa(tarefa.id);
  tarefas = tarefas.filter((t) => t.id !== tarefa.id);
  renderizar(tarefas);
}

// Tarefa vencida: cria uma nova igual para hoje e apaga a antiga
async function recriar(tarefa) {
  const nova = await criarTarefa({
    titulo: tarefa.titulo,
    descricao: tarefa.descricao
  });
  await deletarTarefa(tarefa.id);

  tarefas = tarefas.filter((t) => t.id !== tarefa.id);
  tarefas.push(nova);
  renderizar(tarefas);
}