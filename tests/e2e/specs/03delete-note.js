// https://docs.cypress.io/api/table-of-contents

describe('Delete Note', () => {
  it('can delete an existing note', () => {
    // create new note
    cy.visit('/new')
    cy.get('#title').type('new note')
    cy.get('#text').type('sample note text')
    cy.get('form').submit()

    cy.get('.note').click()
    cy.contains('delete').click()
    cy.contains('Delete').click()

    cy.get('.note').should('not.exist')

  })
})
