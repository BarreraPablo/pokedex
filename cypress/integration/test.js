/* eslint-disable */ 
/// <reference types="cypress" />

const URL = 'http://192.168.0.27:8080/';

context('Test pokedex', () => {
	const CANTIDAD_CUADROS = 48;

	before(() => {
		cy.visit(URL);
	});

	it('Matriz completa', () => {
		cy.get('#matriz-pokemones').find('.row .centrado').should('have.length', CANTIDAD_CUADROS);
    });
    
    it('Muestra y cierra modal pokemon', () => {
        cy.get('#matriz-pokemones').find('.row .centrado').eq(0).click();
        cy.get('#carta-pokemon').should('be.visible');
        cy.wait(500);
        cy.get('#carta-pokemon .modal-footer button').click();
        cy.get('#carta-pokemon').should('not.be.visible');
    })

    
    it('Busca pokemon valido', () => {
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

    describe('Verifica que el pokemon seleccionado sea el mostrado', () => {
        for(let i=0; i<5; i++){
            it('Cambio de pagina aleatorio', () => {
                cy.get('#pagination button').eq(Math.floor(Math.random()*18)).click();
            })
            it('Seleccion pokemon aleatorio', () => {
                const numeroAleatorio = Math.floor(Math.random() * 48);
        
                cy.get('#matriz-pokemones .row .centrado').eq(numeroAleatorio).click().then((cuadro) => {
                    cy.wait(500);
                    cy.get('#nombre-pokemon').should('have.text', cuadro.find('p').text());
                });
        

                cy.get('#carta-pokemon .modal-footer button').click();
                cy.wait(500);
            })
        }
    })
});
