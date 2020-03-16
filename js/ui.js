import { cargarPokemones } from './funciones.js';


export function generarMatriz(){
	const matrizPokemones = $('#matriz-pokemones');
	const cantidadFilas = 6;
	const cantidadColumnas = 8;
    
	for(let i=0 ; i<cantidadFilas ; i++){
		matrizPokemones.append('<div class="row"></div>');
		for(let j=0 ; j<cantidadColumnas ; j++){
			$(matrizPokemones.find('div.row')[i]).append('<div class="col centrado"> <img /> <p> </p> </div>');
		}
	}
}

export function generarNavegadorPaginas(){
	const cantidadPaginas = 18;
	const cartasPokemones = $('.row .centrado');

	for(let i=0 ; i<cantidadPaginas ; i++){
		$('#pagination').append(`<li class="page-item"><button class="page-link">${i+1}</button></li>`);
		$($('#pagination button')[i]).on('click', function(){
			$(cartasPokemones).unbind(); // borro los onclick anteriores 

			$('#pagination button').removeClass('activo'); 
			$(this).addClass('activo');
			cargarPokemones(($(this).html() - 1) * 48);

		});
	}
}

export function setearNombreEImagen($cuadro , nombre , imagen ){
	$cuadro.find('p').text(nombre); 
	$cuadro.find('img').attr('src', imagen);
}

export function mostrarError(error){
	setTimeout(() => {
		$('#carta-pokemon').modal('hide');
		$('#carta-error').modal('show'); 
	}, 500);

	$('#error').text(error);
    
}


function mostrarCargando(){
	$('#carta-pokemon').modal('show');

	$('#imagen-pokemon').attr('src', '../img/loading/loading.gif');
	$('#nombre-pokemon').html('CARGANDO');

	$('#peso').html('0 kg');
	$('#altura').html('0 m');
	$('#experiencia').html('0');

	$('#hp').css('width', 0 + '%');
	$('#speed').css('width', 0 + '%');
	$('#defense').css('width', 0 + '%');
	$('#attack').css('width', 0 + '%');

	if ($('#tipo .pequeño').length !== 0) { // borra los tipos anteriores
		$('#tipo .pequeño').remove();
	}
}

export function mostrarPokemon(url){
	mostrarCargando();
	$.ajax({
		method: 'GET',
		url: url,
		success: respuesta => {
			$('#imagen-pokemon').attr('src', `${respuesta.sprites.front_default}`);
			$('#nombre-pokemon').html(`${respuesta.name}`.toUpperCase());

			$('#peso').html(`${respuesta.weight/10} kg`);
			$('#altura').html(`${respuesta.height/10} m`);
			$('#experiencia').html(`${respuesta.base_experience}`);

			$('#hp').css('width', respuesta.stats[5].base_stat + '%');
			$('#speed').css('width', respuesta.stats[0].base_stat + '%');
			$('#defense').css('width', respuesta.stats[3].base_stat + '%');
			$('#attack').css('width', respuesta.stats[4].base_stat + '%');


			$(respuesta.types).each(function(){
				$('#tipo').append(`<img src="img/${this.type.name}.png" title="${this.type.name}" class="pequeño"></img>`);
			});
		}
	}).fail(() => {
		mostrarError('Pokemon not found, try again later');
	});
}
