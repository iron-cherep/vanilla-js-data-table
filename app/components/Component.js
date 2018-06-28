/**
 * Примитивная реализация класса компонента с полной перерисовкой
 * контента при обновлении состояния.
 */
class Component {
  /**
   * Инициализирует компонент и создаёт MutationObserver для отслеживания
   * события включения отрендеренного элемента в DOM.
   *
   * @param element
   */
  constructor(element) {
    this.state = {};
    this.root = element;
    this.observer = new MutationObserver(this.handleDOMMutation);
    this.observer.observe(this.root, { childList: true });
  }

  /**
   * Сливает состояние с полученным объектом и начинает перерисовку компонента.
   *
   * @param newState
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  /**
   * Получает события MutationObserver'а и вызывает обработчик, если
   * в DOM включены новые элементы (т.е. когда компонент обновился и отрисован).
   *
   * @param mutations
   */
  handleDOMMutation = (mutations) => {
    const { addedNodes } = mutations[0];
    if (!addedNodes) return;
    if ([].filter.call(addedNodes, node => node.nodeType === 1).length < 0) return;

    this.handleComponentMount();
  };

  /**
   * Вызывается при завершения перерисовки компонента.
   */
  handleComponentMount() {}

  /**
   * Инициализирует рендеринг компонента.
   */
  render() {}
}

export default Component;
