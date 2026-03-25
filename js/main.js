import { verificarNovoDia, verificarVersao } from "./date.js";
import { renderizarTarefas } from "./ui.js";
import { calcularProgresso } from "./progress.js";
import { iniciarEventos } from "./app.js";

import { mostrarData, horaAtual } from "./time.js";

document.addEventListener("DOMContentLoaded", () => {
  verificarNovoDia();
  verificarVersao();

  renderizarTarefas();
  calcularProgresso();

  iniciarEventos();

  mostrarData();
  horaAtual();

  setInterval(horaAtual, 1000);
});