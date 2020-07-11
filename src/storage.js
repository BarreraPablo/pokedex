export function cargarPokemonesLocalStorage (offset) {
	const pokemonesLocalStorage = localStorage.getItem(`pokemones${offset}`);
	if (pokemonesLocalStorage === null) {
		throw new Error('Unable to find the pokemons in local storage');
	}

	return JSON.parse(pokemonesLocalStorage);
};

export function guardarPokemonesStorage (pokemones, contenido) {
	try {
		localStorage.setItem(pokemones, contenido);
	} catch(e) {
		localStorage.clear();
	};
}

export function guardarPokemon (pokemon) {
	try {
		localStorage.setItem(pokemon.name, JSON.stringify(pokemon));
	} catch(e) {
		localStorage.clear();
	}
	
}

export function cargarPokemon (nombre) {
	const pokemon = localStorage.getItem(nombre);

	if (pokemon === null) {
		throw new Error('Unable to find the pokemon in local storage');
	}

	return JSON.parse(localStorage.getItem(nombre));
}
