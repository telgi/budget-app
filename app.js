// BUDGET CONTROLLER
var budgetController = (function() {

  // Some code

})();

// UI CONTROLLER
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn'
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };

})();

// GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl) {

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputButton).addEventListener('click', cntrlAddItem);

    document.addEventListener('keypress', function(event) {

      if (event.code === "Enter") {
        cntrlAddItem();
      }

    });
  };

  var cntrlAddItem = function() {

    // 1. get input data
    var input = UICtrl.getInput();
    console.log(input);

    // 2. Add the item to the budget controller
    // 3. Add the new item to the UI
    // 4. Calculate the budget
    // 5. Display the budget

  };

  return {
    init: function() {
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();
