import '@bahmutov/cy-api/support'
import '@testing-library/cypress/add-commands'
import { configure } from '@testing-library/cypress'

configure({ testIdAttribute: 'data-cy' })

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
      url: 'http://localhost:3000/api/users',
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
        url: 'http://localhost:3000/api/users/login',
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
