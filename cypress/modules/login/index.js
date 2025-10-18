class LoginPage {
  get loginEmailInput() { return '[data-qa="login-email"]' }
  get loginPasswordInput() { return '[data-qa="login-password"]' }
  get loginButton() { return '[data-qa="login-button"]' }
  get loginErrorMessage() { return 'p:contains("Your email or password is incorrect!")' }
  get logoutLink() { return 'a[href="/logout"]' }
  get deleteAccountLink() { return 'a[href="/delete_account"]' }

  fillLoginForm(email, password) {
    cy.get(this.loginEmailInput).type(email)
    cy.get(this.loginPasswordInput).type(password, { log: false })
  }

  clickLoginButton() {
    cy.get(this.loginButton).click()
  }

  performLogin(email, password) {
    this.fillLoginForm(email, password)
    this.clickLoginButton()
  }

  performSmartLogout() {
    cy.get('body').then(($body) => {
      if ($body.find(this.logoutLink).length > 0) {
        cy.get(this.logoutLink).click()
      }
    })
  }

  verifyLoginError() {
    cy.get(this.loginErrorMessage).should('be.visible')
  }

  verifyLogoutSuccess() {
    cy.url().should('include', '/login')
    cy.get('[data-qa="login-email"]').should('be.visible')
  }
}

export default LoginPage
