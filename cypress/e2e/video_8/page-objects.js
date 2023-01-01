export function openPage() {
    cy.visit('https://naucz-sie-testowac.czyitjestdlamnie.pl')
    cy.get('[data-cy="start-automating-btn"]').click();

    //todo find better way to wait for automating mode to be turned on
    cy.wait(500);

    return expenseListPage();
};

function expenseListPage() {
    return {
        clickAddNewExpenseButton: () => {
            cy.get('[data-cy="add-expense-btn"]').click();

            return expenseDetailsFormPage();
        },

        clickRemoveExpenseButton: (expenseIndex) => {
            const selectedExpense = getExpenseByIndex(expenseIndex);
            selectedExpense.within(() => cy.get('[data-cy="remove-expense-btn"]').click());

            return expenseListPage();
        },

        clickCopyExpenseButton: (expenseIndex) => {
            const selectedExpense = getExpenseByIndex(expenseIndex);
            selectedExpense.within(() => cy.get('[data-cy="copy-expense-btn"]').click());

            return expenseListPage();
        },

        clickEditExpenseButton: (expenseIndex) => {
            const selectedExpense = getExpenseByIndex(expenseIndex);
            selectedExpense.within(() => cy.get('[data-cy="edit-expense-btn"]').click());

            return expenseDetailsFormPage();
        },

        assertExpensesCount: (count) => {
            getAllExpenses().should('have.length', count);

            return expenseListPage();
        },

        assertExpenseExists: (index, name, amount, date) => {
            const selectedExpense = getExpenseByIndex(index);

            selectedExpense.within(() => cy.get('[data-cy="expense-name"]').should('have.text', name));
            selectedExpense.within(() => cy.get('[data-cy="expense-amount"]').should('have.text', amount));
            selectedExpense.within(() => cy.get('[data-cy="expense-date"]').should('have.text', date));

            return expenseListPage();               
        },

        assertExpenseSum: (sum) => {
            cy.get('[data-cy="expenses-sum"]').should('have.text', sum);

            return expenseListPage();
        },

        assertExpenseDetailsFormIsNotVisible: () => {
            cy.get('[data-cy="expense-details-form"]').should('not.exist');

            return expenseListPage();
        }
    }
}

function getAllExpenses() {
    return cy
        .get('[data-cy="expense-list"]')
        .children();
}

function getExpenseByIndex(index) {
    return getAllExpenses().eq(index);
}

function expenseDetailsFormPage() {
    return {
        fillForm: (name, amount, date) => {
            cy.get('[data-cy="expense-name-input"]').clear().type(name);
            cy.get('[data-cy="expense-amount-input"]').clear().type(amount);
            cy.get('[data-cy="expense-date-input"]').clear().type(date);

            return expenseDetailsFormPage();
        },

        clickSaveButton: () => {
            cy.get('[data-cy="save-expense-btn"]').click();
            cy.get('[data-cy="expense-details-form"]').should('not.exist');

            return expenseListPage();
        },

        clickCancelButton: () => {
            cy.get('.btn-outline-secondary > .bi-x-lg').click();
            cy.get('[data-cy="expense-details-form"]').should('not.exist');

            return expenseListPage();
        },

        assertSaveButtonIsDisabled: () => {
            cy.get('[data-cy="save-expense-btn"]').should('be.disabled');

            return expenseDetailsFormPage();
        },

        assertSaveButtonIsEnabled: () => {
            cy.get('[data-cy="save-expense-btn"]').should('be.enabled');

            return expenseDetailsFormPage();
        }
    }
}