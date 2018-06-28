/**
 * Перемещает элемента массива с указанной позиции на заданную
 *
 * @param arr
 * @param from
 * @param to
 * @returns [] - возвращает новый массив
 */
const moveArrayElement = (arr, from, to) => {
  const array = [...arr];
  let fromIndex = from;
  let toIndex = to;

  while (fromIndex < 0) {
    fromIndex += array.length;
  }
  while (to < 0) {
    toIndex += array.length;
  }
  if (to >= array.length) {
    let k = toIndex - array.length;
    while ((k--) + 1) {
      array.push(undefined);
    }
  }
  array.splice(to, 0, array.splice(from, 1)[0]);
  return array;
};

export default moveArrayElement;
