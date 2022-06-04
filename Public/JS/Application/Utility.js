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
