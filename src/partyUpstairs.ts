import utils from '../node_modules/decentraland-ecs-utils/index'

export function startParty() {
  const streamSource = new Entity()
  streamSource.addComponent(
    new Transform({ position: new Vector3(56, 10, 55) })
  )
  let music = new AudioStream(
    'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3'
  )
  streamSource.addComponent(music)
  music.playing = false
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
      0, //layer
      0, //triggeredByLayer
      null, //onTriggerEnter
      null, //onTriggerExit
      () => {
        musicVideo.playing = true
        music.playing = true
        log('triggered!')
      },
      () => {
        musicVideo.playing = false
        music.playing = false
        //music.playing = false
      },
      false
    )
  )
  engine.addEntity(MusicTrigger)

  const flashScreen = new Entity()
  flashScreen.addComponent(new BoxShape())
  flashScreen.addComponent(
    new Transform({
      position: new Vector3(84.2, 43, 38.7),
      rotation: Quaternion.Euler(45, 0, 45),
      scale: new Vector3(5, 5, 5),
    })
  )
  const musicVideo = new VideoTexture(
    new VideoClip('https://theuniverse.club/live/consensys/index.m3u8')
  )
  musicVideo.playing = false

  const musicVideoMaterial = new Material()
  musicVideoMaterial.albedoTexture = musicVideo
  musicVideoMaterial.roughness = 1
  flashScreen.addComponent(musicVideoMaterial)

  engine.addEntity(flashScreen)

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

  class RotatorSystem implements ISystem {
    update(dt: number) {
      //   const ethTransform = ethLogo.getComponent(Transform)
      //   ethTransform.rotate(Vector3.Up(), dt * 10)

      const screehTransform = flashScreen.getComponent(Transform)
      screehTransform.rotate(new Vector3(1, 0, 1), dt * 10)
    }
  }

  // Add a new instance of the system to the engine
  engine.addSystem(new RotatorSystem())
}
