import { faker } from '@faker-js/faker'

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

export function generateContactData() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    subject: faker.lorem.sentence(4),
    message: faker.lorem.paragraphs(2)
  }
}

export function generatePaymentData(firstName, lastName) {
  return {
    nameOnCard: `${firstName} ${lastName}`,
    cardNumber: '4242424242424242',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2025'
  }
}

export function generateUniqueEmail() {
  const timestamp = Date.now()
  return `testuser${timestamp}@example.com`
}

export function navigateToSignupLogin() {
  cy.visit('/')
  cy.get('a[href="/login"]').click()
}

export function performLogin(email, password) {
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(password, { log: false })
  cy.get('[data-qa="login-button"]').click()
}

export function verifyUserLoggedIn(username) {
  cy.get('li').contains('Logged in as').should('contain', username)
}

export function performSafeLogout() {
  cy.get('body').then(($body) => {
    if ($body.find('a[href="/logout"]').length > 0) {
      cy.get('a[href="/logout"]').click()
    }
  })
}

export function cleanupAccount() {
  cy.get('body').then(($body) => {
    if ($body.find('a[href="/delete_account"]').length > 0) {
      cy.get('a[href="/delete_account"]').click()
      cy.get('[data-qa="account-deleted"]').should('be.visible')
      cy.get('[data-qa="continue-button"]').click()
    }
  })
}
