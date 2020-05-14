import utils from '../node_modules/decentraland-ecs-utils/index'

export function startParty() {
  let partySwitch: boolean = false

  //   const streamSource = new Entity()
  //   streamSource.addComponent(
  //     new Transform({ position: new Vector3(56, 10, 55) })
  //   )
  //   let music = new AudioStream(
  //     'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3'
  //   )
  //   streamSource.addComponent(music)
  //   music.playing = false
  //   engine.addEntity(streamSource)

  const VideoTrigger = new Entity()
  VideoTrigger.addComponent(
    new Transform({ position: new Vector3(56, 35, 26 + 8) })
  )

  let roofMusicrTriggerBox = new utils.TriggerBoxShape(
    new Vector3(80, 20, 70),
    Vector3.Zero()
  )
  VideoTrigger.addComponent(
    new utils.TriggerComponent(
      roofMusicrTriggerBox, //shape
      0, //layer
      0, //triggeredByLayer
      null, //onTriggerEnter
      null, //onTriggerExit
      () => {
        partySwitch = true
        eventStream.playing = true
        //music.playing = true
        log('triggered!')
      },
      () => {
        partySwitch = true
        eventStream.playing = false
        //music.playing = false
        //music.playing = false
      },
      false
    )
  )
  engine.addEntity(VideoTrigger)

  const eventStream = new VideoTexture(
    new VideoClip('https://video.dcl.guru/live/dclcoretv/index.m3u8')
  )
  eventStream.playing = false

  const videoMaterial = new Material()
  videoMaterial.albedoTexture = eventStream
  videoMaterial.roughness = 1

  const flashScreen = new Entity()
  flashScreen.addComponent(new PlaneShape())
  flashScreen.addComponent(
    new Transform({
      position: new Vector3(56, 41, 58.4),
      rotation: Quaternion.Euler(0, 180, 0),
      scale: new Vector3(23, 12, 14,
    })
  )
  flashScreen.addComponent(videoMaterial)
  engine.addEntity(flashScreen)
}
