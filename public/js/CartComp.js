Vue.component('cart', {
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',
            // cartUrl: '/userCart.json',
            cartUrl: '/api/cart/',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {

        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(this.cartUrl + find.id_product, {quantity: 1});
                // console.log(find.id_product);
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(this.cartUrl, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) { //maw homework
            if (item.quantity > 1) {
                this.$parent.putJson(this.cartUrl + item.id_product, {quantity: -1}) //Серверную Корзину уменьшаем на 1
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(this.cartUrl + item.id_product, item) //Либо удаляем из Серверной Корзины по id
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    mounted() {
        this.$parent.getJson(this.cartUrl)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
                <a href="#" class="header-cart__link" @click="showCart = !showCart">
                  <img class="header__cart" src="img/cart.svg" alt="cart">
                </a>
            <div class="drop header-cart__drop" v-show="showCart">
                <p v-if="!cartItems.length">Cart is empty</p>                 
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="item.img"
                @remove="remove">
                </cart-item>
<!--                <div class="cart-total">-->
<!--                            <p class="cart-total__h">TOTAL:</p>-->
<!--                            <p class="cart-total__price">$500</p>-->
<!--                </div>-->
                <div class="cart-checkout"><a href="checkout.html" class="cart-checkout__link">Checkout</a></div>
                <div class="cart-gotocart"><a href="cart.html" class="cart-gotocart__link">Go to cart</a></div>
            </div>
        </div>
`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                            <img :src="img" alt="product" class="cart-item__img">
                            <div class="cart-item__txt">
                                <a href="#" class="cart-item__h">{{cartItem.product_name}}</a>
                                <p class="items__stars">
                                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i
                                        class="far fa-star"></i><i class="far fa-star"></i>
                                </p>
                                <p class="cart-item__quantity">{{cartItem.quantity}} X {{cartItem.price}}$</p>
                            </div>
                            <div class="cart-item__times"  @click="$emit('remove', cartItem)"><a class="cart-item__times-link" href="#"><i
                                    class="fas fa-times-circle"></i></a></div>
                 </div>
    `
});
