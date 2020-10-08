const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    imgCatalog: 'https://placehold.it/200x150',
    searchLine: '',
    isVisibleCart: false,
    basket: []
  },
  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },


    _createBasketItem(product){
    return {'id_product': product.id_product,
            'price': product.price,
            'product_name': product.product_name,
            'quantity': 1
            }
    },

    addProduct(product){
      let cartItem = this.basket.filter(item => item.id_product == product.id_product);
      if (cartItem.length != 0) {
          cartItem[0].quantity++;
      } else {
        cartItem = this._createBasketItem(product)
        this.basket.push(cartItem)
      }
    },

    removeProduct(product){
      const index = this.basket.indexOf(product)
      if (index > -1) {
        this.basket[index].quantity --
        if (this.basket[index].quantity <= 0) {
          this.basket.splice(index, 1)
        }
      }
    },

  },

  computed: {
    filterGoods(){
      const regexp = new RegExp(this.searchLine, 'i');
      return this.products.filter(product => regexp.test(product.product_name))
    }
  },


  beforeCreate() {

  },
  created() {
    this.getJson(`${API + this.catalogUrl}`)
        .then(data => {
          for(let el of data){
            this.products.push(el);
          }
        });
  },
  beforeMount() {

  },
  mounted(){
    // this.getJson(`${API + this.catalogUrl}`)
    //   .then(data => {
    //     for(let el of data){
    //       this.products.push(el);
    //     }
    //   });
  },
  beforeUpdate() {

  },
  updated() {

  },
  beforeDestroy() {

  },
  destroyed() {

  },
});
