const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//------------------task1------------------------------------
/*
1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки.
Придумать шаблон, который заменяет одинарные кавычки на двойные.
*/

dialog = `One: 'Hi Mary.' Two: 'Oh, hi.'
       One: 'How are you doing?'
       Two: 'I'm doing alright. How about you?'
       One: 'Not too bad. The weather is great isn't it?'
       Two: 'Yes. It's absolutely beautiful today.'
       One: 'I wish it was like this more frequently.'
       Two: 'Me too.'
       One: 'So where are you going now?'
       Two: 'I'm going to meet a friend of mine at the department store'
       One: 'Going to do a little shopping?'
       Two: 'Yeah, I have to buy some presents for my parents.'
       One: 'What's the occasion?'
       Two: 'It's their anniversary.'
       One: 'That's great. Well, you better get going. You don't want to be late.'
       Two: 'I'll see you next time.'
       One: 'Sure.' Bye.'`

//console.log(dialog.replace(/'/g, '"'))

//------------------task1------------------------------------


//------------------task2------------------------------------
/*
2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
*/
//Вариант1, но он не очень хороший, потому что вставляет пробелы
//console.log(dialog.replace(/ '|' |^'|'$/g, ' " '))
//Вариант2, было сложно до него додуматься))
//console.log(dialog.replace(/(\W)(')/g,  '$1"'))

//------------------task2------------------------------------


//------------------task3------------------------------------

/*
3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
a. Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.
*/

const contactFields = [
    {'name': 'fname',
     'reg': new RegExp('^[A-Za-zА-Яа-яЁё]+$'),
     'err': 'Имя и фамилия должны содержать только буквы.'
    },

    {'name': 'lname',
     'reg': new RegExp('^[A-Za-zА-Яа-яЁё]+$'),
     'err': 'Имя и фамилия должны содержать только буквы.'
    },

    {'name': 'phone',
     'reg':/^\+7\(\d{3}\)\d{3}-\d{4}$/,
     'err': 'Телефон должен быть в формате +7(000)000-0000.'
    },

    {'name': 'email',
     'reg': /^[a-z]{1}[a-z0-9]+([\._-]?[a-z0-9]+)+@[a-z]+\.(com|ru|org$)/,
     'err': 'email - невалидный, email-может быть только строчными буквами.'
    }
]

function _cheak_error (field, valid){
    let elem = document.getElementById(field.name)
    if (!field.reg.test(elem.value)) {
        valid = false;
        err += field.err;
        elem.style.borderColor = 'red';
    }
    return [valid, err]
}

function validateData(){
    valid = true
    err = 'Поля не могт быть пустыми.'
    let arr
    for (field of contactFields) {
        arr = _cheak_error (field, valid);
        valid = arr[0]
        err = arr[1]

    }
    if (!valid){
        alert(err)
    }
}

//------------------task3------------------------------------


/**
 * Описываем базовые классы
 */
class List {
    constructor(url, container, list= listContext) {
        this.container = container;
        this.list = list; // словарь для классов строка 213
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = []; // отфильтрованные товары
        this._init();
    }

    /**
     * получение данных с сервера
     * @param url
     * @returns {Promise<any | never>}
     */
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    /**
     * обработка полученных данных
     * @param data
     */
    handleData(data) {
        this.goods = [...data];
        this.render();
    }

    /**
     * подсчет стоимости всех товаров
     * @returns {*|number}
     */
    calcSum() {
        // let sum = 0;
        // this.allProducts.forEach(({ price }) => sum += price);
        // return sum;
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            console.log(this.constructor.name);
            const productObj = new this.list[this.constructor.name](product);
            // if (this.constructor.name === 'ProductList') {
            //     const productObj = new ProductItem(product);
            // }
            // if (this.constructor.name === 'Cart') {
            //     const productObj = new CartItem(product);
            // }
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    /**
     * метод поиска товаров
     * @param value - поисковый запрос
     */
    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (!this.filtered.includes(el)) {
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }

    _init() {
        return false
    }
}

class Item {
    constructor(el, img = 'https://placehold.it/200x150') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }

    render() {
        return ``;
    }
}

/**
 * Наследуемся от базовых классов
 */
class ProductsList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.cart.addProduct(e.target);
            }
        });
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value)
        })
    }
}

class ProductItem extends Item {
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} ₽</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
    }
}

class Cart extends List {
    constructor(container = ".cart-block", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }

    /**
     * добавление товара
     * @param element
     */
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
                        // При добавлении нового товара, нас интересует только он один.
                        this.goods = [product];
                        // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * удаление товара
     * @param element
     */
    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
                        find.quantity--;
                        this._updateCart(find);
                    } else { // удаляем
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * обновляем данные корзины
     * @param product
     * @private
     */
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    }

    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    }

}

class CartItem extends Item {
    constructor(el, img = 'https://placehold.it/50x100') {
        super(el, img);
        this.quantity = el.quantity;
    }

    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity * this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
        </div>`
    }
}

const listContext = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
new ProductsList(cart);
