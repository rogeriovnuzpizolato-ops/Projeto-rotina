import { pegarTarefas } from "./storage.js";

export function calcularProgresso() {
  const tarefas = pegarTarefas();
  const total = tarefas.length;

  if (total === 0) {
    atualizarInterface(0);
    return;
  }

  const concluidas = tarefas.filter(t => t.concluida).length;
  const porcentagem = Math.round((concluidas / total) * 100);

  atualizarInterface(porcentagem);
}

export function atualizarInterface(valor) {
  const texto = document.getElementById("porcentagem");
  const barra = document.getElementById("barra");

  texto.innerText = valor + "%";
  barra.style.width = valor + "%";

  if (valor < 30) {
    barra.style.background = "#e74c3c";
  } else if (valor < 65) {
    barra.style.background = "#f1c40f";
  } else {
    barra.style.background = "#2ecc71";
  }
}