import escapeRegExp from '../helpers/escapeRegExp';

/**
 * Формирует регулярное выражение для поиска на основе пользовательского ввода.
 *
 * @param input
 * @returns {RegExp}
 */
const userInputToRegExp = (input) => {
  const escapedQueryArray = input.trim().split(' ').map(string => escapeRegExp(string.trim()).replace('\\*', '.*'));
  const joinedQuery = escapedQueryArray.join('.*|');

  return new RegExp(`^(${joinedQuery}.*)`, 'gim');
};

/**
 * Фильтрует список пользователей по имени.
 *
 * @param params
 * @returns {*}
 */
const searchUsers = (params) => {
  const { users, search } = params;
  if (!search || search === '') return users;

  const regexp = userInputToRegExp(search);

  return users.filter(user => user.name.toString().search(regexp) !== -1);
};

export default searchUsers;
