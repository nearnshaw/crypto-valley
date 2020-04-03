import { AmbientSound } from './ambient'
import { currentSlide, sceneName, switchSlide } from './serverHandler'

import { openUI } from './ui'
import utils from '../node_modules/decentraland-ecs-utils/index'
import decentralandEcsUtils from '../node_modules/decentraland-ecs-utils/index'

let building = new Entity()
building.addComponent(new GLTFShape('models/DCL_CC.glb'))
building.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1)
  })
)
engine.addEntity(building)

let turtle = new Entity()
turtle.addComponent(new GLTFShape('models/turtle.glb'))
turtle.addComponent(
  new Transform({
    position: new Vector3(56, 1.25, 55.8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1.7, 1.7, 1.7)
  })
)
engine.addEntity(turtle)

let lights1 = new Entity()
lights1.addComponent(new GLTFShape('models/LightSet_1.glb'))
lights1.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1)
  })
)
engine.addEntity(lights1)

let lights2 = new Entity()
lights2.addComponent(new GLTFShape('models/LightSet_2.glb'))
lights2.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1)
  })
)
engine.addEntity(lights2)

let elevator = new Entity()
elevator.addComponent(new GLTFShape('models/elevator.glb'))
elevator.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1)
  })
)
engine.addEntity(elevator)

let banner = new Entity()
banner.addComponent(new GLTFShape('models/banner.glb'))
banner.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0)
  })
)
engine.addEntity(banner)

// let talk = new AmbientSound(
//   { position: new Vector3(56, 2, 55) },
//   'sounds/talk.mp3',
//   0,
//   true,
//   1
// )

// const camera = Camera.instance

// class CameraTrackSystem implements ISystem {
//   update() {
//     log(camera.position)
//   }
// }

// engine.addSystem(new CameraTrackSystem())

//// Buttons

const buttonNext = new Entity()

buttonNext.addComponent(new GLTFShape('models/Red_Button.glb'))

const animatorN = new Animator()
const clipButtonN = new AnimationState('trigger', { looping: false })
animatorN.addClip(clipButtonN)
buttonNext.addComponent(animatorN)
buttonNext.addComponent(
  new Transform({
    position: new Vector3(55, 1.25, 53)
  })
)

buttonNext.addComponent(
  new OnPointerDown(
    () => {
      clipButtonN.stop()
      clipButtonN.play()
      currentSlide = Number(currentSlide) + 1
      switchSlide(sceneName, currentSlide)
    },
    {
      button: ActionButton.POINTER,
      hoverText: 'Next',
      distance: 10
    }
  )
)

engine.addEntity(buttonNext)

const buttonLast = new Entity()

buttonLast.addComponent(new GLTFShape('models/Red_Button.glb'))

const animatorL = new Animator()
const clipButtonL = new AnimationState('trigger', { looping: false })
animatorL.addClip(clipButtonL)
buttonLast.addComponent(animatorL)
buttonLast.addComponent(
  new Transform({
    position: new Vector3(57, 1.25, 53)
  })
)

buttonLast.addComponent(
  new OnPointerDown(
    () => {
      clipButtonL.stop()
      clipButtonL.play()
      currentSlide = Number(currentSlide) - 1
      if (currentSlide < 0) {
        currentSlide = 0
      }
      switchSlide(sceneName, currentSlide)
    },
    {
      button: ActionButton.POINTER,
      hoverText: 'Last',
      distance: 10
    }
  )
)

engine.addEntity(buttonLast)

/// wearables dispenser

let wearableStand1 = new Entity()
wearableStand1.addComponent(
  new Transform({
    position: new Vector3(4, 0, 55)
  })
)

wearableStand1.addComponent(new GLTFShape('models/machine.glb'))
let idleAnim = new AnimationState('idle', { looping: true })
let buyAnim = new AnimationState('buy', { looping: false })
let newMaskAnim = new AnimationState('new_mask', { looping: false })
let stand1Anim = new Animator()
stand1Anim.addClip(idleAnim)
stand1Anim.addClip(newMaskAnim)
stand1Anim.addClip(buyAnim)
wearableStand1.addComponent(stand1Anim)
idleAnim.play()
wearableStand1.addComponent(
  new OnPointerDown(e => {
    openUI('mask_10', wearableStand1)
  })
)
engine.addEntity(wearableStand1)

let stand1Particles = new Entity()
stand1Particles.addComponent(
  new Transform({
    position: new Vector3(4, 0, 55)
  })
)
stand1Particles.addComponent(new GLTFShape('models/particles.glb'))
engine.addEntity(stand1Particles)

export function shopAnim(stand: Entity) {
  let anim = stand.getComponent(Animator)

  anim.getClip('idle').stop()
  anim.getClip('buy').stop()
  anim.getClip('new_mask').stop()

  anim.getClip('buy').play()

  stand.addComponentOrReplace(
    new utils.Delay(4000, () => {
      anim.getClip('buy').stop()
      anim.getClip('new_mask').play()
    })
  )
}
