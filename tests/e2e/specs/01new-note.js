// https://docs.cypress.io/api/table-of-contents

describe('Create New Note', () => {
  it('can create a new note', () => {
    // open form
    cy.visit('/new')
    cy.get('form').should('be.visible')

    // enter title in input
    cy.get('#title')
    .type('new note')
    .should('have.value', 'new note')

    // enter text in textarea
    cy.get('#text')
      .type('sample note text')
      .should('have.value', 'sample note text')

    // submit form
    cy.get('form').submit()

    // check for new note
    cy.contains('.note-title', 'new note').should('be.visible')
    cy.contains('.preview-text', 'sample note text').should('be.visible')
  })
})
