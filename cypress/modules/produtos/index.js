class ProdutosPage {
  clickFirstProduct() {
    cy.get('a[href*="/product_details/"]').first().click()
  }

  searchProduct(productName) {
    cy.get('#search_product').type(productName)
    cy.get('#submit_search').click()
  }

  addProductToCart(quantity = '1') {
    if (quantity !== '1') {
      cy.get('#quantity').clear().type(quantity)
    }

    cy.get('.btn.btn-default.cart').click()

    cy.get('#cartModal', { timeout: 10000 }).should('be.visible')
    cy.get('.modal-title').should('contain', 'Added!')

    cy.wait(1000)
  }

  clickViewCartFromModal() {
    cy.get('#cartModal').within(() => {
      cy.get('a[href="/view_cart"]').first().click()
    })
  }

  continueShopping() {
    cy.get('.btn.btn-success.close-modal').click()
  }

  addProductAndGoToCart(quantity = '1') {
    this.addProductToCart(quantity)
    this.clickViewCartFromModal()
  }
}

export default ProdutosPage
