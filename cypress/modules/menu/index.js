class MenuPage {

  get loginLink() { return 'a[href="/login"]' }
  get logoutLink() { return 'a[href="/logout"]' }
  get deleteAccountLink() { return 'a[href="/delete_account"]' }
  get contactUsLink() { return 'a[href="/contact_us"]' }
  get productsLink() { return 'a[href="/products"]' }
  get cartLink() { return 'a[href="/view_cart"]' }
  get loggedInAsText() { return 'li:contains("Logged in as")' }

  navigateToLogin() {
    cy.get(this.loginLink).click()
  }

  navigateToContactUs() {
    cy.get(this.contactUsLink).click()
  }

  navigateToProducts() {
    cy.get(this.productsLink).click()
  }

  navigateToCart() {
    cy.get(this.cartLink).click()
  }

  logout() {
    cy.get(this.logoutLink).click()
  }

  deleteAccount() {
    cy.get(this.deleteAccountLink).click()
  }

  verifyUserLoggedIn(username) {
    cy.get(this.loggedInAsText).should('contain', username)
  }

  verifyLoginLinkVisible() {
    cy.get(this.loginLink).should('be.visible')
  }

  verifyLogoutLinkVisible() {
    cy.get(this.logoutLink).should('be.visible')
  }

  verifyDeleteAccountLinkVisible() {
    cy.get(this.deleteAccountLink).should('be.visible')
  }
}

export default MenuPage
