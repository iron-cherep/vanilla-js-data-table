import Api from './api';
import Component from './components/Component';
import Table from './components/Table';
import SearchField from './components/SearchField';
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
        this.setState({
          unsortedUsers: data,
          users: data,
          columns: getColumns(data),
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
    console.log(e);
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
        ${SearchField()}
        ${Table({ users, columns })}
      </div> 
    `;
  }
}

export default App;
