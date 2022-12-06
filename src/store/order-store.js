import { orderService } from '../services/order-service'

export const orderStore = {
  state: {
    orders: [],
  },
  getters: {
    // orders({ orders }) {
    //   filteredOrders = orders.filter(
    //     (order) => order.seller._id === this.$store.getters.loggedinUser._id
    //   )

    //   return filteredOrders
    // },
    orders({ orders }) {
      return orders
    },
  },
  mutations: {
    setOrders(state, { orders }) {
      state.orders = orders
    },
    addOrder(state, { order }) {
      state.orders.push(order)
    },
    removeOrder(state, { orderId }) {
      state.orders = state.orders.filter((order) => order._id !== orderId)
    },
  },
  actions: {
    async addOrder(context, { order }) {
      try {
        console.log(order)
        order = await orderService.add(order)
        context.commit({ type: 'addOrder', order })
        return order
      } catch (err) {
        console.log('orderStore: Error in addOrder', err)
        throw err
      }
    },
    async loadOrders(context) {
      try {
        const orders = await orderService.query()
        context.commit({ type: 'setOrders', orders })
      } catch (err) {
        console.log('orderStore: Error in loadOrders', err)
        throw err
      }
    },
    async removeOrder(context, { orderId }) {
      try {
        await orderService.remove(orderId)
        context.commit({ type: 'removeOrder', orderId })
      } catch (err) {
        console.log('orderStore: Error in removeOrder', err)
        throw err
      }
    },
  },
}
