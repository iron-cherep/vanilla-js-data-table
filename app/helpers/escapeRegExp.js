/**
 * Экранирует специальные символы в строке для формирования регулярного выражения
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 * @param string
 * @returns string
 */
const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default escapeRegExp;
