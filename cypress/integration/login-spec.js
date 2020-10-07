describe('Login', () => {
  beforeEach(() => cy.task('cleanDatabase'))

  it('Login a user', () => {
    // criar um user
    cy.visit('/')
    cy.findByRole('link', { name: /sign up/i }).click()
    cy.findByPlaceholderText(/username/i).type('Sr M')
    cy.findByPlaceholderText(/email/i).type('srm@email.com')
    cy.findByPlaceholderText(/password/i).type('secret')
    cy.findByRole('button', { name: /sign up/i }).click()
    cy.findByTestId('profile').should('be.visible')

    // deslogar
    cy.findByRole('link', { name: /settings/i }).click()
    cy.findByRole('button', { name: /.*logout.*/i }).click()
    //assert logout
    cy.findByRole('link', { name: /sign up/i }).should('be.visible')

    // logar
    cy.findByRole('link', { name: /sign in/i }).click()
    cy.findByPlaceholderText(/email/i).type('srm@email.com')
    cy.findByPlaceholderText(/password/i).type('secret')
    cy.findByRole('button', { name: /sign in/i }).click()

    // verificar se logou
    cy.findByTestId('profile').should('be.visible')
  })
})
