
// config
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const CATALOG = 'catalogData.json'


// Переделать в ДЗ не fetch!!!!! а new Promise()
let getRequest = (url, cb) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        reject('Error');
      } else {
        resolve(xhr.responseText);
      }
    }
  };
  xhr.send();
  })
};

class ProductList {
  _goods;

  constructor(container = '.products') {
    this.container = container;
    this._goods = [];
    this.allProducts = [];
    this._fetchProducts();
  }

  _fetchProducts() {
    getRequest(`${API}/${CATALOG}`)
    .then(data => {
      this._goods = JSON.parse(data);
      this._render();
    })
    .catch(err => console.log(err))
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this._goods) {
      const productObject = new ProductItem(product);

      this.allProducts.push(productObject);

      block.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }

  sumPrice() {
    return this._goods.reduce((sum, { price }) => sum + price, 0);
  }
}

class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product
    this.img = img;
  }
  getHTMLString() {
    return `<div class="product-item" data-id="${this.id_product}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.product_name}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn" onclick="basket.addProduct(event)" data-id="${this.id_product}">Купить</button>
              </div>
          </div>`;
  }
}

const list = new ProductList();


// ----------------------Basket---------------------------

class BasketItem extends ProductItem{
  constructor(product) {
    super(product)
    this.quantity = 1
  }

  countPrice() {
    return this.price * this.quantity
  }

  getHTMLString() {
  return `<div class="cart-item-${this.id_product}" data-id="${this.id_product}">
            <div class="desc">
              <span>${this.product_name}:
               цена-${this.price} руб,
               кол-во-<span class="quantity-${this.id_product}">${this.quantity}</span> шт,
               всего-<span class="sum-${this.id_product}">${this.countPrice()}</span> руб
               </span>
              <button class="remove-crt" onclick="basket.deleteProduct(event)" data-id="${this.id_product}">удалить</button>
            </div>
          </div>`;
  }
}


class Basket {
  constructor(container='basket') {
    this._goods = [];
    this.container = container;
    this.price = 0;
  }

  _changeBasketList(product) {
    if(document.querySelector(`.cart-item-${product.id_product}`)) {
      if (product.quantity > 0) {
        document.querySelector(`.quantity-${product.id_product}`).innerHTML = product.quantity;
        document.querySelector(`.sum-${product.id_product}`).innerHTML = product.countPrice();
      } else {
        let elem = document.querySelector(`.cart-item-${product.id_product}`);
        elem.remove();
      }
    }
  }
  
  _changeBasketSum(){
    let span = document.querySelector('.cart-price')
    span.innerHTML = `Товаров на сумму ${this.price} руб.`
  }
  
  addProduct(event, quantity=1) {
    let product_id = event.target.dataset['id'];
    let product = this._goods.filter(product => product.id_product == product_id);
    if (product.length != 0) {
        product[0].quantity++;
        this._changeBasketList(product[0])
    } else {
      product = list._goods.filter(product => product.id_product == product_id);
      const basketItem = new BasketItem(product[0]);
      this._goods.push(basketItem);
      if(document.querySelector(`.basket`).innerHTML != '') {
        document.querySelector(`.${this.container}`).insertAdjacentHTML('beforeend', basketItem.getHTMLString())
      }
    }
    this.price += product[0].price;
    this._changeBasketSum()
  }

  deleteProduct(event) {
    let product_id = event.target.dataset['id'];
    let product = this._goods.filter(product => product.id_product == product_id)[0];
    const index = this._goods.indexOf(product)
    if (index > -1) {
      this.price -= this._goods[index].price;
      this._goods[index].quantity --
      this._changeBasketList(this._goods[index])
      this._changeBasketSum()
      if (this._goods[index].quantity <= 0) {
        this._goods.splice(index, 1)
      }
    }
  }

  _render() {
    const block = document.querySelector(`.${this.container}`);
    block.innerHTML = ''
    for (let product of this._goods) {
      block.insertAdjacentHTML('beforeend', product.getHTMLString());
    }
  }

}

const basket = new Basket();

// ----------------------Basket---------------------------

