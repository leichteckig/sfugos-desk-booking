// Frame of the test
describe('Test desk booking', () =>  {
    // Actual test
    it('should book a desk', () => {
        cy.visit('/');

        // Login
        cy.get('.user-form').should('be.visible');
        cy.get('#inputUsername').type(Cypress.env('user'));
        cy.get('#inputPassword').type(Cypress.env('pwd'),{ log: false });
        cy.get('.btn-primary').click();

        // Choose the company
        cy.get('.col-4').contains('basecom Testfirma');
        cy.get('.col-4 .selector-btn').click();

        // Choose floor and first available desk
        cy.contains('1. OG').click();
        cy.get('[style="left: 22.8947%; top: 25.5814%;"]').click();

        // Book desk
        cy.contains('.occupied-display', 'FREI').should('be.visible');
        cy.get('.modal-footer .btn-primary').click();

        // Verify if the right desk is booked
        cy.contains('Meine Buchungen').click();
        cy.contains('.bookings-list', '5');

        // Remove the booking again ...
        cy.get(`:nth-child(1) > :nth-child(5) > .delete-booking > .fas`).click();
    });
})
