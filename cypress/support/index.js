import '@testing-library/cypress/add-commands'
import { configure } from '@testing-library/cypress'
import postA from '../fixtures/post'
import postB from '../fixtures/postB'

configure({ testIdAttribute: 'data-cy' })

const apiUrl = Cypress.env('apiUrl')

Cypress.Commands.add('register', (user) => {
  const log = Cypress.log({
    name: 'register',
    displayName: 'Register',
    message: `👤 registering ${user}`,
    autoEnd: false,
  })

  cy.fixture(user).then((user) => {
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

Cypress.Commands.add('getToken', (user) => {
  const { email, password } = user
  cy.request({
    method: 'POST',
    url: `${apiUrl}users/login`,
    body: {
      user: { email, password },
    },
    log: false,
  }).then(({ body }) => ({ user: body.user, token: body.user.token }))
})

Cypress.Commands.add('login', (user) => {
  const log = Cypress.log({
    name: 'login in',
    displayName: 'Login In',
    message: '🔐 login user in',
    autoEnd: false,
  })

  const setToken = ({ token }) => localStorage.setItem('jwt', token)

  if (user) {
    cy.getToken(user).then(setToken)
  } else {
    cy.fixture('userA').then(getToken).then(setToken)
  }
  log.end()
})

Cypress.Commands.add('registerAndLogin', (user = 'userA') => {
  cy.register(user).then(cy.login)
})

Cypress.Commands.add('createPostForUser', (user = 'userB', post = postB) => {
  cy.register(user)
    .then(cy.getToken)
    .then(({ token }) => cy.createANewPost(token, postB))
})

Cypress.Commands.add('createANewPost', (token, post = postA) => {
  const defaultToken = localStorage.getItem('jwt')

  const log = Cypress.log({
    name: 'creating a new post',
    displayName: 'Creating a new post',
    message: '📖 postB',
    autoEnd: false,
  })

  cy.request({
    method: 'POST',
    url: `${apiUrl}articles`,
    body: { article: post },
    headers: {
      authorization: `Token ${token ? token : defaultToken}`,
    },
  })

  log.end()
})
