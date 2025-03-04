describe('Profit Calculator', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.reload(true);
  });

  it('should validate required fields', () => {
    cy.get('[data-testid=calculate-button]').click();
    cy.contains('成本单价不能为空').should('be.visible');
    cy.contains('销售单价不能为空').should('be.visible');
  });

  it('should calculate profit correctly', () => {
    cy.get('[data-testid=cost]').clear().type('50');
    cy.get('[data-testid=price]').clear().type('100');
    cy.get('[data-testid=quantity]').clear().type('10');
    cy.get('[data-testid=tax-rate]').clear().type('13');
    cy.get('[data-testid=calculate-button]').click();

    cy.get('[data-testid=cost-value]').should('contain', 50);
    cy.get('[data-testid=total-cost-value]').should('contain', 500);
    cy.get('[data-testid=price-beforeTax-value]').should('contain', 100);
    cy.get('[data-testid=total-price-beforeTax-value]').should('contain', 1000);
    cy.get('[data-testid=total-profit-beforeTax-value]').should('contain', 500);
    cy.get('[data-testid=profit-margin-beforeTax-value]').should('contain', 50);
    cy.get('[data-testid=price-afterTax-value]').should('contain', 87);
    cy.get('[data-testid=total-price-afterTax-value]').should('contain', 870);
    cy.get('[data-testid=total-profit-afterTax-value]').should('contain', 370);
    cy.get('[data-testid=profit-margin-afterTax-value]').should('contain', 42.53);
  });

  it('should calculate price correctly', () => {
    cy.get('[data-testid=tab-price]').click();
    cy.get('[data-testid=tab-afterTax]').click();
    cy.get('[data-testid=cost]').clear().type('50');
    cy.get('[data-testid=profit-margin]').clear().type('30');
    cy.get('[data-testid=quantity]').clear().type('10');
    cy.get('[data-testid=tax-rate]').clear().type('13');
    cy.get('[data-testid=calculate-button]').click();

    cy.get('[data-testid=cost-value]').should('contain', 50);
    cy.get('[data-testid=total-cost-value]').should('contain', 500);
    cy.get('[data-testid=price-beforeTax-value]').should('contain', 82.10);
    cy.get('[data-testid=total-price-beforeTax-value]').should('contain', 821.02);
    cy.get('[data-testid=total-profit-beforeTax-value]').should('contain', 321.02);
    cy.get('[data-testid=profit-margin-beforeTax-value]').should('contain', 39.10);
    cy.get('[data-testid=price-afterTax-value]').should('contain', 71.43);
    cy.get('[data-testid=total-price-afterTax-value]').should('contain', 714.29);
    cy.get('[data-testid=total-profit-afterTax-value]').should('contain', 214.29);
    cy.get('[data-testid=profit-margin-afterTax-value]').should('contain', 30);

    cy.get('[data-testid=tab-beforeTax]').click();
    cy.get('[data-testid=cost]').clear().type('50');
    cy.get('[data-testid=profit-margin]').clear().type('30');
    cy.get('[data-testid=quantity]').clear().type('10');
    cy.get('[data-testid=tax-rate]').clear().type('13');
    cy.get('[data-testid=calculate-button]').click();

    cy.get('[data-testid=cost-value]').should('contain', 50);
    cy.get('[data-testid=total-cost-value]').should('contain', 500);
    cy.get('[data-testid=price-beforeTax-value]').should('contain', 71.43);
    cy.get('[data-testid=total-price-beforeTax-value]').should('contain', 714.29);
    cy.get('[data-testid=total-profit-beforeTax-value]').should('contain', 214.29);
    cy.get('[data-testid=profit-margin-beforeTax-value]').should('contain', 30);
    cy.get('[data-testid=price-afterTax-value]').should('contain', 62.14);
    cy.get('[data-testid=total-price-afterTax-value]').should('contain', 621.43);
    cy.get('[data-testid=total-profit-afterTax-value]').should('contain', 121.43);
    cy.get('[data-testid=profit-margin-afterTax-value]').should('contain', 19.54);
  });

  it('should calculate cost correctly', () => {
    cy.get('[data-testid=tab-cost]').click();
    cy.get('[data-testid=tab-afterTax]').click();
    cy.get('[data-testid=price]').clear().type('100');
    cy.get('[data-testid=profit-margin]').clear().type('30');
    cy.get('[data-testid=quantity]').clear().type('10');
    cy.get('[data-testid=tax-rate]').clear().type('13');
    cy.get('[data-testid=calculate-button]').click();

    cy.get('[data-testid=cost-value]').should('contain', 60.9);
    cy.get('[data-testid=total-cost-value]').should('contain', 609);
    cy.get('[data-testid=price-beforeTax-value]').should('contain', 100);
    cy.get('[data-testid=total-price-beforeTax-value]').should('contain', 1000);
    cy.get('[data-testid=total-profit-beforeTax-value]').should('contain', 391);
    cy.get('[data-testid=profit-margin-beforeTax-value]').should('contain', 39.1);
    cy.get('[data-testid=price-afterTax-value]').should('contain', 87);
    cy.get('[data-testid=total-price-afterTax-value]').should('contain', 870);
    cy.get('[data-testid=total-profit-afterTax-value]').should('contain', 261);
    cy.get('[data-testid=profit-margin-afterTax-value]').should('contain', 30);

    cy.get('[data-testid=tab-beforeTax]').click();
    cy.get('[data-testid=price]').clear().type('100');
    cy.get('[data-testid=profit-margin]').clear().type('30');
    cy.get('[data-testid=quantity]').clear().type('10');
    cy.get('[data-testid=tax-rate]').clear().type('13');
    cy.get('[data-testid=calculate-button]').click();

    cy.get('[data-testid=cost-value]').should('contain', 70);
    cy.get('[data-testid=total-cost-value]').should('contain', 700);
    cy.get('[data-testid=price-beforeTax-value]').should('contain', 100);
    cy.get('[data-testid=total-price-beforeTax-value]').should('contain', 1000);
    cy.get('[data-testid=total-profit-beforeTax-value]').should('contain', 300);
    cy.get('[data-testid=profit-margin-beforeTax-value]').should('contain', 30);
    cy.get('[data-testid=price-afterTax-value]').should('contain', 87);
    cy.get('[data-testid=total-price-afterTax-value]').should('contain', 870);
    cy.get('[data-testid=total-profit-afterTax-value]').should('contain', 170);
    cy.get('[data-testid=profit-margin-afterTax-value]').should('contain', 19.54);
  });
});