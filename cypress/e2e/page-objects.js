export function openPage() {
    cy.visit('https://naucz-sie-testowac.czyitjestdlamnie.pl')
    cy.get('[data-cy="start-automating-btn"]').click();

    return expenseListPage();
};

function expenseListPage() {
    return {
        clickAddNewExpenseButton: () => {
            cy.get('[data-cy="add-expense-btn"]').click();

            return expenseDetailsFormPage();
        },

        clickRemoveExpenseButton: () => {
            cy.get('[data-cy="remove-expense-btn"]').click();

            return expenseListPage();
        },

        clickCopyExpenseButton: () => {
            cy.get('[data-cy="copy-expense-btn"]').click();

            return expenseListPage();
        },

        clickEditExpenseButton: () => {
            cy.get('[data-cy="edit-expense-btn"]').click();

            return expenseDetailsFormPage();
        },

        assertExpensesCount: (count) => {
            cy.get('[data-cy="expense-list"]')
                .children()
                .should('have.length', count);

            return expenseListPage();
        },

        assertExpenseExists: (index, name, amount, date) => {
            const expenseElements = cy
                .get('[data-cy="expense-list"]')
                .children();

            const selectedExpense = expenseElements.eq(index);

            selectedExpense.within(() => cy.get('[data-cy="expense-name"]').should('have.text', name));
            selectedExpense.within(() => cy.get('[data-cy="expense-amount"]').should('have.text', amount));
            selectedExpense.within(() => cy.get('[data-cy="expense-date"]').should('have.text', date));

            return expenseListPage();               
        },

        assertExpenseSum: (sum) => {
            cy.get('[data-cy="expenses-sum"]').should('have.text', sum);

            return expenseListPage();
        }
    }
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
        }
    }
}