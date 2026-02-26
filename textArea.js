function salvarReflexao() {
  let texto = document.getElementById("reflexao").value;

  if (texto.trim() !== "") {
    if (texto.trim() !== "") {
      localStorage.setItem("reflexaoDoDia", texto);
      alert("texto salvo.");
    }
  }
}

function carregarReflexao() {
  let textoSalvo = localStorage.getItem("reflexaoDoDia");

  if (textoSalvo) {
    document.getElementById("reflexao").value = textoSalvo;
  }
}

window.onload = carregarReflexao;
 