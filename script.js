const h1Date= document.getElementById("date");

function mostrarHora(){
   const hoje= new Date()

   const dia= hoje.getDate();
   const mes= new Intl.DateTimeFormat("pt-br", {month: "long"}).format(hoje);

   hoje.toLocaleString("pt-br");

   h1Date.innerHTML= `${dia} de ${mes}`
//    h1Date.append(dia,mes)
}
mostrarHora()

