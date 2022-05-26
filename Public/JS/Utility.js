export const insertElement = (position, container, element) => {
  if (container) {
    container.insertAdjacentElement(position, element);
  }
};

export const replaceClassName = (element, classReplaced, replacementClass) => {
  element.classList.remove(classReplaced);
  element.classList.add(replacementClass);
};

export const _capitalize = (string) => {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};
