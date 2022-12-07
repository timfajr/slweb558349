import { createStore} from "vuex" 
import cart from './modules/cart.js'

const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
  modules: {
    cart
  },
  strict: debug,
})
export default store