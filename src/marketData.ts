export type CoinData = {
  MANAETH: number
  MANABTC: number
  ETHUSDT: number
  BTCUSDT: number
  MANAUSDT: number
  LINKUSDT: number
  VETBUSD: number
  ALGOBUSD: number
  BNBUSDT: number
  XRPUSDT: number
  BCHUSDT: number
  LTCUSDT: number
  DOGEUSDT: number
}

export enum Tendency {
  Bear,
  Neutral,
  Bull,
}

export async function updateCoinData(): Promise<CoinData> {
  let data: CoinData = {
    MANAETH: 0,
    MANABTC: 0,
    ETHUSDT: 0,
    BTCUSDT: 0,
    MANAUSDT: 0,
    LINKUSDT: 0,
    VETBUSD: 0,
    ALGOBUSD: 0,

    BNBUSDT: 0,
    XRPUSDT: 0,
    BCHUSDT: 0,
    LTCUSDT: 0,
    DOGEUSDT: 0,
  }

  try {
    let targetUrl = 'https://api.binance.com/api/v3/ticker/price'
    let response = await fetch(targetUrl)
    let json = await response.json()

    for (var i = 0; i < json.length; i++) {
      switch (json[i].symbol) {
        case 'MANAETH':
          data.MANAETH = parseFloat(json[i].price)
          break
        case 'MANABTC':
          data.MANABTC = parseFloat(json[i].price)
          break
        case 'MANAUSDT':
          data.MANAUSDT = parseFloat(json[i].price)
          break
        case 'ETHUSDT':
          data.ETHUSDT = parseFloat(json[i].price)
          break
        case 'BTCUSDT':
          data.BTCUSDT = parseFloat(json[i].price)
          break

        case 'LINKUSDT':
          data.LINKUSDT = parseFloat(json[i].price)
          break

        case 'VETBUSD':
          data.VETBUSD = parseFloat(json[i].price)
          break

        case 'ALGOBUSD':
          data.ALGOBUSD = parseFloat(json[i].price)
          break
        case 'BNBUSDT':
          data.BNBUSDT = parseFloat(json[i].price)
          break

        case 'XRPUSDT':
          data.XRPUSDT = parseFloat(json[i].price)
          break

        case 'BCHUSDT':
          data.BCHUSDT = parseFloat(json[i].price)
          break
        case 'LTCUSDT':
          data.LTCUSDT = parseFloat(json[i].price)
          break
        case 'DOGEUSDT':
          data.DOGEUSDT = parseFloat(json[i].price)
          break
      }
    }
    log(data)
    AddDataBoards(data)
    return data
  } catch {
    log('Failed to connect to Binance API.')
    return data
  }
}

export enum StockDataTypes {
  BIGTITLE = 'bigtitle',
  BIGVALUE = 'bigvalue',
  TITLE = 'title',
  LABEL = 'label',
  VALUE = 'value',
  UNIT = 'unit',
  TINYVALUE = 'tinyvalue',
  TINYTITLE = 'tinytitle',
}

let SFFont = new Font(Fonts.SanFrancisco)
let SFHeavyFont = new Font(Fonts.SanFrancisco_Heavy)

export class StockData extends Entity {
  constructor(
    type: StockDataTypes,
    text: string,
    transform: TransformConstructorArgs,
    parent: Entity
  ) {
    super()
    engine.addEntity(this)

    this.addComponent(new Transform(transform))
    this.setParent(parent)

    let shape = new TextShape(text)

    shape.width = 10

    switch (type) {
      case StockDataTypes.BIGTITLE:
        shape.fontSize = 6
        shape.color = Color3.White()
        shape.vTextAlign = 'center'
        shape.font = SFHeavyFont
        break
      case StockDataTypes.BIGVALUE:
        shape.fontSize = 3
        shape.color = Color3.FromHexString('#e3a40e')
        shape.vTextAlign = 'center'
        shape.font = SFHeavyFont
        break

      case StockDataTypes.TITLE:
        shape.fontSize = 3
        shape.color = Color3.White()
        shape.vTextAlign = 'center'
        shape.width = 10
        shape.font = SFHeavyFont
        break
      case StockDataTypes.TINYTITLE:
        shape.fontSize = 2
        shape.color = Color3.White()
        shape.vTextAlign = 'center'
        shape.width = 10
        shape.font = SFFont
        break
      case StockDataTypes.LABEL:
        shape.fontSize = 3
        shape.color = Color3.White()
        shape.vTextAlign = 'left'
        shape.font = SFFont
        break
      case StockDataTypes.VALUE:
        shape.fontSize = 3
        shape.color = Color3.FromHexString('#e3a40e')
        shape.vTextAlign = 'right'
        shape.font = SFFont
        break
      case StockDataTypes.TINYVALUE:
        shape.fontSize = 2
        shape.color = Color3.FromHexString('#e3a40e')
        shape.vTextAlign = 'right'
        shape.font = SFFont
        break

      case StockDataTypes.UNIT:
        shape.fontSize = 2
        shape.color = Color3.White()
        shape.vTextAlign = 'right'
        shape.font = SFFont
        break
    }

    this.addComponent(shape)
  }
}

export function AddDataBoards(data: CoinData) {
  // Boards

  let board1 = new Entity()
  board1.addComponent(
    new Transform({
      position: new Vector3(31, 14, 63.999),
      rotation: Quaternion.Euler(0, 180, 0),
      scale: new Vector3(8, 8, 8),
    })
  )
  engine.addEntity(board1)

  let board2 = new Entity()
  board2.addComponent(
    new Transform({
      position: new Vector3(56, 14, 63.999),
      rotation: Quaternion.Euler(0, 180, 0),
      scale: new Vector3(8, 8, 8),
    })
  )
  engine.addEntity(board2)

  let board3 = new Entity()
  board3.addComponent(
    new Transform({
      position: new Vector3(81, 14, 63.999),
      rotation: Quaternion.Euler(0, 180, 0),
      scale: new Vector3(8, 8, 8),
    })
  )
  engine.addEntity(board3)

  // Data

  // 1
  //   let board2Title = new StockData(
  //     StockDataTypes.TITLE,
  //     'Price in USDT',
  //     {
  //       position: new Vector3(56, 13.9, 61),
  //       rotation: Quaternion.Euler(0, 180, 0),
  //       scale: new Vector3(10 * 3.2, 5.6 * 3.2, 0.01),
  //     },
  //     board1
  //   )

  let board2Label1 = new StockData(
    StockDataTypes.LABEL,
    'LINK',
    {
      position: new Vector3(-0.7, 0.7, 0),
    },
    board1
  )
  let board2Label2 = new StockData(
    StockDataTypes.LABEL,
    'VET',
    {
      position: new Vector3(-0.7, 0, 0),
    },
    board1
  )
  let boar2Label3 = new StockData(
    StockDataTypes.LABEL,
    'ALGO',
    {
      position: new Vector3(-0.7, -0.7, 0),
    },
    board1
  )

  let boar2Label4 = new StockData(
    StockDataTypes.LABEL,
    'XRP',
    {
      position: new Vector3(-0.7, -1.4, 0),
    },
    board1
  )

  let board2Val1 = new StockData(
    StockDataTypes.VALUE,
    (Math.floor(data.LINKUSDT * 10000) / 10000).toString().toString(),
    {
      position: new Vector3(0.6, 0.7, 0),
    },
    board1
  )
  let board2Val2 = new StockData(
    StockDataTypes.VALUE,
    (Math.floor(data.VETBUSD * 10000) / 10000).toString().toString(),
    {
      position: new Vector3(0.6, 0, 0),
    },
    board1
  )
  let board2Val3 = new StockData(
    StockDataTypes.VALUE,
    (Math.floor(data.ALGOBUSD * 10000) / 10000).toString(),
    {
      position: new Vector3(0.6, -0.7, 0),
    },
    board1
  )

  let board2Val4 = new StockData(
    StockDataTypes.VALUE,
    (Math.floor(data.XRPUSDT * 10000) / 10000).toString(),
    {
      position: new Vector3(0.6, -1.4, 0),
    },
    board1
  )

  // 2

  let board1Title = new StockData(
    StockDataTypes.BIGTITLE,
    'Price in USDT',
    {
      position: new Vector3(0, 1.5, 0),
    },
    board2
  )

  let board1Label1 = new StockData(
    StockDataTypes.LABEL,
    'MANA',
    {
      position: new Vector3(-0.7, 0.7, 0),
    },
    board2
  )
  let board1Label2 = new StockData(
    StockDataTypes.LABEL,
    'ETH',
    {
      position: new Vector3(-0.7, -0.3, 0),
    },
    board2
  )
  let board1Label3 = new StockData(
    StockDataTypes.LABEL,
    'BTC',
    {
      position: new Vector3(-0.68, -1.3, 0),
    },
    board2
  )

  let board1Val1 = new StockData(
    StockDataTypes.VALUE,
    data.MANAUSDT.toString(),
    {
      position: new Vector3(0.6, 0.7, 0),
    },
    board2
  )
  let board1Val2 = new StockData(
    StockDataTypes.VALUE,
    data.ETHUSDT.toString(),
    {
      position: new Vector3(0.6, -0.3, 0),
    },
    board2
  )
  let board1Val3 = new StockData(
    StockDataTypes.VALUE,
    (Math.floor(data.BTCUSDT * 1000) / 1000).toString(),
    {
      position: new Vector3(0.6, -1.3, 0),
    },
    board2
  )

  // 3
  //   let board3Title = new StockData(
  //     StockDataTypes.TITLE,
  //     'Price in USDT',
  //     {
  //       position: new Vector3(0, 1.5, 0),
  //     },
  //     board3
  //   )

  let board3Label1 = new StockData(
    StockDataTypes.LABEL,
    'BNB',
    {
      position: new Vector3(-0.7, 0.7, 0),
    },
    board3
  )
  let board3Label2 = new StockData(
    StockDataTypes.LABEL,
    'BCH',
    {
      position: new Vector3(-0.7, 0, 0),
    },
    board3
  )
  let boar3Label3 = new StockData(
    StockDataTypes.LABEL,
    'LTC',
    {
      position: new Vector3(-0.7, -0.7, 0),
    },
    board3
  )

  let boar3Label4 = new StockData(
    StockDataTypes.LABEL,
    'DOGE',
    {
      position: new Vector3(-0.7, -1.4, 0),
    },
    board3
  )

  let board3Val1 = new StockData(
    StockDataTypes.VALUE,
    (Math.floor(data.BNBUSDT * 10000) / 10000).toString().toString(),
    {
      position: new Vector3(0.6, 0.7, 0),
    },
    board3
  )
  let board3Val2 = new StockData(
    StockDataTypes.VALUE,
    (Math.floor(data.BCHUSDT * 10000) / 10000).toString().toString(),
    {
      position: new Vector3(0.6, 0, 0),
    },
    board3
  )
  let board3Val3 = new StockData(
    StockDataTypes.VALUE,
    (Math.floor(data.LTCUSDT * 10000) / 10000).toString(),
    {
      position: new Vector3(0.6, -0.7, 0),
    },
    board3
  )

  let board3Val4 = new StockData(
    StockDataTypes.VALUE,
    (Math.floor(data.DOGEUSDT * 10000) / 10000).toString(),
    {
      position: new Vector3(0.6, -1.4, 0),
    },
    board3
  )
}
