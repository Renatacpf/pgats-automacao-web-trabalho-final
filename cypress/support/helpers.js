// Helpers.js - Funções utilitárias com faker.js
// Baseado no padrão da aula PGATS

import { faker } from '@faker-js/faker'

// Geração de dados de usuário - Padrão da aula
export function generateUserData() {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const timestamp = Date.now()

  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}${timestamp}@testmail.com`,
    password: 'TestPassword123',
    birthDay: faker.number.int({ min: 1, max: 28 }).toString(),
    birthMonth: faker.date.month(),
    birthYear: faker.number.int({ min: 1980, max: 2000 }).toString(),
    firstName: firstName,
    lastName: lastName,
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('####'),
    mobileNumber: faker.phone.number()
  }
}

// Geração de dados de contato - Padrão da aula
export function generateContactData() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    subject: faker.lorem.sentence(4),
    message: faker.lorem.paragraphs(2)
  }
}

// Geração de email único - Padrão da aula
export function generateUniqueEmail() {
  const timestamp = Date.now()
  return `testuser${timestamp}@example.com`
}

// Navegação para Signup/Login - Padrão da aula
export function navigateToSignupLogin() {
  cy.visit('/')
  cy.get('a[href="/login"]').click()
}

// Login do usuário - Padrão da aula
export function performLogin(email, password) {
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(password, { log: false })
  cy.get('[data-qa="login-button"]').click()
}

// Verificação de usuário logado - Padrão da aula
export function verifyUserLoggedIn(username) {
  cy.get('li').contains('Logged in as').should('contain', username)
}

// Logout seguro - Padrão da aula
export function performSafeLogout() {
  cy.get('body').then(($body) => {
    if ($body.find('a[href="/logout"]').length > 0) {
      cy.get('a[href="/logout"]').click()
    }
  })
}

// Limpeza de conta - Padrão da aula
export function cleanupAccount() {
  cy.get('body').then(($body) => {
    if ($body.find('a[href="/delete_account"]').length > 0) {
      cy.get('a[href="/delete_account"]').click()
      cy.get('[data-qa="account-deleted"]').should('be.visible')
      cy.get('[data-qa="continue-button"]').click()
    }
  })
}
