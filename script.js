function adicionarAtividade() {
  let input = document.getElementById("atividade");
  let atividade = input.value;

  if (atividade.trim() !== "") {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    li.appendChild(checkbox);

    li.appendChild(document.createTextNode("" + atividade));

    let lista = document.getElementById("listaDeAtividades");

    lista.appendChild(li);

    salvarLocalStorage(atividade);

    input.value = "";
  }
}

function salvarLocalStorage(atividade) {
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.push(atividade);

  localStorage.setItem("tarefas", JSON.stringify(tarefas  ));
}

document.addEventListener('DOMContentLoaded',function () {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefas.forEach(function (atividade) {
    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    li.appendChild(checkbox);

    li.appendChild(document.createTextNode("" + atividade));

    let lista = document.getElementById("listaDeAtividades");

    lista.appendChild(li);
  });
});
