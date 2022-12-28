describe('expense list tests', () => {
  it('can add new expense', () => {
    //given
    cy.visit('https://naucz-sie-testowac.czyitjestdlamnie.pl')
    cy.get('[data-cy="start-automating-btn"]').click();

    //when
    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-name-input"]').type('chleb');
    cy.get('[data-cy="expense-amount-input"]').type(10);
    cy.get('[data-cy="expense-date-input"]').type('2020-01-01');
    cy.get('[data-cy="save-expense-btn"]').click();

    //then
    const expenseElements = cy
      .get('[data-cy="expense-list"]')
      .children();

    expenseElements.should('have.length', 1);

    const newExpense = expenseElements.first();

    newExpense.within(() => cy.get('[data-cy="expense-name"]').should('have.text', 'chleb'));
    newExpense.within(() => cy.get('[data-cy="expense-amount"]').should('have.text', '10.00 zł'));
    newExpense.within(() => cy.get('[data-cy="expense-date"]').should('have.text', '01.01.2020'));
  })

  it('can edit expense', () => {
    //given
    cy.visit('https://naucz-sie-testowac.czyitjestdlamnie.pl')
    cy.get('[data-cy="start-automating-btn"]').click();

    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-name-input"]').type('chleb');
    cy.get('[data-cy="expense-amount-input"]').type(10);
    cy.get('[data-cy="expense-date-input"]').type('2020-01-01');
    cy.get('[data-cy="save-expense-btn"]').click();
    cy.get('[data-cy="expense-details-form"]').should('not.exist');

    //when
    cy.get('[data-cy="edit-expense-btn"]').click();
    cy.get('[data-cy="expense-name-input"]').clear().type("nowy chleb");
    cy.get('[data-cy="expense-amount-input"]').clear().type(15);
    cy.get('[data-cy="expense-date-input"]').clear().type('2020-01-02');
    cy.get('[data-cy="save-expense-btn"]').click();

    //then
    const expenseElements = cy
      .get('[data-cy="expense-list"]')
      .children();

    expenseElements.should('have.length', 1);

    const newExpense = expenseElements.first();

    newExpense.within(() => cy.get('[data-cy="expense-name"]').should('have.text', 'nowy chleb'));
    newExpense.within(() => cy.get('[data-cy="expense-amount"]').should('have.text', '15.00 zł'));
    newExpense.within(() => cy.get('[data-cy="expense-date"]').should('have.text', '02.01.2020'));
  })

  it('can remove expense', () => {
    //given
    cy.visit('https://naucz-sie-testowac.czyitjestdlamnie.pl')
    cy.get('[data-cy="start-automating-btn"]').click();

    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-name-input"]').type('chleb');
    cy.get('[data-cy="expense-amount-input"]').type(10);
    cy.get('[data-cy="expense-date-input"]').type('2020-01-01');
    cy.get('[data-cy="save-expense-btn"]').click();
    cy.get('[data-cy="expense-details-form"]').should('not.exist');

    //when
    cy.get('[data-cy="remove-expense-btn"]').click();

    //then
    const expenseElements = cy
      .get('[data-cy="expense-list"]')
      .children();

    expenseElements.should('have.length', 0);
  })

  it('can copy expense', () => {
    //given
    cy.visit('https://naucz-sie-testowac.czyitjestdlamnie.pl')
    cy.get('[data-cy="start-automating-btn"]').click();

    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-name-input"]').type('chleb');
    cy.get('[data-cy="expense-amount-input"]').type(10);
    cy.get('[data-cy="expense-date-input"]').type('2020-01-01');
    cy.get('[data-cy="save-expense-btn"]').click();
    cy.get('[data-cy="expense-details-form"]').should('not.exist');

    //when
    cy.get('[data-cy="copy-expense-btn"]').click();

    //then
    const expenseElements = cy
      .get('[data-cy="expense-list"]')
      .children();

    expenseElements.should('have.length', 2);

    const copiedExepnse = expenseElements.last();

    copiedExepnse.within(() => cy.get('[data-cy="expense-name"]').should('have.text', 'chleb'));
    copiedExepnse.within(() => cy.get('[data-cy="expense-amount"]').should('have.text', '10.00 zł'));
    copiedExepnse.within(() => cy.get('[data-cy="expense-date"]').should('have.text', '01.01.2020'));
  })

  it('can calculate sum', () => {
    //given
    cy.visit('https://naucz-sie-testowac.czyitjestdlamnie.pl')
    cy.get('[data-cy="start-automating-btn"]').click();

    //when
    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-name-input"]').type('chleb');
    cy.get('[data-cy="expense-amount-input"]').type(10);
    cy.get('[data-cy="expense-date-input"]').type('2020-01-01');
    cy.get('[data-cy="save-expense-btn"]').click();

    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-name-input"]').type('masło');
    cy.get('[data-cy="expense-amount-input"]').type(8.99);
    cy.get('[data-cy="expense-date-input"]').type('2020-01-01');
    cy.get('[data-cy="save-expense-btn"]').click();

    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-name-input"]').type('coś innego');
    cy.get('[data-cy="expense-amount-input"]').type(100);
    cy.get('[data-cy="expense-date-input"]').type('2020-01-01');
    cy.get('[data-cy="save-expense-btn"]').click();

    //then
    cy.get('[data-cy="expenses-sum"]').should('have.text', '118.99 zł');
  })
})