class TestFlows {
  performSmartLogout() {
    cy.get('body').then(($body) => {
      if ($body.find('a[href="/logout"]').length > 0) {
        cy.get('a[href="/logout"]').click()
      }
    })
  }

  deleteUserAccount() {
    cy.get('body').then(($body) => {
      if ($body.find('a[href="/delete_account"]').length > 0) {
        cy.get('a[href="/delete_account"]').click()
        cy.get('[data-qa="account-deleted"]').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
      }
    })
  }

  cleanupTestAccount(email, password) {
    cy.visit('/', { failOnStatusCode: false })

    cy.get('body').then(($body) => {
      if ($body.find('li:contains("Logged in as")').length > 0) {
        if ($body.find('a[href="/delete_account"]').length > 0) {
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
                  if ($loggedBody.find('a[href="/delete_account"]').length > 0) {
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
