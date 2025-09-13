describe('Portfolio Projects', () => {
  beforeEach(() => {
    cy.visit('/projects')
  })

  it('should load projects page successfully', () => {
    cy.get('body').should('be.visible')
    cy.url().should('include', '/projects')
  })

  it('should display project cards', () => {
    cy.get('[data-testid="project-card"]').should('have.length.greaterThan', 0)
  })

  it('should display project information', () => {
    cy.get('[data-testid="project-card"]').first().within(() => {
      cy.get('[data-testid="project-title"]').should('be.visible')
      cy.get('[data-testid="project-description"]').should('be.visible')
      cy.get('[data-testid="project-tech"]').should('be.visible')
    })
  })

  it('should navigate to project details', () => {
    cy.get('[data-testid="project-card"]').first().click()
    cy.url().should('match', /\/projects\/[^\/]+/)
  })

  it('should filter projects by technology', () => {
    cy.get('[data-testid="tech-filter"]').should('be.visible')
    cy.get('[data-testid="tech-filter"]').first().click()
    cy.get('[data-testid="project-card"]').should('be.visible')
  })

  it('should search projects', () => {
    cy.get('[data-testid="project-search"]').type('react')
    cy.get('[data-testid="project-card"]').should('be.visible')
  })

  it('should display project images', () => {
    cy.get('[data-testid="project-image"]').should('be.visible')
    cy.get('[data-testid="project-image"]').should('have.attr', 'src')
  })
})
