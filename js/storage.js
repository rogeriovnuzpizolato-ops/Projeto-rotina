const KEY = "tarefas";

export function pegarTarefas() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function salvarTarefas(tarefas) {
  localStorage.setItem(KEY, JSON.stringify(tarefas));
}

export function limparTarefas() {
  localStorage.removeItem(KEY);
}