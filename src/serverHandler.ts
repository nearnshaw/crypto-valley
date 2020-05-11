// import { UserData, getUserData } from '@decentraland/Identity'
// //import { signaturesUI, guestBookPage } from './ui'
import utils from 'node_modules/decentraland-ecs-utils/index'
import { v, music } from './game'

export const refreshInterval: number = 5
let partyTime = new Date('2020-05-09T19:33:25-03:00')

// export function checkTime() {
//   let url = `http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires`

//   executeTask(async () => {
//     try {
//       let response = await fetch(url)
//       let json = await response.json()
//       log('time: ', json.datetime)

//       let toDate = new Date(json.datetime)

//       log('time: ', toDate)
//       if (toDate > partyTime) {
//         startParty()
//         engine.removeSystem(checkTimeSystem)
//       }
//     } catch {
//       log('error getting slide data')
//     }
//   })
// }

// export function startParty() {
//   log('PARTY TIME!')
//   v.playing = false
//   music.playing = true
//   largeScreen.visible = false
// }

// export class CheckTime implements ISystem {
//   timer: number
//   constructor(timer: number) {
//     this.timer = timer
//   }
//   update(dt: number) {
//     this.timer -= dt
//     if (this.timer < 0) {
//       this.timer = refreshInterval
//       checkTime()
//     }
//   }
// }

// let checkTimeSystem = engine.addSystem(new CheckTime(refreshInterval))

// export const apiUrl = 'https://slides.decentraland.zone' //'https://192.34.60.92:443' //'http://192.34.60.92:7753' //'http://127.0.0.1:7753'

// export const sceneName = 'demoroom'

// export var currentSlide: number = 0

// var linesPerGuestBookPage = 5

// export const sceneMessageBus = new MessageBus()

// // how often to refresh scene, in seconds

// // get user data

// export let userData: UserData

// export function getUser() {
//   executeTask(async () => {
//     userData = await getUserData()
//     //log('USER ETH ADDRESS: ', userData.publicKey)
//   })
// }
// getUser()

// let allSignatures = []

// //// CANVAS

// let initialurl =
//   'https://dcl-slides.s3.us-east-2.amazonaws.com/dclblogger/slide0.png'

// export let CanvasMaterial = new Material()
// CanvasMaterial.albedoTexture = new Texture(initialurl)

// // export let canvas = new Entity()
// // canvas.addComponent(new BoxShape())
// // canvas.addComponent(CanvasMaterial)
// // canvas.addComponent(
// //   new Transform({
// //     position: new Vector3(56, 13.9, 61),
// //     rotation: Quaternion.Euler(0, 180, 180),
// //     scale: new Vector3(10 * 3.2, 5.6 * 3.2, 0.01),
// //   })
// // )
// // engine.addEntity(canvas)

// // export let canvas2 = new Entity()
// // canvas2.addComponent(new BoxShape())
// // canvas2.addComponent(CanvasMaterial)
// // canvas2.addComponent(
// //   new Transform({
// //     position: new Vector3(56, 2.28, 53.03),
// //     rotation: Quaternion.Euler(-40, 180, 0),
// //     scale: new Vector3(16 * 0.05, 9 * 0.05, 0.005),
// //   })
// // )
// // engine.addEntity(canvas2)

// /// AUTOUPDATES

// // export class CheckServer implements ISystem {
// //   timer: number
// //   constructor(timer: number) {
// //     this.timer = timer
// //   }
// //   update(dt: number) {
// //     this.timer -= dt
// //     if (this.timer < 0) {
// //       this.timer = refreshInterval
// //       getFromServer()
// //     }
// //   }
// // }

// // engine.addSystem(new CheckServer(refreshInterval))

// // getFromServer(true)

// // when a pixel is clicked, send data to server

// export function switchSlide(scene: string, slideNumber: number) {
//   currentSlide = slideNumber
//   if (currentSlide < 0) {
//     currentSlide = 0
//   }
//   let url = `${apiUrl}/api/dclslides/setslide?scene=${scene}&page=${slideNumber.toString()}`
//   let method = 'POST'
//   let headers = { 'Content-Type': 'application/json' }

//   executeTask(async () => {
//     try {
//       let response = await fetch(url, {
//         headers: headers,
//         method: method,
//       }).then(() => {
//         fetchSlide(sceneName, slideNumber)
//       })
//     } catch {
//       log('error getting slide data')
//     }
//   })
//   sceneMessageBus.emit('checkslides', {})
// }

// export function fetchSlide(scene: string, slideNumber: number) {
//   let url = `${apiUrl}/api/dclslides/slide?scene=${scene}&page=${slideNumber.toString()}`
//   executeTask(async () => {
//     try {
//       let response = await fetch(url)
//       let json = await response.json()

//       log('updating slide')

//       updateCanvasMaterial(json.slide)
//     } catch {
//       log('error getting slide data')
//     }
//   })
// }

// export function getFromServer(force?: boolean) {
//   let url = `${apiUrl}/api/dclslides/currentslide?scene=${sceneName}`

//   executeTask(async () => {
//     try {
//       let response = await fetch(url)
//       let json = await response.json()

//       if (currentSlide != parseInt(json.slideNumber) || force) {
//         currentSlide = parseInt(json.slideNumber)
//         log('updating slide ', currentSlide)
//         updateCanvasMaterial(json.slide)
//       }
//       //getGuestBook()
//     } catch {
//       log('error getting slide data')
//     }
//   })
// }

// export function updateCanvasMaterial(texture: string) {
//   //   CanvasMaterial.albedoTexture = new Texture(texture)
//   //   canvas.addComponentOrReplace(CanvasMaterial)
//   //   canvas2.addComponentOrReplace(CanvasMaterial)
// }

// export function signGuestBook() {
//   let url = `${apiUrl}/api/dclslides/sign?scene=${sceneName}&id=${userData.displayName}`
//   if (userData.publicKey) {
//     url = `${apiUrl}/api/dclslides/sign?scene=${sceneName}&id=${userData.displayName}&wallet=${userData.publicKey}`
//   }

//   log('signing as ', userData.displayName)
//   executeTask(async () => {
//     try {
//       let response = await fetch(url).then()

//       let json = await response.json()
//       //log(json)
//       await getFromServer(true)
//     } catch {
//       log('error signing guestbook')
//     }
//   })
// }

// // export function getGuestBook() {
// //   let url = `${apiUrl}/api/dclslides/guestbook?scene=${sceneName}`

// //   executeTask(async () => {
// //     try {
// //       let response = await fetch(url).then()

// //       let json = await response.json()
// //       allSignatures = json.signatures
// //       //log(json)
// //       let signatureList = ['']
// //       //log('we have ', json.signatures.length, ' signatures')

// //       let signaturePage = 0
// //       for (let i = 0; i < allSignatures.length; i++) {
// //         signatureList[signaturePage] = signatureList[signaturePage].concat(
// //           allSignatures[i].id
// //         )
// //         signatureList[signaturePage] = signatureList[signaturePage].concat(
// //           ' - '
// //         )
// //         let lines = signatureList[signaturePage].split('\n')
// //         if (lines[lines.length - 1].length > 25) {
// //           signatureList[signaturePage] = signatureList[signaturePage].concat(
// //             '\n'
// //           )
// //         }

// //         if (lines.length >= linesPerGuestBookPage) {
// //           signaturePage += 1
// //           signatureList.push('')
// //           //guestBookPage
// //         }
// //       }
// //       signaturesUI.value = signatureList[guestBookPage - 1]
// //       log(
// //         'signature to show from page ',
// //         guestBookPage,
// //         ' :',
// //         signatureList[guestBookPage - 1]
// //       )
// //     } catch {
// //       log('error fetching from guestbook')
// //     }
// //   })
// // }

// let confirmDummy = new Entity()
// engine.addEntity(confirmDummy)

// // sceneMessageBus.on('checkslides', (e) => {
// //   getFromServer(true)
// //   confirmDummy.addComponentOrReplace(
// //     new utils.Delay(500, () => {
// //       getFromServer(true)
// //     })
// //   )
// // })
