const format = string => (`${string}`.length < 2 ? `0${string}` : `${string}`);

/**
 * Форматирует дату из возвращаемого api формата в требуемый для таблицы
 *
 * @param isoDate
 * @returns {string}
 */
const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  return format(date.getHours()) + ':'
       + format(date.getMinutes()) + ' '
       + format(date.getDate()) + '.'
       + format(date.getMonth() + 1) + '.'
       + date.getFullYear();
};

export default formatDate;
