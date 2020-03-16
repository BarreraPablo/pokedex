import { mostrarPokemon , setearNombreEImagen, mostrarError } from './ui.js'


export function cargarDefault(){
    cargarPokemones(0)
    $($('#pagination button')[0]).addClass('activo') 
}

export function cargarPokemones(offset){
    const cartasPokemones = $(".row .centrado")
    const saltoID = 807 // Se produce un salto en los ID, el siguiente al ID 807 es el ID 10.001
    const diferencia = 9194 // Para conseguir el ID de los pokemones con ID mayor a 807 hay que sumarles 9.194 (806 -> 807 -> 10.001 -> 10.002)

    $.ajax({
        method: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=48`,
        success: respuesta => {
            $(respuesta.results).each(function(index) {
                let indice = 0
                if(offset + index + 1 > saltoID){
                    indice = offset + index + diferencia
                }else{
                    indice = offset + index + 1
                }

                setearNombreEImagen($(cartasPokemones[index]) , this.name.toUpperCase() , `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indice}.png`)
                habilitarClick(cartasPokemones[index], this.url)
            })
        }
    }).fail(() => {
        mostrarError("Cannot connect to server, try again later")
    })
}

function habilitarClick(cuadro, url){
    $(cuadro).on("click", function(){
        mostrarPokemon(url)
    })
}


export function habilitarBotonSearch(){
    $('#buscar').on('click', function(event){
        const pokemon = $('input[type=search]').val().toLocaleLowerCase()

        mostrarPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

        event.preventDefault()
    })    
}
