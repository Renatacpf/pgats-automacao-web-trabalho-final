class ContatoPage {
  fillContactForm(name, email, subject, message) {
    cy.get('[data-qa="name"]').type(name)
    cy.get('[data-qa="email"]').type(email)
    cy.get('[data-qa="subject"]').type(subject)
    cy.get('[data-qa="message"]').type(message)
  }

  uploadFile(filePath) {
    cy.get('input[name="upload_file"]').selectFile(filePath)
  }

  submitForm() {
    cy.get('[data-qa="submit-button"]').click()
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert')
    })
  }

  clickHomeButton() {
    cy.get('.btn.btn-success').click()
  }
}

export default ContatoPage
