const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price='Уточните у продовца') => {
    return `<div class="product-item list-group-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn btn-secondary btn-lg">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list) => {
    const productList = list.map((product) => renderProduct(product.title, product.price));
    var products = document.querySelector('.products');
    for (let product of productList){
        products.insertAdjacentHTML('beforeend', product)
    }
};

renderProducts(products);
