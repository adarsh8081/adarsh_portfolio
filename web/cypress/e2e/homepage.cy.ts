describe('Portfolio Homepage', () => {
  beforeEach(() => {
    cy.visitPortfolio()
  })

  it('should load the homepage successfully', () => {
    cy.get('body').should('be.visible')
    cy.title().should('not.be.empty')
  })

  it('should display navigation menu', () => {
    cy.checkNavigation()
  })

  it('should have working navigation links', () => {
    cy.get('nav a').each(($link) => {
      cy.wrap($link).should('be.visible')
      cy.wrap($link).should('have.attr', 'href')
    })
  })

  it('should display hero section', () => {
    cy.get('[data-testid="hero"]').should('be.visible')
    cy.get('[data-testid="hero-title"]').should('be.visible')
    cy.get('[data-testid="hero-description"]').should('be.visible')
  })

  it('should display projects section', () => {
    cy.get('[data-testid="projects"]').should('be.visible')
    cy.get('[data-testid="project-card"]').should('have.length.greaterThan', 0)
  })

  it('should display skills section', () => {
    cy.get('[data-testid="skills"]').should('be.visible')
    cy.get('[data-testid="skill-item"]').should('have.length.greaterThan', 0)
  })

  it('should be responsive on mobile', () => {
    cy.viewport(375, 667) // iPhone SE
    cy.get('body').should('be.visible')
    cy.get('nav').should('be.visible')
  })

  it('should be responsive on tablet', () => {
    cy.viewport(768, 1024) // iPad
    cy.get('body').should('be.visible')
    cy.get('nav').should('be.visible')
  })
})
