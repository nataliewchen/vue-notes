// https://docs.cypress.io/api/table-of-contents

describe('Edit Note', () => {
  it('can edit an existing note', () => {
     // create new note
     cy.visit('/new')
     cy.get('#title').type('new note')
     cy.get('#text').type('sample note text')
     cy.get('form').submit()
 


    cy.get('.note').click()
    
    cy.get('.btn-header').should('be.visible')
    cy.get('.fa-pencil').click()

    cy.get('#text')
      .clear()
      .type('updated note text')
      .should('have.value', 'updated note text')

      cy.get('.fa-check').click()
  })
})
