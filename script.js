function verificarNovoDia(){
  const hoje= new Date().tolSOString().split("T")[0]
  const ultimaData= localStorage.getItem("ultimaData")

  if(hoje !== ultimaData){
    console.log("Novo Dia Detectado");

    localStorage.removeItem("tarefas")

    localStorage.setItem("ultimaData",hoje)
  }
}

// controle de versão 
const versaoAtual= "1.2";

const versaoSalva= localStorage.getItem("versao");

if(versaoSalva!== versaoAtual){
  localStorage.removeItem("dadosRotina");
  localStorage.setItem("versao",versaoAtual);
}

function adicionarAtividade() {
  let input = document.getElementById("atividade");
  let texto = input.value.trim();

  if (texto !== "") {
    let tarefa = {
      texto: input.value,
      concluida: false,
    };

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    li.appendChild(checkbox);

    li.appendChild(document.createTextNode("" + tarefa.texto));

    let lista = document.getElementById("listaDeAtividades");

    lista.appendChild(li);

    salvarLocalStorage(tarefa);

    input.value = "";
  }
}

function calcularProgresso() {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  const total = tarefas.length;

  if (total === 0) {
    atualizarInterface(0);
    return;
  }

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida === true,
  ).length;
  const porcentagem = Math.round((concluidas / total) * 100);

  atualizarInterface(porcentagem);
}

function atualizarInterface(valor) {
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

function salvarLocalStorage(tarefa) {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefas.push(tarefa);

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

document.addEventListener("DOMContentLoaded", function () {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefas.forEach(function (tarefa, index) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;

    // quando desnarcar/marcar, salva novamente
    checkbox.addEventListener("change", function () {
      tarefas[index].concluida = checkbox.checked;
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
      calcularProgresso();
    });

    li.appendChild(checkbox);

    li.appendChild(document.createTextNode("" + tarefa.texto));

    let lista = document.getElementById("listaDeAtividades");

    lista.appendChild(li);
  });
  calcularProgresso();
});

function limparAtividades() {
  if (confirm("tem certeza que deseja apagar as atividades salvas?")) {
    localStorage.removeItem("tarefas");
    let lista = document.getElementById("listaDeAtividades");
    lista.innerHTML = "";
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => console.log("service worker registrado"))
    .catch((err) => console.log("erro", err));
}

function mostrarData() {
  const hoje = new Date();

  const dataFormada = hoje.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const elementoData = document.getElementById("date");

  if (elementoData) {
    elementoData.textContent =
      dataFormada.charAt(0).toUpperCase() + dataFormada.slice(1);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarData();
  calcularProgresso();
});
