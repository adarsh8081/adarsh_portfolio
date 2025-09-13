// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
      logout(): Chainable<void>
      visitPortfolio(): Chainable<void>
      checkNavigation(): Chainable<void>
      testChatbot(): Chainable<void>
    }
  }
}

// Custom command for login (if Auth0 is configured)
Cypress.Commands.add('login', () => {
  // This would be implemented based on your auth setup
  cy.log('Login command - implement based on your auth system')
})

// Custom command for logout
Cypress.Commands.add('logout', () => {
  // This would be implemented based on your auth setup
  cy.log('Logout command - implement based on your auth system')
})

// Custom command to visit portfolio
Cypress.Commands.add('visitPortfolio', () => {
  cy.visit('/')
  cy.get('body').should('be.visible')
})

// Custom command to check navigation
Cypress.Commands.add('checkNavigation', () => {
  cy.get('nav').should('be.visible')
  cy.get('nav a').should('have.length.greaterThan', 0)
})

// Custom command to test chatbot
Cypress.Commands.add('testChatbot', () => {
  cy.get('[data-testid="chatbot"]').should('be.visible')
  cy.get('[data-testid="chat-input"]').type('Hello, tell me about your projects')
  cy.get('[data-testid="chat-send"]').click()
  cy.get('[data-testid="chat-response"]').should('be.visible')
})
