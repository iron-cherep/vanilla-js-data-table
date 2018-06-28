import {
  ASC,
  DESC,
  NONE,
  NUMBER,
  DATE,
} from '../constants';

/**
 * Сортирует значения таблицы пользователей и возвращает объект
 * из нового массива таблицы и применённого порядка сортировки.
 *
 * @param params
 * @returns {*}
 */
const sortTable = (params) => {
  const {
    table,
    field,
    sort,
    type,
  } = params;
  if (!table || !field || !sort || !type) throw new Error('Не указаны параметры для сортировки!');

  // eslint-disable-next-line no-nested-ternary
  const currentOrder = (sort === NONE) ? ASC : (sort === ASC) ? DESC : NONE;

  if (currentOrder === NONE) return false;

  const newTable = [...table];
  let first;
  let second;

  newTable.sort((a, b) => {
    switch (type) {
      case NUMBER:
        first = parseFloat(a[field]);
        second = parseFloat(b[field]);
        break;
      case DATE:
        first = new Date(a[field]);
        second = new Date(b[field]);
        break;
      default: {
        /** Сразу возвращаем значение для строк */
        const compare = a[field].toString().localeCompare(b[field].toString());
        if (currentOrder === ASC) return compare;
        return compare * -1;
      }
    }

    switch (currentOrder) {
      case DESC:
        return second - first;
      case ASC:
      default:
        return first - second;
    }
  });

  return { newTable, currentSort: { field, order: currentOrder } };
};

export default sortTable;
