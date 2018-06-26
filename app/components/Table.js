import TableHeader from './TableHeader';
import formatDate from '../helpers/formatDate';

const Table = (props) => {
  const { users, columns } = props;

  return `
    <table class="table">
      ${TableHeader(columns)}
      
      <tbody class="table__body">
        ${users.map(user => `
          <tr class="table__row">
            <td class="table__cell">
              <img class="avatar" src="${user.avatar}" alt="${user.name}">
              <span class="table__name">${user.name}</span>
            </td>
            <td class="table__cell">${user.rating}</td>
            <td class="table__cell">${user.stories}</td>
            <td class="table__cell">${user.comments}</td>
            <td class="table__cell">${formatDate(user.date)}</td>
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
