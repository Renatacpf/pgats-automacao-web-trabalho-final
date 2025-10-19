class MenuPage {
  navigateToLogin() {
    cy.get('a[href="/login"]').click()
  }

  navigateToContactUs() {
    cy.get('a[href="/contact_us"]').click()
  }

  navigateToProducts() {
    cy.get('a[href="/products"]').click()
  }

  navigateToCart() {
    cy.get('a[href="/view_cart"]').click()
  }

  logout() {
    cy.get('a[href="/logout"]').click()
  }

  deleteAccount() {
    cy.get('a[href="/delete_account"]').click()
  }
}

export default MenuPage
