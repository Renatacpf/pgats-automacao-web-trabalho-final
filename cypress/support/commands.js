import { faker } from '@faker-js/faker'

Cypress.Commands.add('registerUser', (userData) => {
  cy.get('[data-qa="signup-name"]').type(userData.name)
  cy.get('[data-qa="signup-email"]').type(userData.email)
  cy.get('[data-qa="signup-button"]').click()

  cy.get('#id_gender1').check() // Mr.
  cy.get('[data-qa="password"]').type(userData.password)
  cy.get('[data-qa="days"]').select(userData.birthDay)
  cy.get('[data-qa="months"]').select(userData.birthMonth)
  cy.get('[data-qa="years"]').select(userData.birthYear)

  cy.get('#newsletter').check()
  cy.get('#optin').check()

  cy.get('[data-qa="first_name"]').type(userData.firstName)
  cy.get('[data-qa="last_name"]').type(userData.lastName)
  cy.get('[data-qa="company"]').type(userData.company)
  cy.get('[data-qa="address"]').type(userData.address)
  cy.get('[data-qa="address2"]').type(userData.address2)
  cy.get('[data-qa="country"]').select(userData.country)
  cy.get('[data-qa="state"]').type(userData.state)
  cy.get('[data-qa="city"]').type(userData.city)
  cy.get('[data-qa="zipcode"]').type(userData.zipcode)
  cy.get('[data-qa="mobile_number"]').type(userData.mobileNumber)

  cy.get('[data-qa="create-account"]').click()
})

Cypress.Commands.add('loginUser', (email, password) => {
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(password)
  cy.get('[data-qa="login-button"]').click()
})

Cypress.Commands.add('goToLoginPage', () => {
  cy.visit('/')
  cy.get('a[href="/login"]').click()
})

Cypress.Commands.add('goToContactUsPage', () => {
  cy.visit('/')
  cy.get('a[href="/contact_us"]').click()
})

Cypress.Commands.add('goToProductsPage', () => {
  cy.visit('/')
  cy.get('a[href="/products"]').click()
})

Cypress.Commands.add('deleteAccount', () => {
  cy.get('a[href="/delete_account"]').click()
  cy.get('[data-qa="account-deleted"]').should('be.visible')
  cy.get('[data-qa="continue-button"]').click()
})

Cypress.Commands.add('logoutUser', () => {
  cy.get('a[href="/logout"]').click()
})

Cypress.Commands.add('generateRandomEmail', () => {
  return faker.internet.email().toLowerCase()
})

Cypress.Commands.add('generateUserData', () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName }).toLowerCase()

  return {
    name: `${firstName} ${lastName}`,
    email: email,
    password: faker.internet.password({ length: 12 }),
    birthDay: faker.number.int({ min: 1, max: 28 }).toString(),
    birthMonth: faker.date.month(),
    birthYear: faker.number.int({ min: 1950, max: 2000 }).toString(),
    firstName: firstName,
    lastName: lastName,
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('####'),
    mobileNumber: faker.phone.number('+1##########')
  }
})

Cypress.Commands.add('generateContactData', () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    subject: faker.lorem.sentence({ min: 3, max: 6 }),
    message: faker.lorem.paragraphs(2)
  }
})
