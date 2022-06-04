import * as Creation from '../Budget-Creation/Budget-Creation';

const getSinglePercentageSpent = (spent, total) => {
  let percentage = (spent / total).toFixed(2);
  if (isNaN(percentage)) percentage = (0.0).toFixed(2);
  return percentage;
};

const getOverallPercentageSpent = (total, part) => {
  let percent = (part / total).toFixed(2);
  if (percent === NaN) percent = 0;
  return percent;
};

const getOverallSpent = (subCategories, overall) => {
  let arrayOfTotals = [];
  subCategories.forEach((sc, i) => {
    let subCategoryTotal = Number(sc.firstChild.nextSibling.nextSibling.firstChild.textContent);
    sc.firstChild.nextSibling.nextSibling.firstChild.textContent === `$${sc.firstChild.nextSibling.nextSibling.firstChild.textContent.split('$')[1]}`
      ? (subCategoryTotal = Number(sc.firstChild.nextSibling.nextSibling.firstChild.textContent.split('$')[1]))
      : (subCategoryTotal = 0);
    arrayOfTotals.push(subCategoryTotal);
  });
  let initialValue = 0;
  overall = arrayOfTotals.reduce((previous, current) => Number(previous) + Number(current), initialValue);
  return overall;
};

const getOverallBudget = (subCategories, overall) => {
  let arrayOfTotals = [];
  subCategories.forEach((sc, i) => {
    const subCategoryTotal = sc.firstChild.nextSibling.nextSibling.firstChild.value;
    arrayOfTotals.push(subCategoryTotal);
  });
  let initialValue = 0;
  overall = arrayOfTotals.reduce((previous, current) => Number(previous) + Number(current), initialValue);
  return overall;
};

const getSubCategoryTiming = (budget, category) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let wording;
  if (category.timingOptions.paymentCycle === `Weekly`) {
    let day = days[new Date(`${category.timingOptions.dueDates[0]}`).getDay()];
    wording = `Due every ${day} of the month.`;
    return wording;
  }
  if (category.timingOptions.paymentCycle === `Bi-Weekly`) {
    let date = new Date(`${category.timingOptions.dueDates[0]}`);
    let day = date.getDate();
    let endDigit = Number(date.getDate().toString().split('')[date.getDate().toString().length - 1]);
    let dayEnding;
    dayEnding = Creation.calculateDayEnding(endDigit, dayEnding, date);
    wording = `Due ${days[date.getDay()]}, the ${day}${dayEnding} of ${months[date.getMonth()]}.`;
    return wording;
  }
  if (category.timingOptions.paymentCycle === `Bi-Monthly`) {
    let dayOne, dayTwo, dayEnding, dayEndingTwo;
    category.timingOptions.dueDates[0].forEach((dd, i) => {
      if (i === 0) {
        dayOne = new Date(`${dd}`);
      }
      if (i === 1) {
        dayTwo = new Date(`${dd}`);
      }
    });
    let endDigit = Number(dayOne.getDate().toString().split('')[dayOne.getDate().toString().length - 1]);
    let endDigitTwo = Number(dayTwo.getDate().toString().split('')[dayTwo.getDate().toString().length - 1]);
    dayEnding = Creation.calculateDayEnding(endDigit, dayEnding, dayOne.getDate());
    dayEndingTwo = Creation.calculateDayEnding(endDigit, dayEndingTwo, dayTwo.getDate());
    wording = `Due the ${dayOne.getDate()}${dayEnding} & ${dayTwo.getDate()}${dayEndingTwo}, of ${months[dayOne.getMonth()]}`;
    return wording;
  }
  if (category.timingOptions.paymentCycle === `Monthly`) {
    let date = new Date(`${category.timingOptions.dueDates[0]}`);
    let day = date.getDate();
    let endDigit = Number(date.getDate().toString().split('')[date.getDate().toString().length - 1]);
    let dayEnding;
    dayEnding = Creation.calculateDayEnding(endDigit, dayEnding, date);
    wording = `Due ${days[date.getDay()]}, the ${day}${dayEnding} of ${months[date.getMonth()]}.`;
    return wording;
  }
};

export const _watchEditCategoryGoals = (budget, placeholderBudget, user, utility) => {
  const editCategoryGoalsContainer = document.querySelectorAll('.container--large')[0];
  if (editCategoryGoalsContainer) {
    const subCategories = document.querySelectorAll('.sub-category-display__sub-category');
    const timingFunctionContainer = document.querySelector('.timing-container');
    const editCategoryGoalsSubmit = document.querySelector('.button--large__thin');
    // On load, retrieve the proper timings and dates for the correct sub-categories.

    const mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');
    let allCategories = [];
    placeholderBudget.mainCategories.forEach((mct, i) => {
      budget.mainCategories[i].subCategories.forEach((sc, i) => {
        allCategories.push(sc);
      });
    });

    allCategories.forEach((c, i) => {
      if (c.timingOptions.paymentCycle) {
        let timing = getSubCategoryTiming(budget, c);
        if (subCategories[i]) {
          if (subCategories[i].firstChild.nextSibling.firstChild.nextSibling) subCategories[i].firstChild.nextSibling.firstChild.nextSibling.textContent = timing;
        }
      }
    });

    Creation.setupTimingFunctionContainer(timingFunctionContainer);
    let clickedItem, selectedTiming;
    let subCategoryIndex = 0;
    Creation.watchForSettingTiming(placeholderBudget, subCategoryIndex, clickedItem, selectedTiming, `Full Budget`);

    const individualPayments = document.querySelectorAll('.individual-payment');
    const overallBudget = document.querySelectorAll('.budget-single-goal-summary__amount');
    individualPayments.forEach((ip, i) => {
      let overallSpent = overallBudget[1];
      let overallRemaining = overallBudget[2];
      let overallPercentageSpent = overallBudget[3];
      let total = getOverallBudget(subCategories, overallBudget[0]);
      let part = getOverallSpent(subCategories, overallSpent);
      if (total - part < 0) {
        overallRemaining.classList.add('negative');
        overallRemaining.classList.remove('positive');
      }
      if (total - part === 0) {
        overallRemaining.classList.remove('positive');
        overallRemaining.classList.remove('negative');
      }
      if (total - part > 0) {
        overallRemaining.classList.add('positive');
        overallRemaining.classList.remove('negative');
      }
      let remainingValue = ip.closest('section').nextSibling.nextSibling.firstChild;
      if (Number(remainingValue.textContent.split('$')[1]) > 0) {
        remainingValue.classList.add('positive');
        remainingValue.classList.remove('negative');
      }
      if (Number(remainingValue.textContent.split('$')[1]) === 0) {
        remainingValue.classList.remove('positive');
        remainingValue.classList.remove('negative');
      }
      if (Number(remainingValue.textContent.split('$')[1]) < 0) {
        remainingValue.classList.remove('positive');
        remainingValue.classList.add('negative');
      }
      ip.addEventListener('keyup', (e) => {
        e.preventDefault();
        let spent = ip.closest('section').nextSibling.firstChild;
        let remaining = ip.closest('section').nextSibling.nextSibling.firstChild;
        let percentageSpent = ip.closest('section').nextSibling.nextSibling.nextSibling.firstChild;
        let total = getOverallBudget(subCategories, overallBudget[0]);
        let part = getOverallSpent(subCategories, overallSpent);
        let percentage = getOverallPercentageSpent(total, part);
        overallBudget[0].textContent = utility.money.format(getOverallBudget(subCategories, overallBudget[0]));
        overallSpent.textContent = utility.money.format(part);
        overallRemaining.textContent = utility.money.format(total - part);
        overallPercentageSpent.textContent = `${percentage}%`;
        spent.textContent = utility.money.format(spent.textContent.split('$')[1]);
        remaining.textContent = utility.money.format(ip.value - Number(spent.textContent.split('$')[1]));
        if (total - part < 0) {
          overallRemaining.classList.add('negative');
          overallRemaining.classList.remove('positive');
        }
        if (total - part === 0) {
          overallRemaining.classList.remove('positive');
          overallRemaining.classList.remove('negative');
        }
        if (total - part > 0) {
          overallRemaining.classList.add('positive');
          overallRemaining.classList.remove('negative');
        }
        if (!Number(remaining.textContent.startsWith('-'))) {
          remaining.classList.add('positive');
          remaining.classList.remove('negative');
        }
        if (Number(remaining.textContent.split('$')[1]) === 0) {
          remaining.classList.remove('positive');
          remaining.classList.remove('negative');
        }
        if (Number(remaining.textContent.startsWith('-'))) {
          remaining.classList.remove('positive');
          remaining.classList.add('negative');
        }
        percentageSpent.textContent = `${getSinglePercentageSpent(Number(spent.textContent.split('$')[1]), ip.value)}%`;
      });
      ip.addEventListener('blur', (e) => {
        e.preventDefault();
        ip.value = Number(ip.value).toFixed(2);
      });
    });
    if (editCategoryGoalsSubmit) {
      editCategoryGoalsSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        let updateObject = {};
        updateObject.budgetId = budget._id;
        updateObject.userId = user._id;
        updateObject.mainCategories = [];
        const mainCategoryTitles = document.querySelectorAll('.main-category-display__category-display__title');

        let mainCategoryIndex = 0;
        let subCategoryIndex = 0;

        let emptyArray = [];
        let temporaryObject;

        budget.mainCategories.forEach((bmc, i) => {
          temporaryObject = Object.fromEntries([
            [`title`, placeholderBudget.mainCategories[i].title],
            [`icon`, placeholderBudget.mainCategories[i].icon],
            [`subCategories`, emptyArray],
          ]);
          updateObject.mainCategories[i] = temporaryObject;

          let tempArray = Array.from(document.querySelectorAll(`.sub-category-display__sub-category[data-subcategory="${i}"]`));
          let mainCategoryIndex = i;
          tempArray.forEach((temp, i) => {
            let title = temp.firstChild.nextSibling.firstChild.textContent;
            let goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
            let amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
            let timingOptions = bmc.subCategories[i].timingOptions;
            let createdAt = bmc.subCategories[i].createdAt;

            if (!bmc.subCategories[i].createdAt) {
              createdAt = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));
            }

            let lastUpdated = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));

            temporaryObject.subCategories.push(
              Object.fromEntries([
                [`title`, title],
                [`createdAt`, createdAt],
                [`lastUpdated`, lastUpdated],
                [`goalAmount`, goalAmount],
                [`amountSpent`, amountSpent],
                [`amountRemaining`, amountRemaining],
                [`percentageSpent`, percentageSpent],
                [`timingOptions`, timingOptions],
              ])
            );

            if (temporaryObject.subCategories.length === tempArray.length) {
              mainCategoryIndex++;
              if (temporaryObject === undefined) return;
              temporaryObject.subCategories = [];
              return mainCategoryIndex;
            }
            if (i === tempArray.length) {
              mainCategoryIndex++;
            }
          });

          if (updateObject.mainCategories.length === budget.mainCategories.length) {
            return (mainCategoryIndex = 0);
          }
        });

        updateObject.mainCategories.forEach((mc, i) => {
          let mainCategoryIndex = i;
          let tempArray = Array.from(document.querySelectorAll(`.sub-category-display__sub-category[data-subcategory="${i}"]`));
          tempArray.forEach((temp, i) => {
            let title = temp.firstChild.nextSibling.firstChild.textContent;
            let goalAmount = Number(temp.firstChild.nextSibling.nextSibling.firstChild.value);
            let amountSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let amountRemaining = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('$')[1]);
            let percentageSpent = Number(temp.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent.split('%')[0]);
            let timingOptions = budget.mainCategories[mainCategoryIndex].subCategories[i].timingOptions;
            let createdAt = budget.mainCategories[mainCategoryIndex].subCategories[i].createdAt;

            if (!budget.mainCategories[mainCategoryIndex].subCategories[i].createdAt) {
              createdAt = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));
            }

            let lastUpdated = new Date(new Date().setHours(new Date().getHours() + new Date().getTimezoneOffset() / 60));

            updateObject.mainCategories[mainCategoryIndex].subCategories.push(
              Object.fromEntries([
                [`title`, title],
                [`createdAt`, createdAt],
                [`lastUpdated`, lastUpdated],
                [`goalAmount`, goalAmount],
                [`amountSpent`, amountSpent],
                [`amountRemaining`, amountRemaining],
                [`percentageSpent`, percentageSpent],
                [`timingOptions`, timingOptions],
              ])
            );
            if (updateObject.mainCategories[mainCategoryIndex].subCategories.length === tempArray.length) {
              mainCategoryIndex++;
              if (updateObject.mainCategories[mainCategoryIndex] === undefined) return;
              updateObject.mainCategories[mainCategoryIndex].subCategories = [];
              return mainCategoryIndex;
            }
            if (i === tempArray.length) {
              mainCategoryIndex++;
            }
          });
        });

        placeholderBudget._updateBudget(
          {
            budgetId: budget._id,
            budgetMainCategories: budget.mainCategories,
            userId: user._id,
            user: user,
            updateObject: updateObject,
          },
          `Edit-Category-Goals`
        );
      });
    }
  }
};
