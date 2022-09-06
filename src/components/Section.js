export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems(renderedItems) {
    return this._cardArray = renderedItems.map(item => {
      return this._renderer(item);
    });
  }

  addItem(items) {
    items.forEach((item => {
      this._container.prepend(item);
    }));
  }
};