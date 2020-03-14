Vue.component('products', {
    data() {
        return {
            catalogUrl: '',
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/261x280',
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products center">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="item.img" :product="item"></product>
            <div class="browse"><a href="product.html" class="button">Browse All Product</a></div>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            cartAPI: this.$root.$refs.cart,
        };
    },

    template: `
    <div class="product">
        <a href="#"><img :src="img" alt="product" class="product__img"> </a>
        <div class="product__text">
            <a href="" class="product__name">{{product.product_name}}</a>
            <p class="items__price">{{product.price}} $</p>
        </div>
        <a href="#" class="product__add" @click="cartAPI.addProduct(product)">
            <img src="./img/cart_wite.svg" alt="cart" class="product__img_hover">
            Add to Cart
        </a>
    </div>
    `
});
