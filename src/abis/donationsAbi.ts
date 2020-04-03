export default [
  {
    inputs: [
      {
        internalType: 'address payable',
        name: '_fundsRecipient',
        type: 'address'
      },
      {
        internalType: 'contract ERC721Collection',
        name: '_erc721Collection',
        type: 'address'
      },
      { internalType: 'uint256', name: '_minDonation', type: 'uint256' }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'Donated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_caller',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_wearable',
        type: 'string'
      }
    ],
    name: 'DonatedForNFT',
    type: 'event'
  },
  {
    constant: true,
    inputs: [{ internalType: 'string', name: '_wearableId', type: 'string' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ internalType: 'string', name: '_wearableId', type: 'string' }],
    name: 'canMint',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'donate',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'string', name: '_wearableId', type: 'string' }],
    name: 'donateForNFT',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'donations',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'erc721Collection',
    outputs: [
      { internalType: 'contract ERC721Collection', name: '', type: 'address' }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'fundsRecipient',
    outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'minDonation',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
]
