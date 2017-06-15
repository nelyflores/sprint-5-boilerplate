var api = {
  url: "http://examen-laboratoria-sprint-5.herokuapp.com/topics"
};
var $tasksList = $("#listaTemas");
console.log($tasksList)
var cargarPagina = function () {
  cargarTemas();
  var saber=$("#agregar_formulario");
  var boton=$("#botonBusqueda");
  console.log(boton);
   $("#agregar_formulario").submit(agregarTema);
   $("#botonBusqueda").click(filtrarContactos);

  
};
var cargarTemas = function () {
  $.getJSON(api.url, function (temas) {
    temas.forEach(crearTemas );

  });
}
var crearTemas = function (tema) {
  var temas = tema.content;
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

var filtrarContactos= function(e){
	e.preventDefault();
	var criterioBusqueda = $("#palabra-buscar").val().toLowerCase();
	alert("la palabra a buscar es " + criterioBusqueda);
	$.getJSON(api.url, function (temas) {
    var filtrarTema= temas.filter(function(tarea){
    	return tarea.content.toLowerCase().indexOf(criterioBusqueda) >= 0;
    });
    console.log(filtrarTema);
    mostrarContactos(filtrarTema);
	});
	

	
};
var mostrarContactos = function (temas) {
	var plantillaFinal = "";
	temas.forEach(function (tema) {
		plantillaFinal += plantilla.replace("__titulo-tema__", tema.content)
			.replace("__autor__", tema.author_name)
			.replace("__numRespuestas__", tema.responses_count);
	});
	$("#listaTemas").html(plantillaFinal);
};




$(document).ready(cargarPagina);