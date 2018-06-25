class Component {
  constructor() {
    this.state = {};
  }

  setState(object) {
    this.state = { ...this.state, ...object };
    this.render();
  }

  render() {}
}

export default Component;
