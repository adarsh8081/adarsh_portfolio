describe('Portfolio Contact Form', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should load contact page successfully', () => {
    cy.get('body').should('be.visible')
    cy.url().should('include', '/contact')
  })

  it('should display contact form', () => {
    cy.get('[data-testid="contact-form"]').should('be.visible')
    cy.get('[data-testid="name-input"]').should('be.visible')
    cy.get('[data-testid="email-input"]').should('be.visible')
    cy.get('[data-testid="message-input"]').should('be.visible')
    cy.get('[data-testid="submit-button"]').should('be.visible')
  })

  it('should validate required fields', () => {
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="form-error"]').should('be.visible')
  })

  it('should validate email format', () => {
    cy.get('[data-testid="email-input"]').type('invalid-email')
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="email-error"]').should('be.visible')
  })

  it('should submit form successfully', () => {
    cy.get('[data-testid="name-input"]').type('Test User')
    cy.get('[data-testid="email-input"]').type('test@example.com')
    cy.get('[data-testid="message-input"]').type('This is a test message')
    
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="success-message"]').should('be.visible')
  })

  it('should handle form submission errors', () => {
    // Mock API failure
    cy.intercept('POST', '**/api/email', { statusCode: 500 }).as('emailError')
    
    cy.get('[data-testid="name-input"]').type('Test User')
    cy.get('[data-testid="email-input"]').type('test@example.com')
    cy.get('[data-testid="message-input"]').type('Test message')
    
    cy.get('[data-testid="submit-button"]').click()
    cy.wait('@emailError')
    cy.get('[data-testid="error-message"]').should('be.visible')
  })

  it('should clear form after successful submission', () => {
    cy.get('[data-testid="name-input"]').type('Test User')
    cy.get('[data-testid="email-input"]').type('test@example.com')
    cy.get('[data-testid="message-input"]').type('Test message')
    
    cy.get('[data-testid="submit-button"]').click()
    cy.get('[data-testid="success-message"]').should('be.visible')
    
    cy.get('[data-testid="name-input"]').should('have.value', '')
    cy.get('[data-testid="email-input"]').should('have.value', '')
    cy.get('[data-testid="message-input"]').should('have.value', '')
  })
})
