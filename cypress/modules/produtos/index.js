class ProdutosPage {

  get allProductsTitle() { return '.title.text-center' }
  get productsList() { return '.features_items' }
  get searchInput() { return '#search_product' }
  get searchButton() { return '#submit_search' }
  get searchedProductsTitle() { return '.title.text-center' }
  get productItems() { return '.productinfo' }
  get viewProductLinks() { return 'a[href*="/product_details/"]' }
  get addToCartButtons() { return '.btn.btn-default.add-to-cart' }

  get productName() { return '.product-information h2' }
  get productCategory() { return '.product-information p:contains("Category:")' }
  get productPrice() { return '.product-information span span' }
  get productAvailability() { return '.product-information p:contains("Availability:")' }
  get productCondition() { return '.product-information p:contains("Condition:")' }
  get productBrand() { return '.product-information p:contains("Brand:")' }
  get quantityInput() { return '#quantity' }
  get addToCartButton() { return '.btn.btn-default.cart' }

  get addedToCartModal() { return '#cartModal' }
  get modalTitle() { return '.modal-title' }
  get continueShoppingButton() { return '.btn.btn-success.close-modal' }
  get viewCartButton() { return 'a[href="/view_cart"]' }

  verifyAllProductsPage() {
    cy.url().should('include', '/products')
    cy.get(this.allProductsTitle).should('be.visible')
    cy.get(this.allProductsTitle).should('contain', 'All Products')
  }

  verifyProductsList() {
    cy.get(this.productsList).should('be.visible')
    cy.get(this.productItems).should('have.length.greaterThan', 0)
  }

  clickFirstProduct() {
    cy.get(this.viewProductLinks).first().click()
  }

  verifyProductDetailPage() {
    cy.url().should('include', '/product_details/')
    cy.get(this.productName).should('be.visible')
    cy.get(this.productCategory).should('be.visible')
    cy.get(this.productPrice).should('be.visible')
    cy.get(this.productAvailability).should('be.visible')
    cy.get(this.productCondition).should('be.visible')
    cy.get(this.productBrand).should('be.visible')
  }

  searchProduct(productName) {
    cy.get(this.searchInput).type(productName)
    cy.get(this.searchButton).click()
  }

  verifySearchResults() {
    cy.get(this.searchedProductsTitle).should('be.visible')
    cy.get(this.searchedProductsTitle).should('contain', 'Searched Products')
    cy.get(this.productItems).should('have.length.greaterThan', 0)
  }

  verifySearchResultsContainProduct(productName) {
    cy.get(this.productItems).should('contain.text', productName)
  }

  addProductToCart(quantity = '1') {
    if (quantity !== '1') {
      cy.get(this.quantityInput).clear().type(quantity)
    }

    cy.get(this.addToCartButton).click()

    cy.get(this.addedToCartModal, { timeout: 10000 }).should('be.visible')
    cy.get(this.modalTitle).should('contain', 'Added!')

    cy.wait(1000)
  }

  clickViewCartFromModal() {
    cy.get('#cartModal').within(() => {
      cy.get('a[href="/view_cart"]').first().click()
    })
  }

  continueShopping() {
    cy.get(this.continueShoppingButton).click()
  }

  addProductAndGoToCart(quantity = '1') {
    this.addProductToCart(quantity)
    this.clickViewCartFromModal()
  }
}

export default ProdutosPage
