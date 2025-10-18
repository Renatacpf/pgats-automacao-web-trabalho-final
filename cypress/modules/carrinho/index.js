class CarrinhoPage {
  get cartItems() { return '#cart_info_table tbody tr' }
  get cartTable() { return '#cart_info_table' }
  get proceedToCheckoutButton() { return '.btn.btn-default.check_out' }
  get registerLoginLink() { return 'a[href="/login"]' }

  get addressDetails() { return '.checkout-information' }
  get deliveryAddress() { return '#address_delivery' }
  get billingAddress() { return '#address_invoice' }
  get reviewOrder() { return '#cart_info' }
  get commentTextarea() { return 'textarea[name="message"]' }
  get placeOrderButton() { return 'a[href="/payment"]' }

  get nameOnCardInput() { return '[data-qa="name-on-card"]' }
  get cardNumberInput() { return '[data-qa="card-number"]' }
  get cvcInput() { return '[data-qa="cvc"]' }
  get expiryMonthInput() { return '[data-qa="expiry-month"]' }
  get expiryYearInput() { return '[data-qa="expiry-year"]' }
  get payAndConfirmButton() { return '[data-qa="pay-button"]' }
  get orderSuccessMessage() { return '[data-qa="order-placed"]' }

  get downloadInvoiceButton() { return '.btn.btn-default.check_out' }
  get continueButton() { return '[data-qa="continue-button"]' }

  verifyCartPage() {
    cy.url().should('include', '/view_cart')
    cy.get(this.cartTable).should('be.visible')
    cy.get(this.cartItems).should('have.length.greaterThan', 0)
    cy.contains('Shopping Cart').should('be.visible')
  }

  proceedToCheckout() {
    cy.get(this.proceedToCheckoutButton).should('be.visible').click()
  }

  verifyCheckoutPage() {
    cy.url().should('include', '/checkout')
    cy.contains('Review Your Order').should('be.visible')
  }

  verifyAddressDetails() {
    cy.get(this.deliveryAddress).should('be.visible')
    cy.get(this.billingAddress).should('be.visible')
    cy.contains('Your delivery address').should('be.visible')
    cy.contains('Your billing address').should('be.visible')
  }

  verifyOrderReview() {
    cy.get(this.reviewOrder).should('be.visible')
    cy.contains('Product').should('be.visible')
    cy.contains('Quantity').should('be.visible')
    cy.contains('Price').should('be.visible')
    cy.contains('Total').should('be.visible')
  }

  addCommentAboutOrder(comment) {
    cy.get(this.commentTextarea).should('be.visible').type(comment)
  }

  clickPlaceOrder() {
    cy.get(this.placeOrderButton).should('be.visible').click()
  }

  verifyPaymentPage() {
    cy.url().should('include', '/payment')
    cy.contains('Payment').should('be.visible')
    cy.get(this.nameOnCardInput).should('be.visible')
  }

  fillPaymentDetails(paymentData) {
    cy.get(this.nameOnCardInput).should('be.visible').type(paymentData.nameOnCard)
    cy.get(this.cardNumberInput).should('be.visible').type(paymentData.cardNumber)
    cy.get(this.cvcInput).should('be.visible').type(paymentData.cvc)
    cy.get(this.expiryMonthInput).should('be.visible').type(paymentData.expiryMonth)
    cy.get(this.expiryYearInput).should('be.visible').type(paymentData.expiryYear)
  }

  clickPayAndConfirm() {
    cy.get(this.payAndConfirmButton).should('be.visible').click()
  }

  verifyOrderSuccess() {
    cy.get(this.orderSuccessMessage).should('be.visible')
    cy.contains('Order Placed!').should('be.visible')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
  }

  downloadInvoice() {
    cy.get(this.downloadInvoiceButton).click()
  }

  clickContinue() {
    cy.get(this.continueButton).should('be.visible').click()
  }
}

export default CarrinhoPage
