// Frame of the test
describe('Test desk booking', () =>  {
    // Hook to be executed before every test
    beforeEach(() => {
        cy.visit('/');

        // Custom command for login
        cy.login(Cypress.env('user'), Cypress.env('pwd'));
    });

    // Actual test
    it('should book a desk', () => {
        // Request we want to check
        cy.intercept({
            method: 'POST',
            url: '/api/bookings',
        }).as('bookingCreationCheck');

        // Choose the company
        cy.get('.col-4').contains('basecom Testfirma');
        cy.get('.col-4 .selector-btn').click();

        // Choose floor and first available desk
        cy.contains('1. OG').click();
        cy.get('.seat').should('be.visible');
        cy.get('[style="left: 22.8947%; top: 25.5814%;"]').click();

        // Book desk
        cy.get('.modal-body').should('be.visible');
        cy.get('.modal-footer').should('be.visible');
        cy.contains('.occupied-display', 'FREI').should('be.visible');
        cy.get('.modal-footer .btn-primary').click();

        // Check API response
        cy.wait('@bookingCreationCheck')
            .its('response.statusCode').should('equal', 201);

        // Verify if the right desk is booked
        cy.get('.seat.seat-occupied[style="left: 22.8947%; top: 25.5814%;"]').should('be.visible');
        cy.contains('Meine Buchungen').should('be.visible');
        cy.contains('Meine Buchungen').click();
        cy.get('.bookings-list').should('be.visible');
        cy.contains('.bookings-list', '5');
    });

    // Hook to be executed before every test
    afterEach(() => {
        // Remove the booking again via custom command
        cy.removeBooking(1);
    });
})
