// Frame of the test
describe('Test desk booking', () =>  {
    // Hook to be executed before every test
    beforeEach(() => {
        cy.visit('/');

        // Custom command for login
        cy.login(Cypress.env('user'), Cypress.env('pwd'));
    });

    // Actual test
    it('should prevent booking of occupied desk', () => {
        // Choose the company
        cy.get('.col-4').contains('basecom Testfirma');
        cy.get('.col-4 .selector-btn').click();

        // Choose floor and booked desk
        cy.contains('1. OG').click();
        cy.get('.seat').should('be.visible');
        cy.get('.position-relative > .seat-occupied').click();

        // Book desk
        cy.get('.modal-header').should('be.visible');
        cy.get('h3').contains('Arbeitsplatz besetzt');
        cy.contains('.occupied-display', 'BELEGT').should('be.visible');
        cy.get('.modal-footer .btn-primary').should('not.exist');
    });

    it('should prevent booking of locked desk', () => {
        // Choose the company
        cy.get('.col-4').contains('basecom Testfirma');
        cy.get('.col-4 .selector-btn').click();

        // Choose floor and locked desk
        cy.contains('1. OG').click();
        cy.get('.seat').should('be.visible');
        cy.get('[style="left: 43.7719%; top: 58.6047%;"]').click();

        // Book desk
        cy.get('.modal-header').should('be.visible');
        cy.get('.modal-body')
            .contains('Dieser Arbeitsplatz steht aufgrund der aktuellen Corona-Auflagen nicht zur Verfügung.');
        cy.get('.modal-footer .btn-primary').should('be.disabled');
    });
})
