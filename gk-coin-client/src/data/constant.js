export const abi = [
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "barcode",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bought",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "delivered",
                        "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct Kgc.order[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "name": "GetOrders",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "evict",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "account_list",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceDetails",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "escrow",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "usertype",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "blacklist",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "item_barcode",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "item_name",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "order_count",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "toVendor",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "number_items",
                "type": "uint256"
            }
        ],
        "name": "buy",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "toOrganization",
                "type": "address"
            }
        ],
        "name": "donate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getOrders",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "barcode",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "bought",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "delivered",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Kgc.order[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "god",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "myBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "number_of_accounts",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "usertype",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "currentBalance",
                "type": "uint256"
            }
        ],
        "name": "register",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "barcode",
                "type": "uint256"
            }
        ],
        "name": "registerVendor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "AirlineZ",
                "type": "address"
            }
        ],
        "name": "unregister",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "org",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "barcode",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "number_items",
                "type": "uint256"
            }
        ],
        "name": "validate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "validateOrg",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]