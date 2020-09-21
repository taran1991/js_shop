class ProductList {

  constructor(container = '.products') {
    this.container = container;
    this._goods = [];
    this.allProducts = [];

    this._fetchGoods();
    this._render();
  }

  _fetchGoods() {
    this._goods = [
      {id: 1, title: 'Notebook', price: 20000},
      {id: 2, title: 'Mouse', price: 1500},
      {id: 3, title: 'Keyboard', price: 5000},
      {id: 4, title: 'Gamepad', price: 4500},
    ];
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this._goods) {
      const productObject = new ProductItem(product);

      this.allProducts.push(productObject);

      block.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }

  count_common_price() {
    let common_price = 0
    for (let productObject of this.allProducts) {
      common_price += productObject.price
    }
    return common_price
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }
  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
  }
}

const list = new ProductList();

class BasketItem {
  constructor(product, quantity) {
    this.title = product.title;
    this.item_price = product.price;
    this.id = product.id;
    this.quantity = quantity
    this._count_price()
  }

  _count_price() {
    this.price = this.item_price * this.quantity
  }
}


class Basket {
  constructor(user) {
    this.user = user
    this.goods = []
    this.price = 0
  }

  add_product(product, quantity=1) {
    basketItem = BasketItem(product, quantity)
    this.goods.push(basketItem)
    this.price += basketItem.price
  }

  delete_product(product) {
    const index = this.goods.indexOf(product)
    if (index > -1) {
      this.price -= this.goods[index].price
      this.goods.splice(index, 1)

    }
  }
}