import { currentSlide, sceneName, switchSlide } from './serverHandler'

import utils from '../node_modules/decentraland-ecs-utils/index'
import decentralandEcsUtils from '../node_modules/decentraland-ecs-utils/index'

export const sceneMessageBus = new MessageBus()

let building = new Entity()
building.addComponent(new GLTFShape('models/DCL_CC.glb'))
building.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(building)

// let turtle = new Entity()
// turtle.addComponent(new GLTFShape('models/turtle.glb'))
// turtle.addComponent(
//   new Transform({
//     position: new Vector3(56, 1.25, 55.8),
//     rotation: Quaternion.Euler(0, 180, 0),
//     scale: new Vector3(1.7, 1.7, 1.7),
//   })
// )
// engine.addEntity(turtle)

let lights1 = new Entity()
lights1.addComponent(new GLTFShape('models/LightSet_1.glb'))
lights1.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(lights1)

let lights2 = new Entity()
lights2.addComponent(new GLTFShape('models/LightSet_2.glb'))
lights2.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(lights2)

let lightsA = new Entity()
lightsA.addComponent(new GLTFShape('models/Lights_A.glb'))
lightsA.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(lightsA)

let lightsB = new Entity()
lightsB.addComponent(new GLTFShape('models/Lights_B.glb'))
lightsB.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(lightsB)

let elevator = new Entity()
elevator.addComponent(new GLTFShape('models/elevator.glb'))
elevator.addComponent(
  new Transform({
    position: new Vector3(56, 0, 16 + 8),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(1, 1, 1),
  })
)
engine.addEntity(elevator)

///// ROOF BANNER

// let banner = new Entity()
// banner.addComponent(new GLTFShape('models/banner.glb'))
// banner.addComponent(
//   new Transform({
//     position: new Vector3(56, 0, 16 + 8),
//     rotation: Quaternion.Euler(0, 180, 0),
//   })
// )
// engine.addEntity(banner)

///////  POSITIONAL TALK SOUND

// let talk = new AmbientSound(
//   { position: new Vector3(56, 2, 55) },
//   'sounds/talk.mp3',
//   0,
//   true,
//   1
// )

/////// Buttons

const base = new Entity()

base.addComponent(new GLTFShape('models/Base.glb'))

base.addComponent(
  new Transform({
    position: new Vector3(56, 1.25, 53),
    rotation: Quaternion.Euler(0, 90, 0),
  })
)
engine.addEntity(base)

const buttonNext = new Entity()

buttonNext.addComponent(new GLTFShape('models/Right_Arrow.glb'))

const animatorN = new Animator()
const clipButtonN = new AnimationState('RightArrow_Action', { looping: false })
animatorN.addClip(clipButtonN)
buttonNext.addComponent(animatorN)
buttonNext.addComponent(
  new Transform({
    position: new Vector3(56, 1.25, 53),
    rotation: Quaternion.Euler(0, 90, 0),
  })
)

buttonNext.addComponent(
  new OnPointerDown(
    () => {
      clipButtonN.stop()
      clipButtonN.play()
      switchSlide(sceneName, currentSlide + 1)
    },
    {
      button: ActionButton.POINTER,
      hoverText: 'Next',
      distance: 10,
    }
  )
)

engine.addEntity(buttonNext)

const buttonLast = new Entity()

buttonLast.addComponent(new GLTFShape('models/Left_Arrow.glb'))

const animatorL = new Animator()
const clipButtonL = new AnimationState('LeftArrow_Action', { looping: false })
animatorL.addClip(clipButtonL)
buttonLast.addComponent(animatorL)
buttonLast.addComponent(
  new Transform({
    position: new Vector3(56, 1.25, 53),
    rotation: Quaternion.Euler(0, 90, 0),
  })
)

buttonLast.addComponent(
  new OnPointerDown(
    () => {
      clipButtonL.stop()
      clipButtonL.play()
      switchSlide(sceneName, currentSlide - 1)
    },
    {
      button: ActionButton.POINTER,
      hoverText: 'Last',
      distance: 10,
    }
  )
)

engine.addEntity(buttonLast)

/////// DISPENSER MACHINES

// let Machines = []

// const machine1 = new Dispenser(
//   new GLTFShape('models/abstract-machine.glb'),
//   {
//     position: new Vector3(42, 1.3, 59),
//     rotation: Quaternion.Euler(0, 180, 0),
//   },
//   'protection_mask_abstract_mask',
//   //'mask_10',
//   'machine1'
// )

// sceneMessageBus.on('boughtMask', (e) => {
//   log(e.id)
//   for (let machine of Machines) {
//     if (machine.id == e.id) {
//       machine.buy()
//     }
//   }
// })

//// MUSIC

const streamSource = new Entity()
streamSource.addComponent(new Transform({ position: new Vector3(56, 10, 55) }))
let music = new AudioStream(
  'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3'
)
streamSource.addComponent(music)
music.playing = false
engine.addEntity(streamSource)

//////// HACK TO SEE POSITIONS

// const camera = Camera.instance

// class CameraTrackSystem implements ISystem {
//   update() {
//     log(camera.position)
//   }
// }

// engine.addSystem(new CameraTrackSystem())

const roofMusicrTrigger = new Entity()
roofMusicrTrigger.addComponent(
  new Transform({ position: new Vector3(56, 30, 26 + 8) })
)

let roofMusicrTriggerBox = new utils.TriggerBoxShape(
  new Vector3(80, 20, 70),
  Vector3.Zero()
)
roofMusicrTrigger.addComponent(
  new utils.TriggerComponent(
    roofMusicrTriggerBox, //shape
    0, //layer
    0, //triggeredByLayer
    null, //onTriggerEnter
    null, //onTriggerExit
    () => {
      music.playing = true
      log('triggered!')
    },
    () => {
      music.playing = false
    },
    false
  )
)
engine.addEntity(roofMusicrTrigger)

const e = new Entity()
e.addComponent(new PlaneShape())
e.addComponent(
  new Transform({
    position: new Vector3(56, 13.9, 61),
    rotation: Quaternion.Euler(0, 180, 0),
    scale: new Vector3(10 * 3.2, 5.6 * 3.2, 0.01),
  })
)
const v = new VideoTexture(new VideoClip('http://134.122.31.53/hls/test.m3u8'))
const mat = new BasicMaterial()
mat.texture = v
e.addComponent(mat)
e.addComponent(
  new OnClick(() => {
    v.playing = !v.playing
    label.getComponent(TextShape).value = ''
  })
)
engine.addEntity(e)

let label = new Entity()
label.addComponent(
  new Transform({
    position: new Vector3(56, 13.9, 60.9),
    rotation: Quaternion.Euler(0, 0, 0),
  })
)
label.addComponent(new TextShape('Click to start streaming!'))
label.getComponent(TextShape).color = Color3.Black()
engine.addEntity(label)
