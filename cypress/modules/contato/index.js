// Módulo de Contato - Page Object Model
// Baseado no padrão da aula PGATS

class ContatoPage {
  // Seletores do formulário de contato
  get nameInput() { return '[data-qa="name"]' }
  get emailInput() { return '[data-qa="email"]' }
  get subjectInput() { return '[data-qa="subject"]' }
  get messageTextarea() { return '[data-qa="message"]' }
  get fileUploadInput() { return 'input[name="upload_file"]' }
  get submitButton() { return '[data-qa="submit-button"]' }
  get successMessage() { return '.status.alert.alert-success' }
  get homeButton() { return '.btn.btn-success' }

  // Métodos de ação - Padrão da aula
  fillContactForm(name, email, subject, message) {
    cy.get(this.nameInput).type(name)
    cy.get(this.emailInput).type(email)
    cy.get(this.subjectInput).type(subject)
    cy.get(this.messageTextarea).type(message)
  }

  uploadFile(filePath) {
    cy.get(this.fileUploadInput).selectFile(filePath)
  }

  submitForm() {
    cy.get(this.submitButton).click()

    // Handle browser alert
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert')
    })
  }

  verifySuccessMessage() {
    cy.get(this.successMessage).should('be.visible')
    cy.get(this.successMessage).should('contain', 'Success! Your details have been submitted successfully.')
  }

  clickHomeButton() {
    cy.get(this.homeButton).click()
  }
}

export default ContatoPage
