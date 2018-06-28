import getVerticalOffset from '../helpers/getVerticalOffser';

class DragAndDrop {
  constructor(element, callback) {
    this.container = element;
    this.callback = callback;

    this.rowSelector = '.table__row';
    this.bodySelector = '.table__body';
    this.controlClass = 'drag-button';

    this.element = null;
    this.mouseY = 0;
    this.isDragged = false;
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
   * Проверить пересекается ли элемент с другими элементами из списка.
   * Если пересекается — вызывать callback с целевым элементом.
   */
  checkOverlap() {
    if (!this.clone || !this.body) this.endDrag();
    const topRelativeToTable = getVerticalOffset(this.clone, this.body);
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
   * Клонируем перемещаемый элемент и рендерим его в отдельную таблицу.
   *
   * @param element
   */
  setClone(element) {
    const clone = element.cloneNode(true);
    const fakeTable = document.createElement('table');
    const tableBody = document.createElement('tbody');
    fakeTable.className = 'table  table--overlay';
    tableBody.className = 'table__body';
    tableBody.appendChild(clone);
    fakeTable.appendChild(tableBody);

    const { top, left } = this.element.getBoundingClientRect();
    fakeTable.style.width = `${this.element.offsetWidth}px`;
    fakeTable.style.position = 'absolute';
    fakeTable.style.top = `${top}px`;
    fakeTable.style.left = `${left}px`;

    this.container.appendChild(fakeTable);
    this.clone = fakeTable;
  }

  /**
   * Удалить сохранённые ссылки на элементы и снять флаг перетаскивания.
   */
  endDrag() {
    this.clone.remove();
    this.body = null;
    this.element = null;
    this.rows = null;
    this.clone = null;
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

    this.setClone(row);

    const tableRows = [].slice.call(this.container.querySelectorAll(this.rowSelector));
    tableRows.shift();
    this.rows = tableRows;
    this.body = this.container.querySelector(this.bodySelector);
  };

  onMouseUp = () => {
    if (!this.clone) return;

    this.checkOverlap();
  };

  onMouseMove = (e) => {
    if (!this.isDragged) return;

    const deltaY = e.clientY - this.mouseY;
    this.clone.style.transform = `translate3d(0, ${deltaY}px, 1000px)`;
  };
}

export default DragAndDrop;
