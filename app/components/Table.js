import TableHeader from './TableHeader';
import formatDate from '../helpers/formatDate';
import esc from '../helpers/escape';

const Table = (props) => {
  const { users, columns } = props;

  return `
    <table class="table">
      ${TableHeader(columns)}
      
      <tbody class="table__body">
        ${users.map(user => `
          <tr class="table__row" data-user="${esc(user.name)}">
            <td class="table__cell">
              <img class="avatar" src="${esc(user.avatar)}" alt="${user.name}">
              <span class="table__name">${esc(user.name)}</span>
            </td>
            <td class="table__cell">${esc(user.rating)}</td>
            <td class="table__cell">${esc(user.stories)}</td>
            <td class="table__cell">${esc(user.comments)}</td>
            <td class="table__cell">${esc(formatDate(user.date))}</td>
            <td class="table__cell">
              <span class="drag-button">Переместить в списке</span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
};

export default Table;
