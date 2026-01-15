// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

// Custom command to wait for animations
Cypress.Commands.add('waitForAnimations', () => {
  cy.wait(500); // Wait for CSS transitions
});

// Custom command to scroll to section
Cypress.Commands.add('scrollToSection', (sectionId) => {
  cy.get(`#${sectionId}`).scrollIntoView({ duration: 500 });
  cy.waitForAnimations();
});

// Custom command to fill contact form
Cypress.Commands.add('fillContactForm', (formData) => {
  if (formData.name) {
    cy.get('input[name="name"]').clear().type(formData.name);
  }
  if (formData.email) {
    cy.get('input[name="email"]').clear().type(formData.email);
  }
  if (formData.subject) {
    cy.get('input[name="subject"]').clear().type(formData.subject);
  }
  if (formData.message) {
    cy.get('textarea[name="message"]').clear().type(formData.message);
  }
});

// Custom command to check if element is in viewport
Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject) => {
  cy.window().then((win) => {
    const rect = subject[0].getBoundingClientRect();
    expect(rect.top).to.be.at.least(0);
    expect(rect.bottom).to.be.at.most(win.innerHeight);
  });
});
