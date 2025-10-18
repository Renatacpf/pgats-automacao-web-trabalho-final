// Módulo de Subscription - Page Object Model
// Baseado no padrão da aula PGATS

class SubscriptionPage {
  // Seletores da seção de subscription
  get subscriptionTitle() { return 'h2:contains("Subscription")' }
  get subscriptionEmailInput() { return '#susbscribe_email' }
  get subscribeButton() { return '#subscribe' }
  get subscriptionSuccessMessage() { return '.alert-success' }

  // Métodos de subscription - Padrão da aula
  scrollToSubscription() {
    cy.get(this.subscriptionTitle).scrollIntoView()
  }

  verifySubscriptionText() {
    cy.get(this.subscriptionTitle).should('be.visible')
    cy.get(this.subscriptionTitle).should('contain', 'Subscription')
  }

  subscribeToNewsletter(email) {
    cy.get(this.subscriptionEmailInput).type(email)
    cy.get(this.subscribeButton).click()
  }

  verifySubscriptionSuccess() {
    cy.get(this.subscriptionSuccessMessage).should('be.visible')
    cy.get(this.subscriptionSuccessMessage).should('contain', 'You have been successfully subscribed!')
  }
}

export default SubscriptionPage
