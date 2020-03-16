import { generarMatriz , generarNavegadorPaginas } from './ui.js'
import { cargarDefault , habilitarBotonSearch } from './funciones.js'


function inicializar(){
    generarMatriz()
    generarNavegadorPaginas()
    habilitarBotonSearch()
    cargarDefault()
}


inicializar()