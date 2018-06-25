import request from './request';

class Api {
  constructor() {
    this.endpoint = 'https://pikabu.ru/page/interview/frontend/users.php';
    this.headers = { 'X-CSRF-Token': 'interview' };
  }

  getData() {
    return request({
      method: 'GET',
      url: this.endpoint,
      headers: this.headers,
    });
  }
}

export default Api;
