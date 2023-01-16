import { userService } from '../services/user-service'
import { utilService } from '../services/util-service'
import {
  socketService,
  SOCKET_EMIT_USER_WATCH,
  SOCKET_EVENT_USER_UPDATED,
} from '../services/socket-service'

var localLoggedinUser = null

if (sessionStorage.user)
  localLoggedinUser = JSON.parse(sessionStorage.user || null)

export const userStore = {
  state: {
    loggedinUser: null,
    users: [],
    watchedUser: null,
  },
  getters: {
    users({ users }) {
      return users
    },
    loggedinUser({ loggedinUser }) {
      return loggedinUser
    },
    watchedUser({ watchedUser }) {
      return watchedUser
    },
  },
  rootGetters: {
    loggedinUser({ loggedinUser }) {
      return loggedinUser
    },
  },
  mutations: {
    setLoggedInUser(state, { user }) {
      state.loggedinUser = user ? { ...user } : null
    },
    setWatchedUser(state, { user }) {
      state.watchedUser = user
    },
    setUsers(state, { users }) {
      state.users = users
    },
    updateUsers(state, { user }) {
      const idx = state.users.findIndex((item) => item._id === user._id)
      if (idx) state.users.splice(idx, 1, user)
      else state.users.push(user)
    },

    removeUser(state, { userId }) {
      state.users = state.users.filter((user) => user._id !== userId)
    },
  },
  actions: {
    async login({ state, commit }, { userCred }) {
      try {
        const user = await userService.login(userCred)

        const localLoggedInUser = userService.getLoggedInUser()
        commit({ type: 'setLoggedInUser', user: localLoggedInUser })
        socketService.login(localLoggedInUser)

        return user
      } catch (err) {
        console.log('userStore: Error in login', err)
        throw err
      }
    },
    async loginViaGoogle({ state, commit }, { userCred }) {
      try {
        const user = await userService.loginViaGoogle(userCred)

        const localLoggedInUser = userService.getLoggedInUser()
        commit({ type: 'setLoggedInUser', user: localLoggedInUser })
        socketService.login(localLoggedInUser)

        return user
      } catch (err) {
        console.log('userStore: Error in login', err)
        throw err
      }
    },
    async signup({ state, commit }, { user }) {
      try {
        await userService.signup(user)

        const localLoggedInUser = userService.getLoggedInUser()
        await commit({ type: 'setLoggedInUser', user: localLoggedInUser })
        socketService.signup(localLoggedInUser)

        // socketService.signup({ ...state.loggedinUser })
        return user
      } catch (err) {
        console.log('userStore: Error in signup', err)
        throw err
      }
    },
    async signupViaGoogle({ state, commit }, { user }) {
      console.log('from store')
      try {
        await userService.signupViaGoogle(user)

        const localLoggedInUser = userService.getLoggedInUser()
        await commit({ type: 'setLoggedInUser', user: localLoggedInUser })
        socketService.signup(localLoggedInUser)

        // socketService.signup({ ...state.loggedinUser })
        return user
      } catch (err) {
        console.log('userStore: Error in signup', err)
        throw err
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout()
        commit({ type: 'setLoggedInUser', user: null })
        socketService.logout()
      } catch (err) {
        console.log('userStore: Error in logout', err)
        throw err
      }
    },
    async loadUsers({ commit }) {
      try {
        const users = await userService.getUsers()
        commit({ type: 'setUsers', users })
      } catch (err) {
        console.log('userStore: Error in loadUsers', err)
        throw err
      }
    },
    async loadAndWatchUser({ commit }, { userId }) {
      try {
        const user = await userService.getById(userId)

        commit({ type: 'setWatchedUser', user })
      } catch (err) {
        console.log('userStore: Error in loadAndWatchUser', err)
        throw err
      }
    },
    async removeUser({ commit }, { userId }) {
      try {
        await userService.remove(userId)
        commit({ type: 'removeUser', userId })
      } catch (err) {
        console.log('userStore: Error in removeUser', err)
        throw err
      }
    },
    async updateUsers({ commit }, { user }) {
      try {
        await userService.saveUser(user)
        commit({ type: 'updateUsers', user })
      } catch (err) {
        console.log('userStore: Error in updateUsers', err)
        throw err
      }
    },

    // Keep this action for compatability with a common user.service ReactJS/VueJS
    setWatchedUser({ commit }, payload) {
      commit(payload)
    },
  },
}
