import { movePlayerTo } from '@decentraland/RestrictedActions'
import * as utils from '@dcl/ecs-scene-utils'

export function startParty() {
  let partySwitch: boolean = false

  const streamSource = new Entity()
  streamSource.addComponent(
    new Transform({ position: new Vector3(56, 10, 55) })
  )
  let music = new AudioStream(
    'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3'
  )
  streamSource.addComponent(music)
  music.playing = false
  music.volume = 0.2
  engine.addEntity(streamSource)

  const MusicTrigger = new Entity()
  MusicTrigger.addComponent(
    new Transform({ position: new Vector3(56, 35, 26 + 8) })
  )

  let roofMusicrTriggerBox = new utils.TriggerBoxShape(
    new Vector3(80, 20, 70),
    Vector3.Zero()
  )
  MusicTrigger.addComponent(
    new utils.TriggerComponent(
      roofMusicrTriggerBox, //shape
      {
        onCameraEnter: () => {
          partySwitch = true
          musicVideo.playing = true
          music.playing = true
          log('triggered!')
        },
        onCameraExit: () => {
          partySwitch = true
          musicVideo.playing = false
          music.playing = false
          //music.playing = false
        },
      }
    )
  )
  engine.addEntity(MusicTrigger)

  const musicVideo = new VideoTexture(
    new VideoClip('https://video.dcl.guru/live/visual/index.m3u8')
  )
  musicVideo.playing = false

  const musicVideoMaterial = new Material()
  musicVideoMaterial.albedoTexture = musicVideo
  musicVideoMaterial.roughness = 1

  const flashScreen = new Entity()
  flashScreen.addComponent(new BoxShape())
  flashScreen.addComponent(
    new Transform({
      position: new Vector3(84.2, 43, 38.7),
      rotation: Quaternion.Euler(45, 0, 45),
      scale: new Vector3(5, 5, 5),
    })
  )
  flashScreen.addComponent(musicVideoMaterial)
  engine.addEntity(flashScreen)

  const smallCube1 = new Entity()
  smallCube1.addComponent(new BoxShape())
  smallCube1.addComponent(
    new Transform({
      position: new Vector3(95.1, 42, 26.73),
      rotation: Quaternion.Euler(45, 0, 45),
      scale: new Vector3(3, 3, 3),
    })
  )
  smallCube1.addComponent(musicVideoMaterial)
  engine.addEntity(smallCube1)

  const smallCube2 = new Entity()
  smallCube2.addComponent(new BoxShape())
  smallCube2.addComponent(
    new Transform({
      position: new Vector3(17.2, 42, 26.73),
      rotation: Quaternion.Euler(45, 0, 45),
      scale: new Vector3(3, 3, 3),
    })
  )
  smallCube2.addComponent(musicVideoMaterial)
  engine.addEntity(smallCube2)

  const cone1 = new Entity()
  cone1.addComponent(new ConeShape())
  cone1.addComponent(
    new Transform({
      position: new Vector3(55, 44, 38.7),
      rotation: Quaternion.Euler(55, 42, 38.7),
      scale: new Vector3(3, 3, 3),
    })
  )
  cone1.addComponent(musicVideoMaterial)
  engine.addEntity(cone1)

  const smallCube3 = new Entity()
  smallCube3.addComponent(new BoxShape())
  smallCube3.addComponent(
    new Transform({
      position: new Vector3(56.2, 32.5, 21.27),
      rotation: Quaternion.Euler(45, 0, 45),
      scale: new Vector3(1, 1, 1),
    })
  )
  smallCube3.addComponent(musicVideoMaterial)
  engine.addEntity(smallCube3)

  class RotatorSystem implements ISystem {
    cubeRotate: Vector3 = new Vector3(0, 0, 1)
    coneRotate: Vector3 = new Vector3(1, 0, 1)
    update(dt: number) {
      if (!partySwitch) {
        return
      }
      const cone1Transform = cone1.getComponent(Transform)
      cone1Transform.rotate(this.coneRotate, dt * 10)

      const screenTransform = flashScreen.getComponent(Transform)
      screenTransform.rotate(this.cubeRotate, dt * 10)

      const small1Transform = smallCube1.getComponent(Transform)
      small1Transform.rotate(this.cubeRotate, dt * 20)

      const small2Transform = smallCube2.getComponent(Transform)
      small2Transform.rotate(this.cubeRotate, dt * 20)

      const small3Transform = smallCube3.getComponent(Transform)
      small3Transform.rotate(this.cubeRotate, dt * 20)
    }
  }

  // Add a new instance of the system to the engine
  engine.addSystem(new RotatorSystem())
}

//   const ethLogo = new Entity()
//   ethLogo.addComponent(new GLTFShape('models/ETH_LOGO.glb'))
//   ethLogo.addComponent(
//     new Transform({
//       position: new Vector3(5, 5, 5),
//       rotation: Quaternion.Euler(55, 42, 38.7),
//       scale: new Vector3(5, 5, 5),
//     })
//   )

//   engine.addEntity(ethLogo)

export function addTeleporter() {
  let teleport = new Entity()

  teleport.addComponent(new GLTFShape('models/teleporter.glb'))

  teleport.addComponent(
    new Transform({
      position: new Vector3(55, 0.2, 48),
    })
  )

  teleport.addComponent(
    new OnPointerDown(
      () => {
        movePlayerTo({ x: 40, y: 50, z: 40 })
      },
      { hoverText: 'GO UP' }
    )
  )

  teleport.addComponent(
    new utils.TriggerComponent(new utils.TriggerSphereShape(), {
      onCameraEnter: () => {
        movePlayerTo({ x: 40, y: 50, z: 40 })
      },
    })
  )

  engine.addEntity(teleport)
}
