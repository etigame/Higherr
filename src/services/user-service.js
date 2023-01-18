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
  loginViaGoogle,
  logout,
  signup,
  signupViaGoogle,
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
  showSuccessMsg(`This user ${user.username} just got updated from socket`)
  store.commit({ type: 'setWatchedUser', user })
}

function getById(userId) {
  return httpService.get(USER_URL + userId)
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

async function loginViaGoogle(userCred) {
  const user = await httpService.post('auth/loginViaGoogle', userCred)
  if (user) {
    return setLoggedInUser(user)
  }
}

async function signup(user) {
  if (!user.imgUrl)
    user.imgUrl =
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0b4c759-ad9c-4425-a9f4-ab89e2fd9837/de8cefl-35c0bc59-59b9-42ab-b19f-5c73828bb78e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IwYjRjNzU5LWFkOWMtNDQyNS1hOWY0LWFiODllMmZkOTgzN1wvZGU4Y2VmbC0zNWMwYmM1OS01OWI5LTQyYWItYjE5Zi01YzczODI4YmI3OGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.81ixeN9b4cfDmfBlskK9CUyAMDtRhYNU7lfwTI8WI5Q'

  const response = await httpService.post('auth/signup', user)

  if (response) {
    return setLoggedInUser(response)
  }
}

async function signupViaGoogle(user) {
  if (!user.imgUrl)
    user.imgUrl =
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0b4c759-ad9c-4425-a9f4-ab89e2fd9837/de8cefl-35c0bc59-59b9-42ab-b19f-5c73828bb78e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IwYjRjNzU5LWFkOWMtNDQyNS1hOWY0LWFiODllMmZkOTgzN1wvZGU4Y2VmbC0zNWMwYmM1OS01OWI5LTQyYWItYjE5Zi01YzczODI4YmI3OGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.81ixeN9b4cfDmfBlskK9CUyAMDtRhYNU7lfwTI8WI5Q'

  const response = await httpService.post('auth/signupViaGoogle', user)

  if (response) {
    return setLoggedInUser(response)
  }
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post('auth/logout')
}

function setLoggedInUser(user) {
  const userToSave = {
    _id: user._id,
    username: user.username,
    imgUrl: user.imgUrl,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
  return userToSave
}

function getLoggedInUser() {
  const miniUser = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
  if (!miniUser) return
  return getById(miniUser._id)
}

function saveUser(user) {
  if (user._id) return httpService.put(USER_URL + user._id, user)
  return httpService.post(USER_URL, user)
}

function createEmptyUser() {
  const user = {
    fullname: '',
    username: '',
    password: '',
    imgUrl:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0b4c759-ad9c-4425-a9f4-ab89e2fd9837/de8cefl-35c0bc59-59b9-42ab-b19f-5c73828bb78e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IwYjRjNzU5LWFkOWMtNDQyNS1hOWY0LWFiODllMmZkOTgzN1wvZGU4Y2VmbC0zNWMwYmM1OS01OWI5LTQyYWItYjE5Zi01YzczODI4YmI3OGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.81ixeN9b4cfDmfBlskK9CUyAMDtRhYNU7lfwTI8WI5Q',
    location: '',
    memberSince: utilService.getDate(),
    description: '',
    level: null,
    rate: null,
    avgResponseTime: 1,
    lastDelivery: null,
    isSeller: false,
  }
  return user
}
