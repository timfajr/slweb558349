const state = {
  items: [],
  checkoutStatus: null,
  total: 0
}

// getters
const getters = {
    cartProducts: (state, getters, rootState) => {
        return state.items.map(({ id }) => {
          const items = rootState.products.all.find(items => items.id === id)
          return {
            id: items.id,
            title: items.title,
            price: items.price
          }
        })
      },
      cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce(( total, items ) => {
          return total + items.price
        }, 0)
      }
}

// actions
const actions = {
  addProductToCart ({ state, commit }, subs) {
      commit('setCheckoutStatus', 'active')
      if ( subs ) {
      const cartItem = state.items.find( item => item.id === subs.id )
      if (!cartItem) {
        commit('pushProductToCart', { id: subs.id , price: subs.price , item : subs.item , qty: subs.qty , status: subs.status ,total: subs.qty * subs.price })
        } 
      } 
  },
  updateProductOnCart ({ state, commit }, subs) {
    commit('setCheckoutStatus', 'updated')
    if ( subs ) {
    const cartItem = state.items.find( item => item.id === subs.id )
    if ( cartItem ) {
      commit('updateProductToCart', { id: subs.id , price: subs.price , item : subs.item , qty: subs.qty , status: subs.status ,total: subs.qty * subs.price })
      } 
  }
  },
  CheckoutCart ({ state, commit }, subs) {
    commit('setCheckoutStatus', null)
    commit('updateCheckout')
  },
}

// mutations
const mutations = {

    initialiseStore(state) {
        if(localStorage.getItem('vuex.items')) {
            let items = JSON.parse(localStorage.getItem('vuex.items'));
            state.items = items
        }
        if(localStorage.getItem('vuex.checkoutStatus')) {
            let checkoutStatus = JSON.parse(localStorage.getItem('vuex.checkoutStatus'));
            state.checkoutStatus = checkoutStatus
        }
        if(localStorage.getItem('vuex.total')) {
          let total = JSON.parse(localStorage.getItem('vuex.total'));
          state.total = total
      }
    },

    pushProductToCart (state, { id , price , item , qty , status , total}) {
        state.items.push({
          id,
          price,
          item,
          qty,
          total,
          status
        })
        state.total += total
        localStorage.setItem('vuex.items', JSON.stringify(state.items));
        localStorage.setItem('vuex.checkoutStatus', JSON.stringify(state.checkoutStatus));
        localStorage.setItem('vuex.total', JSON.stringify(state.total));
    },

    updateCheckout(state) {
      state.items.splice(0)
      state.total = 0
      localStorage.setItem('vuex.items', JSON.stringify(state.items));
      localStorage.setItem('vuex.checkoutStatus', JSON.stringify(state.checkoutStatus));
      localStorage.setItem('vuex.total', JSON.stringify(state.total));
    },

    updateProductToCart (state, { id , price , item , qty , status , total}) {
        const cartItem = state.items.find(item => item.id === id)
        if ( cartItem.qty >= qty ){
          cartItem.qty = qty
          cartItem.total = total
          state.total =- total
        }
        if ( cartItem.qty <= qty ){
          cartItem.qty = qty
          cartItem.total = total
          state.total =+ total
        if ( cartItem.qty <= 0){
            state.total = 0
            const cartItem2 = state.items.map(item => item.id === id).indexOf(id)
            state.items.splice(cartItem2, 1)
            if ( state.items == null ){
            commit('setCheckoutStatus', 'unactive')
            }
        }
        }
        localStorage.setItem('vuex.items', JSON.stringify(state.items));
        localStorage.setItem('vuex.checkoutStatus', JSON.stringify(state.checkoutStatus));
        localStorage.setItem('vuex.total', JSON.stringify(state.total));
    },

    // Disabled  ///////////////////////////////////////////////////////////

    /*
    Removefromcart (state, { id }) {
      const cartItem = state.items.map(item => item.id === id).indexOf(id)
      state.items.splice(cartItem, 1)
      if ( state.items == null ){
        state.checkoutStatus = null
      }
      localStorage.setItem('vuex.items', JSON.stringify(state.items))
      localStorage.setItem('vuex.total', JSON.stringify(state.total));
      localStorage.setItem('vuex.checkoutStatus', JSON.stringify(state.checkoutStatus));
    },
    setCartItems (state, { items }) {
        state.items = items
    },
    */
    setCheckoutStatus (state, status) {
        state.checkoutStatus = status
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}