import { httpService } from './http-service'
import { storageService } from './async-storage-service'
import { userService } from './user-service'
import { utilService } from './util-service'

import { store } from '../store/store'
// import {
//   socketService,
//   SOCKET_EVENT_REVIEW_ADDED,
//   SOCKET_EVENT_REVIEW_ABOUT_YOU,
// } from './socket-service'
import { showSuccessMsg } from './event-bus-service.js'
const ORDER_STORAGE_KEY = 'order'
const orderChannel = new BroadcastChannel('orderChannel')

// const ORDER_STORAGE_KEY = 'order'
const ORDER_URL = 'order/'

// _createOrders()
// ;(() => {
//   //   orderChannel.addEventListener('message', (ev) => {
//   //     console.log('msg event', ev)
//   //     store.commit(ev.data)
//   //   })
//   setTimeout(() => {
//     socketService.on(SOCKET_EVENT_REVIEW_ADDED, (order) => {
//       console.log('GOT from socket', order)
//       store.commit({ type: 'addOrder', order })
//     })
//     socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (order) => {
//       showSuccessMsg(`New order about me ${order.txt}`)
//     })
//   }, 0)
// })()

export const orderService = {
  save,
  query,
  getById,
  remove,
}

async function query() {
  return httpService.get(ORDER_URL)
  // return await storageService.query(ORDER_STORAGE_KEY)
  // var orders = await storageService.query(ORDER_STORAGE_KEY)
}

async function getById(orderId) {
    return httpService.get(ORDER_URL + orderId)
  // var order = await storageService.get(ORDER_STORAGE_KEY, orderId)
  // return order
}

async function remove(orderId) {
  await httpService.delete(ORDER_URL + orderId)
  // await storageService.delete('order', orderId)
  //   orderChannel.postMessage({type: 'removeOrder', orderId})
}

async function save(order) {
  var savedOrder
  if (order._id) {
    // savedOrder = await storageService.put(ORDER_STORAGE_KEY, order)
    savedOrder = await httpService.put(ORDER_URL + order._id, order)
  } else {
    // Later, owner is set by the backend
    order.buyer = userService.getLoggedInUser()
    // savedOrder = await storageService.post(ORDER_STORAGE_KEY, order)
    savedOrder = await httpService.post(ORDER_URL, order)
  }
  return savedOrder
}
// async function add(order) {
//   order.byUser = userService.getLoggedInUser()
//   order.aboutUser = await userService.getById(order.aboutUserId)
//   // const addedOrder = await httpService.post(`order`, order)
//   const addedOrder = await storageService.post('order', order)
//   //   orderChannel.postMessage({type: 'addOrder', order: addedOrder})

//   return addedOrder
// }

// function _createOrders() {
//   let orders = utilService.loadFromStorage(ORDER_STORAGE_KEY)
//   if (!orders || !orders.length) {
//     orders = []
//     utilService.saveToStorage(ORDER_STORAGE_KEY, orders)
//   }
//   return orders
// }
