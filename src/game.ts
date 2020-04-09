import { AmbientSound } from './ambient'
import { currentSlide, sceneName, switchSlide } from './serverHandler'

import { openUI, currentMask } from './ui'
import utils from '../node_modules/decentraland-ecs-utils/index'
import decentralandEcsUtils from '../node_modules/decentraland-ecs-utils/index'
import { Dispenser } from './dispenser'
import { startScreen } from './screen text'

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

// const buttonNext = new Entity()

// buttonNext.addComponent(new GLTFShape('models/Red_Button.glb'))

// const animatorN = new Animator()
// const clipButtonN = new AnimationState('trigger', { looping: false })
// animatorN.addClip(clipButtonN)
// buttonNext.addComponent(animatorN)
// buttonNext.addComponent(
//   new Transform({
//     position: new Vector3(55, 1.25, 53),
//   })
// )

// buttonNext.addComponent(
//   new OnPointerDown(
//     () => {
//       clipButtonN.stop()
//       clipButtonN.play()
//       currentSlide = Number(currentSlide) + 1
//       switchSlide(sceneName, currentSlide)
//     },
//     {
//       button: ActionButton.POINTER,
//       hoverText: 'Next',
//       distance: 10,
//     }
//   )
// )

// engine.addEntity(buttonNext)

// const buttonLast = new Entity()

// buttonLast.addComponent(new GLTFShape('models/Red_Button.glb'))

// const animatorL = new Animator()
// const clipButtonL = new AnimationState('trigger', { looping: false })
// animatorL.addClip(clipButtonL)
// buttonLast.addComponent(animatorL)
// buttonLast.addComponent(
//   new Transform({
//     position: new Vector3(57, 1.25, 53),
//   })
// )

// buttonLast.addComponent(
//   new OnPointerDown(
//     () => {
//       clipButtonL.stop()
//       clipButtonL.play()
//       currentSlide = Number(currentSlide) - 1
//       if (currentSlide < 0) {
//         currentSlide = 0
//       }
//       switchSlide(sceneName, currentSlide)
//     },
//     {
//       button: ActionButton.POINTER,
//       hoverText: 'Last',
//       distance: 10,
//     }
//   )
// )

// engine.addEntity(buttonLast)

/////// DISPENSER MACHINES

let Machines = []

const machine1 = new Dispenser(
  new GLTFShape('models/abstract-machine.glb'),
  {
    position: new Vector3(42, 1.3, 59),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'protection_mask_abstract_mask', //'mask_10'
  'machine1'
)

const machine2 = new Dispenser(
  new GLTFShape('models/african-machine.glb'),
  {
    position: new Vector3(46, 1.3, 59),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'protection_mask_african_mask', //'mask_9'
  'machine2'
)

const machine3 = new Dispenser(
  new GLTFShape('models/funny-machine.glb'),
  {
    position: new Vector3(50, 1.3, 59),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'protection_mask_funny_mask',
  'machine3'
)

const machine4 = new Dispenser(
  new GLTFShape('models/graffiti-machine.glb'),
  {
    position: new Vector3(54, 1.3, 59),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'protection_mask_graffiti_mask',
  'machine4'
)

const machine5 = new Dispenser(
  new GLTFShape('models/hot-machine.glb'),
  {
    position: new Vector3(58, 1.3, 59),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'protection_mask_hot_mask',
  'machine5'
)

const machine6 = new Dispenser(
  new GLTFShape('models/monster-machine.glb'),
  {
    position: new Vector3(62, 1.3, 59),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'protection_mask_monster_mask',
  'machine6'
)

const machine7 = new Dispenser(
  new GLTFShape('models/skull-machine.glb'),
  {
    position: new Vector3(66, 1.3, 59),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'protection_mask_skull_mask',
  'machine7'
)

const machine8 = new Dispenser(
  new GLTFShape('models/tiger-machine.glb'),
  {
    position: new Vector3(70, 1.3, 59),
    rotation: Quaternion.Euler(0, 180, 0),
  },
  'protection_mask_tiger_mask',
  'machine8'
)

const machine11 = new Dispenser(
  new GLTFShape('models/abstract-machine.glb'),
  {
    position: new Vector3(32, 0.15, 12),
  },
  'protection_mask_abstract_mask', //'mask_10'
  'machine11'
)

const machine12 = new Dispenser(
  new GLTFShape('models/african-machine.glb'),
  {
    position: new Vector3(36, 0.15, 12),
  },
  'protection_mask_african_mask', //'mask_9'
  'machine12'
)

const machine13 = new Dispenser(
  new GLTFShape('models/funny-machine.glb'),
  {
    position: new Vector3(76, 0.15, 12),
  },
  'protection_mask_funny_mask',
  'machine13'
)

const machine14 = new Dispenser(
  new GLTFShape('models/graffiti-machine.glb'),
  {
    position: new Vector3(80, 0.15, 12),
  },
  'protection_mask_graffiti_mask',
  'machine14'
)

const machine15 = new Dispenser(
  new GLTFShape('models/hot-machine.glb'),
  {
    position: new Vector3(16, 0.15, 40),
  },
  'protection_mask_hot_mask',
  'machine15'
)

const machine16 = new Dispenser(
  new GLTFShape('models/monster-machine.glb'),
  {
    position: new Vector3(12, 0.15, 40),
  },
  'protection_mask_monster_mask',
  'machine16'
)

const machine17 = new Dispenser(
  new GLTFShape('models/skull-machine.glb'),
  {
    position: new Vector3(100, 0.15, 40),
  },
  'protection_mask_skull_mask',
  'machine17'
)

const machine18 = new Dispenser(
  new GLTFShape('models/tiger-machine.glb'),
  {
    position: new Vector3(96, 0.15, 40),
  },
  'protection_mask_tiger_mask',
  'machine18'
)

Machines.push(machine1)
Machines.push(machine2)
Machines.push(machine3)
Machines.push(machine4)
Machines.push(machine5)
Machines.push(machine6)
Machines.push(machine7)
Machines.push(machine8)

Machines.push(machine11)
Machines.push(machine12)
Machines.push(machine13)
Machines.push(machine14)
Machines.push(machine15)
Machines.push(machine16)
Machines.push(machine17)
Machines.push(machine18)

// protection_mask_abstract_mask
// protection_mask_african_mask
// protection_mask_funny_mask
// protection_mask_graffiti_mask
// protection_mask_hot_mask
// protection_mask_monster_mask
// protection_mask_skull_mask
// protection_mask_tiger_mask

//// MUSIC

// const streamSource = new Entity()
// streamSource.addComponent(new Transform({ position: new Vector3(56, 10, 55) }))
// streamSource.addComponent(
//   new AudioStream('https://icecast.ravepartyradio.org/ravepartyradio-192.mp3')
// )
// engine.addEntity(streamSource)

startScreen()

//////// HACK TO SEE POSITIONS

// const camera = Camera.instance

// class CameraTrackSystem implements ISystem {
//   update() {
//     log(camera.position)
//   }
// }

// engine.addSystem(new CameraTrackSystem())

//openUI('Mask10', machine1)

sceneMessageBus.on('boughtMask', (e) => {
  log(e.id)
  for (let machine of Machines) {
    if (machine.id == e.id) {
      machine.buy()
    }
  }
})
