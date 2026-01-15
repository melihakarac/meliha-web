describe('Responsive Design E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be responsive on mobile viewport', () => {
    cy.viewport(375, 667); // iPhone SE size
    cy.get('body').should('be.visible');
    cy.get('header').should('be.visible');
    cy.get('#hero').should('be.visible');
  });

  it('should be responsive on tablet viewport', () => {
    cy.viewport(768, 1024); // iPad size
    cy.get('body').should('be.visible');
    cy.get('header').should('be.visible');
  });

  it('should be responsive on desktop viewport', () => {
    cy.viewport(1920, 1080); // Desktop size
    cy.get('body').should('be.visible');
    cy.get('header').should('be.visible');
  });

  it('should maintain layout on different screen sizes', () => {
    const viewports = [
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
      { width: 1280, height: 720 },
      { width: 1920, height: 1080 },
    ];

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height);
      cy.get('#hero').should('be.visible');
      cy.get('#about').should('exist');
      cy.get('#skills').should('exist');
      cy.get('#experience').should('exist');
      cy.get('#contact').should('exist');
    });
  });
});
