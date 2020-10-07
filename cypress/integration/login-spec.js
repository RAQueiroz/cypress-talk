describe('Login', () => {
  beforeEach(() => cy.task('cleanDatabase'))

  it('Login a user', () => {
    // criar um user
    cy.registerUser()

    cy.visit('/')
    // logar
    cy.fixture('userA').then(({ email, password }) => {
      cy.findByRole('link', { name: /sign in/i }).click()
      cy.findByPlaceholderText(/email/i).type(email)
      cy.findByPlaceholderText(/password/i).type(password)
      cy.findByRole('button', { name: /sign in/i }).click()
    })

    // verificar se logou
    cy.findByTestId('profile').should('be.visible')
  })
})
