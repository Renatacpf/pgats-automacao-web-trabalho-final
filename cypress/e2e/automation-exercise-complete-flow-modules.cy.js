import CadastroPage from '../modules/cadastro/index.js'
import LoginPage from '../modules/login/index.js'
import MenuPage from '../modules/menu/index.js'
import ContatoPage from '../modules/contato/index.js'
import ProdutosPage from '../modules/produtos/index.js'
import CarrinhoPage from '../modules/carrinho/index.js'
import SubscriptionPage from '../modules/subscription/index.js'
import TestFlows from '../modules/testflows/index.js'
import { generateUserData, generateContactData, generateUniqueEmail, generatePaymentData } from '../support/helpers.js'

describe('PGATS - Trabalho Final - Todos os Test Cases', () => {

  const cadastroPage = new CadastroPage()
  const loginPage = new LoginPage()
  const menuPage = new MenuPage()
  const contatoPage = new ContatoPage()
  const produtosPage = new ProdutosPage()
  const carrinhoPage = new CarrinhoPage()
  const subscriptionPage = new SubscriptionPage()
  const testFlows = new TestFlows()

  let testUser
  let contactData

  before(() => {
    testUser = generateUserData()
    contactData = generateContactData()
  })

  beforeEach(() => {
    testFlows.navigateToHomeSafely()
  })

  it('Test Case 1: Register User', () => {
    menuPage.navigateToLogin()
    cy.contains('New User Signup!')

    cadastroPage.fillBasicSignupForm(testUser.name, testUser.email)
    cy.contains('Enter Account Information')

    cadastroPage.fillCompleteAccountForm(testUser)
    cadastroPage.clickCreateAccount()

    cy.get('[data-qa="account-created"]').should('be.visible')
    cy.get('[data-qa="account-created"]').should('contain', 'Account Created!')
    cy.get('[data-qa="continue-button"]').click()

    cy.get('li:contains("Logged in as")').should('contain', testUser.name)
    cy.get('a[href="/delete_account"]').should('be.visible')
  })

  it('Test Case 2: Login User with correct email and password', () => {
    menuPage.navigateToLogin()
    cy.contains('Login to your account')

    loginPage.performLogin(testUser.email, testUser.password)

    cy.get('li:contains("Logged in as")').should('contain', testUser.name)
    cy.get('a[href="/logout"]').should('be.visible')
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    menuPage.navigateToLogin()
    cy.contains('Login to your account')

    const invalidEmail = generateUniqueEmail()
    loginPage.performLogin(invalidEmail, 'wrongpassword')

    cy.get('p:contains("Your email or password is incorrect!")').should('be.visible')
  })

  it('Test Case 4: Logout User', () => {
    menuPage.navigateToLogin()
    loginPage.performLogin(testUser.email, testUser.password)

    cy.get('li:contains("Logged in as")').should('contain', testUser.name)

    loginPage.performSmartLogout()

    cy.url().should('include', '/login')
    cy.get('[data-qa="login-email"]').should('be.visible')
  })

  it('Test Case 5: Register User with existing email', () => {
    menuPage.navigateToLogin()
    cy.contains('New User Signup!')

    const duplicateUser = generateUserData()
    cadastroPage.fillBasicSignupForm(duplicateUser.name, testUser.email)

    cy.get('p:contains("Email Address already exist!")').should('be.visible')
  })

  it('Test Case 6: Contact Us Form', () => {
    menuPage.navigateToContactUs()
    cy.contains('Get In Touch')

    contatoPage.fillContactForm(
      contactData.name,
      contactData.email,
      contactData.subject,
      contactData.message
    )

    cy.writeFile('cypress/fixtures/test-image.png', 'Test file content')
    contatoPage.uploadFile('cypress/fixtures/test-image.png')
    contatoPage.submitForm()

    cy.get('.status.alert.alert-success').should('be.visible')
    cy.get('.status.alert.alert-success').should('contain', 'Success! Your details have been submitted successfully.')

    contatoPage.clickHomeButton()
    cy.url().should('eq', Cypress.config().baseUrl)
  })

  it('Test Case 8: Verify All Products and product detail page', () => {
    menuPage.navigateToProducts()

    cy.url().should('include', '/products')
    cy.get('.title.text-center').should('be.visible')
    cy.get('.title.text-center').should('contain', 'All Products')
    cy.get('.features_items').should('be.visible')
    cy.get('.productinfo').should('have.length.greaterThan', 0)

    produtosPage.clickFirstProduct()

    cy.url().should('include', '/product_details/')
    cy.get('.product-information h2').should('be.visible')
    cy.get('.product-information p:contains("Category:")').should('be.visible')
    cy.get('.product-information span span').should('be.visible')
    cy.get('.product-information p:contains("Availability:")').should('be.visible')
    cy.get('.product-information p:contains("Condition:")').should('be.visible')
    cy.get('.product-information p:contains("Brand:")').should('be.visible')
  })

  it('Test Case 9: Search Product', () => {
    menuPage.navigateToProducts()

    cy.url().should('include', '/products')
    cy.get('.title.text-center').should('be.visible')
    cy.get('.title.text-center').should('contain', 'All Products')

    const searchTerm = 'Blue Top'
    produtosPage.searchProduct(searchTerm)

    cy.get('.title.text-center').should('be.visible')
    cy.get('.title.text-center').should('contain', 'Searched Products')
    cy.get('.productinfo').should('have.length.greaterThan', 0)
    cy.get('.productinfo').should('contain.text', searchTerm)
  })

  it('Test Case 10: Verify Subscription in home page', () => {
    subscriptionPage.scrollToSubscription()

    cy.get('h2:contains("Subscription")').should('be.visible')
    cy.get('h2:contains("Subscription")').should('contain', 'Subscription')

    const subscriptionEmail = generateUniqueEmail()
    subscriptionPage.subscribeToNewsletter(subscriptionEmail)

    cy.get('.alert-success').should('be.visible')
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')
  })

  it('Test Case 15: Place Order: Register before Checkout', () => {
    menuPage.navigateToLogin()
    loginPage.performLogin(testUser.email, testUser.password)

    cy.get('li:contains("Logged in as")').should('contain', testUser.name)

    menuPage.navigateToProducts()
    produtosPage.clickFirstProduct()

    produtosPage.addProductAndGoToCart('2')

    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table').should('be.visible')
    cy.get('#cart_info_table tbody tr').should('have.length.greaterThan', 0)
    cy.contains('Shopping Cart').should('be.visible')

    carrinhoPage.proceedToCheckout()

    cy.url().should('include', '/checkout')
    cy.contains('Review Your Order').should('be.visible')

    cy.get('#address_delivery').should('be.visible')
    cy.get('#address_invoice').should('be.visible')
    cy.contains('Your delivery address').should('be.visible')
    cy.contains('Your billing address').should('be.visible')

    cy.get('#cart_info').should('be.visible')
    cy.contains('Product').should('be.visible')
    cy.contains('Quantity').should('be.visible')
    cy.contains('Price').should('be.visible')
    cy.contains('Total').should('be.visible')

    carrinhoPage.addCommentAboutOrder('Test order - Trabalho Final PGATS')
    carrinhoPage.clickPlaceOrder()

    cy.url().should('include', '/payment')
    cy.contains('Payment').should('be.visible')
    cy.get('[data-qa="name-on-card"]').should('be.visible')

    const paymentData = generatePaymentData(testUser.firstName, testUser.lastName)
    carrinhoPage.fillPaymentDetails(paymentData)
    carrinhoPage.clickPayAndConfirm()

    cy.get('[data-qa="order-placed"]').should('be.visible')
    cy.contains('Order Placed!').should('be.visible')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
  })
})
