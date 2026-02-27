function adicionarAtividade() {
  let input = document.getElementById("atividade");
  let texto= input.value.trim();

  if (texto !== "") {
    let tarefa= {
      texto:input.value,
      concluida:false
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

function salvarLocalStorage(tarefa) {
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

  tarefas.push(tarefa);

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

document.addEventListener('DOMContentLoaded',function () {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  tarefas.forEach(function (tarefa,index) {

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked= tarefa.concluida;

    // quando desnarcar/marcar, salva novamente
    checkbox.addEventListener('change',function(){
      tarefas[index].concluida=checkbox.checked;
      localStorage.setItem('tarefas',JSON.stringify(tarefas));
    });

    li.appendChild(checkbox);

    li.appendChild(document.createTextNode("" + tarefa.texto));

    let lista = document.getElementById("listaDeAtividades");

    lista.appendChild(li);
  });
});

function limparAtividades(){
  if(confirm('tem certeza que deseja apagar as atividades salvas?')){
    localStorage.removeItem('tarefas');
    let lista= document.getElementById('listaDeAtividades');
    lista.innerHTML='';
  }
}
