import { refreshInterval } from './serverHandler'

export function startScreen() {
  //   let donatedEth: number = 0
  //   let dotatedUSD: number = 0
  let ethRate: number = 157
  let donorsList: string = ''

  let serverURL = `https://dcl-slides.s3.us-east-2.amazonaws.com/donors-list.json` //`https://dcl-slides.s3.us-east-2.amazonaws.com/donors-list.json`
  // {"totalDonations":0.08020000000000001,"donorsList":"NicoE, Jungle"}

  let testDonorsList =
    'Jungle, Nacho, NicoE, Moonlight, Shibu, Warhol, Satosh1, Felblob, Rednitrous18, Isaac, Macintosh, Norminal, JackHerer, StarLamVu Alyx, Michiel, Bardock, Carinaro, Blackstar, Daniel' //, SugarClub, yuangang, HanSoIo, ToxSam, WinklevossTwins, 1314520, Mavega, Pony, PeterD, CoronaVirus, guiguishushu, imoasis, Hailei, 0000, 88, Lorenzo, Savior, kybernaut, Demi, cazala, ESP0RTS, Jungle, Nacho, NicoE, Moonlight, Shibu, Warhol, Satosh1, Felblob, Rednitrous18, Isaac, Macintosh, Norminal, JackHerer, StarLamVu, Alyx, Michiel, Bardock, Carinaro, Blackstar, Daniel, SugarClub, yuangang, HanSoIo, ToxSam, WinklevossTwins, 1314520, Mavega, Pony, PeterD, CoronaVirus, guiguishushu, imoasis, Hailei, 0000, 88, Lorenzo, Savior, kybernaut, Demi, cazala, ESP0RTS, Jungle, Nacho, NicoE, Moonlight, Shibu, Warhol, Satosh1, Felblob, Rednitrous18, Isaac, Macintosh, Norminal, JackHerer, StarLamVu, Alyx, Michiel, Bardock, Carinaro, Blackstar, Daniel, SugarClub, yuangang, HanSoIo, ToxSam, WinklevossTwins, 1314520, Mavega, Pony, PeterD, CoronaVirus, guiguishushu, imoasis, Hailei, 0000, 88, Lorenzo, Savior, kybernaut, Demi, cazala, ESP0RTS, Jungle, Nacho, NicoE, Moonlight, Shibu, Warhol, Satosh1, Felblob, Rednitrous18, Isaac, Macintosh, Norminal, JackHerer, StarLamVu, Alyx, Michiel, Bardock, Carinaro, Blackstar, Daniel, SugarClub, yuangang, HanSoIo, ToxSam, WinklevossTwins, 1314520, Mavega, Pony, PeterD, CoronaVirus, guiguishushu, imoasis, Hailei, 0000, 88, Lorenzo, Savior, kybernaut, Demi, cazala, ESP0RTS, Jungle, Nacho, NicoE, Moonlight, Shibu, Warhol, Satosh1, Felblob, Rednitrous18, Isaac, Macintosh, Norminal, JackHerer, StarLamVu, Alyx, Michiel, Bardock, Carinaro, Blackstar, Daniel, SugarClub, yuangang, HanSoIo, ToxSam, WinklevossTwins, 1314520, Mavega, Pony, PeterD, CoronaVirus, guiguishushu, imoasis, Hailei, 0000, 88, Lorenzo, Savior, kybernaut, Demi, cazala, ESP0RTS'
  let screen = new Entity()
  //screen.addComponent(new BoxShape())
  screen.addComponent(
    new Transform({
      position: new Vector3(56, 6, 61.2),
      //rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  engine.addEntity(screen)

  let header = new Entity()
  header.setParent(screen)
  header.addComponent(
    new Transform({
      position: new Vector3(0, 14, 0),
      //rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  let headerText = new TextShape()
  headerText.fontSize = 18
  headerText.value = 'Amount of ETH donated'
  header.addComponent(headerText)

  let ethAmount = new Entity()
  ethAmount.setParent(screen)
  ethAmount.addComponent(
    new Transform({
      position: new Vector3(-10.5, 11, 0),
      //rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  let ethAmountText = new TextShape()
  ethAmountText.fontSize = 22
  ethAmountText.value = '0'
  ethAmountText.color = Color3.FromHexString('#00ff00')
  ethAmount.addComponent(ethAmountText)

  let usdAmount = new Entity()
  usdAmount.setParent(screen)
  usdAmount.addComponent(
    new Transform({
      position: new Vector3(5, 11, 0),
      //rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  let usdAmountText = new TextShape()
  usdAmountText.fontSize = 22
  usdAmountText.value = '0'
  usdAmountText.color = Color3.FromHexString('#00ff00')
  usdAmount.addComponent(usdAmountText)

  let amountContext = new Entity()
  amountContext.setParent(screen)
  amountContext.addComponent(
    new Transform({
      position: new Vector3(4, 11, 0),
      //rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  let amountContextText = new TextShape()
  amountContextText.fontSize = 22
  amountContextText.value = 'ETH =                 USD'
  amountContext.addComponent(amountContextText)

  let thanks = new Entity()
  thanks.setParent(screen)
  thanks.addComponent(
    new Transform({
      position: new Vector3(0, 8.5, 0),
      //rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  let thanksText = new TextShape()
  thanksText.fontSize = 14
  thanksText.value = 'Special thanks      to:'
  thanks.addComponent(thanksText)

  let list = new Entity()
  list.setParent(screen)
  list.addComponent(
    new Transform({
      position: new Vector3(0, 3.25, 0),
      //rotation: Quaternion.Euler(0, 180, 0),
    })
  )
  let listText = new TextShape()
  listText.fontSize = 5
  listText.value = testDonorsList
  list.addComponent(listText)

  let heart = new Entity()
  heart.setParent(screen)
  heart.addComponent(
    new Transform({
      position: new Vector3(3.7, 8.5, 0),
      rotation: Quaternion.Euler(0, 180, 0),
      scale: new Vector3(4, 4, 4),
    })
  )

  heart.addComponent(new GLTFShape('models/heart.glb'))
  let heartBeat = new AnimationState('Action', { looping: false })
  heart.addComponent(new Animator()).addClip(heartBeat)
  engine.addEntity(heart)

  class CheckValues implements ISystem {
    timer: number
    constructor(timer: number) {
      this.timer = timer
    }
    update(dt: number) {
      this.timer -= dt
      if (this.timer < 0) {
        this.timer = refreshInterval
        updateSignValues()
      }
    }
  }

  engine.addSystem(new CheckValues(refreshInterval))

  async function updateSignValues() {
    try {
      let response = await fetch(serverURL)
      let json = await response.json()
      //log(json)
      let trimmedAmount = Number(json.totalDonations).toFixed(3)
      if (ethAmountText.value != trimmedAmount) {
        log('updating eth donations')
        ethAmountText.value = trimmedAmount
        let ethamount = (Number(json.totalDonations) * ethRate).toFixed(2)
        usdAmountText.value = ethamount
        animateHeart()
      }
      if (donorsList != json.donorsList) {
        donorsList = json.donorsList
        listText.value = parseList(donorsList)
        //listText.value = parseList(testDonorsList)
      }
    } catch {
      log('couldnt fetch donations data')
    }
  }

  function animateHeart() {
    heartBeat.stop()
    heartBeat.play()
  }

  function parseList(donatorList: string): string {
    const lineLength: number = 140
    const numberOfLines: number = 15
    let listArray: string[] = donatorList.split(',')
    let listLines: string[] = ['']
    let finalListString: string = ''
    let listLine: number = 0

    for (let i = 0; i < listArray.length; i++) {
      listLines[listLine] = listLines[listLine].concat(listArray[i])
      listLines[listLine] = listLines[listLine].concat(' - ')
      if (listLines[listLine].length > lineLength) {
        listLine += 1
        listLines.push('')
      }
    }

    let firstLine = listLines.length - numberOfLines
    if (firstLine < 0) {
      firstLine = 0
    }
    for (let i = firstLine; i < listLines.length; i++) {
      finalListString = finalListString.concat(listLines[i])
      finalListString = finalListString.concat('\n')
    }
    log(finalListString)
    return finalListString
  }
}
