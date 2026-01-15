describe('Accessibility E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have proper heading hierarchy', () => {
    cy.get('h1').should('exist');
    cy.get('h2').should('have.length.at.least', 1);
  });

  it('should have skip link for keyboard navigation', () => {
    cy.get('a.skip-link').should('be.visible');
    cy.get('a.skip-link').focus();
    cy.get('a.skip-link').should('be.focused');
  });

  it('should have accessible form labels', () => {
    cy.scrollToSection('contact');
    cy.get('label[for="name"]').should('exist');
    cy.get('label[for="email"]').should('exist');
    cy.get('label[for="subject"]').should('exist');
    cy.get('label[for="message"]').should('exist');
  });

  it('should have aria attributes on form fields', () => {
    cy.scrollToSection('contact');

    cy.get('input[name="name"]').should('have.attr', 'aria-invalid');
    cy.get('input[name="email"]').should('have.attr', 'aria-invalid');
  });

  it('should have accessible error messages', () => {
    cy.scrollToSection('contact');
    cy.get('button[type="submit"]').click();

    cy.get('.error-message').should('have.attr', 'role', 'alert');
    cy.get('.error-message').should('have.attr', 'id');
  });

  it('should have accessible social links', () => {
    cy.scrollToSection('contact');
    cy.get('.social-link').each(($link) => {
      cy.wrap($link).should('have.attr', 'aria-label');
      cy.wrap($link).should('have.attr', 'target', '_blank');
      cy.wrap($link).should('have.attr', 'rel', 'noopener noreferrer');
    });
  });

  it('should be keyboard navigable', () => {
    cy.get('body').tab();
    cy.focused().should('exist');

    // Test tab navigation through form
    cy.scrollToSection('contact');
    cy.get('input[name="name"]').focus();
    cy.get('input[name="name"]').should('be.focused');

    cy.get('input[name="name"]').tab();
    cy.get('input[name="email"]').should('be.focused');
  });

  it('should have semantic HTML structure', () => {
    cy.get('header').should('exist');
    cy.get('main').should('exist');
    cy.get('footer').should('exist');
    cy.get('nav').should('exist');
  });
});
