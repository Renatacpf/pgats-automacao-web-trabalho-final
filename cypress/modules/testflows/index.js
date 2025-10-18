// Módulo de TestFlows - Fluxos Complexos e Operações Avançadas
// Baseado no padrão da aula PGATS - Módulo central para operações inteligentes

class TestFlows {
  // Seletores utilizados nos fluxos
  get accountCreatedMessage() { return '[data-qa="account-created"]' }
  get accountDeletedMessage() { return '[data-qa="account-deleted"]' }
  get continueButton() { return '[data-qa="continue-button"]' }
  get loggedInText() { return 'li:contains("Logged in as")' }
  get deleteAccountLink() { return 'a[href="/delete_account"]' }
  get logoutLink() { return 'a[href="/logout"]' }

  // Método para completar registro - Padrão da aula
  completeRegistration() {
    cy.get(this.accountCreatedMessage).should('be.visible')
    cy.get(this.accountCreatedMessage).should('contain', 'Account Created!')
    cy.get(this.continueButton).click()
  }

  // Método para logout inteligente - Padrão da aula
  performSmartLogout() {
    cy.get('body').then(($body) => {
      if ($body.find(this.logoutLink).length > 0) {
        cy.get(this.logoutLink).click()
      }
    })
  }

  // Método para deletar conta do usuário - Padrão da aula
  deleteUserAccount() {
    cy.get('body').then(($body) => {
      if ($body.find(this.deleteAccountLink).length > 0) {
        cy.get(this.deleteAccountLink).click()
        cy.get(this.accountDeletedMessage).should('be.visible')
        cy.get(this.continueButton).click()
      }
    })
  }

  // Método para verificar usuário logado - Padrão da aula
  verifyUserLoggedIn(username) {
    cy.get(this.loggedInText).should('contain', username)
  }

  // Método para verificar logout bem-sucedido - Padrão da aula
  verifyLogoutSuccess() {
    cy.url().should('include', '/login')
    cy.get('[data-qa="login-email"]').should('be.visible')
  }

  // Método para limpeza completa pós-teste - Padrão da aula
  cleanupTestAccount(email, password) {
    cy.visit('/', { failOnStatusCode: false })

    // Verificar se já estamos logados
    cy.get('body').then(($body) => {
      if ($body.find(this.loggedInText).length > 0) {
        // Já logado, tentar deletar diretamente
        if ($body.find(this.deleteAccountLink).length > 0) {
          this.deleteUserAccount()
        }
      } else {
        // Não logado, fazer login primeiro
        cy.get('a[href="/login"]').then(($loginLink) => {
          if ($loginLink.length > 0) {
            cy.wrap($loginLink).click()

            // Verificar se chegamos na página de login
            cy.get('body').then(($loginBody) => {
              if ($loginBody.find('[data-qa="login-email"]').length > 0) {
                cy.get('[data-qa="login-email"]').type(email)
                cy.get('[data-qa="login-password"]').type(password, { log: false })
                cy.get('[data-qa="login-button"]').click()

                // Verificar se login foi bem-sucedido antes de deletar
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

  // Método para navegação segura - Padrão da aula
  navigateToHomeSafely() {
    cy.visit('/')
    cy.title().should('eq', 'Automation Exercise')
  }

  // Método para verificar estado da aplicação - Padrão da aula
  verifyApplicationState() {
    cy.url().should('include', 'automationexercise.com')
    cy.get('body').should('be.visible')
  }
}

export default TestFlows
