// BUDGET CONTROLLER
var budgetController = (function() {

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(current) {
      sum = sum + current.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: function(type, desc, val) {
      var newItem, ID;
      // create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // create new item based on 'inc' or 'exp' type
      if (type === 'exp') {
        newItem = new Expense(ID, desc, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, desc, val);
      }
      // push it into data structure
      data.allItems[type].push(newItem);
      // return the new element
      return newItem;
    },

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // calculate budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calculate the percentage of income we spent
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    }
  };

})();

// UI CONTROLLER
var UIController = (function() {

  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  }

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      }
    },

    addListItem: function(obj, type) {
      var html, newHTML;
      // create HTML string with placeholder test
      if (type === 'inc') {
        element = DOMstrings.incomeContainer;
        html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expensesContainer;
        html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // replace the placeholder text
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: function() {
      var fields, fieldsArray;

      fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function(current, index, array) {
        current.value = '';
      });

      fieldsArray[0].focus();
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

  var updateBudget = function() {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    
    // 3. Display the budget
  };

  var cntrlAddItem = function() {
    var input, newItem;
    // 1. get input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add the new item to the UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the fields
      UICtrl.clearFields();
      // 5. Calculate and update budget
      updateBudget();
    }
  };

  return {
    init: function() {
      setupEventListeners();
    }
  };

})(budgetController, UIController);

controller.init();
