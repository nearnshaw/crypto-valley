import * as eth from '../node_modules/eth-connect/esm'
import { getProvider } from '@decentraland/web3-provider'
import { getUserData } from '@decentraland/Identity'
import donationContract from './abis/donationsAbi'
//import collectionsContract from './abis/collectionAbi'
let minDonation = 0.08

const userData = executeTask(async () => {
  const data = await getUserData()
  log('USER PUBLIC KEY: ', data.publicKey)
})

export async function getStock(maskId: string) {
  const provider = await getProvider()
  const rm = new eth.RequestManager(provider)

  const donationsTokenFactory = await new eth.ContractFactory(
    rm,
    donationContract
  )
  const donationsContract = (await donationsTokenFactory.at(
    '0x5aae4ae8471b89f342df9fd45d51d96c31bc6d6b'
  )) as any
  return await donationsContract.canMint(maskId)
}

export async function makeMaskDonation(maskId: string, amount: number) {
  const provider = await getProvider()
  const rm = new eth.RequestManager(provider)

  const donationsTokenFactory = await new eth.ContractFactory(
    rm,
    donationContract
  )
  const donationsContract = (await donationsTokenFactory.at(
    '0x5aae4ae8471b89f342df9fd45d51d96c31bc6d6b'
  )) as any

  return donationsContract.donateForNFT(maskId).send({
    from: '0x87956abC4078a0Cc3b89b419928b857B8AF826Ed', //userData.
    value: amount
  })
}

export async function makeSimpleDonation(amount: number) {
  const provider = await getProvider()
  const rm = new eth.RequestManager(provider)

  const donationsTokenFactory = await new eth.ContractFactory(
    rm,
    donationContract
  )
  const donationsContract = (await donationsTokenFactory.at(
    '0x5aae4ae8471b89f342df9fd45d51d96c31bc6d6b'
  )) as any

  return donationsContract.donate().send({
    from: '0x87956abC4078a0Cc3b89b419928b857B8AF826Ed', // userData.
    value: amount
  })
}
