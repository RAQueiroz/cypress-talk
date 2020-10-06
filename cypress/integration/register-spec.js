describe('Register', () => {
  beforeEach(() => {
    cy.task('cleanDatabase')
  })
  it('Register an user', () => {
    // visitar a pg para registrar
    cy.visit('/')

    cy.findByRole('link', { name: /sign up/i }).click()
    // digitar dados
    cy.findByPlaceholderText(/username/i).type('Sr M')
    cy.findByPlaceholderText(/email/i).type('srm@email.com')
    cy.findByPlaceholderText(/password/i).type('secret')
    // enviar o form
    cy.findByRole('button', { name: /sign up/i }).click()
    // verificar se o user foi criado e logado
    cy.findByTestId('profile').should('be.visible')
  })
})
