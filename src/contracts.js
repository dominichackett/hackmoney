export const SOUSOU_ADDRESS ='0xDb851E74A32394f38c2C03430333b300bdF3468d';
export const SOUSOU_ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "acceptedInvites",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dateEmitted",
          "type": "uint256"
        }
      ],
      "name": "AcceptedInvites",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dateEmitted",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isAcceptingPayment",
          "type": "bool"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "currentHand",
          "type": "uint256"
        }
      ],
      "name": "AcceptingPayment",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "guid",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dateAdded",
          "type": "uint256"
        }
      ],
      "name": "AddInvite",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "createdDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "startDate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "numberOfHands",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "distribution",
          "type": "uint256"
        }
      ],
      "name": "CreatedSouSou",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "declinedInvites",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dateEmitted",
          "type": "uint256"
        }
      ],
      "name": "DeclinedInvites",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "member",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "order",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dateEmitted",
          "type": "uint256"
        }
      ],
      "name": "DistributionOrder",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dateEmitted",
          "type": "uint256"
        }
      ],
      "name": "DistributionsDrawn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "member",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "hand",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "datePaid",
          "type": "uint256"
        }
      ],
      "name": "HandPaid",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "guid",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dateAccepted",
          "type": "uint256"
        }
      ],
      "name": "InviteAccepted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "guid",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "dateAccepted",
          "type": "uint256"
        }
      ],
      "name": "InviteDeclined",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "member",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "dateMade",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "hand",
          "type": "uint256"
        }
      ],
      "name": "PaymentMade",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "randomness",
          "type": "uint256"
        }
      ],
      "name": "rawFulfillRandomness",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "numberOfHands",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "distribution",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "startDate",
          "type": "uint256"
        }
      ],
      "name": "createSouSou",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        }
      ],
      "name": "orderHandDistribution",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        }
      ],
      "name": "payContribution",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        }
      ],
      "name": "payHand",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "guid",
          "type": "string"
        }
      ],
      "name": "addInvite",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "guid",
          "type": "string"
        }
      ],
      "name": "acceptInvite",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "sousou",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "guid",
          "type": "string"
        }
      ],
      "name": "declineInvite",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];