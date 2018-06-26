import { NONE } from '../helpers/constants';

const TableHeader = (columns) => {
  const sortedColumnIndex = columns.reduce((savedIndex, column, currentIndex) => (
    column.sort && column.sort !== NONE ? currentIndex : savedIndex
  ), false);

  return `
    <thead 
      class="table__header" 
      ${sortedColumnIndex !== false ? `data-sorted-column=${sortedColumnIndex}` : ''}
    >
      <tr class="table__row">  
        ${columns.map(column => `
          <td 
            class="table__cell"                        
            ${column.type ? `data-type="${column.type}"` : ''}
            ${column.field ? `
                data-field="${column.field}"
                data-sort="${column.sort ? column.sort : NONE}"
              ` : ''}        
          >
            ${column.caption || ''}
          </td>
        `).join('')}
      </tr>
    </thead>
  `;
};


export default TableHeader;
