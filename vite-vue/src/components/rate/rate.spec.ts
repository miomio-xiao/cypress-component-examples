import { mount, mountCallback } from '@cypress/vue';
import Rate from './index';

describe('rate component', () => {
  it('should render 5 item elements', () => {
    mount(Rate);

    cy.get('.mio-rate-item').should('have.length', 5);
  });

  it('should be highlighted when the element is clicked', () => {
    mount(Rate);

    cy.get('.mio-rate-item.is-active').should('have.length', 0);

    cy.get('.mio-rate-item:nth-of-type(3)').click();

    cy.get('.mio-rate-item.is-active').should('have.length', 3);
  });

  describe('v-model value', () => {
    beforeEach(
      mountCallback(Rate, {
        propsData: {
          modelValue: 3,
        },
      }),
    );

    it('should work when set props value', () => {
      cy.get('.mio-rate-item.is-active')
        .should('have.length', 3)
        .then(() => {
          Cypress.vueWrapper.setProps({
            modelValue: 4,
          });
          cy.get('.mio-rate-item.is-active').should('have.length', 4);
        });
    });

    it('should be emit input when the element is clicked', () => {
      cy.get('.mio-rate-item.is-active').should('have.length', 3);

      cy.get('.mio-rate-item:nth-of-type(2)')
        .click()
        .then(() => {
          expect(Cypress.vueWrapper.emitted()['update:modelValue'].length).to.eq(1);
          expect(Cypress.vueWrapper.emitted()['update:modelValue'][0][0]).to.eq(2);
        });
    });
  });

  it('should be highlighted when hover', () => {
    mount(Rate);

    cy.get('.mio-rate-item:nth-of-type(3)').trigger('mouseenter');

    cy.get('.mio-rate-item.is-active').should('have.length', 3);

    cy.get('.mio-rate-item:nth-of-type(3)').trigger('mouseleave');

    cy.get('.mio-rate-item.is-active').should('have.length', 0);
  });
});
