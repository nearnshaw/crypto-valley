import {
  getStock,
  makeSimpleDonation,
  makeMaskDonation
} from './contractHandler'
import { shopAnim } from './game'

export const screenSpaceUI = new UICanvas()
screenSpaceUI.visible = true

let UIOpenTime

const imageTexture = new Texture('images/shop-UI.png')

type mask = { type: string; stand: Entity; hasStock: boolean }

let currentMask: mask = { type: 'none', stand: null, hasStock: true }

export async function openUI(selectedMask: string, stand: Entity) {
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
    hasStock: await getStock(selectedMask)
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
  // hide warnings
}

export const background = new UIImage(screenSpaceUI, imageTexture)
background.name = 'background'
background.width = 1024
background.height = 648
background.hAlign = 'center'
background.vAlign = 'center'
background.sourceLeft = 0
background.sourceTop = 65
background.sourceWidth = 1024
background.sourceHeight = 648
background.visible = false
background.isPointerBlocker = false

export const currentPayment = new UIText(background)
currentPayment.value = '0.08'
currentPayment.name = 'currentPayment'
currentPayment.width = '650px'
currentPayment.height = '100px'
currentPayment.hAlign = 'center'
currentPayment.vAlign = 'top'
currentPayment.positionY = -80
currentPayment.positionX = -80
currentPayment.fontSize = 30
currentPayment.vTextAlign = 'center'
currentPayment.hTextAlign = 'center'
currentPayment.color = Color4.FromHexString('#53508F88')

export const donationInput = new UIInputText(background)
donationInput.name = 'message'
donationInput.width = '150px'
donationInput.height = '50px'
donationInput.hAlign = 'center'
donationInput.vAlign = 'bottom'
donationInput.positionY = 65
donationInput.positionX = -150
donationInput.fontSize = 40
donationInput.vTextAlign = 'center'
donationInput.hTextAlign = 'center'
donationInput.color = Color4.FromHexString('#53508F88')
donationInput.placeholder = '0.08'
// stop.sourceLeft = 0
// stop.sourceTop = 384
// stop.sourceWidth = 1024
// stop.sourceHeight = 128
donationInput.isPointerBlocker = true
donationInput.visible = true
donationInput.onTextSubmit = new OnTextSubmit(x => {
  //FloatingTextShape.value = x.text
  let newText = x.text.substr(0, 50)
  donationInput.placeholder = newText
  currentPayment.value = newText
  //sceneMessageBus.emit('newText', { text: newText })
})

export const warningOneMask = new UIImage(screenSpaceUI, imageTexture)
warningOneMask.name = 'warningOneMask'
warningOneMask.width = 1024
warningOneMask.height = 62
warningOneMask.hAlign = 'center'
warningOneMask.vAlign = 'center'
warningOneMask.positionY = 120
warningOneMask.positionX = 50
warningOneMask.sourceLeft = 0
warningOneMask.sourceTop = 648 + 65
warningOneMask.sourceWidth = 1024
warningOneMask.sourceHeight = 62
warningOneMask.visible = false
warningOneMask.isPointerBlocker = false

export const warningNoNFT = new UIImage(screenSpaceUI, imageTexture)
warningNoNFT.name = 'warningNoNFT'
warningNoNFT.width = 1024
warningNoNFT.height = 64
warningNoNFT.hAlign = 'center'
warningNoNFT.vAlign = 'center'
warningNoNFT.positionY = 120
warningNoNFT.positionX = 50
warningNoNFT.sourceLeft = 0
warningNoNFT.sourceTop = 648 + 65 + 65
warningNoNFT.sourceWidth = 1024
warningNoNFT.sourceHeight = 62
warningNoNFT.visible = false
warningNoNFT.isPointerBlocker = false

export const warningNoStock = new UIImage(screenSpaceUI, imageTexture)
warningNoStock.name = 'warningNoStock'
warningNoStock.width = 1024 * 0.9
warningNoStock.height = 62 * 0.9
warningNoStock.hAlign = 'center'
warningNoStock.vAlign = 'center'
warningNoStock.positionY = 115
warningNoStock.positionX = 0
warningNoStock.sourceLeft = 0
warningNoStock.sourceTop = 648 + 65 + 65 + 65
warningNoStock.sourceWidth = 1024
warningNoStock.sourceHeight = 62
warningNoStock.visible = false
warningNoStock.isPointerBlocker = false

export const AcceptButton = new UIImage(screenSpaceUI, imageTexture)
AcceptButton.name = 'AcceptButton'
AcceptButton.width = 1024 / 2
AcceptButton.height = 64
AcceptButton.hAlign = 'left'
AcceptButton.vAlign = 'center'
AcceptButton.positionY = 60
AcceptButton.positionX = 222
AcceptButton.sourceLeft = 1
AcceptButton.sourceTop = 0
AcceptButton.sourceWidth = 1024 / 2
AcceptButton.sourceHeight = 64
AcceptButton.visible = false
AcceptButton.isPointerBlocker = false
AcceptButton.onClick = new OnClick(() => {
  let donatedMoney = +currentPayment.value
  log('making donation of ', donatedMoney.toString())
  //   if (currentMask.hasStock && donatedMoney > 0.08) {
  //     makeMaskDonation(currentMask.type, donatedMoney)
  //     shopAnim(currentMask.stand)
  //   } else {
  makeSimpleDonation(donatedMoney)
  //}
})

export const CancelButton = new UIImage(screenSpaceUI, imageTexture)
CancelButton.name = 'AcceptButton'
CancelButton.width = 1024 / 2
CancelButton.height = 64
CancelButton.hAlign = 'right'
CancelButton.vAlign = 'center'
CancelButton.positionY = 60
CancelButton.positionX = -222
CancelButton.sourceLeft = 1024 / 2 + 1
CancelButton.sourceTop = 0
CancelButton.sourceWidth = 1024 / 2
CancelButton.sourceHeight = 64
CancelButton.visible = false
CancelButton.isPointerBlocker = false
CancelButton.onClick = new OnClick(() => {
  closeUI()
})

// cancel button

/////// CLOSE UI

// Instance the input object
const input = Input.instance

//button down event
input.subscribe('BUTTON_DOWN', ActionButton.POINTER, false, e => {
  const currentTime = +Date.now()
  let isOpen: boolean
  if (background.visible) {
    isOpen = true
  } else {
    isOpen = false
  }

  if (isOpen && currentTime - UIOpenTime > 100) {
    background.visible = false
    background.isPointerBlocker = false
    log('clicked on the close image ', background.visible)
  }
})
