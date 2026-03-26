import { pegarTarefas } from "./storage.js";

export function criarCardInput() {
  const lista = document.getElementById("listaTarefas");

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <input type="text" placeholder="Digite sua atividade" class="inputCard">
    <button class="adicionar">✔</button>
    <button class="remover">✘</button>
    <button class="botao-prioridade">✦</button>
  `;

  lista.prepend(card);
}

export function renderizarTarefas() {
  const lista = document.getElementById("listaTarefas");
  const tarefas = pegarTarefas();

  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const div = document.createElement("div");

    div.className = `card ${tarefa.prioridade ? "prioridade" : ""}`;

    div.innerHTML = `
      <span class="${tarefa.concluida ? "concluida" : ""}">
        ${tarefa.texto}
      </span>
      <button data-index="${index}" class="check">✔</button>
      <button data-index="${index}" class="remove">✘</button>
    `;

    lista.appendChild(div);
  });
}