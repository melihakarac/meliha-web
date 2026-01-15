describe('Contact Form E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.scrollToSection('contact');
    cy.waitForAnimations();
  });

  it('should display contact form with all fields', () => {
    cy.get('form').should('be.visible');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="subject"]').should('be.visible');
    cy.get('textarea[name="message"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should show validation errors for empty required fields', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.error-message').should('be.visible');
    cy.contains(/required/i).should('be.visible');
  });

  it('should validate email format', () => {
    cy.fillContactForm({
      name: 'John Doe',
      email: 'invalid-email',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters',
    });

    cy.get('input[name="email"]').blur();
    cy.contains(/valid email/i).should('be.visible');
  });

  it('should validate minimum length requirements', () => {
    cy.fillContactForm({
      name: 'J',
      email: 'john@example.com',
      subject: 'Hi',
      message: 'Short',
    });

    cy.get('input[name="name"]').blur();
    cy.contains(/at least 2 characters/i).should('be.visible');

    cy.get('input[name="subject"]').blur();
    cy.contains(/at least 3 characters/i).should('be.visible');

    cy.get('textarea[name="message"]').blur();
    cy.contains(/at least 10 characters/i).should('be.visible');
  });

  it('should enable submit button when form is valid', () => {
    cy.fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters',
    });

    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should disable submit button while submitting', () => {
    // Intercept the form submission
    cy.intercept('POST', '**/formResponse', {
      statusCode: 200,
      delay: 1000,
    }).as('formSubmit');

    cy.fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters',
    });

    cy.get('button[type="submit"]').click();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.contains(/sending/i).should('be.visible');

    cy.wait('@formSubmit');
  });

  it('should show success message after form submission', () => {
    cy.intercept('POST', '**/formResponse', { statusCode: 200 }).as('formSubmit');

    cy.fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters',
    });

    cy.get('button[type="submit"]').click();
    cy.wait('@formSubmit');

    cy.get('[data-testid="toast-success"]', { timeout: 2000 }).should('be.visible');
  });

  it('should reset form after successful submission', () => {
    cy.intercept('POST', '**/formResponse', { statusCode: 200 }).as('formSubmit');

    cy.fillContactForm({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test Subject',
      message: 'This is a test message with enough characters',
    });

    cy.get('button[type="submit"]').click();
    cy.wait('@formSubmit');

    cy.wait(500); // Wait for form reset

    cy.get('input[name="name"]').should('have.value', '');
    cy.get('input[name="email"]').should('have.value', '');
    cy.get('input[name="subject"]').should('have.value', '');
    cy.get('textarea[name="message"]').should('have.value', '');
  });

  it('should display contact information', () => {
    cy.get('.contact-info').should('be.visible');
    cy.get('.contact-details').should('be.visible');
  });

  it('should display social links', () => {
    cy.get('.social-links').should('be.visible');
    cy.get('.social-link').should('have.length.at.least', 1);
  });
});
