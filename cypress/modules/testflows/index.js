class TestFlows {
  get accountCreatedMessage() { return '[data-qa="account-created"]' }
  get accountDeletedMessage() { return '[data-qa="account-deleted"]' }
  get continueButton() { return '[data-qa="continue-button"]' }
  get loggedInText() { return 'li:contains("Logged in as")' }
  get deleteAccountLink() { return 'a[href="/delete_account"]' }
  get logoutLink() { return 'a[href="/logout"]' }

  completeRegistration() {
    cy.get(this.accountCreatedMessage).should('be.visible')
    cy.get(this.accountCreatedMessage).should('contain', 'Account Created!')
    cy.get(this.continueButton).click()
  }

  performSmartLogout() {
    cy.get('body').then(($body) => {
      if ($body.find(this.logoutLink).length > 0) {
        cy.get(this.logoutLink).click()
      }
    })
  }

  deleteUserAccount() {
    cy.get('body').then(($body) => {
      if ($body.find(this.deleteAccountLink).length > 0) {
        cy.get(this.deleteAccountLink).click()
        cy.get(this.accountDeletedMessage).should('be.visible')
        cy.get(this.continueButton).click()
      }
    })
  }

  verifyUserLoggedIn(username) {
    cy.get(this.loggedInText).should('contain', username)
  }

  verifyLogoutSuccess() {
    cy.url().should('include', '/login')
    cy.get('[data-qa="login-email"]').should('be.visible')
  }

  cleanupTestAccount(email, password) {
    cy.visit('/', { failOnStatusCode: false })

    cy.get('body').then(($body) => {
      if ($body.find(this.loggedInText).length > 0) {
        if ($body.find(this.deleteAccountLink).length > 0) {
          this.deleteUserAccount()
        }
      } else {
        cy.get('a[href="/login"]').then(($loginLink) => {
          if ($loginLink.length > 0) {
            cy.wrap($loginLink).click()

            cy.get('body').then(($loginBody) => {
              if ($loginBody.find('[data-qa="login-email"]').length > 0) {
                cy.get('[data-qa="login-email"]').type(email)
                cy.get('[data-qa="login-password"]').type(password, { log: false })
                cy.get('[data-qa="login-button"]').click()

                cy.get('body').then(($loggedBody) => {
                  if ($loggedBody.find(this.deleteAccountLink).length > 0) {
                    this.deleteUserAccount()
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  navigateToHomeSafely() {
    cy.visit('/')
    cy.title().should('eq', 'Automation Exercise')
  }

  verifyApplicationState() {
    cy.url().should('include', 'automationexercise.com')
    cy.get('body').should('be.visible')
  }
}

export default TestFlows
