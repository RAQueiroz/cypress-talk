import { title } from '../fixtures/postB'

describe('Follow an user', () => {
  beforeEach(() => {
    cy.task('cleanDatabase')
    cy.registerAndLogin()
    cy.visit('/')
  })

  it('Follows another user', () => {
    cy.createPostForUser()
    cy.visit('/')
    cy.findByRole('link', { name: /global feed/i }).click()

    cy.fixture('userB').then(({ username }) =>
      cy.findAllByRole('link', { name: username }).first().click()
    )

    cy.findByRole('button', { name: /follow/i }).click()
    cy.visit('/')

    cy.findAllByRole('heading', { name: title }).should('be.visible')
  })
})
