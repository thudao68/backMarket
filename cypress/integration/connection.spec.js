var faker = require('faker');

describe('Nouveau backer', () => {
    beforeEach(() => {
        cy.visit('https://preprod.backmarket.fr/register')
    })
    
    it('Inscription réussie', () => {
        cy.wait(5000)
        cy.get('[data-test=accept-cta]').click()
        Cypress.Cookies.preserveOnce('euconsent-v2')
        cy.get('#email-signup').type(faker.internet.email())
        cy.wait(3000)
        cy.get('#firstName-signup').type('Jean')
        cy.get('#lastName-signup').type('Depen')
        cy.get('#password-signup').type('Abcdef123')
        cy.get('[data-test=checkbox-span]').click({force : true})
        cy.contains('Enchantés !').click()
        cy.wait(3000)
        cy.url().should('include', '/dashboard/orders')
    })

    it('Inscription échouée', () => {
        cy.wait(5000)
        cy.get('[data-test=accept-cta]').click()
        Cypress.Cookies.preserveOnce('euconsent-v2')
        cy.get('#email-signup').type('testing@gmail.com')
        cy.wait(3000)
        cy.get('#firstName-signup').type('Jean')
        cy.get('#lastName-signup').type('Depen')
        cy.get('#password-signup').type('Abcdef1')
        cy.wait(6000)
        cy.get('[data-test=checkbox-span]').click({force : true})
        cy.contains('Enchantés !').click()
        cy.get('[data-test=list-item]').should('contain', 'Merci de saisir un mot de passe valide.')
    })
})
