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

// This file demonstrates how to use a BroadcastChannel to notify other browser tabs

// const GIG_STORAGE_KEY = 'gig'
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
  addGigMsg,
  getEmptyGig,
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
    // Later, owner is set by the backend
    // gig.owner = userService.getLoggedInUser()
    // savedGig = await storageService.post(GIG_STORAGE_KEY, gig)
    savedGig = await httpService.post(GIG_URL, gig)
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
    by: userService.getLoggedInUser(),
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

function getEmptyGig(owner) {
  return {
    owner,
    // _id: utilService.makeId(),
    title: '',
    price: null,
    daysToMake: 3,
    description: '',
    image: [],
    
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
// function _createGigs() {
//   let gigs = utilService.loadFromStorage(GIG_STORAGE_KEY)
//   if (!gigs || !gigs.length) {
//     gigs = [
//       {
//         _id: utilService.makeId(),
//         image: [
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg',
//         ],
//         title: 'I will do hyper realistic pencil portrait by hand drawing',
//         owner: {
//           _id: 'u101',
//           fullname: 'frederickkessie',
//           imgUrl:
//             'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg',
//           level: 2,
//           rate: 4,
//         },
//         likedByUsers: [1, 1],
//         description:
//           "Hello ! Much obliged for visiting my gig :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
//         price: 16,
//         daysToMake: '2 Days Delivery',

//         loc: 'Ghana',
//         memberSince: 'Jul 2021',
//         avgResponseTime: '1 hour',
//         lastDelivery: '1 week',
//         about:
//           "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
//         reviewers: [
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'tobiaspille300',
//             country: 'Thailand',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png',
//             review:
//               'frederickkessie ist a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result ! Highly recommended work with this guy !',
//             reviewedAt: '2 months ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 3,
//             name: 'liam31',
//             country: 'United Kingdom',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
//             review:
//               'I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!',
//             reviewedAt: '3 weeks ago',
//           },
//           {
//             _id: utilService.makeId(),
//             name: 'liam31',
//             country: 'United Kingdom',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
//             review:
//               'Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!',
//             reviewedAt: '3 weeks ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 2,
//             name: 'larsonraz',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review: 'Very detailed',
//             reviewedAt: '1 week ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'stevekaszycki',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review: 'very nice portrait, very good quality.',
//             reviewedAt: '2 weeks ago',
//           },
//         ],
//         tags: [
//           {
//             name: 'pencil drawing',
//           },
//           {
//             name: 'realistic drawing',
//           },
//           {
//             name: 'hand drawing',
//           },
//           {
//             name: 'portrait drawing',
//           },
//           {
//             name: 'pencil sketch',
//           },
//         ],
//       },
//       {
//         _id: utilService.makeId(),
//         image: [
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/231682055/original/77cc585046a1ceb81a809218fef35ee8252bbb3b.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg',
//         ],
//         owner: {
//           _id: 'u102',
//           fullname: 'vividstore',
//           imgUrl:
//             'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg',
//           level: 3,
//           rate: 5,
//         },
//         likedByUsers: [1, 1],
//         title:
//           'I will do hyper realistic pencil sketch portrait by hand drawing',
//         description:
//           "Hey ! Thanks for visiting my gig :)\nIn this gig i'm offering you a very 3 unique, preferable and affordable packages.\nIf you are thinking for giving someone special a very beautiful, eye catching gift( hyper realistic hand drawing pencil sketch portrait)?\nPlease select the desirable package and place your order right now and i'll give you a perfect portrait sketch, hand drawing, realistic drawing,pencil drawing in high resolution JPEG/PNG digital file.\nI will provide hand-drawn black & White or colored realistic portraits.\nKindly provide me clear reference photo as much as possible.\nThe material I used for Creating pencil portraits are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, tombomono eraser, brush, blending stump, mechanical pencil, graphite powder etc .\nYou can give me anything:\nPortrait photos\nFamily photos\nAnimal photos\nAny product photos\nLandscape photos\nArchitecture photos\nAnything you imagine\nPlease contact me before placing your order! Thanks.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITAL FILE, IF YOU WANT THE ORIGINAL ONE THEN MESSAGE ME FOR DETAILS.\nFeel free to ask me anything! :)\nThank You...\nvividstore",
//         price: 67,
//         daysToMake: '3 Days Delivery',
//         loc: 'Bangladesh',
//         memberSince: 'Dec 2019',
//         avgResponseTime: '1 hour',
//         lastDelivery: 'about 16 hours',
//         about:
//           'Hello, this is Masuk, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.',
//         tags: [
//           {
//             name: 'pencil drawing',
//           },
//           {
//             name: 'realistic drawing',
//           },
//           {
//             name: 'pencil portrait',
//           },
//           {
//             name: 'sketch',
//           },
//           {
//             name: 'pencil sketch',
//           },
//         ],
//       },
//       {
//         _id: utilService.makeId(),
//         image: [
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg',
//         ],
//         owner: {
//           _id: 'u103',
//           fullname: 'andreacarvalho_',
//           imgUrl:
//             'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg',
//           level: 1,
//           rate: 3,
//         },
//         likedByUsers: [1, 1, 1],
//         title:
//           'I will draw a hyperrealistic portrait of face or entire body and animals',
//         description:
//           'Desenho de lápis hiperrealista da sua foto, posso adicionar detalhes de fundo e personalizar o desenho do jeito que você quiser.',
//         price: 202,
//         daysToMake: '14 Days Delivery',

//         loc: 'Brazil',
//         memberSince: 'May 2020',
//         avgResponseTime: '1 hour',
//         lastDelivery: '3 days',
//         about:
//           "Hello! I'm a brazilian artist specialized in hyperrealistic drawings and paintings of human figures and animals, i use a diversity of techniques like Oil painting, dry pastel drawing and pencil. I have over 30 years of experience, check out my portfolio.",
//         reviewers: [
//           {
//             _id: utilService.makeId(),
//             rate: 5,
//             name: 'rachelrbarnes1',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               'Incredibly grateful for the amazing experience working with you . You are so talented and a kind soul! I highly recommend if you want high quality art to work with her every time',
//             reviewedAt: '1 month ago',
//           },
//           {
//             _id: utilService.makeId(),
//             name: 'mark001994',
//             country: 'Austria',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png',
//             review:
//               "The artist was very kind and polite also very fast at the communication. The delivery of the project was on time. And her work is worth the money. I'm really excited about the painting she did. I can truely recommend the Aritst and her work. Big Thanks! :)",
//             reviewedAt: '1 month ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'thurstonrobby',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               'incredible on how precise that art is, picture perfect. 100% amazing job and I will use your services again ...',
//             reviewedAt: '3 weeks ago',
//           },
//           {
//             _id: utilService.makeId(),
//             name: 'gavrielm',
//             country: 'Israel',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png',
//             review: 'amazing saller and great work',
//             reviewedAt: '6 days ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 5,
//             name: 'garebear52',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review: 'Beautiful drawing! Just what I wanted.',
//             reviewedAt: '1 week ago',
//           },
//         ],
//         tags: [
//           {
//             name: 'pencil',
//           },
//           {
//             name: 'drawing',
//           },
//           {
//             name: 'portrait',
//           },
//           {
//             name: 'realistic',
//           },
//           {
//             name: 'painting',
//           },
//         ],
//       },
//       {
//         _id: utilService.makeId(),
//         image: [
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207813409/original/9557f50a12d8fccb5c52fb65b35f91cc036f99c6.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207813409/original/9557f50a12d8fccb5c52fb65b35f91cc036f99c6.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207813409/original/9557f50a12d8fccb5c52fb65b35f91cc036f99c6.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207813409/original/9557f50a12d8fccb5c52fb65b35f91cc036f99c6.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207813409/original/9557f50a12d8fccb5c52fb65b35f91cc036f99c6.jpg',
//         ],
//         owner: {
//           _id: 'u104',
//           fullname: 'winny_writer',
//           imgUrl:
//             'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e34531bf0bbed9d144dba7384f6473b6-1621577835789/60307055-cde9-4dc2-9e9e-4daa421991d3.jpg',
//           level: 3,
//           rate: 5,
//         },
//         likedByUsers: [1, 1, 1, 1],
//         category: 'Lifestyle',
//         subCategory: 'Arts & Crafts',
//         title: 'I will write sociology,psychology and social sciences articles',
//         description:
//           'Hello, welcome to my Gig, I write sociology psychology and all social sciences content\nI am an expert writer who can help you with writing essays, research projects, and articles on criminology, sociology, and psychology. I gained so much experience over the time. i can handle papers from undergraduate all the way to PHD in criminology and sociology and psychology.\nI always strive to provide best quality to my clients and provide plagiarism-free work. I am also familiar with the following reference formats: APA, MLA, HARVARD, CHICAGO\nPlease contact me before placing an order, thank you.',
//         price: 33,
//         daysToMake: '3 Days Delivery',

//         loc: 'Kenya',
//         memberSince: 'May 2021',
//         avgResponseTime: '1 hour',
//         lastDelivery: 'about 21 hours',
//         about:
//           "My name is Mary , a graduate from Mount Kenya University, I am professional writer and my focus is to every single detail. I will transform your dream to reality. I am experienced in article, project/content writing for a couple of years. Furthermore, I have a long history of writing research-focused content and projects. My ultimate goal is to closely with my client to deliver quality and comprehensive project. Let's take your business to the next level. Thank you",
//         reviewers: [
//           {
//             _id: utilService.makeId(),
//             rate: 1,
//             name: 'far832013',
//             country: 'Canada',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png',
//             review:
//               'I had a bad experience…. The work doesn’t match the requirement at all. Although l sent a specific and detailed question, l received a general answer. Not recommend and will not deal again.',
//             reviewedAt: '2 months ago',
//           },
//           {
//             _id: utilService.makeId(),
//             name: 'rehanmirdk',
//             country: 'Denmark',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1f0.png',
//             review:
//               'She was excellent in communicating, using my references to write a proper academic paper in sociology, and finish in only 15 hours after getting questions. Most recommended seller!',
//             reviewedAt: '3 weeks ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'raevyn22',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review: 'Exactly what I asked for',
//             reviewedAt: '8 hours ago',
//           },
//           {
//             _id: utilService.makeId(),
//             name: 'raevyn22',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review: 'Always gets the job done',
//             reviewedAt: '1 day ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 3,
//             name: 'junyeongcho',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review: 'She could understand the contents and write well',
//             reviewedAt: '3 days ago',
//           },
//         ],
//         tags: [
//           {
//             name: 'technical writing',
//           },
//         ],
//       },
//       {
//         _id: utilService.makeId(),
//         image: [
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg',
//         ],
//         owner: {
//           _id: 'u105',
//           fullname: 'design_desk',
//           imgUrl:
//             'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/044fb5914a845a4eb59fc2b69f7f7b32-1634120039750/4dbc2acb-7322-4cd0-9afb-e5190e8e8a0d.jpg',
//           level: 1,
//           rate: 5,
//         },
//         likedByUsers: [1],
//         title: 'I will design 3 modern minimalist flat logo designs',
//         category: 'Graphics & Design',
//         subCategory: 'Logo Design',
//         description:
//           "Hi there ! Thanks for stopping by !!\nA Team of Talented Graphic Designer with 8+ years of experience in Graphic Industry, expertise as Logo Maker, You'll get creative & AWESOME logo design for your business.\nMy portfolio : https://www.fiverr.com/users/design_desk/portfolio/NjFiYjE4NmMwZTgwMDUwMDAxZTMzMjJh\n★ Why Us? ★\nTalented Logo Maker Team\nFully custom made, creative, original, UNIQUE and AWESOME designs\nProfessional customer support 24/7\nHigh Quality work\n100% money back policy if not satisfied\n★ WHAT DO YOU GET? ★\n✔ Highly Professional, UNIQUE & High Quality designs\n✔ UNLIMITED revisions until u r 100% satisfied\n✔ Fast turn around time 24 to 48 hours only.\n✔ 100% original & unique vector design from Adobe Illustrator\n✔ Vector Source Files (scalable without any quality loss) (AI, EPS, PDF) for the final design ✔ PROFESSIONAL Communication & Outstanding Customer Support ✔ Guaranteed High Quality work\nIf you have any question,\nFeel free to★ Contact Me! ★I'll be happy to help !\nLet's get started!\n-Your Logo Maker",
//         price: 33,
//         daysToMake: '3 Days Delivery',

//         loc: 'India',
//         memberSince: 'Jun 2014',
//         avgResponseTime: '2 hours',
//         lastDelivery: 'about 3 hours',
//         about:
//           "Hello! My name is VD. I am a connoisseur of art and music. I love being around nature and my pets. I have a team of professional graphic designers with an experience of 8+ years. We specialize in logo designing. We're available exclusively on fiverr to rock your world with our designing skills. Come and experience it for yourself!",
//         reviewers: [
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'airbornesnow',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               "The seller's communication was EXCELLENT and the service was exactly as described. When I wanted revisions, they did not hesitate to provide me with alterations of the design. Although they were nice and kind when I asked for the revisions, all the revisions were half a**ed and sloppy. Even when I provided a concept drawing for them to TRACE, the results were still not what I expected. Buyers BEWARE: The seller's communication is excellent, friendly, and VERY kind. However, if you ask for any revisions, the revisions you will receive will be sloppy and half-a**ed.",
//             reviewedAt: '4 days ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 2,
//             name: 'jacobmnb',
//             country: 'United Kingdom',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
//             review:
//               'I thought this service was amazing, I bought the basic option just hoping for a basic logo, but the seller went above my expectations and provided me with a bunch of concepts that were better than I could have imagined, for £7.90 I think this service is a must-buy for anyone needing a professional-looking logo and not wanting to spend a huge amount',
//             reviewedAt: '2 months ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'ashtonpeckham',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               "The seller was very responsive. We had revisions after the initial designs were delivered and the seller made them very quickly. The logo we selected is perfect for our current needs. Recommend including your vision in the initial request so you don't end up with ideas that you don't like. There were only 2 real contenders because the Fiverr site wouldn't allow me to attach my hand drawn idea. The paperclip icon was essentially rendered inactive, even after several attempts. This is no fault of the designers; i should have been even more descriptive with my request when I was unable to attach files.",
//             reviewedAt: '1 week ago',
//           },
//           {
//             _id: utilService.makeId(),
//             name: 'borowski10',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               "Ultimately, I am very happy with the final logo I received. However, the seller's communication could have been better. There were a few times I asked for specific revisions and I was sent the same thing or something else that I didn't ask for. It took about 2 weeks for me to finally get what I was looking for. In the end, I got what I paid for and I am grateful for the service!",
//             reviewedAt: '2 days ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 5,
//             name: 'fowlplay_uk',
//             country: 'United Kingdom',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png',
//             review:
//               "VD was great. I had a very specific design in mind already that I needed recreating professionally and they did not disappoint. Even when I started to get picky with the design, nothing I requested was ever too much trouble. We went through many revisions to get it to exactly how I wanted it and every interaction we had was effortless. This is the first project I'd commissioned so wasn't really sure on the correct etiquette, yet VD made things so easy for me. Can't recommend these guys enough for that",
//             reviewedAt: '2 months ago',
//           },
//         ],
//         tags: [
//           {
//             name: 'minimalist',
//           },
//           {
//             name: 'flat',
//           },
//           {
//             name: 'logo design',
//           },
//           {
//             name: 'modern',
//           },
//           {
//             name: 'unique',
//           },
//           {
//             name: 'logo maker',
//           },
//         ],
//       },
//       {
//         _id: utilService.makeId(),
//         image: [
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103152154/original/b89645456b7f6906afa872771737e980b6f57cfb.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103152154/original/b89645456b7f6906afa872771737e980b6f57cfb.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103152154/original/b89645456b7f6906afa872771737e980b6f57cfb.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103152154/original/b89645456b7f6906afa872771737e980b6f57cfb.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103152154/original/b89645456b7f6906afa872771737e980b6f57cfb.jpg',
//         ],
//         owner: {
//           _id: 'u106',
//           fullname: 'soduzai_gfx1',
//           imgUrl:
//             'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/a2dd1a0482bbfe54e61c6c2d6e64696e-1640431251801/943f73b5-dc43-4fe4-9728-9a58f0aafdbc.jpg',
//           level: 1,
//           rate: 3,
//         },
//         likedByUsers: [1, 1, 1, 1, 1, 1, 1, 1],
//         title: 'I will create modern unique and creative logo design',
//         description:
//           "Hi esteemed buyer!\nLooking for modern unique and creative 2d or 3d logo design? Yes, you're at the right place.\nHaving a vast experience with hundreds of satisfied customers across the globe, I extend my services to design modern unique and creative logo design to represent your brand idea in a befitting manner.\nWhat proves my individuality over others?\nQuick delivery, quality work and transforming your brain idea into a 3d creative unique and modern logo design are my attributes.\nMY GIG OFFERINGS ARE:\nBest customer care\nRevisions within 24 Hours\n100% satisfaction guaranteed\nModern unique and creative designing ideas\nLogically and aesthetically hypnotizing logos\n1 free revision after completion of order\nEditable and re-sizeable vector files\nFont download link included\nHigh resolution final files in zip\nNote: For Complex Illustrations and Mascots, please discuss in inbox before placing order! It is also not included in our packages.\nHave queries? Contact us in inbox anytime!\n★Hearing from you would be an absolute pleasure, Go ahead and ORDER NOW!★",
//         price: 84,
//         daysToMake: '2 Days Delivery',

//         loc: 'Pakistan',
//         memberSince: 'Oct 2017',
//         avgResponseTime: '1 hour',
//         lastDelivery: 'about 25 minutes',
//         about:
//           "I am a professional graphics designer from PakIsTaN... Designing is not only my job, it's my Passion. All I need from you is a rough sketch of your idea. Then you can just relax and see the magic happening. Not only you'll get stunning and professional designs, but also you'll have top class custome",
//         reviewers: [
//           {
//             _id: utilService.makeId(),
//             name: 'devsreads',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               'Thank you SO MUCH to the seller. He was so patient and willing to work and correct as many times as we needed as some things got miscommunicated and he easily fixed them. Thank you!!!',
//             reviewedAt: '3 days ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'raymondyslas',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               'This designer is awesome. I have got my idea materialised in an efficient manner and the way I wanted. Seeing this logo, I would say this is the best designer to do any kind of graphics work.',
//             reviewedAt: '1 month ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 5,
//             name: 'gbsol579',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               'This designer is so quick and efficient in his work. My order was delivered in few hours. The design is hypnotizing and truly reflects my business idea. Highly recommended!',
//             reviewedAt: '1 month ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'antoniodixon65',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               "This is a really good design. The designer owes the skills needed to actually understand and then materailize a buyer's idea. Commendable and highly recommended.",
//             reviewedAt: '1 month ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 5,
//             name: 'allendrozdowski',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               'This designer has done a fantastic job. I like the design sense and colour combination of the designer. This is what I was looking for. I highly recommend him for graphics related work.',
//             reviewedAt: '1 month ago',
//           },
//         ],
//         tags: [
//           {
//             name: 'modern logo',
//           },
//           {
//             name: 'creative logo',
//           },
//           {
//             name: 'logo design',
//           },
//           {
//             name: 'unique logo',
//           },
//           {
//             name: 'logo maker',
//           },
//         ],
//       },
//       {
//         _id: utilService.makeId(),
//         image: [
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125798593/original/fea4f6af37e201fa9cb71a85583fedc171da2a26.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125798593/original/fea4f6af37e201fa9cb71a85583fedc171da2a26.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125798593/original/fea4f6af37e201fa9cb71a85583fedc171da2a26.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125798593/original/fea4f6af37e201fa9cb71a85583fedc171da2a26.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125798593/original/fea4f6af37e201fa9cb71a85583fedc171da2a26.jpg',
//         ],
//         owner: {
//           _id: 'u107',
//           fullname: 'modernmarvel',
//           imgUrl:
//             'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d366617946e54cbc9aa114f27259e3ef-1552848300306/3c155f72-15c9-47d0-8f68-b75a519a7999.jpg',
//           level: 3,
//           rate: 5,
//         },
//         likedByUsers: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//         title: 'I will design 3 modern minimalist logo design',
//         description:
//           'ModernMarvel heartily welcomes you to Minimalist Modern Logo Design gig.\nWe are Brand Creators and professional business consultants. Each business has his own story to tell and having high recall value is prime purpose behind getting a LOGO. Thus, We believe in creating simple yet effective masterpiece which blown away your customers mind.\nYour idea of getting Modern memorable and attractive logo design is just one step away. So, Lets discuss and choose a best design for your business.\nOur recommendation BRANDING PACK @ US$65 ONLY:\n5 BRANDED logos with minimal designs + vector source files\nAttractive Social media covers (FB + Twitter)\nProfessional stationery design (B card + letterhead)\nUnlimited revision rounds\nExclusive customer support\nRefund & Package selection guidelines:\nIf the designs are as per your initial shared brief, refund wont be a possible option. You can ask for revision if i missed out anything.\nMy samples are from my premium / standard package.\nWe are closed on Sunday.\nMy key skills:\nMinimalist Modern Logo Design | Minimal | Modern | Typography | Line art | Custom logo | Vintage |\nKeen to Get Started!',
//         price: 50,
//         daysToMake: '1 Day Delivery',

//         loc: 'India',
//         memberSince: 'Mar 2019',
//         avgResponseTime: '2 hours',
//         lastDelivery: 'about 22 minutes',
//         about:
//           'I am a professional artist having rich experience in hand sketched and digital artwork. I have served tons of businesses with smarter business solutions. I am here to get the global exposure and would like to contribute more towards our creative community. Thanks.',
//         reviewers: [
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'bartstrijbos',
//             country: 'Netherlands',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png',
//             review:
//               'Use your revisions and communication, and you will have something that works for you! I recommend modernmarvel for the price they ask! I did not know what to expect from my first buy on FIverr. The previews where what I was going for, so I thought why not give it a try. The initial delivery had two good concepts and three concepts I did not like. The two good concepts however, where not really what I wanted though. I submitted a revision proposal and hoped for the best. This is where this seller shines! From the initial designs, he worked quickly with every suggestion I made for revisions and was good in communication. I slowly saw my project evolving to something I love. Recommended!',
//             reviewedAt: '2 months ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 5,
//             name: 'v_winko33',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               "Working with this seller was a great experience in that he was quick to respond (considering the 11+ hr time zone difference), friendly, reliable, and professional. He created some concepts with literally no reference the first time around, and the second time around I gave him more of an idea of what I was looking for and found the ideal logo. You get what you pay for, and the price I think is a very good deal that's hard to find. Communication +asking questions is key to get all that you want and need from this great offer. Although I am satisfied with the logo, I probably would've liked something more like the work he shows in his second picture on his profile/gigs. I do recommend him!",
//             reviewedAt: '3 weeks ago',
//           },
//           {
//             _id: utilService.makeId(),
//             name: 'brendanpaull',
//             country: 'Japan',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ef-1f1f5.png',
//             review:
//               'Seller was extremely communicative and always responded very quickly even on his/her day off (Sunday). While I got something that will get my started and I suppose I got what I paid for (the price was definitely quite low), I would be hard pressed to call the designs I got as "modern" or "minimalist" like the logo presented in the profile. They felt like clip-art from 10 to 15 years ago attached to my website name.',
//             reviewedAt: '1 month ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 3,
//             name: 'tracyblehm',
//             country: 'Canada',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png',
//             review:
//               'I was a little nervous as I had never hired anyone before and have had bad experiences on other platforms. However this was absolutely marvelous. I loved the design. It was shocking how fast it was done and how amazing it turned out. I will definitely be hiring them again for my other projects that are coming up. Thank-you!!',
//             reviewedAt: '2 months ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'jai_s22',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               'Using this service was a pretty decent experience. It took a bit longer than I wanted to finally get the final design. I had to go back and forth for a week trying to find the correct revision of the design. At first, I thought the experience of the designer was not the best due to finding some logos with minimal effort. Once I messaged the designer that I felt that the designs that they were producing were not satisfying me, they then were able to put a lot of effort into my ideas. I personally had to come up with the design of my logo instead of them using their experience and trusting them to come up with one themselves. Eventually, they did deliver so I am happy with the way it finished.',
//             reviewedAt: '2 weeks ago',
//           },
//         ],
//         tags: [
//           {
//             name: 'modern logo',
//           },
//           {
//             name: 'custom logo',
//           },
//           {
//             name: 'logo design',
//           },
//           {
//             name: 'minimalist logo',
//           },
//           {
//             name: 'website logo',
//           },
//           {
//             name: 'logo maker',
//           },
//         ],
//       },
//       {
//         _id: utilService.makeId(),
//         image: [
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/142024147/original/25c0cb214ccc1e1458cb975cddec0e3e348f75ee.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/142024147/original/25c0cb214ccc1e1458cb975cddec0e3e348f75ee.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/142024147/original/25c0cb214ccc1e1458cb975cddec0e3e348f75ee.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/142024147/original/25c0cb214ccc1e1458cb975cddec0e3e348f75ee.jpg',
//           'https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/142024147/original/25c0cb214ccc1e1458cb975cddec0e3e348f75ee.jpg',
//         ],
//         owner: {
//           _id: 'u108',
//           fullname: 'shailene_george',
//           imgUrl:
//             'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/3ec0d56f436079ef157dbcc1d21c4c62-1625030446037/1c926a30-7aa5-4de8-9a3b-6565be7ddd5b.jpg',
//           level: 1,
//           rate: 5,
//         },
//         likedByUsers: [1, 1],
//         title:
//           'I will do professional modern business logo design with copyrights',
//         category: 'Graphics & Design',
//         subCategory: 'Logo Design',
//         description:
//           'Greetings!! Welcome to Budding Solutions.\n"Your one-stop-shop for all your graphic needs"\nIf you are looking for a Modern and Professional Business logo design, then you are at the right place. We focus on creating simple yet effective designs that elevate your business outlook and leave an everlasting impression.\nWe stand out from our competition due to our best-in-class Customer Support and Quality Designs.\nWhy Us?\n✔ Combination of experience and creativity\n✔ Unique and original designs\n✔ Superior customer care and satisfaction\n✔ Transparent and High-resolution image types\n✔ Different types of source files (AI, EPS, PDF and SVG)\n✔ Complete Branding Guide\n✔ Unlimited revisions until you are 100% satisfied\n✔ Full Copyrights\nMASCOT DESIGNS ARE NOT INCLUDED IN BASIC OR STANDARD GIGS.\nTHE DESIGNS SHOWN ON THE PORTFOLIO ARE FROM STANDARD OR PREMIUM PACKS.\nLogo Design | Professional Logo | Modern Logo | Badge | Hand drawn | Feminine | Signature | Business Logo\nWe look forward to working with you. Please don\'t hesitate to reach out at any time with any questions.\nPlease review the FAQ section for further clarification.',
//         price: 151,
//         daysToMake: '2 Days Delivery',

//         loc: 'Pakistan',
//         memberSince: 'Jun 2016',
//         avgResponseTime: '1 hour',
//         lastDelivery: 'about 16 minutes',
//         about:
//           "Welcome to Budding Solutions. An agency of 15+ Graphic Designers with great expertise. We strive to provide unique & graphically rich designs with exceptional & lifetime customer service. Let us be your GO-TO option for your graphic design needs and you won't be disappointed.",
//         reviewers: [
//           {
//             _id: utilService.makeId(),
//             rate: 5,
//             name: 'bossymouse',
//             country: 'Netherlands',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png',
//             review:
//               "I'd recommend this seller. She was skilled and very communicative. Also I got tons of revisions as promised and always quickly. Sometimes it was hard to get her to polish the details as I intended, I think because of the language barrier, but if a revision turned out different than I expected she started working on it again without asking questions. Lastly she gave tips about branding when needed. To be honest I'm not quite sure if the social media kit and website optimized image were worth my money, because those were mostly the same image in different ratios. But I probably had unrealistic expectations. On the other hand the copyright document is very polished and accurate!",
//             reviewedAt: '1 week ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'coastalcleaners',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               "I'm so grateful & thrilled that I can say, my experience was a sucess! I love my LOGO that Shailene created, I couldn't be happier! I reached out and let her know exactly what I needed, she promptly responded and made me an offer. I couldn't refuse, as she was more than willing to accommodate my budget. She sent me the drafts soon after, and I was pleased to see the results! I didn't need any revisions and I'm pleased to say that I've now got a NEW LOGO For my Brand/Company. I officially feel Accomplished! Thank you SO Much Shailene and Fiverr! You have made this journey so much lighter on my feet, and I would definitely recommend Shailene as an Artist and the Fiverr company!",
//             reviewedAt: '3 weeks ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 3,
//             name: 'ndethlefs',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               "This was the first time I've used Fiverr and was a little worried how it would go. This was by far the best experience I've had working with someone remote and at a fair price. shailene_george always got back to me right away. I couldn't be happier with my experience and will also being recommending George to anyone I can and using again when needed. 5 stars all the way here!",
//             reviewedAt: '3 weeks ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 5,
//             name: 'mrmikevh',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               "Shailene is awesome to work with. Very professional and attentive. She deliveries amazing work at a value you just can't find anywhere else. As a busy front-end developer, I find buying her premium GIG is the way to go. My clients are always blown away with her work. She has made me a customer for life with her work and her friendly personality. Thank you Shailene and bless you. Can't wait for our next GIG together.",
//             reviewedAt: '2 months ago',
//           },
//           {
//             _id: utilService.makeId(),
//             rate: 4,
//             name: 'j_powell23',
//             country: 'United States',
//             flag: 'https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png',
//             review:
//               "A friend of mine (Maximum Performance Productions) recommended Fiverr. I'm starting a new business and needed a design to catapult us to new heights. It didn't take long to find the right artist. Shallene was able to capture my idea and interpret it into the design that I am very pleased with. Her communication skills and response time are second to none. She is very informative and answered all my questions satisfactorily. Shallene performed her tasks timely and without delay. I am forever grateful for the outstanding designs she has provided and would highly recommend her to anyone. Thank You Shallene!",
//             reviewedAt: '1 week ago',
//           },
//         ],
//         tags: [
//           {
//             name: 'modern logo',
//           },
//           {
//             name: 'logo',
//           },
//           {
//             name: 'custom logo',
//           },
//           {
//             name: 'creative logo',
//           },
//           {
//             name: 'professional logo',
//           },
//           {
//             name: 'logo maker',
//           },
//         ],
//       },
//     ]

//     utilService.saveToStorage(GIG_STORAGE_KEY, gigs)
//   }
//   return gigs
// }
