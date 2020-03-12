function cargarPokemones(offset){
    $.ajax({
        method: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=48`,
        success: respuesta => {
            $(respuesta.results).each(function(index) {
                if(offset+index+1 > 807){
                    indice = offset+index+9194
                }else{
                    indice = offset+index+1
                }

                $(matrizPokemones[index]).find("p").text(this.name.toUpperCase()) //Agrego el nombre de cada pokemon
                $(matrizPokemones[index]).find("img").attr("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indice}.png`)

                habilitarClick(matrizPokemones[index], this.url)
            })

        }
    })
}



function listarPaginas(){
    cantidadPaginas = 18

    for(let i=0; i<cantidadPaginas; i++){
        $('#pagination').append(`<li class="page-item"><button class="page-link">${i+1}</button></li>`)
        $($('#pagination button')[i]).on('click', function(){
            $(matrizPokemones).unbind() // borro los onclick anteriores 

            $('#pagination button').removeClass('activo') 
            $(this).addClass("activo");
            console.log(this)
            cargarPokemones(($(this).html() - 1) * 48)

        })
    }
    $($('#pagination button')[0]).click() //Carga por default todos los pokemones
}

function habilitarClick(cuadro, url){
    $(cuadro).on("click", function(){
        mostrarPokemon(url)
    })
}

function mostrarPokemon(url){
    $('#modal1').modal('show');
    $.ajax({
        method: "GET",
        url: url,
        success: respuesta => {
            $('#imagen-pokemon').attr("src", `${respuesta.sprites.front_default}`)
            $('#nombre-pokemon').html(`${respuesta.name}`.toUpperCase())

            $('#peso').html(`${respuesta.weight/10} kg`)
            $('#altura').html(`${respuesta.height/10} m`)
            $('#experiencia').html(`${respuesta.base_experience}`)

            $('#hp').css("width", respuesta.stats[5].base_stat + "%")
            $('#speed').css("width", respuesta.stats[0].base_stat + "%")
            $('#defense').css("width", respuesta.stats[3].base_stat + "%")
            $('#attack').css("width", respuesta.stats[4].base_stat + "%")

            if ($('#tipo .pequeño').length !== 0) { // borra los tipos anteriores
                $('#tipo .pequeño').remove()
            }
            $(respuesta.types).each(function(){
                $("#tipo").append(`<img src="img/${this.type.name}.png" title="${this.type.name}" class="pequeño"></img>`)
            })
        }
    })
}

$('#buscar').on('click', function(){
    pokemon = $('input[type=search]').val().toLocaleLowerCase()
    mostrarPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
})

matrizPokemones = $(".row .centrado")

listarPaginas()
