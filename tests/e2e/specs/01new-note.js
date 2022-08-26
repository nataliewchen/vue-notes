// https://docs.cypress.io/api/table-of-contents

describe('Create New Note', () => {
  it('can create a new note', () => {
    cy.visit('/')

    cy.get('#toggle-form-btn').click()

    cy.get('form').should('be.visible')

    cy.get('#title')
    .type('new note')
    .should('have.value', 'new note')

    cy.get('#text')
      .type('sample note text')
      .should('have.value', 'sample note text')

    cy.get('form').submit()
  })
})
