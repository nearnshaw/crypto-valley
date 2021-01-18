export class PointerArrow extends Entity {
  defaultPosition = new Vector3()
  defaultRotation = new Quaternion()
  defaultScale = new Vector3()
  constructor(defaultPosition: TranformConstructorArgs, parent?: Entity) {
    super()

    this.addComponent(new GLTFShape('models/Arrow.glb'))
    this.addComponent(new Transform(defaultPosition))
    engine.addEntity(this)
    if (parent) {
      this.setParent(parent)
    }

    this.defaultRotation = this.getComponent(Transform).rotation.clone()
    this.defaultPosition = this.getComponent(Transform).position.clone()
    this.defaultScale = this.getComponent(Transform).scale.clone()

    let noise = new AudioClip('sounds/airhorn.mp3')
    this.addComponent(new AudioSource(noise))
  }

  show() {
    this.getComponent(GLTFShape).visible = true
    this.getComponent(AudioSource).playOnce()
    StartConfetti(this)
  }
  hide() {
    this.getComponent(GLTFShape).visible = false
  }
  move(
    //parent: Entity,
    position: Vector3,
    rotation?: Vector3,
    scale?: Vector3
  ) {
    //this.setParent(parent)
    this.getComponent(GLTFShape).visible = true
    this.getComponent(AudioSource).playOnce()
    if (rotation) {
      this.getComponent(Transform).rotation = Quaternion.Euler(
        rotation.x,
        rotation.y,
        rotation.z
      )
    } else {
      this.getComponent(Transform).rotation = this.defaultRotation
    }
    if (position) {
      this.getComponent(Transform).position = position
    } else {
      this.getComponent(Transform).position = this.defaultPosition
    }

    if (scale) {
      this.getComponent(Transform).scale = scale
    } else {
      this.getComponent(Transform).scale = this.defaultScale
    }
    StartConfetti(this)
  }
}

const confettiShape = new GLTFShape('models/confetti.glb')

// let confettiDummy = new Entity()
// confettiDummy.addComponent(
//   new Transform({
//     position: new Vector3(105, -20, 80),
//     scale: new Vector3(0.1, 0.1, 0.01),
//   })
// )
// confettiDummy.addComponent(confettiShape)
// engine.addEntity(confettiDummy)

@Component('confettiSpin')
export class confettiSpin {
  lifeSpan: number = 10
}

export function StartConfetti(parent: Entity) {
  //CONFETTI
  for (let i = 0; i < 5; i++) {
    let confetti1 = new Entity()
    confetti1.addComponent(confettiShape)
    confetti1.addComponent(new confettiSpin())
    confetti1.addComponent(
      new Transform({
        position: new Vector3(
          parent.getComponent(Transform).position.x + Math.random(),
          1 + Math.random() * 5,
          parent.getComponent(Transform).position.z + Math.random()
        ),
        scale: new Vector3(0.25, 0.25, 0.025),
        rotation: Quaternion.Euler(0, Math.random() * 360, Math.random() * 360),
      })
    )
    engine.addEntity(confetti1)
  }

  engine.addSystem(new confettiSystem())
  //mySounds.playCelebrationMusic()
}

class confettiSystem {
  group = engine.getComponentGroup(confettiSpin, Transform)
  // timeout = 36
  elapsed = 0

  update(dt: number) {
    // if(this.elapsed <= this.timeout)
    // {
    this.elapsed += dt

    if (this.elapsed > 20) {
      engine.removeSystem(this)
    }
    for (let entity of this.group.entities) {
      const cInfo = entity.getComponent(confettiSpin)

      entity.getComponent(Transform).rotate(Vector3.Forward(), dt * 75)
      entity
        .getComponent(Transform)
        .translate(Vector3.Down().multiplyByFloats(0, 3 * dt, 0))
      cInfo.lifeSpan -= dt

      if (entity.getComponent(Transform).position.y < 0) {
        if (cInfo.lifeSpan > 0) {
          entity.getComponent(Transform).position.y += 6
        } else {
          entity.getComponent(Transform).position.y = -10
        }
      }
    }
    // }

    // else{
    //     while(this.group.entities.length > 0){
    //         engine.removeEntity(this.group.entities[0])
    //     }
    //     engine.removeSystem(this)

    // }
  }
}
