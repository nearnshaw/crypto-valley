import {
  getStock,
  makeSimpleDonation,
  makeMaskDonation,
} from './contractHandler'
//import { shopAnim } from './game'
import { signGuestBook, canvas } from './serverHandler'
import { Dispenser } from './dispenser'
import utils from '../node_modules/decentraland-ecs-utils/index'
import { sceneMessageBus } from './game'

export const screenSpaceUI = new UICanvas()
screenSpaceUI.visible = true

let UIOpenTime

const imageTexture = new Texture('images/shop-UI.png')

type mask = { type: string; stand: Dispenser; hasStock: boolean }

export let currentMask: mask = { type: 'none', stand: null, hasStock: true }

export async function openUI(selectedMask: string, stand: Dispenser) {
  UIOpenTime = +Date.now()
  background.visible = true
  background.isPointerBlocker = true
  AcceptButton.visible = true
  CancelButton.visible = true
  AcceptButton.isPointerBlocker = true
  CancelButton.isPointerBlocker = true

  currentMask = {
    type: selectedMask,
    stand: stand,
    hasStock: await getStock(selectedMask),
  }

  if (!currentMask.hasStock) {
    warningNoStock.visible = true
  }
}

export function closeUI() {
  background.visible = false
  background.isPointerBlocker = false
  AcceptButton.visible = false
  CancelButton.visible = false
  AcceptButton.isPointerBlocker = false
  CancelButton.isPointerBlocker = false

  warningOneMask.visible = false
  warningNoStock.visible = false
  warningNoNFT.visible = false
  currentMasks.visible = false
  // hide warnings
}

export const background = new UIImage(screenSpaceUI, imageTexture)
background.name = 'background'
background.width = 1024
background.height = 667.5
background.hAlign = 'center'
background.vAlign = 'center'
background.positionY = 35
background.sourceLeft = 0
background.sourceTop = 0
background.sourceWidth = 1024
background.sourceHeight = 667.5
background.visible = false
background.isPointerBlocker = false

export const currentPayment = new UIText(background)
currentPayment.value = '0.08'
currentPayment.name = 'currentPayment'
currentPayment.width = '200px'
currentPayment.height = '100px'
currentPayment.hAlign = 'center'
currentPayment.vAlign = 'top'
currentPayment.positionY = -140
currentPayment.positionX = -40
currentPayment.fontSize = 32
currentPayment.vTextAlign = 'center'
currentPayment.hTextAlign = 'center'
currentPayment.color = Color4.FromHexString('#53508F88')

export const currentMasks = new UIText(background)
currentMasks.value = '1'
currentMasks.name = 'currentMasks'
currentMasks.width = '100px'
currentMasks.height = '100px'
currentMasks.hAlign = 'center'
currentMasks.vAlign = 'top'
currentMasks.positionY = -195
currentMasks.positionX = -230
currentMasks.fontSize = 28
currentMasks.vTextAlign = 'center'
currentMasks.hTextAlign = 'center'
currentMasks.color = Color4.FromHexString('#53508F88')
currentMasks.visible = false

export const donationInput = new UIInputText(background)
donationInput.name = 'message'
donationInput.width = '150px'
donationInput.height = '50px'
donationInput.hAlign = 'center'
donationInput.vAlign = 'bottom'
donationInput.positionY = 110
donationInput.positionX = -200
donationInput.fontSize = 40
donationInput.vTextAlign = 'center'
donationInput.hTextAlign = 'center'

donationInput.placeholder = '0.058'
// donationInput.background = Color4.FromHexString('#F2F2F2FF')
// donationInput.color = Color4.Black()
// stop.sourceLeft = 0
// stop.sourceTop = 384
// stop.sourceWidth = 1024
// stop.sourceHeight = 128
donationInput.isPointerBlocker = true
donationInput.visible = true
donationInput.onTextSubmit = new OnTextSubmit((x) => {
  //let newText = x.text.substr(0, 50)
  respondToNumber(x.text)

  //sceneMessageBus.emit('newText', { text: newText })
})

export function respondToNumber(newText: string) {
  donationInput.placeholder = newText
  currentPayment.value = newText

  let newNumber: number = parseFloat(newText)
  log('new text: ', newNumber)
  if (currentMask.hasStock) {
    if (newNumber < 0.058) {
      warningNoNFT.visible = true
      warningNoStock.visible = false
      warningOneMask.visible = false
      currentMasks.visible = false
    } else {
      warningOneMask.visible = true
      currentMasks.visible = true
      warningNoNFT.visible = false
      warningNoStock.visible = false

      let masks = Math.floor(newNumber / 0.058)
      if (masks > 10) {
        masks = 10
      }
      if (newNumber == 0.58) {
        masks = 10
      }
      currentMasks.value = masks.toString()
    }
  }
}

export const warningOneMask = new UIImage(screenSpaceUI, imageTexture)
warningOneMask.name = 'warningOneMask'
warningOneMask.width = 805
warningOneMask.height = 40
warningOneMask.hAlign = 'center'
warningOneMask.vAlign = 'center'
warningOneMask.positionY = 120
warningOneMask.positionX = -50
warningOneMask.sourceLeft = 50
warningOneMask.sourceTop = 805
warningOneMask.sourceWidth = 800
warningOneMask.sourceHeight = 40
warningOneMask.visible = false
warningOneMask.isPointerBlocker = false

export const warningNoNFT = new UIImage(screenSpaceUI, imageTexture)
warningNoNFT.name = 'warningNoNFT'
warningNoNFT.width = 950
warningNoNFT.height = 40
warningNoNFT.hAlign = 'center'
warningNoNFT.vAlign = 'center'
warningNoNFT.positionY = 120
warningNoNFT.positionX = 50
warningNoNFT.sourceLeft = 50
warningNoNFT.sourceTop = 878
warningNoNFT.sourceWidth = 950
warningNoNFT.sourceHeight = 40
warningNoNFT.visible = false
warningNoNFT.isPointerBlocker = false

export const warningNoStock = new UIImage(screenSpaceUI, imageTexture)
warningNoStock.name = 'warningNoStock'
warningNoStock.width = 950
warningNoStock.height = 40
warningNoStock.hAlign = 'center'
warningNoStock.vAlign = 'center'
warningNoStock.positionY = 115
warningNoStock.positionX = 25
warningNoStock.sourceLeft = 50
warningNoStock.sourceTop = 951
warningNoStock.sourceWidth = 950
warningNoStock.sourceHeight = 40
warningNoStock.visible = false
warningNoStock.isPointerBlocker = false

export const AcceptButton = new UIImage(screenSpaceUI, imageTexture)
AcceptButton.name = 'AcceptButton'
AcceptButton.width = 460
AcceptButton.height = 80
AcceptButton.hAlign = 'left'
AcceptButton.vAlign = 'bottom'
AcceptButton.positionY = 70
AcceptButton.positionX = 260
AcceptButton.sourceLeft = 42 + 460 + 20
AcceptButton.sourceTop = 1010
AcceptButton.sourceWidth = 460
AcceptButton.sourceHeight = 80
AcceptButton.visible = false
AcceptButton.isPointerBlocker = false
AcceptButton.onClick = new OnClick(() => {
  /////  do I add MANY 0s to the eth number????
  signGuestBook()
  closeUI()
  let donatedMoney = parseFloat(currentPayment.value)
  log('making donation of ', donatedMoney.toString())
  if (currentMask.hasStock && donatedMoney >= 0.058) {
    makeMaskDonation(currentMask.type, donatedMoney)
    currentMask.stand.buy()
    sceneMessageBus.emit('boughtMask', { id: currentMask.stand.id })
    showNFTsComing()
  } else {
    makeSimpleDonation(donatedMoney)
  }
})

export const CancelButton = new UIImage(screenSpaceUI, imageTexture)
CancelButton.name = 'AcceptButton'
CancelButton.width = 460
CancelButton.height = 80
CancelButton.hAlign = 'right'
CancelButton.vAlign = 'bottom'
CancelButton.positionY = 70
CancelButton.positionX = -260
CancelButton.sourceLeft = 42
CancelButton.sourceTop = 1010
CancelButton.sourceWidth = 460
CancelButton.sourceHeight = 80
CancelButton.visible = false
CancelButton.isPointerBlocker = false
CancelButton.onClick = new OnClick(() => {
  closeUI()
})

export const NFTComing = new UIText(screenSpaceUI)
NFTComing.value = 'Your NFT/s are being minted, they will be here soon!'
NFTComing.width = '200px'
NFTComing.height = '50px'
NFTComing.hAlign = 'center'
NFTComing.vAlign = 'center'
NFTComing.fontSize = 32
NFTComing.vTextAlign = 'center'
NFTComing.hTextAlign = 'center'
NFTComing.color = Color4.White()
NFTComing.visible = false

export function showNFTsComing(duration: number = 10000) {
  NFTComing.visible = true
  let dummyEnt1 = new Entity()
  dummyEnt1.addComponentOrReplace(
    new utils.Delay(8000, () => {
      NFTComing.visible = false
    })
  )
  engine.addEntity(dummyEnt1)
}

/////// CLOSE UI

// Instance the input object
const input = Input.instance

//button down event
input.subscribe('BUTTON_DOWN', ActionButton.POINTER, false, (e) => {
  const currentTime = +Date.now()
  let isOpen: boolean
  if (background.visible) {
    isOpen = true
  } else {
    isOpen = false
  }

  if (isOpen && currentTime - UIOpenTime > 100) {
    closeUI()
    log('clicked on the close image ', background.visible)
  }
})
