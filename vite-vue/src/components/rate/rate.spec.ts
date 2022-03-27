import { mount } from '@cypress/vue';
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
});
