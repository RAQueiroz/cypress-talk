import { title, about, article, tags } from '../fixtures/post'
import '@testing-library/cypress/add-commands'
import { configure } from '@testing-library/cypress'

configure({ testIdAttribute: 'data-cy' })

const apiUrl = Cypress.env('apiUrl')

const postA = { title, description: about, body: article, tagList: tags }

Cypress.Commands.add('register', () => {
  const log = Cypress.log({
    name: 'register',
    displayName: 'Register',
    message: '👤 registering a new user',
    autoEnd: false,
  })

  cy.fixture('userA').then((user) => {
    cy.request({
      method: 'POST',
      url: `${apiUrl}users`,
      body: {
        user,
      },
      log: false,
    }).then(({ body }) => ({ ...body.user, password: user.password }))
    log.end()
  })
})

Cypress.Commands.add('login', (user) => {
  const log = Cypress.log({
    name: 'login in',
    displayName: 'Login In',
    message: '🔐 login user in',
    autoEnd: false,
  })
  const doLogin = ({ email, password }) =>
    cy
      .request({
        method: 'POST',
        url: `${apiUrl}users/login`,
        body: {
          user: { email, password },
        },
        log: false,
      })
      .then(({ body }) => ({ user: body.user, token: body.user.token }))

  const setToken = ({ token }) => localStorage.setItem('jwt', token)

  if (user) {
    console.log(user)
    doLogin(user).then(setToken)
  } else {
    cy.fixture('userA').then(doLogin).then(setToken)
  }
  log.end()
})

Cypress.Commands.add('registerAndLogin', () => {
  cy.register().then(cy.login)
})

Cypress.Commands.add('createANewPost', (post) => {
  const token = localStorage.getItem('jwt')

  if (token) {
    cy.request({
      method: 'POST',
      url: `${apiUrl}articles`,
      body: { article: postA },
      headers: {
        authorization: `Token ${token}`,
      },
    })
  }
})
