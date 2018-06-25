const TableHeader = columns => `
  <thead class="table__header">
    <tr class="table__row">  
      ${columns.map(column => `
        <td class="table__cell">${column}</td>
      `).join('')}
    </tr>
  </thead>
`;

export default TableHeader;
