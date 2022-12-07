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

'     ______       __                        '
'    / ____/___   / /_ ____  _      __ ____  '
'   / / __ / _ \ / __// __ \| | /| / // __ \ '
'  / /_/ //  __// /_ / /_/ /| |/ |/ // / / / '
'  \____/ \___/ \__/ \____/ |__/|__//_/ /_/  '
'                                            '