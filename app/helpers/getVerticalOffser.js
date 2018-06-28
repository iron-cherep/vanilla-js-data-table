/**
 * Получить смещение элементов по вертикали.
 *
 * @returns {number}
 */
const getVerticalOffset = (a, b) => {
  if (a instanceof HTMLElement && b instanceof HTMLElement) {
    const aTop = a.getBoundingClientRect().top;
    const bTop = b.getBoundingClientRect().top;
    return aTop - bTop;
  }

  throw new Error('Необходимо передать два элемента DOM!');
};

export default getVerticalOffset;
