/* eslint-disable */ 
/// <reference types="Cypress" />

describe('Test pokedex', () => {
	before(() => {
      cy.server();
      cy.route('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=48', 'fixture:pagina-1')
        .as('obtenerPrimeraPagina');
  
      cy.visit('http://127.0.0.1:5500');
    });

	it('Carga primera pagina', () => {
        const CANTIDAD_CUADROS = 48;
        const CANTIDAD_PAGINAS = 18;
        cy.get('#matriz-pokemones').find('.row .centrado').should('have.length', CANTIDAD_CUADROS);
        cy.get('#pagination li').should('have.length', CANTIDAD_PAGINAS);
    });
    
    it('Muestra y cierra modal pokemon', () => {
        cy.get('#matriz-pokemones').find('.row .centrado').eq(0).click();
        cy.get('#carta-pokemon').should('be.visible');
        cy.wait(500);
        cy.get('#carta-pokemon .modal-footer button').click();
        cy.get('#carta-pokemon').should('not.be.visible');
    })

    
    it('Busca pokemon valido', () => {
        cy.server();
        cy.route('https://pokeapi.co/api/v2/pokemon/pikachu', 'fixture:pikachu')
        
        const nombrePokemon = 'pIKachu';

        cy.get('input[type=search]').type(nombrePokemon);
        cy.get('#buscar').click();
        cy.get('#nombre-pokemon').should('have.text', nombrePokemon.toLocaleUpperCase());
        cy.wait(500);
        cy.get('#carta-pokemon .modal-footer button').click();
    })

    it('Busca pokemon invalido', () => {
        cy.get('input[type=search]').clear().type('Goku');
        cy.get('#buscar').click();
        cy.get('#carta-pokemon').should('not.be.visible');
        cy.get('#carta-error').should('be.visible');
        cy.get('#error').should('have.text', 'Pokemon not found, try again later');
        cy.wait(1000);
        cy.get('#carta-error').find('.modal-footer button').click();
    })

    it('Cambio de pagina y selección de pokemon', () => {
        cy.server();
        cy.route('https://pokeapi.co/api/v2/pokemon/?offset=144&limit=48', 'fixture:pagina-4').as('obtenerPagina4');
        cy.route('https://pokeapi.co/api/v2/pokemon/moltres', 'fixture:moltres').as('obtenerPokemonMoltres');


        cy.get('#pagination button').eq(3).click()     // Selección pagina 4
        cy.wait(500);
        cy.get('#matriz-pokemones').find('.row .centrado').eq(1).click() // seleccion del pokemon MOLTRES
        cy.wait(500);
        cy.get('#nombre-pokemon').should('have.text', 'MOLTRES');
    })
});
