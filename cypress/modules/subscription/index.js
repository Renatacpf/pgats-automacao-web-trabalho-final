class SubscriptionPage {
  scrollToSubscription() {
    cy.get('h2:contains("Subscription")').scrollIntoView()
  }

  subscribeToNewsletter(email) {
    cy.get('#susbscribe_email').type(email)
    cy.get('#subscribe').click()
  }
}

export default SubscriptionPage
