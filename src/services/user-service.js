import { storageService } from './async-storage-service'
import { httpService } from './http-service'
import { utilService } from './util-service.js'
import { store } from '../store/store'
// import {
//   socketService,
//   SOCKET_EVENT_USER_UPDATED,
//   SOCKET_EMIT_USER_WATCH,
// } from './socket-service'
import { showSuccessMsg } from './event-bus-service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const USER_STORAGE_KEY = 'user'
const USER_URL = 'user/'

// _createUser()

export const userService = {
  login,
  logout,
  signup,
  setLoggedInUser,
  getLoggedInUser,
  getUsers,
  getById,
  saveUser,
  remove,
  createEmptyUser,
  // update,
  // saveLocalUser,
  // getEmptyUser,
}

window.userService = userService

function getUsers() {
  return httpService.get(USER_URL)
}

function onUserUpdate(user) {
  showSuccessMsg(`This user ${user.fullname} just got updated from socket`)
  store.commit({ type: 'setWatchedUser', user })
}

async function getById(userId) {
  const user = await httpService.get(USER_URL + userId)
  return user
}

function remove(userId) {
  return httpService.delete(USER_URL + userId)
}

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  if (user) {
    return setLoggedInUser(user)
  }
}

async function signup(user) {
  if (!user.imgUrl)
    user.imgUrl =
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'

  await httpService.post('auth/signup', user)

  if (user) {
    return setLoggedInUser(user)
  }
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

function setLoggedInUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
  return userToSave
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveUser(user) {
  if (user._id) return httpService.put(USER_URL + user._id, user)
  return httpService.post(USER_URL, user)
}

function createEmptyUser() {
  const user = {
    fullname: '',
    imgUrl:
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    username: '',
    password: '',
    reviews: [],
    description: '',
    location: '',
    memberSince: '',
  }
  return user
}
