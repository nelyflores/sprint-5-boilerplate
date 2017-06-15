var api = {
  url: "http://examen-laboratoria-sprint-5.herokuapp.com/topics"
};
var $tasksList = $("#listaTemas");
console.log($tasksList)
var cargarPagina = function () {
  cargarTemas();
  var saber=$("#agregar_formulario");
   $("#agregar_formulario").submit(agregarTema);
console.log(saber);
  
};
var cargarTemas = function () {
  $.getJSON(api.url, function (temas) {
    temas.forEach(crearTemas );

  });
}
var crearTemas = function (tema) {
  var temas = tema.content;
  console.log(temas);
  var autor = tema.author_name;
  var cuantasRespuestas = tema.responses_count;
  


  var plantillaNueva = plantilla.replace("__titulo-tema__", temas).replace("__autor__",autor).replace("__numRespuestas__",cuantasRespuestas);
  $tasksList.append(plantillaNueva);

};
var agregarTema = function (e) {
 e.preventDefault();
  var nombre = $("#nombre-autor").val();
  var tituloTema = $("#titulo-tema").val()
 console.log(nombre);
 console.log(tituloTema);
 $.post(api.url, {
    author_name: nombre,
    content:tituloTema,
    responses_count:0
  }, function (tema) {
    crearTemas(tema);
    $("#myModal").modal("hide");
  });
 
};

var plantilla = '<tr>' +
					'<td>__titulo-tema__</td>'+
                    '<td>__autor__</td>' +
                    '<td>__numRespuestas__</td>' +
                  '</tr>';



$(document).ready(cargarPagina);