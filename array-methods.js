'use strict';
var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/

var hundredThousandairs = dataset.bankBalances.filter(function (element) {
  return parseInt(element.amount) > 100000;
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object

var sumOfBankBalances = dataset.bankBalances.reduce(function (total, element) {
  return Math.floor(parseInt(total) + parseInt(element.amount));
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */
var selectedStates = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
var sumOfInterests = dataset.bankBalances.filter(function (element) {
  return selectedStates.indexOf(element.state) !== -1;
}).reduce(function (total, element) {
  return Math.round(parseInt(total) + parseInt(element.amount) * .189);
}, 0);


/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

var stateSums = dataset.bankBalances.reduce(function (previousS, currentS) {
  let key = currentS.state;
  let amount = currentS.amount;

  if (previousS[key]) {
    previousS[key] += parseInt(amount);
  } else {
    previousS[key] = parseInt(amount);
  }
  return previousS;
}, {});

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

let statesVar = Object.entries(stateSums);

var sumOfHighInterests = statesVar.filter(function (element) {
  return selectedStates.indexOf(element[0]) === -1;
})
  .map(function (element) {
    return parseInt(Math.round((element[1] * .189)));
  })
  .reduce(function (total, value) {
    return total + value;
  }, 0);


/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = statesVar.filter(function (element) {
  if (element[1] < 1000000) {
    return element[0];
  }
})
  .reduce(function (acc, curr) {
    acc.push(curr[0]);
    return acc;
  }, []);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = statesVar.filter(function (element) {
  return element[1] > 1000000;
})
  .reduce(function (prev, current) {
    return prev + current[1];
  }, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = statesVar.filter(function (element) {
  return selectedStates.indexOf(element[0]) !== -1;
}).every(function (element) {
  return parseInt(element[1]) > 2550000;
});

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = statesVar.filter(function (element) {
  return selectedStates.indexOf(element[0]) !== -1;
}).some(function (element) {
  return parseInt(element[1]) > 2550000;
});

module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
