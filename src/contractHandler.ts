import * as eth from '../node_modules/eth-connect/esm'
import { getProvider } from '@decentraland/web3-provider'
import { getUserData, UserData } from '@decentraland/Identity'
import donationContract from './abis/donationsAbi'
//import collectionsContract from './abis/collectionAbi'
let minDonation = 0.08

// TODO:  get user address!!!!!!!!!!

export let userData: UserData

export function getUser() {
  executeTask(async () => {
    userData = await getUserData()
    //log('USER ETH ADDRESS: ', userData.publicKey)
  })
}
getUser()

export async function getStock(maskId: string) {
  const provider = await getProvider()
  const rm = new eth.RequestManager(provider)

  const donationsTokenFactory = await new eth.ContractFactory(
    rm,
    donationContract
  )
  const donationsContract = (await donationsTokenFactory.at(
    '0x5aae4ae8471b89f342df9fd45d51d96c31bc6d6b'

    /// mainnet: 0xc2ff6d64085d444812fd6ceeb3e53d96c9f53c93
  )) as any
  return await donationsContract.canMint(maskId)
  // mainnet: canMint('mask_1', 10)     (number of masks)
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
    /// mainnet: 0xc2ff6d64085d444812fd6ceeb3e53d96c9f53c93
  )) as any

  return donationsContract.donateForNFT(maskId, {
    from: '0xe2b6024873d218B2E83B462D3658D8D7C3f55a18',
    value: eth.toWei(amount, 'ether'), //amount * 1000000000000000000,
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
    /// mainnet: 0xc2ff6d64085d444812fd6ceeb3e53d96c9f53c93
  )) as any

  return donationsContract.donate({
    from: '0xe2b6024873d218B2E83B462D3658D8D7C3f55a18',
    value: eth.toWei(amount, 'ether'), //amount * 1000000000000000000,
  })
}
