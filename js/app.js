import { adicionarTarefa, removerTarefa, toggleConcluida } from "./tasks.js";
import { renderizarTarefas } from "./ui.js";
import { calcularProgresso } from "./progress.js";

export function iniciarEventos() {
  document.addEventListener("click", (e) => {

    if (e.target.classList.contains("adicionar")) {
      const card = e.target.parentElement;
      const input = card.querySelector(".inputCard");

      if (!input.value) return;

      const prioridade = card.querySelector(".ativo") ? true : false;

      adicionarTarefa(input.value, prioridade);

      renderizarTarefas();
      calcularProgresso();
    }

    if (e.target.classList.contains("remove")) {
      const index = e.target.dataset.index;

      removerTarefa(index);
      renderizarTarefas();
      calcularProgresso();
    }

    if (e.target.classList.contains("check")) {
      const index = e.target.dataset.index;

      toggleConcluida(index);
      renderizarTarefas();
      calcularProgresso();
    }

    if (e.target.classList.contains("botao-prioridade")) {
      e.target.classList.toggle("ativo");
    }
  });
}