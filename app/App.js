import Api from './api';

import Component from './components/Component';
import Table from './components/Table';
import SearchField from './components/SearchField';
import Alert from './components/Alert';

import DragAndDrop from './helpers/DragAndDrop';
import getColumns from './helpers/getColumns';
import sortTable from './helpers/sortTable';
import searchUsers from './helpers/searchUsers';
import moveArrayElement from './helpers/moveArrayElement';

class App extends Component {
  constructor(element) {
    super(element);

    if (!element) return;
    this.root = element;

    new Api().getData()
      .then(json => JSON.parse(json))
      .then((users) => {
        if (!users || !Array.isArray(users)) {
          this.setState({ alert: 'Пользователи не найдены, попробуйте перезагрузить страницу!' });
          return;
        }

        this.setState({
          users,
          unsortedUsers: users,
          columns: getColumns(users),
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ alert: 'Ошибка при получении данных, попробуйте перезагрузить страницу!' });
      });

    this.addHandlers();
    new DragAndDrop(this.root, this.handleDragEnd).init();
  }

  addHandlers() {
    this.root.addEventListener('click', this.handleSort);
    this.root.addEventListener('click', this.handleRemove);
    this.root.addEventListener('input', this.handleSearch);
  }

  handleComponentMount() {
    this.setFocus();
  }

  render() {
    const {
      users,
      columns,
      alert,
      search,
    } = this.state;

    this.root.innerHTML = `
      <div class="table-widget">
        ${SearchField({ search })}
        
        ${users && users.length > 0 ? `
          ${Table({ users, columns })}
        ` : ''}
        
        ${alert ? `
          ${Alert({ message: this.state.alert })}
        ` : ''}
      </div> 
    `;
  }

  handleDragEnd = ({ target, moved }) => {
    if (!target || !moved) return;

    const targetIndex = this.state.users.findIndex(user => user.name === target.dataset.user);
    const movedIndex = this.state.users.findIndex(user => user.name === moved.dataset.user);
    const usersWithChangedOrder = moveArrayElement(this.state.users, movedIndex, targetIndex);

    this.setState({
      unsortedUsers: usersWithChangedOrder,
      users: usersWithChangedOrder,
    });
  };

  setFocus = () => {
    const { focus } = this.state;
    if (!focus) return;

    const input = this.root.querySelector(focus);
    if (!input) return;

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
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
      const { unsortedUsers, search } = this.state;
      const unsortedUsersFilteredBySearch = searchUsers({ users: unsortedUsers, search });

      this.setState({
        users: unsortedUsersFilteredBySearch,
        columns: getColumns(this.state.unsortedUsers),
      });
    } else {
      this.setState({
        users: newTable,
        columns: getColumns(newTable, currentSort),
      });
    }
  };

  handleRemove = (e) => {
    const row = e.target.closest('.table__row[data-user]');
    if (!row || !e.ctrlKey) return;

    const { user } = row.dataset;
    if (!user) return;

    this.setState({
      users: this.state.users.filter(item => item.name !== user),
    });
  };

  handleSearch = (e) => {
    if (e.target.name !== 'search-field') {
      this.setState({ focus: null });
      return;
    }

    const { value } = e.target;
    const users = searchUsers({ users: this.state.unsortedUsers, search: value });

    this.setState({
      users,
      search: value,
      focus: '#search-field',
      alert: users.length === 0 ? 'Пользователи не найдены, попробуйте изменить запрос!' : null,
    });
  };
}

export default App;
