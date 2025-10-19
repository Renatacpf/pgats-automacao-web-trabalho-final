class CarrinhoPage {
  proceedToCheckout() {
    cy.get('.btn.btn-default.check_out').should('be.visible').click()
  }

  addCommentAboutOrder(comment) {
    cy.get('textarea[name="message"]').should('be.visible').type(comment)
  }

  clickPlaceOrder() {
    cy.get('a[href="/payment"]').should('be.visible').click()
  }

  fillPaymentDetails(paymentData) {
    cy.get('[data-qa="name-on-card"]').should('be.visible').type(paymentData.nameOnCard)
    cy.get('[data-qa="card-number"]').should('be.visible').type(paymentData.cardNumber)
    cy.get('[data-qa="cvc"]').should('be.visible').type(paymentData.cvc)
    cy.get('[data-qa="expiry-month"]').should('be.visible').type(paymentData.expiryMonth)
    cy.get('[data-qa="expiry-year"]').should('be.visible').type(paymentData.expiryYear)
  }

  clickPayAndConfirm() {
    cy.get('[data-qa="pay-button"]').should('be.visible').click()
  }

  downloadInvoice() {
    cy.get('.btn.btn-default.check_out').click()
  }

  clickContinue() {
    cy.get('[data-qa="continue-button"]').should('be.visible').click()
  }
}

export default CarrinhoPage
