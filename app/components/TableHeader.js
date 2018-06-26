import { NONE } from '../helpers/constants';
import esc from '../helpers/escape';

const TableHeader = (columns) => {
  const sortedColumnIndex = columns.reduce((savedIndex, column, currentIndex) => (
    column.sort && column.sort !== NONE ? currentIndex : savedIndex
  ), false);

  return `
    <thead 
      class="table__header" 
      ${sortedColumnIndex !== false ? `data-sorted-column=${esc(sortedColumnIndex)}` : ''}
    >
      <tr class="table__row">  
        ${columns.map(column => `
          <td 
            class="table__cell"                        
            ${column.type ? `data-type="${esc(column.type)}"` : ''}
            ${column.field ? `
                data-field="${esc(column.field)}"
                data-sort="${column.sort ? esc(column.sort) : NONE}"
              ` : ''}        
          >
            ${esc(column.caption) || ''}
          </td>
        `).join('')}
      </tr>
    </thead>
  `;
};


export default TableHeader;
