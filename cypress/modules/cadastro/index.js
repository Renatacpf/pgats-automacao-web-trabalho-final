// Módulo de Cadastro - Page Object Model
// Baseado no padrão da aula PGATS

class CadastroPage {
  // Seletores do formulário de signup
  get signupNameInput() { return '[data-qa="signup-name"]' }
  get signupEmailInput() { return '[data-qa="signup-email"]' }
  get signupButton() { return '[data-qa="signup-button"]' }

  // Seletores do formulário de cadastro completo
  get genderMrRadio() { return '#id_gender1' }
  get genderMrsRadio() { return '#id_gender2' }
  get passwordInput() { return '[data-qa="password"]' }
  get daySelect() { return '[data-qa="days"]' }
  get monthSelect() { return '[data-qa="months"]' }
  get yearSelect() { return '[data-qa="years"]' }
  get newsletterCheckbox() { return '#newsletter' }
  get optinCheckbox() { return '#optin' }
  get firstNameInput() { return '[data-qa="first_name"]' }
  get lastNameInput() { return '[data-qa="last_name"]' }
  get companyInput() { return '[data-qa="company"]' }
  get addressInput() { return '[data-qa="address"]' }
  get address2Input() { return '[data-qa="address2"]' }
  get countrySelect() { return '[data-qa="country"]' }
  get stateInput() { return '[data-qa="state"]' }
  get cityInput() { return '[data-qa="city"]' }
  get zipcodeInput() { return '[data-qa="zipcode"]' }
  get mobileNumberInput() { return '[data-qa="mobile_number"]' }
  get createAccountButton() { return '[data-qa="create-account"]' }

  // Seletores de mensagens
  get accountCreatedMessage() { return '[data-qa="account-created"]' }
  get continueButton() { return '[data-qa="continue-button"]' }
  get emailExistsError() { return 'p:contains("Email Address already exist!")' }

  // Métodos de ação - Padrão da aula
  fillBasicSignupForm(name, email) {
    cy.get(this.signupNameInput).type(name)
    cy.get(this.signupEmailInput).type(email)
    cy.get(this.signupButton).click()
  }

  fillCompleteAccountForm(userData) {
    cy.get(this.genderMrRadio).check()
    cy.get(this.passwordInput).type(userData.password)
    cy.get(this.daySelect).select(userData.birthDay)
    cy.get(this.monthSelect).select(userData.birthMonth)
    cy.get(this.yearSelect).select(userData.birthYear)

    cy.get(this.newsletterCheckbox).check()
    cy.get(this.optinCheckbox).check()

    cy.get(this.firstNameInput).type(userData.firstName)
    cy.get(this.lastNameInput).type(userData.lastName)
    cy.get(this.companyInput).type(userData.company)
    cy.get(this.addressInput).type(userData.address)
    cy.get(this.address2Input).type(userData.address2)
    cy.get(this.countrySelect).select(userData.country)
    cy.get(this.stateInput).type(userData.state)
    cy.get(this.cityInput).type(userData.city)
    cy.get(this.zipcodeInput).type(userData.zipcode)
    cy.get(this.mobileNumberInput).type(userData.mobileNumber)
  }

  clickCreateAccount() {
    cy.get(this.createAccountButton).click()
  }

  verifyAccountCreated() {
    cy.get(this.accountCreatedMessage).should('be.visible')
    cy.get(this.accountCreatedMessage).should('contain', 'Account Created!')
  }

  clickContinue() {
    cy.get(this.continueButton).click()
  }

  verifyEmailExistsError() {
    cy.get(this.emailExistsError).should('be.visible')
  }
}

export default CadastroPage
