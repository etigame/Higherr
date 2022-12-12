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
  // return storageService.query(USER_STORAGE_KEY)
}

function onUserUpdate(user) {
  showSuccessMsg(`This user ${user.fullname} just got updated from socket`)
  store.commit({ type: 'setWatchedUser', user })
}

async function getById(userId) {
  const user = await httpService.get(USER_URL + userId)
  // const user = await storageService.get(USER_STORAGE_KEY, userId)

  // socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
  // socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
  // socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

  return user
}

function remove(userId) {
  return httpService.delete(USER_URL + userId)
  // return storageService.remove(USER_STORAGE_KEY, userId)
}

// async function update(user) {
//   user = await httpService.put(USER_URL + user._id, user)
//   // await storageService.put(USER_STORAGE_KEY, user)
//   // Handle case in which admin updates other user's details
//   // if (getLoggedInUser()._id === user._id) saveLocalUser(user)
//   return user
// }

async function login(userCred) {
  const user = await httpService.post('auth/login', userCred)
  // const users = await storageService.query(USER_STORAGE_KEY)
  // const user = users.find((user) => user.username === userCred.username)
  if (user) {
    return setLoggedInUser(user)
    // return user
    // socketService.login(userCred)
    // return saveLocalUser(user)
  }
}

async function signup(userCred) {
  if (!userCred.imgUrl)
    userCred.imgUrl =
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'

  const user = await httpService.post('auth/signup', userCred)
  if (user) {
    return setLoggedInUser(user)
    // return user
  }
  // console.log(userCred)
  // const user = await storageService.post(USER_STORAGE_KEY, userCred)
  // socketService.login(user._id)
  // return saveLocalUser(user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // socketService.logout()
  return await httpService.post('auth/logout')
}

// function saveLocalUser(user) {
//   // user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }

//   utilService.saveToStorage('loggedInUser', user)
//   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//   return user
// }

function setLoggedInUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    imgUrl: user.imgUrl,
    // isAdmin: user.isAdmin
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
  return userToSave
}

function getLoggedInUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
  // return JSON.parse(localStorage.getItem('loggedInUser'))
}

// function getEmptyUser() {
//   return {
//     fullname: '',
//     password: '',
//     username: '',
//     // isAdmin: false,
//     // _id: utilService.makeId(),
//     // createdAt: Date.now(),
//   }
// }

function saveUser(user) {
  // if (user._id) return storageService.put(KEY, user)
  // return storageService.post(KEY, user)
  if (user._id) return httpService.put(USER_URL + user._id, user)
  return httpService.post(USER_URL, user)
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

function createEmptyUser() {
  const user = {
    // _id: utilService.makeId(),
    fullname: '',
    imgUrl:
      'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    username: '',
    password: '',
    reviews: [],
    description: '--',
    location: '--',
    languages: null,
  }
  return user
}

// function _createUser() {
//   let user = utilService.loadFromStorage(USER_STORAGE_KEY)
//   if (!user || !user.length) {
//     user = [
//       {
//         _id: 'u101',
//         fullname: 'frederickkessie',
//         imgUrl:
//           'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg',
//         username: 'fred',
//         password: '123',
//         reviews: [
//           {
//             id: 'r1',
//             // gig: {id: '654', },
//             txt: 'Very kind and works fast',
//             rate: 4,
//             by: {
//               _id: 'u102',
//               fullname: 'Tanya',
//               imgUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
//             },
//           },
//         ],
//       },
//       {
//         _id: 'u102',
//         fullname: 'vividstore',
//         imgUrl:
//           'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg',
//         username: 'vivi',
//         password: '123',
//         reviews: [
//           {
//             id: 'r1',
//             // gig: {id: '654', },
//             txt: 'Very kind and works fast',
//             rate: 4,
//             by: {
//               _id: 'u102',
//               fullname: 'Tanya',
//               imgUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
//             },
//           },
//         ],
//       },
//       {
//         _id: 'u103',
//         fullname: 'andreacarvalho_',
//         imgUrl:
//           'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg',
//         username: 'andrea',
//         password: '123',
//         reviews: [
//           {
//             id: 'r1',
//             // gig: {id: '654', },
//             txt: 'Very kind and works fast',
//             rate: 4,
//             by: {
//               _id: 'u102',
//               fullname: 'Tanya',
//               imgUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
//             },
//           },
//         ],
//       },
//     ]
//     utilService.saveToStorage(USER_STORAGE_KEY, user)
//     return user
//   }
// }
