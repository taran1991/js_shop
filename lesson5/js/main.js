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

    addProduct(product){
      console.log(product.id_product);
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
