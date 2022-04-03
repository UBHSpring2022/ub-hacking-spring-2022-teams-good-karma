import React, { useEffect } from "react";
import Web3 from 'web3'
var provider = 'ws://localhost:7545';
var web3 = new Web3(provider);
var abi = [
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "usertype",
                "type": "uint256"
            }
        ],
        "name": "register",
        "outputs": [],
        "stateMutability": "payable",
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
        "stateMutability": "payable",
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
    }
]

var byteCOde = "6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555034600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160006101000a81548160ff0219169083151502179055506003600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055504760018190555061169f806101896000396000f3fe6080604052600436106100855760003560e01c8063a3aa191311610059578063a3aa191314610116578063c9116b6914610158578063cce7ec1314610183578063d71fbd7f1461019f578063f207564e146101c857610085565b8062362a951461008a57806316a6ce6a146100a65780632e2dc43e146100c25780632ec2c246146100ed575b600080fd5b6100a4600480360361009f9190810190611331565b6101e4565b005b6100c060048036036100bb91908101906113e5565b6103eb565b005b3480156100ce57600080fd5b506100d76105b1565b6040516100e491906114f3565b60405180910390f35b3480156100f957600080fd5b50610114600480360361010f9190810190611331565b6107fe565b005b34801561012257600080fd5b5061013d60048036036101389190810190611308565b6109bc565b60405161014f96959493929190611530565b60405180910390f35b34801561016457600080fd5b5061016d610a05565b60405161017a9190611515565b60405180910390f35b61019d6004803603610198919081019061135a565b610a0b565b005b3480156101ab57600080fd5b506101c660048036036101c19190810190611396565b610f58565b005b6101e260048036036101dd91908101906113e5565b611129565b005b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541461023057600080fd5b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541461027f57600080fd5b6000339050600034905080600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015401600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555080600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015403600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156103e5573d6000803e3d6000fd5b50505050565b60003390506001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060028060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160006101000a81548160ff02191690831515021790555034600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206006018190555081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600301819055505050565b60606001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054146105ff57600080fd5b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541461064e57600080fd5b6060600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600601546040519080825280602002602001820160405280156106cc57816020015b6106b96112a8565b8152602001906001900390816106b15790505b50905060008090505b600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600601548110156107bf57600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600501600082815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820154815250508282815181106107a757fe5b602002602001018190525080806001019150506106d5565b507fc1bc407fd68a5c4f2c9339fb54be62eb2867e25d75c672667b774c065b8b4252816040516107ef91906114f3565b60405180910390a18091505090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461085757600080fd5b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054146108a357600080fd5b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508073ffffffffffffffffffffffffffffffffffffffff166108fc600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549081150290604051600060405180830381858888f19350505050158015610970573d6000803e3d6000fd5b506000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555050565b60026020528060005260406000206000915090508060000154908060010154908060020160009054906101000a900460ff16908060030154908060040154908060060154905086565b60015481565b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414610a5757600080fd5b6001600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001015414610aa657600080fd5b6000339050600034905080600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015401600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018190555080600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015403600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506000600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030154905060008090505b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060060154811015610d7c5781600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005016000838152602001908152602001600020600001541415610d6f5784600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005016000838152602001908152602001600020600101600082825401925050819055508573ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051600060405180830381858888f19350505050158015610d65573d6000803e3d6000fd5b5050505050610f54565b8080600101915050610c13565b5080600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005016000600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206006015481526020019081526020016000206000018190555083600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206005016000600260008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060060154815260200190815260200160002060010181905550600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600601600081548092919060010191905055508473ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f19350505050158015610f4f573d6000803e3d6000fd5b505050505b5050565b6001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414610fa457600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ffd57600080fd5b60008090505b600260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600601548110156111225782600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050160008381526020019081526020016000206000015414156111155781600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050160008381526020019081526020016000206002016000828254019250508190555050611124565b8080600101915050611003565b505b505050565b60003390506001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160006101000a81548160ff02191690831515021790555034600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055506000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600601819055505050565b60405180606001604052806000815260200160008152602001600081525090565b6000813590506112d881611624565b92915050565b6000813590506112ed8161163b565b92915050565b60008135905061130281611652565b92915050565b60006020828403121561131a57600080fd5b6000611328848285016112c9565b91505092915050565b60006020828403121561134357600080fd5b6000611351848285016112de565b91505092915050565b6000806040838503121561136d57600080fd5b600061137b858286016112de565b925050602061138c858286016112f3565b9150509250929050565b6000806000606084860312156113ab57600080fd5b60006113b9868287016112c9565b93505060206113ca868287016112f3565b92505060406113db868287016112f3565b9150509250925092565b6000602082840312156113f757600080fd5b6000611405848285016112f3565b91505092915050565b600061141a8383611493565b60608301905092915050565b6000611431826115a1565b61143b81856115b9565b935061144683611591565b8060005b8381101561147757815161145e888261140e565b9750611469836115ac565b92505060018101905061144a565b5085935050505092915050565b61148d816115ee565b82525050565b6060820160008201516114a960008501826114d5565b5060208201516114bc60208501826114d5565b5060408201516114cf60408501826114d5565b50505050565b6114de8161161a565b82525050565b6114ed8161161a565b82525050565b6000602082019050818103600083015261150d8184611426565b905092915050565b600060208201905061152a60008301846114e4565b92915050565b600060c08201905061154560008301896114e4565b61155260208301886114e4565b61155f6040830187611484565b61156c60608301866114e4565b61157960808301856114e4565b61158660a08301846114e4565b979650505050505050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b60006115d5826115fa565b9050919050565b60006115e7826115fa565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b61162d816115ca565b811461163857600080fd5b50565b611644816115dc565b811461164f57600080fd5b50565b61165b8161161a565b811461166657600080fd5b5056fea2646970667358221220b69c085c4d85f6cfdd5362651192b8787d40b5e987a1c31ed91c091c97da533064736f6c63430006020033"

const Play = () => {
    useEffect(()=> {
    tryAddAccount(); 
    }, [])
    const tryAddAccount = async () => {
        let deploy_contract = new web3.eth.Contract(abi, "0x72D096b0776aEf49f63aEb3363Cd39C9b5C2ece9");
        console.log(deploy_contract);

        // await deploy_contract.methods.donate("0x80a7635930fAcb45894fb185E5c8F92cb78c1f55").send({
        //     from: "0xF0A6Be2F3abA0F39C451CA8f2083B9177c849E2a",
        //     value: "200000000000000000"
        // });
        
        console.log(web3.eth)
        console.log("Create",web3.eth.accounts.create())
        console.log(web3.eth.accounts);
        console.log(web3)
        // var accounts = new Accounts('ws://10.84.21.187:7545');
        // console.log(accounts);
    }
    return (
        <div>
            Play Page
            <div onClick={tryAddAccount}>
                Click
            </div>
        </div>
    )
}


export default Play