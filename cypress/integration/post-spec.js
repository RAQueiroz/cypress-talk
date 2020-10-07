import { title, about, article, tags } from '../fixtures/post'

describe('Post', () => {
  beforeEach(() => {
    cy.task('cleanDatabase')
    cy.registerAndLogin()
    cy.visit('/')
  })

  it('Creates a new post', () => {
    cy.findByRole('link', { name: /new post/i }).click()

    // create the post
    cy.findByPlaceholderText(/article title/i).type(title)
    cy.findByPlaceholderText(/what.*about/i).type(about)
    cy.findByPlaceholderText(/write your article.*/i).type(article)
    cy.findByPlaceholderText(/enter tags/i).type(tags.join(' '))

    cy.findByRole('button', { name: /publish article/i }).click()
    cy.findAllByRole('heading', { name: title }).should('be.visible')
  })

  it('Edits an existing post', () => {
    // cria o post pela api
    cy.createANewPost()
    cy.visit('/')

    // edita o post
    cy.findByRole('link', { name: /global feed/i }).click()
    cy.findByRole('heading', { name: title }).click()
    cy.findByRole('link', { name: /edit article/i }).click()
    cy.findByPlaceholderText(/article title/i)
      .clear()
      .type(`${title} edited`)
    cy.findByRole('button', { name: /publish article/i }).click()

    // verifica se o post foi editado
    cy.findAllByRole('heading', { name: `${title} edited` }).should(
      'be.visible'
    )
  })

  it('Deletes a post', () => {
    // cria o post pela api
    cy.createANewPost()
    cy.visit('/')

    // edita o post
    cy.findByRole('link', { name: /global feed/i }).click()
    cy.findByRole('heading', { name: title }).click()
    cy.findByRole('button', { name: /delete article/i }).click()

    // verifica se o post foi editado
    cy.findAllByRole('heading', { name: `${title} edited` }).should('not.exist')
  })
})
