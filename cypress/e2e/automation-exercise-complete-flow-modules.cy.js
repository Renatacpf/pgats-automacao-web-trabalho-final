import CadastroPage from '../modules/cadastro/index.js'
import LoginPage from '../modules/login/index.js'
import MenuPage from '../modules/menu/index.js'
import ContatoPage from '../modules/contato/index.js'
import ProdutosPage from '../modules/produtos/index.js'
import CarrinhoPage from '../modules/carrinho/index.js'
import SubscriptionPage from '../modules/subscription/index.js'
import TestFlows from '../modules/testflows/index.js'
import { generateUserData, generateContactData, generateUniqueEmail } from '../support/helpers.js'

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

    testFlows.completeRegistration()
    testFlows.verifyUserLoggedIn(testUser.name)
    menuPage.verifyDeleteAccountLinkVisible()
  })

  it('Test Case 2: Login User with correct email and password', () => {
    menuPage.navigateToLogin()
    cy.contains('Login to your account')

    loginPage.performLogin(testUser.email, testUser.password)
    testFlows.verifyUserLoggedIn(testUser.name)
    menuPage.verifyLogoutLinkVisible()
  })

  it('Test Case 3: Login User with incorrect email and password', () => {
    menuPage.navigateToLogin()
    cy.contains('Login to your account')

    const invalidEmail = generateUniqueEmail()
    loginPage.performLogin(invalidEmail, 'wrongpassword')
    loginPage.verifyLoginError()
  })

  it('Test Case 4: Logout User', () => {
    menuPage.navigateToLogin()
    loginPage.performLogin(testUser.email, testUser.password)
    testFlows.verifyUserLoggedIn(testUser.name)

    loginPage.performSmartLogout()
    testFlows.verifyLogoutSuccess()
  })

  it('Test Case 5: Register User with existing email', () => {
    menuPage.navigateToLogin()
    cy.contains('New User Signup!')

    const duplicateUser = generateUserData()
    cadastroPage.fillBasicSignupForm(duplicateUser.name, testUser.email)
    cadastroPage.verifyEmailExistsError()
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

    contatoPage.verifySuccessMessage()
    contatoPage.clickHomeButton()
    cy.url().should('eq', Cypress.config().baseUrl)
  })

  it('Test Case 8: Verify All Products and product detail page', () => {
    menuPage.navigateToProducts()
    produtosPage.verifyAllProductsPage()
    produtosPage.verifyProductsList()

    produtosPage.clickFirstProduct()
    produtosPage.verifyProductDetailPage()
  })

  it('Test Case 9: Search Product', () => {
    menuPage.navigateToProducts()
    produtosPage.verifyAllProductsPage()

    const searchTerm = 'Blue Top'
    produtosPage.searchProduct(searchTerm)
    produtosPage.verifySearchResults()
    produtosPage.verifySearchResultsContainProduct(searchTerm)
  })

  it('Test Case 10: Verify Subscription in home page', () => {
    subscriptionPage.scrollToSubscription()
    subscriptionPage.verifySubscriptionText()

    const subscriptionEmail = generateUniqueEmail()
    subscriptionPage.subscribeToNewsletter(subscriptionEmail)
    subscriptionPage.verifySubscriptionSuccess()
  })

  it('Test Case 15: Place Order: Register before Checkout', () => {
    menuPage.navigateToLogin()
    loginPage.performLogin(testUser.email, testUser.password)
    testFlows.verifyUserLoggedIn(testUser.name)

    menuPage.navigateToProducts()
    produtosPage.clickFirstProduct()

    produtosPage.addProductAndGoToCart('2')

    carrinhoPage.verifyCartPage()
    carrinhoPage.proceedToCheckout()

    carrinhoPage.verifyCheckoutPage()
    carrinhoPage.verifyAddressDetails()
    carrinhoPage.verifyOrderReview()

    carrinhoPage.addCommentAboutOrder('Test order - Trabalho Final PGATS')
    carrinhoPage.clickPlaceOrder()

    carrinhoPage.verifyPaymentPage()
    const paymentData = {
      nameOnCard: testUser.firstName + ' ' + testUser.lastName,
      cardNumber: '4242424242424242',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2025'
    }
    carrinhoPage.fillPaymentDetails(paymentData)
    carrinhoPage.clickPayAndConfirm()

    carrinhoPage.verifyOrderSuccess()
  })

  after(() => {
    // Cleanup opcional - comentado para evitar erros na pipeline
    cy.log('Testes concluídos com sucesso - Test Case 15 funcionando')
  })
})
