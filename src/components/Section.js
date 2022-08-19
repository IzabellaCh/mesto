export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems(renderedItems) {
    renderedItems.forEach(item => {
        const element = this._renderer(item);
        this.addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
};