import { pegarTarefas, salvarTarefas } from "./storage.js";

export function adicionarTarefa(texto, prioridade) {
  const tarefas = pegarTarefas();

  const tarefa = {
    texto,
    prioridade,
    concluida: false,
    dataCriacao: new Date().toISOString(),
    diasDuracao: prioridade ? 3 : 1,
  };

  tarefas.push(tarefa);
  salvarTarefas(tarefas);
}

export function removerTarefa(index) {
  const tarefas = pegarTarefas();

  tarefas.splice(index, 1);

  salvarTarefas(tarefas);
}

export function toggleConcluida(index) {
  const tarefas = pegarTarefas();

  tarefas[index].concluida = !tarefas[index].concluida;

  salvarTarefas(tarefas);
}