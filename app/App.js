import Api from './api';
import Component from './components/Component';
import Table from './components/Table';
import SearchField from './components/SearchField';
import Alert from './components/Alert';
import getColumns from './helpers/getColumns';
import sortTable from './helpers/sortTable';

class App extends Component {
  constructor(element) {
    super();

    if (!element) return;

    this.root = element;

    new Api().getData()
      .then(json => JSON.parse(json))
      .then((data) => {
        let users = data;
        if (!Array.isArray(users)) users = [];

        this.setState({
          unsortedUsers: users,
          users,
          columns: getColumns(users),
        });
      })
      .catch(console.error);

    this.addHandlers();
  }

  addHandlers() {
    this.root.addEventListener('click', this.handleSort);
    this.root.addEventListener('click', this.handleRemove);
  }

  handleRemove = (e) => {
    const row = e.target.closest('.table__row[data-user]');
    if (!row || !e.ctrlKey) return;

    const { user } = row.dataset;
    if (!user) return;

    this.setState({
      users: this.state.users.filter(item => item.name !== user),
    });
  };

  handleSort = (e) => {
    const { field, sort, type } = e.target.dataset;
    if (!field || !sort || !type) return;

    const { newTable, currentSort } = sortTable({
      table: this.state.users,
      field,
      sort,
      type,
    });

    if (!newTable) {
      this.setState({
        users: this.state.unsortedUsers,
        columns: getColumns(this.state.unsortedUsers),
      });
    } else {
      this.setState({
        users: newTable,
        columns: getColumns(newTable, currentSort),
      });
    }
  };

  render() {
    const { users, columns } = this.state;

    this.root.innerHTML = `
      <div class="table-widget">
        ${users && users.length > 0 ? `
          ${SearchField()}
          ${Table({ users, columns })}  
        ` : `
          ${Alert({ message: 'К сожалению, пользователи не найдены, попробуйте перезагрузить страницу!' })}
        `}
      </div> 
    `;
  }
}

export default App;
