const h1Date= document.getElementById("date");
const h2Hora= document.getElementById("horas");

function mostrarData(){
   const hoje= new Date()

   const dia= hoje.getDate();
   const mes= new Intl.DateTimeFormat("pt-br", {month: "long"}).format(hoje);
   const ano= hoje.getFullYear();

   hoje.toLocaleString("pt-br");
   h1Date.innerHTML= `${dia} de ${mes}  ${ano}`

    //    pegando a hora 
    const hora= String(hoje.getHours()).padStart(2,"0");
    const minutos= String(hoje.getMinutes()).padStart(2,"0");

    h2Hora.textContent= `${hora}:${minutos}`;
    setInterval(mostrarData, 1000)
}
mostrarData()

