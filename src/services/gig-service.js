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

_createGigs()

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
  addGigMsg,
}
window.gigService = gigService

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
  if (gig._id) {
    savedGig = await storageService.put(GIG_STORAGE_KEY, gig)
    // savedGig = await httpService.put(GIG_URL + gig._id, gig)
    gigChannel.postMessage(getActionUpdateGig(savedGig))
  } else {
    // Later, owner is set by the backend
    gig.owner = userService.getLoggedinUser()
    savedGig = await storageService.post(GIG_STORAGE_KEY, gig)
    // savedGig = await httpService.post(GIG_URL, gig)
    gigChannel.postMessage(getActionAddGig(savedGig))
  }
  return savedGig
}

// LOCAL-STORAGE
async function addGigMsg(gigId, txt) {
  // Later, this is all done by the backend
  const gig = await getById(gigId)
  if (!gig.msgs) gig.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  gig.msgs.push(msg)
  await storageService.put(GIG_STORAGE_KEY, gig)

  return msg
}

// BACKEND
// async function addGigMsg(gigId, txt) {
//   const savedMsg = await httpService.post(GIG_URL + gigId + '/msg', {txt})
//   return savedMsg
// }

function getEmptyGig() {
  return {}
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
function _createGigs() {
  let gigs = utilService.loadFromStorage(GIG_STORAGE_KEY)
  if (!gigs || !gigs.length) {
    gigs = [
      {
        image:
          'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg',
        title: 'I will do hyper realistic pencil portrait by hand drawing',
        description:
          "Hello ! Much obliged for visiting my gig :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
        price: '₪16.84',
        daysToMake: '2 Days Delivery',
        fullname: 'frederickkessie',
        imgUrl:
          'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg',
        loc: 'Ghana',
        memberSince: 'Jul 2021',
        avgResponceTime: '1 hour',
        lastDelivery: '1 week',
        about:
          "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
        reviewers: [
          {
            name: 'tobiaspille300',
            country: 'Thailand',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png',
            review:
              'frederickkessie ist a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result ! Highly recommended work with this guy !',
            reviewedAt: 'Published 2 months ago',
          },
          {
            name: 'liam31',
            country: 'United Kingdom',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
            review:
              'I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!',
            reviewedAt: 'Published 3 weeks ago',
          },
          {
            name: 'liam31',
            country: 'United Kingdom',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
            review:
              'Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!',
            reviewedAt: 'Published 3 weeks ago',
          },
          {
            name: 'larsonraz',
            country: 'United States',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            review: 'Very detailed',
            reviewedAt: 'Published 1 week ago',
          },
          {
            name: 'stevekaszycki',
            country: 'United States',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            review: 'very nice portrait, very good quality.',
            reviewedAt: 'Published 2 weeks ago',
          },
        ],
        tags: [
          {
            name: 'pencil drawing',
          },
          {
            name: 'realistic drawing',
          },
          {
            name: 'hand drawing',
          },
          {
            name: 'portrait drawing',
          },
          {
            name: 'pencil sketch',
          },
        ],
      },
      {
        image:
          'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg',
        title:
          'I will do hyper realistic pencil sketch portrait by hand drawing',
        description:
          "Hey ! Thanks for visiting my gig :)\nIn this gig i'm offering you a very 3 unique, preferable and affordable packages.\nIf you are thinking for giving someone special a very beautiful, eye catching gift( hyper realistic hand drawing pencil sketch portrait)?\nPlease select the desirable package and place your order right now and i'll give you a perfect portrait sketch, hand drawing, realistic drawing,pencil drawing in high resolution JPEG/PNG digital file.\nI will provide hand-drawn black & White or colored realistic portraits.\nKindly provide me clear reference photo as much as possible.\nThe material I used for Creating pencil portraits are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, tombomono eraser, brush, blending stump, mechanical pencil, graphite powder etc .\nYou can give me anything:\nPortrait photos\nFamily photos\nAnimal photos\nAny product photos\nLandscape photos\nArchitecture photos\nAnything you imagine\nPlease contact me before placing your order! Thanks.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITAL FILE, IF YOU WANT THE ORIGINAL ONE THEN MESSAGE ME FOR DETAILS.\nFeel free to ask me anything! :)\nThank You...\nvividstore",
        price: '₪67.37',
        daysToMake: '3 Days Delivery',
        fullname: 'vividstore',
        imgUrl:
          'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg',
        loc: 'Bangladesh',
        memberSince: 'Dec 2019',
        avgResponceTime: '1 hour',
        lastDelivery: 'about 16 hours',
        about:
          'Hello, this is Masuk, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.',
        tags: [
          {
            name: 'pencil drawing',
          },
          {
            name: 'realistic drawing',
          },
          {
            name: 'pencil portrait',
          },
          {
            name: 'sketch',
          },
          {
            name: 'pencil sketch',
          },
        ],
      },
      {
        image:
          'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg',
        title:
          'I will draw a hyperrealistic portrait of face or entire body and animals',
        description:
          'Desenho de lápis hiperrealista da sua foto, posso adicionar detalhes de fundo e personalizar o desenho do jeito que você quiser.',
        price: '₪202.11',
        daysToMake: '14 Days Delivery',
        fullname: 'andreacarvalho_',
        imgUrl:
          'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg',
        loc: 'Brazil',
        memberSince: 'May 2020',
        avgResponceTime: '1 hour',
        lastDelivery: '3 days',
        about:
          "Hello! I'm a brazilian artist specialized in hyperrealistic drawings and paintings of human figures and animals, i use a diversity of techniques like Oil painting, dry pastel drawing and pencil. I have over 30 years of experience, check out my portfolio.",
        reviewers: [
          {
            name: 'rachelrbarnes1',
            country: 'United States',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            review:
              'Incredibly grateful for the amazing experience working with you . You are so talented and a kind soul! I highly recommend if you want high quality art to work with her every time',
            reviewedAt: 'Published 1 month ago',
          },
          {
            name: 'mark001994',
            country: 'Austria',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png',
            review:
              "The artist was very kind and polite also very fast at the communication. The delivery of the project was on time. And her work is worth the money. I'm really excited about the painting she did. I can truely recommend the Aritst and her work. Big Thanks! :)",
            reviewedAt: 'Published 1 month ago',
          },
          {
            name: 'thurstonrobby',
            country: 'United States',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            review:
              'incredible on how precise that art is, picture perfect. 100% amazing job and I will use your services again ...',
            reviewedAt: 'Published 3 weeks ago',
          },
          {
            name: 'gavrielm',
            country: 'Israel',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png',
            review: 'amazing saller and great work',
            reviewedAt: 'Published 6 days ago',
          },
          {
            name: 'garebear52',
            country: 'United States',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            review: 'Beautiful drawing! Just what I wanted.',
            reviewedAt: 'Published 1 week ago',
          },
        ],
        tags: [
          {
            name: 'pencil',
          },
          {
            name: 'drawing',
          },
          {
            name: 'portrait',
          },
          {
            name: 'realistic',
          },
          {
            name: 'painting',
          },
        ],
      },
      {
        image:
          'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207813409/original/9557f50a12d8fccb5c52fb65b35f91cc036f99c6.jpg',
        category: 'Lifestyle',
        subCategory: 'Arts & Crafts',
        title: 'I will write sociology,psychology and social sciences articles',
        description:
          'Hello, welcome to my Gig, I write sociology psychology and all social sciences content\nI am an expert writer who can help you with writing essays, research projects, and articles on criminology, sociology, and psychology. I gained so much experience over the time. i can handle papers from undergraduate all the way to PHD in criminology and sociology and psychology.\nI always strive to provide best quality to my clients and provide plagiarism-free work. I am also familiar with the following reference formats: APA, MLA, HARVARD, CHICAGO\nPlease contact me before placing an order, thank you.',
        price: '₪33.68',
        daysToMake: '3 Days Delivery',
        fullname: 'winny_writer',
        imgUrl:
          'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e34531bf0bbed9d144dba7384f6473b6-1621577835789/60307055-cde9-4dc2-9e9e-4daa421991d3.jpg',
        loc: 'Kenya',
        memberSince: 'May 2021',
        avgResponceTime: '1 hour',
        lastDelivery: 'about 21 hours',
        about:
          "My name is Mary , a graduate from Mount Kenya University, I am professional writer and my focus is to every single detail. I will transform your dream to reality. I am experienced in article, project/content writing for a couple of years. Furthermore, I have a long history of writing research-focused content and projects. My ultimate goal is to closely with my client to deliver quality and comprehensive project. Let's take your business to the next level. Thank you",
        reviewers: [
          {
            name: 'far832013',
            country: 'Canada',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png',
            review:
              'I had a bad experience…. The work doesn’t match the requirement at all. Although l sent a specific and detailed question, l received a general answer. Not recommend and will not deal again.',
            reviewedAt: 'Published 2 months ago',
          },
          {
            name: 'rehanmirdk',
            country: 'Denmark',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1f0.png',
            review:
              'She was excellent in communicating, using my references to write a proper academic paper in sociology, and finish in only 15 hours after getting questions. Most recommended seller!',
            reviewedAt: 'Published 3 weeks ago',
          },
          {
            name: 'raevyn22',
            country: 'United States',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            review: 'Exactly what I asked for',
            reviewedAt: 'Published 8 hours ago',
          },
          {
            name: 'raevyn22',
            country: 'United States',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            review: 'Always gets the job done',
            reviewedAt: 'Published 1 day ago',
          },
          {
            name: 'junyeongcho',
            country: 'United States',
            flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
            review: 'She could understand the contents and write well',
            reviewedAt: 'Published 3 days ago',
          },
        ],
        tags: [
          {
            name: 'technical writing',
          },
        ],
      },
      {
        image:
          'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/220768020/original/0a2e276d2177b3e95593780f6c76e37d6aa367cf.jpg',
      },
    ]
    utilService.saveToStorage(GIG_STORAGE_KEY, gigs)
  }
  return gigs
}
