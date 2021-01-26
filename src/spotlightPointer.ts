import { setUserData, userData } from './poapHandler'
import * as ui from '../node_modules/@dcl/ui-utils/index'
import { triggerEmote, PredefinedEmote } from '@decentraland/RestrictedActions'
import { isPreviewMode } from '@decentraland/EnvironmentAPI'

import { PointerArrow } from './pointerArrow'

// export let whiteListedIds = [
//   '0xe2b6024873d218B2E83B462D3658D8D7C3f55a18',
//   '#22cb',
// ]

export let whiteListedIds = ['NicoE', 'Crench#22cb']

export const sceneMessageBus = new MessageBus()

let secretConfettiUI
let secretAnnounceUI

export async function initiateUI() {
  if (!userData) {
    await setUserData()
  }

  let authorized = false

  if (await isPreviewMode()) {
    authorized = true
  } else {
    for (let id of whiteListedIds) {
      if (userData && id == userData.displayName) {
        authorized = true
        break
      }
    }
  }

  if (authorized) {
    secretAnnounceUI = new ui.FillInPrompt(
      'Send Announcement',
      (e: string) => {
        sceneMessageBus.emit('announcement', { text: e })
      },
      'PUBLISH MSG',
      'ANNOUNCEMENT',
      true
    )
    secretAnnounceUI.hide()

    secretConfettiUI = new ui.CustomPrompt(
      ui.PromptStyles.DARKLARGE,
      null,
      null,
      true
    )
    secretConfettiUI.background.positionX = 200

    secretConfettiUI.addText('VJTron 2000', 0, 170, Color4.Gray(), 25)

    secretConfettiUI.addText('Player Winner', -80, 140)

    let submittedText: string = ''
    secretConfettiUI.addTextBox(-50, 80, 'name', (e: string) => {
      submittedText = e
    })

    let animation

    secretConfettiUI.addButton('CONFETTI', -100, 20, () => {
      sceneMessageBus.emit('winner', { name: submittedText, emote: animation })
      log('SENT winner: ', submittedText, ' emote: ', animation)
    })

    let wave = secretConfettiUI.addCheckbox('Wave', 60, 10, () => {
      animation = PredefinedEmote.WAVE
      fistbump.uncheck()
      robot.uncheck()
      hand.uncheck()
      money.uncheck()
      kiss.uncheck()
    })

    let fistbump = secretConfettiUI.addCheckbox('Fist Bump', 60, -20, () => {
      animation = PredefinedEmote.FIST_PUMP
      wave.uncheck()
      robot.uncheck()
      hand.uncheck()
      money.uncheck()
      kiss.uncheck()
    })

    let robot = secretConfettiUI.addCheckbox('Robot', 60, -50, () => {
      animation = PredefinedEmote.ROBOT
      wave.uncheck()
      fistbump.uncheck()
      hand.uncheck()
      money.uncheck()
      kiss.uncheck()
    })
    let hand = secretConfettiUI.addCheckbox('Raise hand', 60, -80, () => {
      animation = PredefinedEmote.RAISE_HAND
      wave.uncheck()
      fistbump.uncheck()
      robot.uncheck()
      money.uncheck()
      kiss.uncheck()
    })
    let money = secretConfettiUI.addCheckbox('Money', 60, -110, () => {
      animation = PredefinedEmote.MONEY
      wave.uncheck()
      fistbump.uncheck()
      robot.uncheck()
      hand.uncheck()
      kiss.uncheck()
    })
    let kiss = secretConfettiUI.addCheckbox('Kiss', 60, -140, () => {
      animation = PredefinedEmote.KISS
      wave.uncheck()
      fistbump.uncheck()
      robot.uncheck()
      hand.uncheck()
      money.uncheck()
    })

    let b1 = secretConfettiUI.addSwitch('Wave', 60, -200, () => {
      b2.uncheck()
    })

    let b2 = secretConfettiUI.addSwitch('Fist Bump', 60, -220, () => {
      b1.uncheck()
    })

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.PRIMARY,
      false,
      (e) => {
        if (secretConfettiUI) {
          if (!secretConfettiUI.background.visible) {
            secretConfettiUI.show()
          } else {
            secretConfettiUI.hide()
          }
        }
      }
    )

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.SECONDARY,
      false,
      (e) => {
        if (secretAnnounceUI) {
          if (!secretAnnounceUI.background.visible) {
            secretAnnounceUI.show()
          } else {
            secretAnnounceUI.hide()
          }
        }
      }
    )
  }

  let confettiParty = new PointerArrow(
    new Transform({
      position: new Vector3(56, 0, 16 + 8),
      scale: new Vector3(4, 4, 4),
    })
  )

  sceneMessageBus.on('announcement', (e) => {
    ui.displayAnnouncement(e.text)
  })

  sceneMessageBus.on('winner', async (e) => {
    if (!userData) {
      await setUserData()
    }

    if (userData.displayName == e.name) {
      sceneMessageBus.emit('iwon', { pos: Camera.instance.position.clone() })
      triggerEmote({ predefined: e.emote })
    } else {
      triggerEmote({ predefined: PredefinedEmote.CLAP })
    }
  })

  sceneMessageBus.on('iwon', (e) => {
    let finalPos = e.pos
    finalPos.y += 2
    confettiParty.move(finalPos)
  })
}
