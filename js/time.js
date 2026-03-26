export function mostrarData() {
  const hoje = new Date();

  const dataFormatada = hoje.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const elemento = document.getElementById("date");

  if (elemento) {
    elemento.textContent =
      dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  }
}

export function horaAtual() {
  const hora = new Date();

  const formatada = hora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const elemento = document.getElementById("horas");

  if (elemento) {
    elemento.textContent = formatada;
  }
}