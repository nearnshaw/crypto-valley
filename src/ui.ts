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

let donatedMoney: number = 0.058

export let currentMask: mask = { type: 'none', stand: null, hasStock: true }

export async function openUI1(selectedMask: string, stand: Dispenser) {
  UIOpenTime = +Date.now()

  donatedMoney = 0.058
  background1.visible = true
  background1.isPointerBlocker = true
  AcceptButton.visible = true
  CancelButton.visible = true
  AcceptButton.isPointerBlocker = true
  CancelButton.isPointerBlocker = true

  donationInput.visible = true
  donationInput.placeholder = '0.058'
  donationInput.value = '0.058'

  currentMask = {
    type: selectedMask,
    stand: stand,
    hasStock: await getStock(selectedMask, 1),
  }

  if (!currentMask.hasStock) {
    warningNoStock.visible = true
  }
}

export function openUI2() {
  background2.visible = true
  currentPayment.visible = true
  currentPayment.value = donatedMoney.toString()
  currentMasks.visible

  AcceptButton.visible = true
  CancelButton.visible = true
  AcceptButton.isPointerBlocker = true
  CancelButton.isPointerBlocker = true

  if (currentMask.hasStock) {
    if (donatedMoney < 0.058) {
      warningNoNFT.visible = true
      warningNoStock.visible = false
      warningOneMask.visible = false
      currentMasks.visible = false
    } else {
      warningOneMask.visible = true
      currentMasks.visible = true
      warningNoNFT.visible = false
      warningNoStock.visible = false

      let masks = Math.floor(donatedMoney / 0.058)
      if (masks > 10) {
        masks = 10
      }
      if (donatedMoney == 0.58) {
        masks = 10
      }
      currentMasks.value = masks.toString()
    }
  } else {
    /// no stock
    warningNoStock.visible = true
  }
}

const scale = 0.55

export function closeUI() {
  background1.visible = false
  background1.isPointerBlocker = false
  background2.visible = false
  background2.isPointerBlocker = false
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

export const background1 = new UIImage(screenSpaceUI, imageTexture)
background1.name = 'background'
background1.width = 1024 * scale
background1.height = 448 * scale
background1.hAlign = 'center'
background1.vAlign = 'center'
background1.positionY = 0
background1.sourceLeft = 0
background1.sourceTop = 454
background1.sourceWidth = 1024
background1.sourceHeight = 448
background1.visible = false
background1.isPointerBlocker = false

export const donationInput = new UIInputText(background1)
donationInput.name = 'message'
donationInput.width = 150 * scale
donationInput.height = 50 * scale
donationInput.hAlign = 'center'
donationInput.vAlign = 'center'
donationInput.positionY = 5
donationInput.positionX = -110
donationInput.fontSize = 40 * scale
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
donationInput.onChanged = new OnChanged((x) => {
  log('on changed value: ', x.value)
  let moneyText: string = x.value
  let moneyNumber: number = parseFloat(moneyText)
  donatedMoney = moneyNumber

  //let newText = x.text.substr(0, 50)
  //respondToNumber(x.text)
  //sceneMessageBus.emit('newText', { text: newText })
})
// donationInput.onTextSubmit = new OnTextSubmit((x) => {
//   let moneyText: string = x.text
//   let moneyNumber: number = parseFloat(moneyText)
//   donatedMoney = moneyNumber
//   donationInput.placeholder = x.text
//   //let newText = x.text.substr(0, 50)
//   //respondToNumber(x.text)
//   //sceneMessageBus.emit('newText', { text: newText })
// })

export const background2 = new UIImage(screenSpaceUI, imageTexture)
background2.name = 'background'
background2.width = 1024 * scale
background2.height = 448 * scale
background2.hAlign = 'center'
background2.vAlign = 'center'
background2.positionY = 0
background2.sourceLeft = 0
background2.sourceTop = 0
background2.sourceWidth = 1024
background2.sourceHeight = 448
background2.visible = false
background2.isPointerBlocker = false

export const currentPayment = new UIText(background2)
currentPayment.value = '0.058'
currentPayment.name = 'currentPayment'
currentPayment.width = 200 * scale
currentPayment.height = 100 * scale
currentPayment.hAlign = 'center'
currentPayment.vAlign = 'center'
currentPayment.positionY = 20
currentPayment.positionX = -20
currentPayment.fontSize = 32 * scale
currentPayment.vTextAlign = 'center'
currentPayment.hTextAlign = 'center'
currentPayment.color = Color4.FromHexString('#FF0050FF')

export const currentMasks = new UIText(background2)
currentMasks.value = '1'
currentMasks.name = 'currentMasks'
currentMasks.width = 100 * scale
currentMasks.height = 100 * scale
currentMasks.hAlign = 'center'
currentMasks.vAlign = 'center'
currentMasks.positionY = -28
currentMasks.positionX = -125
currentMasks.fontSize = 28 * scale
currentMasks.vTextAlign = 'center'
currentMasks.hTextAlign = 'center'
currentMasks.color = Color4.FromHexString('#FF0050FF')
currentMasks.visible = false

export const warningOneMask = new UIImage(background2, imageTexture)
warningOneMask.name = 'warningOneMask'
warningOneMask.width = 805 * scale
warningOneMask.height = 40 * scale
warningOneMask.hAlign = 'center'
warningOneMask.vAlign = 'center'
warningOneMask.positionY = -30
warningOneMask.positionX = -20
warningOneMask.sourceLeft = 50
warningOneMask.sourceTop = 944
warningOneMask.sourceWidth = 800
warningOneMask.sourceHeight = 40
warningOneMask.visible = false
warningOneMask.isPointerBlocker = false

export const warningNoNFT = new UIImage(background2, imageTexture)
warningNoNFT.name = 'warningNoNFT'
warningNoNFT.width = 950 * scale
warningNoNFT.height = 40 * scale
warningNoNFT.hAlign = 'center'
warningNoNFT.vAlign = 'center'
warningNoNFT.positionY = -30
warningNoNFT.positionX = 50
warningNoNFT.sourceLeft = 50
warningNoNFT.sourceTop = 1017
warningNoNFT.sourceWidth = 950
warningNoNFT.sourceHeight = 40
warningNoNFT.visible = false
warningNoNFT.isPointerBlocker = false

export const warningNoStock = new UIImage(screenSpaceUI, imageTexture)
warningNoStock.name = 'warningNoStock'
warningNoStock.width = 950 * scale
warningNoStock.height = 40 * scale
warningNoStock.hAlign = 'center'
warningNoStock.vAlign = 'center'
warningNoStock.positionY = -30
warningNoStock.positionX = 25
warningNoStock.sourceLeft = 50
warningNoStock.sourceTop = 1090
warningNoStock.sourceWidth = 950
warningNoStock.sourceHeight = 40
warningNoStock.visible = false
warningNoStock.isPointerBlocker = false

export const AcceptButton = new UIImage(screenSpaceUI, imageTexture)
AcceptButton.name = 'AcceptButton'
AcceptButton.width = 460 * scale
AcceptButton.height = 80 * scale
AcceptButton.hAlign = 'center'
AcceptButton.vAlign = 'center'
AcceptButton.positionY = -80
AcceptButton.positionX = -130
AcceptButton.sourceLeft = 42 + 460 + 20
AcceptButton.sourceTop = 1149
AcceptButton.sourceWidth = 460
AcceptButton.sourceHeight = 80
AcceptButton.visible = false
AcceptButton.isPointerBlocker = false
AcceptButton.onClick = new OnClick(() => {
  /////  do I add MANY 0s to the eth number????
  //signGuestBook()
  if (background1.visible) {
    //donatedMoney = parseFloat(donationInput.value)
    log('making donation of ', donationInput.value)

    closeUI()
    donationInput.value = '0.058'

    openUI2()
  } else if (background2.visible) {
    closeUI()

    if (currentMask.hasStock && donatedMoney >= 0.058) {
      makeMaskDonation(currentMask.type, donatedMoney)
      currentMask.stand.buy()
      sceneMessageBus.emit('boughtMask', { id: currentMask.stand.id })
      showNFTsComing()
    } else {
      makeSimpleDonation(donatedMoney)
    }
  }
})

export const CancelButton = new UIImage(screenSpaceUI, imageTexture)
CancelButton.name = 'AcceptButton'
CancelButton.width = 460 * scale
CancelButton.height = 80 * scale
CancelButton.hAlign = 'center'
CancelButton.vAlign = 'center'
CancelButton.positionY = -80
CancelButton.positionX = 130
CancelButton.sourceLeft = 42
CancelButton.sourceTop = 1149
CancelButton.sourceWidth = 460
CancelButton.sourceHeight = 80
CancelButton.visible = false
CancelButton.isPointerBlocker = false
CancelButton.onClick = new OnClick(() => {
  closeUI()
})

export const NFTComing = new UIText(screenSpaceUI)
NFTComing.value = 'Your NFT/s are being minted, they will be here soon!'
NFTComing.width = 200 * scale
NFTComing.height = 50 * scale
NFTComing.hAlign = 'center'
NFTComing.vAlign = 'center'
NFTComing.fontSize = 32 * scale
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
  if (background1.visible || background2.visible) {
    isOpen = true
  } else {
    isOpen = false
  }

  if (isOpen && currentTime - UIOpenTime > 100) {
    closeUI()
    log('clicked on the close image ', background1.visible)
  }
})
