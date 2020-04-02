import { AmbientSound } from './ambient'

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

let talk = new AmbientSound(
  { position: new Vector3(56, 2, 55) },
  'sounds/talk.mp3',
  0,
  true,
  1
)

// const camera = Camera.instance

// class CameraTrackSystem implements ISystem {
//   update() {
//     log(camera.position)
//   }
// }

// engine.addSystem(new CameraTrackSystem())
