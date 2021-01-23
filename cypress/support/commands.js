// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.get('.user-form').should('be.visible');
    cy.get('#inputUsername').type(email);
    cy.get('#inputPassword').type(password,{ log: false });
    cy.get('.btn-primary').click();
});

Cypress.Commands.add('removeBooking', (position, tag = null) => {
    cy.contains('Meine Buchungen').should('be.visible');
    cy.contains('Meine Buchungen').click();
    cy.get('.bookings-list').should('be.visible');

    cy.get(`:nth-child(${position}) > :nth-child(5) > .delete-booking > .fas`).click();
    cy.contains('.bookings-list', '5').should('not.exist');
});
