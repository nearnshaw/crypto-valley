import { setUserData, userData } from './poapHandler'
import * as ui from '../node_modules/@dcl/ui-utils/index'

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

  for (let id of whiteListedIds) {
    if (
      userData &&
      id == userData.displayName
      //userData.publicKey &&
      //id.toLowerCase() == userData.publicKey.toLowerCase()
    ) {
      authorized = true
      break
    }
  }

  //authorized = true

  if (authorized) {
    secretConfettiUI = new ui.FillInPrompt(
      'Winner Glitter',
      (e: string) => {
        sceneMessageBus.emit('winner', { name: e })
      },
      'BOOM',
      'Player name',
      false
    )
    secretConfettiUI.hide()

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

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.PRIMARY,
      false,
      (e) => {
        if (secretConfettiUI) {
          if (!secretConfettiUI.visible) {
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
          if (!secretAnnounceUI.visible) {
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
    }
  })

  sceneMessageBus.on('iwon', (e) => {
    let finalPos = e.pos
    finalPos.y += 2
    confettiParty.move(finalPos)
  })
}
