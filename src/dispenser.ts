import { openUI } from './ui'
import utils from '../node_modules/decentraland-ecs-utils/index'
import { sceneMessageBus } from './game'

export class Dispenser extends Entity {
  idleAnim = new AnimationState('idle', { looping: true })
  buyAnim = new AnimationState('buy', { looping: false })
  newMaskAnim = new AnimationState('new_mask', { looping: false })
  buttonAnim = new AnimationState('Action', { looping: false })
  id: string
  constructor(
    model: GLTFShape,
    transform: TranformConstructorArgs,
    wearableName: string,
    id: string
    //,sound: AudioClip
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(model)
    this.addComponent(new Transform(transform))

    this.addComponent(new Animator())
    this.getComponent(Animator).addClip(this.idleAnim)
    this.getComponent(Animator).addClip(this.buyAnim)
    this.getComponent(Animator).addClip(this.newMaskAnim)
    this.idleAnim.play()

    this.id = id

    let heartButton = new Entity()
    heartButton.addComponent(new GLTFShape('models/heart-button.glb'))
    heartButton.addComponent(new Animator())
    heartButton.getComponent(Animator).addClip(this.buttonAnim)
    heartButton.setParent(this)
    heartButton.addComponent(
      new OnPointerDown(
        (e) => {
          heartButton.getComponent(Animator).getClip('Action').stop()
          heartButton.getComponent(Animator).getClip('Action').play()
          openUI(wearableName, this)
        },
        { hoverText: 'Donate' }
      )
    )
    engine.addEntity(heartButton)

    let standParticles = new Entity()
    standParticles.addComponent(new GLTFShape('models/particles.glb'))
    standParticles.setParent(this)
    engine.addEntity(standParticles)

    //this.addComponent(new AudioSource(sound))
  }

  public buy(): void {
    let anim = this.getComponent(Animator)

    anim.getClip('idle').stop()
    anim.getClip('buy').stop()
    anim.getClip('new_mask').stop()

    anim.getClip('buy').play()

    this.addComponentOrReplace(
      new utils.Delay(4000, () => {
        anim.getClip('buy').stop()
        //anim.getClip('new_mask').play()
        anim.getClip('idle').play()
        // this.addComponentOrReplace(
        //   new utils.Delay(1000, () => {
        //     anim.getClip('new_mask').stop()
        //     this.idleAnim.play()

        //   })
        // )
      })
    )
  }
}
