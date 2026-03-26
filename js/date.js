export function verificarNovoDia() {
  const hoje = new Date().toISOString().split("T")[0];
  const ultimaData = localStorage.getItem("ultimaData");

  if (!ultimaData) {
    localStorage.setItem("ultimaData", hoje);
    return;
  }

  if (hoje !== ultimaData) {
    console.log("Novo Dia Detectado");
    localStorage.removeItem("tarefas");
    localStorage.setItem("ultimaData", hoje);
  }
}

export function verificarVersao() {
  const versaoAtual = "1.3";
  const versaoSalva = localStorage.getItem("versao");

  if (versaoSalva !== versaoAtual) {
    localStorage.removeItem("dadosRotina");
    localStorage.setItem("versao", versaoAtual);
  }
}