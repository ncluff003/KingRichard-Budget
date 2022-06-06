export const buildObject = (entriesArray) => {
  return Object.fromEntries(entriesArray);
};

export const insertElement = (position, container, element) => {
  if (container) {
    container.insertAdjacentElement(position, element);
  }
};

export const pushIntoArray = (arrayFiller, array) => {
  arrayFiller.forEach((af) => {
    array.push(af);
  });
  return array;
};

export const toggleClass = (element, className) => {
  return element.classList.toggle(className);
};

export const showElement = (element) => {
  element.classList.toggle('closed');
  element.classList.toggle('open');
};

export const replaceClassName = (element, classReplaced, replacementClass) => {
  element.classList.remove(classReplaced);
  element.classList.add(replacementClass);
};

export const _capitalize = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

export const reloadPage = () => {
  setTimeout(() => {
    window.location.reload();
  }, 2000);
};

export const createAndRenderError = (checkElement, relativeElement, position, createdElement, createdElementClassNameOne, createdElementClassNameTwo, errorMessage, timeLimit) => {
  let elementCreated = document.createElement(createdElement);
  elementCreated.classList.add(createdElementClassNameOne);
  elementCreated.classList.add(createdElementClassNameTwo);
  console.log(checkElement.classList);
  let splitMessage = errorMessage.split('. ');
  if (splitMessage.includes(`Every Transaction Must Have A Date`) || splitMessage.includes(`Every Transaction Happened Somewhere`)) {
    let addedElement;
    splitMessage.forEach((text, i) => {
      if (i === 0) {
        addedElement = document.createElement('header');
        addedElement.classList.add(`error-header`);
        addedElement.classList.add(`r__error-header`);
        addedElement.textContent = text;
      }
      if (i > 0) {
        addedElement = document.createElement('p');
        addedElement.classList.add(`error-text`);
        addedElement.classList.add(`r__error-text`);
        addedElement.textContent = text;
      }
      console.log(addedElement);
      insertElement(`beforeend`, elementCreated, addedElement);
    });
  }
  if (relativeElement) {
    insertElement(position, relativeElement, elementCreated);
    setTimeout(() => {
      elementCreated.textContent = '';
    }, timeLimit / 1.125);
    setTimeout(() => {
      elementCreated.remove();
    }, timeLimit);
  }
};

export const showError = (element, errorMessage, elementText, className, timeLimit) => {
  element.textContent = errorMessage;
  element.classList.add(className);
  setTimeout(() => {
    element.textContent = elementText;
    element.classList.remove(className);
    reloadPage();
  }, timeLimit);
};

export const renderError = (element, errorMessage, elementText, className, timeLimit) => {
  element.textContent = errorMessage;
  element.classList.add(className);
  let elementWidth = element.style.width;
  let elementTransform = element.style.transform;
  let elementFontSize = element.style.fontSize;

  element.style.width = `max-content`;
  if (
    element.textContent ===
    `Passwords must contain at least 8 characters, amongst them being at least 1 capital letter, 1 lower case letter, 1 number, & 1 special symbol.  The special symbols may be the following: !, @, $, &, -, _, and &.`
  ) {
    element.style.transform = `translate(-40rem, -7rem)`;
    element.style.fontSize = `1.2rem`;
  }
  setTimeout(() => {
    element.textContent = elementText;
    element.classList.remove(className);
    element.style.width = `${elementWidth}`;
    if (elementText === `New Password` || elementText === `Confirm New Password`) {
      element.style.transform = elementTransform;
      element.style.fontSize = elementFontSize;
    }
  }, timeLimit);
};
