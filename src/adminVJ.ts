import * as ui from '@dcl/ui-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'
//import { isPreviewMode } from '@decentraland/EnvironmentAPI'

import { movePlayerTo } from '@decentraland/RestrictedActions'
import { addLongDistanceTeleporter, addTeleporter } from './partyUpstairs'

export let userData: UserData

export async function fetchUserData() {
  const data = await getUserData()
  log(data.displayName)
  return data
}

export async function setUserData() {
  const data = await getUserData()
  log(data.displayName)
  userData = data
}

export let whiteListedIds = [
  'NicoE',
  'sam',
  'Jungle',
  'MANA',
  'Bence',
  'Tak',
  'KJWalker',
  'Shibu',
]

export const sceneMessageBus = new MessageBus()

let VJUI: ui.CustomPrompt

let bouncerUI: ui.FillInPrompt

export async function initiateVJUI() {
  if (!userData) {
    await setUserData()
  }

  let authorized = false

  //   if (await isPreviewMode()) {
  //     authorized = true
  //   } else {
  for (let id of whiteListedIds) {
    if (userData && id == userData.displayName) {
      authorized = true
      break
    }
  }
  //}

  if (authorized) {
    VJUI = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE, null, null, true)
    VJUI.background.positionX = 380

    VJUI.background.height = 650

    VJUI.addText('VJTron 2000', 0, 320, Color4.Gray(), 25)

    VJUI.addText('Make Announcement', -80, 280)

    let submittedText: string = ''
    let textBox = VJUI.addTextBox(-50, 220, 'Announcement', (e: string) => {
      submittedText = e
    })
    VJUI.addButton('Send MSG', -100, 160, () => {
      sceneMessageBus.emit('announcement', { text: submittedText })
    })

    // switches
    VJUI.addSwitch(
      'TELEPORT',
      -190,
      100,
      () => {
        sceneMessageBus.emit('action', {
          action: 'teleport',
        })
      },
      () => {},
      ui.SwitchStyles.SQUAREGREEN,
      true
    )

    // let jump = VJUI.addButton(
    //   'Jump',
    //   -190,
    //   -130,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.PLAYERJUMP,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.ButtonStyles.RED
    // )

    // let money = VJUI.addButton(
    //   'Money',
    //   -100,
    //   -130,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.PLAYERMONEY,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.ButtonStyles.RED
    // )

    // let clap = VJUI.addButton(
    //   'Clap',
    //   -10,
    //   -130,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.PLAYERCLAP,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.ButtonStyles.RED
    // )

    // let dance = VJUI.addButton(
    //   'Dance',
    //   80,
    //   -130,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.PLAYERDANCE,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.ButtonStyles.RED
    // )

    // let hand = VJUI.addButton(
    //   'Hand',
    //   170,
    //   -130,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.PLAYERHAND,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.ButtonStyles.RED
    // )

    // let kiss = VJUI.addButton(
    //   'Kiss',
    //   -190,
    //   -180,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.PLAYERKISS,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.ButtonStyles.RED
    // )

    // let tik = VJUI.addButton(
    //   'Tik',
    //   -100,
    //   -180,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.PLAYERTIK,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.ButtonStyles.RED
    // )

    // let tektonik = VJUI.addButton(
    //   'Tekto',
    //   -10,
    //   -180,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.PLAYERTEKTO,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.ButtonStyles.RED
    // )

    // let hammer = VJUI.addButton(
    //   'Hammer',
    //   80,
    //   -180,
    //   () => {
    //     sceneMessageBus.emit('action', {
    //       action: Action.PLAYERHAMMER,
    //       freeMode: freeMode,
    //     })
    //   },
    //   ui.ButtonStyles.RED
    // )

    // jump.image.width = 75
    // jump.image.height = 40
    // jump.label.fontSize = 12

    // money.image.width = 75
    // money.image.height = 40
    // money.label.fontSize = 12

    // clap.image.width = 75
    // clap.image.height = 40
    // clap.label.fontSize = 12

    // dance.image.width = 75
    // dance.image.height = 40
    // dance.label.fontSize = 12

    // hand.image.width = 75
    // hand.image.height = 40
    // hand.label.fontSize = 12

    // tik.image.width = 75
    // tik.image.height = 40
    // tik.label.fontSize = 12

    // tektonik.image.width = 75
    // tektonik.image.height = 40
    // tektonik.label.fontSize = 12

    // hammer.image.width = 75
    // hammer.image.height = 40
    // hammer.label.fontSize = 12

    // kiss.image.width = 75
    // kiss.image.height = 40
    // kiss.label.fontSize = 12

    // VJUI.addSwitch(
    //   'DEFAULT SEQ',
    //   -190,
    //   -300,
    //   () => {
    //     sceneMessageBus.emit('playshow', { show: 'default' })
    //   },
    //   () => {
    //     sceneMessageBus.emit('playshow', { show: 'free' })
    //   },
    //   ui.SwitchStyles.SQUARERED,
    //   false
    // )

    bouncerUI = new ui.FillInPrompt(
      'Digital Bouncer',
      (e: string) => {
        sceneMessageBus.emit('kick', {
          player: e,
        })
      },
      'Kick',
      'player name',
      true
    )
    bouncerUI.hide()

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.PRIMARY,
      false,
      (e) => {
        if (VJUI) {
          if (!VJUI.background.visible) {
            VJUI.show()
          } else {
            VJUI.hide()
          }
        }
      }
    )

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.SECONDARY,
      false,
      (e) => {
        if (bouncerUI) {
          if (!bouncerUI.background.visible) {
            bouncerUI.show()
          } else {
            bouncerUI.hide()
          }
        }
      }
    )
  }

  sceneMessageBus.on('action', (e) => {
    if (e.action == 'teleport') {
      // addTeleporter()
      addLongDistanceTeleporter()
    }
  })

  sceneMessageBus.on('announcement', (e) => {
    ui.displayAnnouncement(e.text)
  })
}

sceneMessageBus.on('kick', async (e) => {
  if (!userData) {
    await setUserData()
  }

  if (e.player == userData.displayName) {
    movePlayerTo({ x: 60, y: 5, z: 32 })
  }
})
