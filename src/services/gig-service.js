import { storageService } from './async-storage-service.js'
import { utilService } from './util-service.js'
import { userService } from './user-service.js'
import {
  getActionRemoveGig,
  getActionAddGig,
  getActionUpdateGig,
} from '../store/gig-store.js'
import { store } from '../store/store'

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs

const GIG_STORAGE_KEY = 'gig'
const GIG_URL = 'gig/'

// _createGigs()

const gigChannel = new BroadcastChannel('gigChannel')

;(() => {
  gigChannel.addEventListener('message', (ev) => {
    store.commit(ev.data)
  })
})()

export const gigService = {
  query,
  getById,
  save,
  remove,
  getEmptyGig,
}
window.cs = gigService

async function query(filterBy = { txt: '', price: 0 }) {
  // return httpService.get(GIG_URL, filterBy)

  var gigs = await storageService.query(GIG_STORAGE_KEY)
  //   if (filterBy.txt) {
  //     const regex = new RegExp(filterBy.txt, 'i')
  //     gigs = gigs.filter(
  //       (gig) => regex.test(gig.vendor) || regex.test(gig.description)
  //     )
  //   }
  //   if (filterBy.price) {
  //     gigs = gigs.filter((gig) => gig.price <= filterBy.price)
  //   }
  return gigs
}

function getById(gigId) {
  //   return httpService.get(GIG_URL + gigId)
  return storageService.get(GIG_STORAGE_KEY, gigId)
}

async function remove(gigId) {
  // return httpService.delete(GIG_URL + gigId)

  await storageService.remove(GIG_STORAGE_KEY, gigId)
  gigChannel.postMessage(getActionRemoveGig(gigId))
}

async function save(gig) {
    var savedGig
  // if (gig._id) savedGig = await httpService.put(GIG_URL + gig._id, gig)
  // savedGig = await httpService.post(GIG_URL, gig)
  
  if (gig._id) {
    savedGig = await storageService.put(GIG_STORAGE_KEY, gig)
    gigChannel.postMessage(getActionUpdateGig(savedGig))
  } else {
    // Later, owner is set by the backend
    gig.owner = userService.getLoggedinUser()
    savedGig = await storageService.post(GIG_STORAGE_KEY, gig)
    gigChannel.postMessage(getActionAddGig(savedGig))
  }
  return savedGig
}


function getEmptyGig() {
  return {

  }
}

// function _createGigs() {
//   let gigs = utilService.loadFromStorage(GIG_STORAGE_KEY)
//   if (!gigs || !gigs.length) {
//     gigs = [
//       {
//         _id: utilService.makeId(),
//         
//       },
//       {
//         _id: utilService.makeId(),
//         
//       },
//       {
//         _id: utilService.makeId(),
//         
//       },
//     ]
//     utilService.saveToStorage(GIG_STORAGE_KEY, gigs)
//   }
//   return gigs
// }
