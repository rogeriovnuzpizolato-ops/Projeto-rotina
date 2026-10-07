function formatarData(iso) {
  if (!iso) return '';
  const [ano, mes, dia] = String(iso).split('-');
  return dia + '/' + mes + '/' + ano;
}

function formatarDataHoje() {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

function mostrarErro(mensagem) {
  const caixa = document.getElementById('erro');
  caixa.textContent = mensagem;
  caixa.classList.add('visivel');
}

function esconderErro() {
  document.getElementById('erro').classList.remove('visivel');
}

function criarBotao(texto, acao, classe) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.textContent = texto;
  botao.dataset.acao = acao;
  if (classe) botao.className = classe;
  return botao;
}

function criarElementoTarefa(tarefa) {
  const concluida = tarefa.status === 'CONCLUIDA';
  const vencida = tarefa.status === 'VENCIDA';

  const item = document.createElement('article');
  item.className = 'tarefa' + (concluida ? ' concluida' : '') + (vencida ? ' vencida' : '');
  item.dataset.id = tarefa.id;

  if (!vencida) {
    const marcar = criarBotao('✓', 'alternar', 'marcar');
    marcar.setAttribute('aria-label', concluida ? 'Desmarcar como concluída' : 'Marcar como concluída');
    item.appendChild(marcar);
  }

  const conteudo = document.createElement('div');
  conteudo.className = 'tarefa-conteudo';

  if (vencida) {
    const selo = document.createElement('span');
    selo.className = 'selo-vencida';
    selo.textContent = 'Venceu às 3h';
    conteudo.appendChild(selo);
  }

  const titulo = document.createElement('h3');
  titulo.className = 'tarefa-titulo';
  titulo.textContent = tarefa.titulo;
  conteudo.appendChild(titulo);

  if (tarefa.descricao) {
    const descricao = document.createElement('p');
    descricao.className = 'tarefa-descricao';
    descricao.textContent = tarefa.descricao;
    conteudo.appendChild(descricao);
  }

  const data = document.createElement('small');
  data.className = 'tarefa-data';
  data.textContent = 'Criada em ' + formatarData(tarefa.dataCriacao);
  conteudo.appendChild(data);

  item.appendChild(conteudo);

  const acoes = document.createElement('div');
  acoes.className = 'tarefa-acoes';

  if (vencida) {
    acoes.appendChild(criarBotao('Recriar', 'recriar', 'recriar'));
    acoes.appendChild(criarBotao('Ignorar', 'excluir', 'excluir'));
  } else {
    acoes.appendChild(criarBotao('Excluir', 'excluir', 'excluir'));
  }

  item.appendChild(acoes);
  return item;
}

// A barra considera só as tarefas de hoje: as vencidas ficam de fora
function atualizarProgresso(tarefas) {
  const doDia = tarefas.filter((t) => t.status !== 'VENCIDA');
  const feitas = doDia.filter((t) => t.status === 'CONCLUIDA').length;
  const total = doDia.length;
  const percentual = total === 0 ? 0 : Math.round((feitas / total) * 100);

  document.getElementById('percentual').textContent = percentual + '%';
  document.getElementById('preenchimento').style.width = percentual + '%';
  document.getElementById('barra').setAttribute('aria-valuenow', percentual);

  let texto = 'Adicione uma tarefa para começar.';
  if (total > 0) {
    texto = feitas + ' de ' + total + (total === 1 ? ' tarefa concluída' : ' tarefas concluídas');
  }
  if (total > 0 && feitas === total) {
    texto = 'Tudo concluído por hoje.';
  }
  document.getElementById('textoProgresso').textContent = texto;

  document.getElementById('progresso').classList.toggle('completo', total > 0 && feitas === total);
}

function renderizar(tarefas) {
  const listaHoje = document.getElementById('listaHoje');
  const listaVencidas = document.getElementById('listaVencidas');
  const secaoVencidas = document.getElementById('secaoVencidas');

  const hoje = tarefas
    .filter((t) => t.status !== 'VENCIDA')
    .sort((a, b) => {
      const pesoA = a.status === 'CONCLUIDA' ? 1 : 0;
      const pesoB = b.status === 'CONCLUIDA' ? 1 : 0;
      return pesoA - pesoB || a.id - b.id;
    });
  const vencidas = tarefas.filter((t) => t.status === 'VENCIDA').sort((a, b) => a.id - b.id);

  listaHoje.replaceChildren();
  listaVencidas.replaceChildren();

  if (hoje.length === 0) {
    const vazio = document.createElement('p');
    vazio.className = 'vazio';
    vazio.textContent = 'Nenhuma tarefa por enquanto. Adicione a primeira acima.';
    listaHoje.appendChild(vazio);
  } else {
    hoje.forEach((t) => listaHoje.appendChild(criarElementoTarefa(t)));
  }

  vencidas.forEach((t) => listaVencidas.appendChild(criarElementoTarefa(t)));
  secaoVencidas.hidden = vencidas.length === 0;

  atualizarProgresso(tarefas);
}