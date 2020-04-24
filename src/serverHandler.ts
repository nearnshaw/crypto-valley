///// Connect to the REST API

import { userData } from './contractHandler'

export const apiUrl = 'http://127.0.0.1:7753'

export const sceneName = 'valley'

export var currentSlide: number = 0

// how often to refresh scene, in seconds
export const refreshInterval: number = 1

//// CANVAS

let initialurl =
  'https://dcl-slides.s3.us-east-2.amazonaws.com/googlegorra/slide0.png'

export let CanvasMaterial = new Material()
CanvasMaterial.albedoTexture = new Texture(initialurl)

export let canvas = new Entity()
canvas.addComponent(new BoxShape())
canvas.addComponent(CanvasMaterial)
canvas.addComponent(
  new Transform({
    position: new Vector3(56, 13, 62),
    rotation: Quaternion.Euler(0, 180, 180),
    scale: new Vector3(10 * 3.2, 5.6 * 3.2, 0.01),
  })
)
engine.addEntity(canvas)

export let canvas2 = new Entity()
canvas2.addComponent(new BoxShape())
canvas2.addComponent(CanvasMaterial)
canvas2.addComponent(
  new Transform({
    position: new Vector3(56, 1.95, 52),
    rotation: Quaternion.Euler(-28, 0, 180),
    scale: new Vector3(10 * 0.21, 5.6 * 0.21, 0.01),
  })
)
engine.addEntity(canvas2)

/// AUTOUPDATES

export class CheckServer implements ISystem {
  timer: number
  constructor(timer: number) {
    this.timer = timer
  }
  update(dt: number) {
    this.timer -= dt
    if (this.timer < 0) {
      this.timer = refreshInterval
      getFromServer()
    }
  }
}

//engine.addSystem(new CheckServer(refreshInterval))

getFromServer(true)

// when a pixel is clicked, send data to server

export function switchSlide(scene: string, slide: number) {
  let url = `${apiUrl}/api/dclslides/setslide?scene=${sceneName}&page=${slide.toString()}`
  let method = 'POST'
  let headers = { 'Content-Type': 'application/json' }
  executeTask(async () => {
    try {
      let response = await fetch(url, {
        headers: headers,
        method: method,
      }).then()

      let json = await response.json()
      //log(json)
      await getFromServer(true)
    } catch {
      log('error getting slide data')
    }
  })
}

export function signGuestBook() {
  let url = `${apiUrl}/api/dclslides/sign?scene=${sceneName}&id=${userData.displayName}&wallet=${userData.publicKey}`
  let method = 'POST'
  let headers = { 'Content-Type': 'application/json' }
  executeTask(async () => {
    try {
      let response = await fetch(url, {
        headers: headers,
        method: method,
      }).then()

      let json = await response.json()
      //log(json)
      await getFromServer(true)
    } catch {
      log('error signing guestbook')
    }
  })
}

export function getFromServer(force?: boolean) {
  let slideurl = `${apiUrl}/api/dclslides/currentslide?scene=${sceneName}`

  executeTask(async () => {
    try {
      let response = await fetch(slideurl)
      let json = await response.json()
      //log(json)

      if (currentSlide != json.slideNumber || force) {
        log('updating slide')
        currentSlide = json.slideNumber
        updateCanvasMaterial(json.slide)
      }

      // get guestbook

      // get donations

      // get banners
    } catch {
      log('error getting slide data')
    }
  })
}

export function updateCanvasMaterial(texture: string) {
  CanvasMaterial.albedoTexture = new Texture(texture)
  canvas.addComponent(CanvasMaterial)
}
