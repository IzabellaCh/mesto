export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
        const element = this._renderer(item);
        this.addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
};