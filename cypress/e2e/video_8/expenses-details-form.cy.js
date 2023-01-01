import { openPage } from "./page-objects";

describe('expense details form tests', () => {
  it('adding expense can be canceled', () => {
    //given
    var expenseList = openPage();

    var expenseForm = expenseList
      .clickAddNewExpenseButton();

    //when
    expenseForm
      .clickCancelButton();

    //then
    expenseList
      .assertExpenseDetailsFormIsNotVisible();
  });

  it('when form is empty then save button is disabled', () => {
     //given
     var expenseList = openPage();
 
     //when
     var expenseForm = expenseList
      .clickAddNewExpenseButton();
 
     //then
     expenseForm
      .assertSaveButtonIsDisabled();
  });

  it('when form is filled with correct values then save button is enabled', () => {
    //given
    var expenseList = openPage();

    //when
    var expenseForm = expenseList
     .clickAddNewExpenseButton()
     .fillForm('chleb', 10, '2020-01-01');

    //then
    expenseForm
     .assertSaveButtonIsEnabled();
  });

  it('when amount is invalid then save button is disabled', () => {
    //given
    var expenseList = openPage();

    //when
    var expenseForm = expenseList
     .clickAddNewExpenseButton()
     .fillForm('chleb', 'invalid value', '2020-01-01');

    //then
    expenseForm
     .assertSaveButtonIsDisabled();
  });

  it('when date is invalid then save button is disabled', () => {
    //given
    var expenseList = openPage();

    //when
    var expenseForm = expenseList
     .clickAddNewExpenseButton()
     .fillForm('chleb', 10, 'invalid date');

    //then
    expenseForm
     .assertSaveButtonIsDisabled();
  });
})