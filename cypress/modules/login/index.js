class LoginPage {
  fillLoginForm(email, password) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password, { log: false })
  }

  clickLoginButton() {
    cy.get('[data-qa="login-button"]').click()
  }

  performLogin(email, password) {
    this.fillLoginForm(email, password)
    this.clickLoginButton()
  }

  performSmartLogout() {
    cy.get('body').then(($body) => {
      if ($body.find('a[href="/logout"]').length > 0) {
        cy.get('a[href="/logout"]').click()
      }
    })
  }
}

export default LoginPage
