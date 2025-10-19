class CadastroPage {
  fillBasicSignupForm(name, email) {
    cy.get('[data-qa="signup-name"]').type(name)
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()
  }

  fillCompleteAccountForm(userData) {
    cy.get('#id_gender1').check()
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
  }

  clickCreateAccount() {
    cy.get('[data-qa="create-account"]').click()
  }

  clickContinue() {
    cy.get('[data-qa="continue-button"]').click()
  }
}

export default CadastroPage
