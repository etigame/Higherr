import { storageService } from './async-storage-service.js'
import { httpService } from './http-service.js'
import { utilService } from './util-service.js'
import { userService } from './user-service.js'
import {
  getActionRemoveGig,
  getActionAddGig,
  getActionUpdateGig,
} from '../store/gig-store.js'
import { store } from '../store/store'

const GIG_URL = 'gig/'
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
  getDemoGig,
}
window.gigService = gigService

async function query() {
  return httpService.get(GIG_URL)
  // return await storageService.query(GIG_STORAGE_KEY)
  // var gigs = await storageService.query(GIG_STORAGE_KEY)
}

async function getById(gigId) {
  return httpService.get(GIG_URL + gigId)
  // var gig = await storageService.get(GIG_STORAGE_KEY, gigId)
  // return gig
}

async function remove(gigId) {
  return httpService.delete(GIG_URL + gigId)

  // await storageService.remove(GIG_STORAGE_KEY, gigId)
  gigChannel.postMessage(getActionRemoveGig(gigId))
}

async function save(gig) {
  var savedGig
  if (gig._id) {
    // savedGig = await storageService.put(GIG_STORAGE_KEY, gig)
    savedGig = await httpService.put(GIG_URL + gig._id, gig)
    gigChannel.postMessage(getActionUpdateGig(savedGig))
  } else {
    // savedGig = await storageService.post(GIG_STORAGE_KEY, gig)
    savedGig = await httpService.post(GIG_URL, gig)
    gigChannel.postMessage(getActionAddGig(savedGig))
  }
  return savedGig
}


function getEmptyGig(owner) {
  return {
    owner,
    // _id: utilService.makeId(),
    title: '',
    price: null,
    daysToMake: null,
    description: '',
    images: [],
    category: '',
    subCategory: '',
  }
}

function getDemoGig(owner) {
  return {
    owner: owner,
    title: 'I will create wireframes and prototypes',
    price: 267,
    daysToMake: 3,
    description:
      'Pick this Gig - your digital product will be ready to run!The prototype is a functional version with final visual UI of your mobile app/ website/ software/ digital platform. my work will definitely bring you Pretty but also Human- Centered User Interfaces which engage and empower your users! As a Product Designer, I can cover the whole process UX and UI and deliver projects of excellent quality. I have a formal and intensive educational background in UX Design from York University. My Master in Finance Management also helps me to envision more strategic values for your business.',
    image: [],
    category: 'Graphics & Design',
    subCategory: 'Logo Design',
  }
}
