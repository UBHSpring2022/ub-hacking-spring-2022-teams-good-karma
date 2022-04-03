import React from "react";
import Web3 from 'web3'
let web3 = new Web3("ws://localhost:7545");
// var Accounts = require('web3-eth-accounts')

const Play = () => {
    const tryAddAccount = () => {
        console.log(web3.eth)
        console.log("Create",web3.eth.accounts.create())
        console.log(web3.eth.accounts);
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