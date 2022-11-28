import { storageService } from './async-storage-service'
import { httpService } from './http-service'
import { store } from '../store/store'
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH,
} from './socket-service'
import { showSuccessMsg } from './event-bus-service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USER_STORAGE_KEY = 'user'
const USER_URL = 'user/'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  saveLocalUser,
  getUsers,
  getById,
  remove,
  update,
  saveUser,
  getEmptyUser,
}

window.userService = userService

function getUsers() {
  // return httpService.get(USER_URL)
  return storageService.query(USER_STORAGE_KEY)
}

function onUserUpdate(user) {
  showSuccessMsg(`This user ${user.fullname} just got updated from socket`)
  store.commit({ type: 'setWatchedUser', user })
}

async function getById(userId) {
  // const user = await httpService.get(USER_URL + userId)
  const user = await storageService.get(USER_STORAGE_KEY, userId)

  socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
  socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  return user
}

function remove(userId) {
  // return httpService.delete(USER_URL + userId)
  return storageService.remove(USER_STORAGE_KEY, userId)
}

async function update(user) {
  // user = await httpService.put(USER_URL + user._id, user)
  await storageService.put(USER_STORAGE_KEY, user)
  // Handle case in which admin updates other user's details
  if (getLoggedinUser()._id === user._id) saveLocalUser(user)
  return user
}

async function login(userCred) {
  // const user = await httpService.post('auth/login', userCred)
  // if (user) {
  //     socketService.login(user._id)
  //     return saveLocalUser(user)
  // }
  const users = await storageService.query(USER_STORAGE_KEY)
  const user = users.find((user) => user.username === userCred.username)
}

async function signup(userCred) {
    //   const user = await httpService.post('auth/signup', userCred)
    //   socketService.login(user._id)
    //   return saveLocalUser(user)
    const user = await storageService.post(USER_STORAGE_KEY, userCred)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  socketService.logout()
//   return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser() {
  return {
    fullName: '',
    password: '',
    username: '',
    isAdmin: false,
    _id: utilService.makeId(),
    createdAt: Date.now(),
  }
}

// function saveUser(user) {
//     // if (user._id) return storageService.put(KEY, user)
//     // return storageService.post(KEY, user)
//     if (user._id) return httpService.put(USER_URL + user._id, user)
//     return httpService.post(USER_URL, user)
//   }

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()
