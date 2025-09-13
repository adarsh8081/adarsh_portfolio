describe('Portfolio Chatbot', () => {
  beforeEach(() => {
    cy.visitPortfolio()
  })

  it('should display chatbot interface', () => {
    cy.get('[data-testid="chatbot"]').should('be.visible')
    cy.get('[data-testid="chat-input"]').should('be.visible')
    cy.get('[data-testid="chat-send"]').should('be.visible')
  })

  it('should send messages and receive responses', () => {
    cy.testChatbot()
  })

  it('should handle empty input gracefully', () => {
    cy.get('[data-testid="chat-send"]').click()
    cy.get('[data-testid="chat-error"]').should('not.exist')
  })

  it('should clear input after sending message', () => {
    cy.get('[data-testid="chat-input"]').type('Test message')
    cy.get('[data-testid="chat-send"]').click()
    cy.get('[data-testid="chat-input"]').should('have.value', '')
  })

  it('should display loading state during API call', () => {
    cy.get('[data-testid="chat-input"]').type('Tell me about your projects')
    cy.get('[data-testid="chat-send"]').click()
    cy.get('[data-testid="chat-loading"]').should('be.visible')
  })

  it('should handle API errors gracefully', () => {
    // Mock API failure
    cy.intercept('POST', '**/chat', { statusCode: 500 }).as('chatError')
    
    cy.get('[data-testid="chat-input"]').type('Test message')
    cy.get('[data-testid="chat-send"]').click()
    
    cy.wait('@chatError')
    cy.get('[data-testid="chat-error"]').should('be.visible')
  })

  it('should support voice input if available', () => {
    cy.get('[data-testid="voice-input"]').then(($btn) => {
      if ($btn.is(':visible')) {
        cy.wrap($btn).should('be.visible')
        cy.wrap($btn).click()
        cy.get('[data-testid="voice-recording"]').should('be.visible')
      }
    })
  })
})
