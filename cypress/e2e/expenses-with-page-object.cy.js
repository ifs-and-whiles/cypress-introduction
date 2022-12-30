import { openPage } from "./page-objects";

describe('expense list tests', () => {
  it('can add new expense', () => {
    //given
    var expenseList = openPage();

    //when
    expenseList
      .clickAddNewExpenseButton()
      .fillForm('chleb', 10, '2020-01-01')
      .clickSaveButton();

    //then
    expenseList
      .assertExpensesCount(1)
      .assertExpenseExists(0, 'chleb', '10.00 zł', '01.01.2020');    
   })

  it('can edit expense', () => {
    //given
    var expenseList = openPage();

    expenseList
      .clickAddNewExpenseButton()
      .fillForm('chleb', 10, '2020-01-01')
      .clickSaveButton();

    //when
    expenseList
      .clickEditExpenseButton()
      .fillForm("nowy chleb", 15, '2020-01-02')
      .clickSaveButton();

    //then
    expenseList
      .assertExpensesCount(1)
      .assertExpenseExists(0, 'nowy chleb', '15.00 zł', '02.01.2020');   
  })

  it('can remove expense', () => {
    //given
    var expenseList = openPage();

    expenseList
      .clickAddNewExpenseButton()
      .fillForm('chleb', 10, '2020-01-01')
      .clickSaveButton();

    //when
    expenseList
      .clickRemoveExpenseButton();

    //then
    expenseList
      .assertExpensesCount(1);
  })

  it('can copy expense', () => {
    //given
    var expenseList = openPage();

    expenseList
      .clickAddNewExpenseButton()
      .fillForm('chleb', 10, '2020-01-01')
      .clickSaveButton();

    //when
    expenseList
      .clickCopyExpenseButton();

    //then
    expenseList
      .assertExpensesCount(2)
      .assertExpenseExists(0, 'chleb', '10.00 zł', '01.01.2020')
      .assertExpenseExists(1, 'chleb', '10.00 zł', '01.01.2020');
  })

  it('can calculate sum', () => {
    //given
    var expenseList = openPage();
    
    //when
    expenseList
      .clickAddNewExpenseButton()
      .fillForm('chleb', 10, '2020-01-01')
      .clickSaveButton();

    expenseList
      .clickAddNewExpenseButton()
      .fillForm('masło', 8.99, '2020-01-01')
      .clickSaveButton();

    expenseList
      .clickAddNewExpenseButton()
      .fillForm('coś innego', 100, '2020-01-01')
      .clickSaveButton();

    //then
    expenseList
      .assertExpenseSum('118.99 zł');
  })
})