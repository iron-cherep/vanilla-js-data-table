import {
  NUMBER,
  STRING,
  DATE,
  NONE,
} from './constants';

/**
 * Список полей для формирования колонок
 */
const allowedColumns = [
  {
    field: 'name',
    caption: 'пользователь',
    type: STRING,
  },
  {
    field: 'rating',
    caption: 'рейтинг',
    type: NUMBER,
  },
  {
    field: 'stories',
    caption: 'постов',
    type: NUMBER,
  },
  {
    field: 'comments',
    caption: 'комментов',
    type: NUMBER,
  },
  {
    field: 'date',
    caption: 'зарегистрировался',
    type: DATE,
  },
];

/**
 * Сформировать массив колонок для таблицы из полей объекта пользователя
 *
 * @param users
 * @param currentSort
 * @returns {*}
 */
const getColumns = (users, currentSort) => {
  if (!Array.isArray(users)) return [];

  const objectShape = users[0];
  const columns = [];
  let sort;

  Object.keys(objectShape).forEach((field) => {
    allowedColumns.forEach((column) => {
      if (field === column.field) {
        sort = NONE;
        if (currentSort && currentSort.field === field) sort = currentSort.order;

        columns.push({
          caption: column.caption,
          field: column.field,
          type: column.type,
          sort,
        });
      }
    });
  });

  /** Последняя пустая колонка */
  columns.push('');

  return columns;
};

export default getColumns;
