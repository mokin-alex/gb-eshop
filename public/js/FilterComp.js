Vue.component('filter-el', {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `
            <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
<!--                <input type="text" class="search-field" v-model="userSearch">-->
<!--                <button class="btn-search" type="submit">-->
<!--                    <i class="fas fa-search"></i>-->
<!--                </button>-->
                <input class="form_size" type="text" placeholder="Search for Item..." size="38" v-model="userSearch">
                <button class="header__button form_size" type="submit"><img src="img/search.png" alt="search"></button>
            </form>
            

    `
});
