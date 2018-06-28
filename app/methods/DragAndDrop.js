class DragAndDrop {
  constructor(element, callback) {
    this.container = element;
    this.callback = callback;

    this.rowSelector = '.table__row';
    this.bodySelector = '.table__body';
    this.controlClass = 'drag-button';

    this.element = null;
    this.elementY = 0;
    this.mouseY = 0;
    this.isDragged = false;
    this.reachedTop = false;
    this.reachedBottom = false;
  }

  init() {
    this.events();
  }

  /**
   * Добавить события.
   * При перетаскивании события могут вызываться за пределами
   * контейнера виджета => обработчики вешаются на весь документ.
   */
  events() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('mousedown', this.onMouseDown);
  }

  /**
   * Установить границы свободного перетаскивания элемента.
   */
  setDragBoundaries() {
    if (!this.body) this.body = this.container.querySelector(this.bodySelector);
    this.topBoundary = 0;
    this.bottomBoundary = this.body.offsetHeight + this.element.offsetHeight / 2;
  }

  /**
   * Проверить пересекается ли элемент с другими элементами из списка.
   * Если пересекается — вызывать callback с целевым элементом.
   */
  checkOverlap() {
    const topRelativeToTable = this.getTopRelativeToTable();
    let overlappingRow;

    this.rows.reduce((summaryHeight, row) => {
      const localHeight = summaryHeight + parseInt(row.offsetHeight, 10);

      if (!overlappingRow && localHeight > topRelativeToTable) {
        overlappingRow = row;
      }

      return localHeight;
    }, 0);

    if (overlappingRow && this.callback && typeof this.callback === 'function') {
      this.callback({ target: overlappingRow, moved: this.element });
    }

    this.endDrag();
  }

  /**
   * Получить смещение элемента относительно таблицы.
   *
   * @returns {number}
   */
  getTopRelativeToTable() {
    const elementTop = this.element.getBoundingClientRect().top;
    const tableTop = this.body.getBoundingClientRect().top;
    return elementTop - tableTop;
  }

  /**
   * Удалить сохранённые ссылки на элементы и снять флаг перетаскивания.
   */
  endDrag() {
    this.body = null;
    this.element = null;
    this.rows = null;
    this.isDragged = false;
  }

  onMouseDown = (e) => {
    const { target } = e;
    if (!target.classList.contains(this.controlClass)) return;

    const row = target.closest(this.rowSelector);
    if (!row) return;

    this.isDragged = true;
    this.element = row;
    this.mouseY = e.clientY;

    if (!this.topBoundary || !this.bottomBoundary) this.setDragBoundaries();

    const tableRows = [].slice.call(this.container.querySelectorAll(this.rowSelector));
    tableRows.shift();
    this.rows = tableRows;
  };

  onMouseUp = () => {
    if (!this.element) return;

    this.element.style.transform = null;
    this.element.style.background = 'white';
    this.element.style.transition = '0.2s';
    this.element.style.cursor = 'default';

    this.checkOverlap();
  };

  onMouseMove = (e) => {
    if (!this.isDragged) return;

    const deltaY = e.clientY - this.mouseY;
    this.reachedTop = (this.element.offsetTop + deltaY) < this.topBoundary;
    this.reachedBottom = (this.element.offsetTop + deltaY) > this.bottomBoundary;

    if (this.reachedTop || this.reachedBottom) return;

    this.element.style.transform = `translate3d(0, ${this.elementY + deltaY}px, 1000px)`;
    this.element.style.background = 'rgba(255, 253, 199, 0.5)';
    this.element.style.transition = 'none';
    this.element.style.cursor = 'grab';
  };
}

export default DragAndDrop;
