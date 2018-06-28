import Api from './api';

import Component from './components/Component';
import SearchField from './components/SearchField';
import Table from './components/Table';
import Alert from './components/Alert';

import DragAndDrop from './methods/DragAndDrop';
import getColumns from './methods/getColumns';
import sortTable from './methods/sortTable';
import searchUsers from './methods/searchUsers';

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

  /**
   * Перемещает заданный элемент на заданную позицию.
   * Callback-функция для drag-and-drop.
   *
   * @param target - элемент для замены
   * @param moved - перемещаемый элемент
   */
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

  /**
   * Устанавливает фокус на сохранённом в состоянии элементе после перерисовки компонента.
   */
  setFocus = () => {
    const { focus } = this.state;
    if (!focus) return;

    const input = this.root.querySelector(focus);
    if (!input) return;

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  };

  /**
   * Обрабатывает клики по заголовкам колонок и сортирует элементы в заданном порядке.
   * Порядок следования направлений сортировки: ASC => DESC => NONE.
   *
   * @param e
   */
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

  /**
   * Удаляет пользователя из таблицы по клику с нажатым Ctrl
   *
   * @param e
   */
  handleRemove = (e) => {
    const row = e.target.closest('.table__row[data-user]');
    if (!row || !e.ctrlKey) return;

    const { user } = row.dataset;
    if (!user) return;

    const filteredUsers = this.state.users.filter(item => item.name !== user);
    const filteredUnsortedUsers = this.state.unsortedUsers.filter(item => item.name !== user);

    this.setState({
      unsortedUsers: filteredUnsortedUsers,
      users: filteredUsers,
      alert: filteredUsers.length === 0 ? 'Пользователи не найдены, попробуйте перезагрузить страницу!' : null,
    });
  };

  /**
   * Осуществляет поиск/фильтрацию таблицы, обновляя параметры поиска
   * динамически во время заполнения поля пользователем.
   *
   * @param e
   */
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
