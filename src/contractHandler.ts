// import * as eth from '../node_modules/eth-connect/esm'
// import { getProvider } from '@decentraland/web3-provider'
// import { getUserData, UserData } from '@decentraland/Identity'
// import donationContract from './abis/donationsAbi'
// //import collectionsContract from './abis/collectionAbi'
// let minDonation = 0.08

// // TODO:  get user address!!!!!!!!!!

// export let userData: UserData

// export function getUser() {
//   executeTask(async () => {
//     userData = await getUserData()
//     //log('USER ETH ADDRESS: ', userData.publicKey)
//   })
// }
// getUser()

// export async function getStock(maskId: string, amount: number) {
//   const provider = await getProvider()
//   const rm = new eth.RequestManager(provider)

//   const donationsTokenFactory = await new eth.ContractFactory(
//     rm,
//     donationContract
//   )
//   const donationsContract = (await donationsTokenFactory.at(
//     //ropsten: '0x5aae4ae8471b89f342df9fd45d51d96c31bc6d6b'

//     '0x56505A0313bA2B4bC0bE23Dbb7EB71b7885FCA9e'
//   )) as any

//   log('balance of: ', await donationsContract.balanceOf(maskId))
//   let responseCanMint = await donationsContract.canMint(maskId, amount)
//   log('can mint: ', responseCanMint)
//   return donationsContract.canMint(maskId, amount)
// }

// export async function makeMaskDonation(maskId: string, amount: number) {
//   const provider = await getProvider()
//   const rm = new eth.RequestManager(provider)

//   const donationsTokenFactory = await new eth.ContractFactory(
//     rm,
//     donationContract
//   )
//   const donationsContract = (await donationsTokenFactory.at(
//     //ropsten: '0x5aae4ae8471b89f342df9fd45d51d96c31bc6d6b'
//     '0x56505A0313bA2B4bC0bE23Dbb7EB71b7885FCA9e'
//   )) as any

//   return donationsContract.donateForNFT(maskId, {
//     from: userData.publicKey, //'0xe2b6024873d218B2E83B462D3658D8D7C3f55a18',
//     value: eth.toWei(amount, 'ether'), //amount * 1000000000000000000,
//   })
// }

// export async function makeSimpleDonation(amount: number) {
//   const provider = await getProvider()
//   const rm = new eth.RequestManager(provider)

//   const donationsTokenFactory = await new eth.ContractFactory(
//     rm,
//     donationContract
//   )
//   const donationsContract = (await donationsTokenFactory.at(
//     //ropsten: '0x5aae4ae8471b89f342df9fd45d51d96c31bc6d6b'
//     '0x56505A0313bA2B4bC0bE23Dbb7EB71b7885FCA9e'
//   )) as any

//   return donationsContract.donate({
//     from: userData.publicKey, //'0xe2b6024873d218B2E83B462D3658D8D7C3f55a18',
//     value: eth.toWei(amount, 'ether'), //amount * 1000000000000000000,
//   })
// }
