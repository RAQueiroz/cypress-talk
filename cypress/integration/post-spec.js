describe('Post', () => {
  beforeEach(() => {
    cy.task('cleanDatabase')
    cy.registerAndLogin()
    cy.visit('/')
  })

  it('Creates a new post', () => {
    cy.findByRole('link', { name: /new post/i }).click()
    // create the post
    cy.findByPlaceholderText(/article title/i).type('New article')
    cy.findByPlaceholderText(/what.*about/i).type('Testing!')
    cy.findByPlaceholderText(/write your article.*/i).type('Testing talk')
    cy.findByPlaceholderText(/enter tags/i).type('testing meetup')

    cy.findByRole('button', { name: /publish article/i }).click()
    // assert that the post exists
    cy.findByRole('heading', { name: /new article/i }).should('be.visible')
  })
})
