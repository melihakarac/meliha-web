describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to all sections via header links', () => {
    // Check header exists
    cy.get('header').should('be.visible');

    // Navigate to About section
    cy.contains('a', /about/i).click();
    cy.url().should('include', '#about');
    cy.get('#about').should('be.visible');

    // Navigate to Skills section
    cy.contains('a', /skills/i).click();
    cy.url().should('include', '#skills');
    cy.get('#skills').should('be.visible');

    // Navigate to Experience section
    cy.contains('a', /experience/i).click();
    cy.url().should('include', '#experience');
    cy.get('#experience').should('be.visible');

    // Navigate to Contact section
    cy.contains('a', /contact/i).click();
    cy.url().should('include', '#contact');
    cy.get('#contact').should('be.visible');
  });

  it('should have skip link for accessibility', () => {
    cy.get('a.skip-link').should('be.visible');
    cy.get('a.skip-link').should('have.attr', 'href', '#main-content');

    cy.get('a.skip-link').click();
    cy.get('#main-content').should('be.visible');
    cy.get('#main-content').should('have.focus');
  });

  it('should scroll smoothly to sections', () => {
    cy.scrollToSection('about');
    cy.get('#about').isInViewport();

    cy.scrollToSection('skills');
    cy.get('#skills').isInViewport();

    cy.scrollToSection('experience');
    cy.get('#experience').isInViewport();

    cy.scrollToSection('contact');
    cy.get('#contact').isInViewport();
  });

  it('should have all main sections visible on page', () => {
    cy.get('#hero').should('be.visible');
    cy.get('#about').should('exist');
    cy.get('#skills').should('exist');
    cy.get('#experience').should('exist');
    cy.get('#contact').should('exist');
  });
});
