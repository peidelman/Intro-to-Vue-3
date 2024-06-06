app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        /*html*/
        `
        <div class="product-display">
        <div class="product-container">
        <div class="product-image">
            <img v-bind:src="image" :class="{'out-of-stock-img': !inStock}">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p> Shipping: {{shipping}} </p>
            <ul>
            <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div 
            v-for="(variant,index) in variants" 
            :key="variant.id"
            @mouseover="updateVariant(index)"
            :style="{backgroundColor: variant.color}"

            class="color-circle">

            </div>
            <button 
            v-on:click="addToCart" 
            :disabled="!inStock" 
            :class="{disabledButton: !inStock}"
            class="button">
                Add to Cart
            </button>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submitted="addReview"></review-form>
        </div>
    </div>`,
    data() {
        return {
            product: 'Socks',
            selectedVariant: 0,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50, onSale: true},
                {id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0, onSale: false}
            ],
            reviews: [],
            brand: 'Vue Mastery'
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id );
        },
        updateVariant(index) {
            this.selectedVariant = index;
        },
        addReview(review) {
            this.reviews.push(review);
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product} ${(this.variants[this.selectedVariant].onSale ? 'is on sale': '')}` 
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].quantity
        },
        shipping(){
            if (this.premium) {
                return 'Free'
            } 

            return 2.99
        }
    }
})