// BUDGET CONTROLLER
var budgetController = (function() {

  // Some code

})();

// UI CONTROLLER
var UIController = (function() {

  // Some code

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

  var cntrlAddItem = function() {

    // 1. get input data
    // 2. Add the item to the budget controller
    // 3. Add the new item to the UI
    // 4. Calculate the budget
    // 5. Display the budget
    console.log('it works');

  }

  document.querySelector('.add__btn').addEventListener('click', cntrlAddItem);

  document.addEventListener('keypress', function(event) {

    if (event.code === "Enter") {
      cntrlAddItem();
    }

  });

})(budgetController, UIController);
