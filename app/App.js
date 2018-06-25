import Api from './api';
import Component from './components/Component';
import Table from './components/Table';
import SearchField from './components/SearchField';

class App extends Component {
  constructor(element) {
    super();

    if (!element) return;

    this.root = element;

    this.getData()
      .then(json => JSON.parse(json))
      .then(data => this.setState({ users: data }))
      .catch(console.error);
  }

  getData() {
    const api = new Api();
    return api.getData();
  }

  render() {
    const { users } = this.state;
    const columns = ['пользователь', 'рейтинг', 'постов', 'комментов', 'зарегистрировался', ''];

    this.root.innerHTML = `
      <div class="table-widget">
        ${SearchField()}
        ${Table({ users, columns })}
      </div> 
    `;
  }
}

export default App;
