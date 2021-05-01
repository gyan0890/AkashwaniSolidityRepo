const Web3 = require('web3');
const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const provider = new HDWalletProvider("311477193050f717777636e415595c1f5b24e3f38d59f624cd2cc64351ed56aa", `https://ropsten.infura.io/v3/e1277a8f34614da78c5fd020c2487a0d`);

const web3 = new Web3(provider);
const burnToken = async (contract_address, owner_address, amount) => {

    //const contract_address = "0x93E73ca052c7d4129141d4379460C0bdcc023e51";
    const abi = JSON.parse(fs.readFileSync('./TokenBase.abi', 'utf8'));
    var contract_interface = new web3.eth.Contract(abi,contract_address,{
     from: "0xfFe1426e77CE0F7c0945fCC1f4196CD8dC3f090A",
     gasPrice: '1000000000'   
    });

    var tx = {
        from: '0xfFe1426e77CE0F7c0945fCC1f4196CD8dC3f090A',
        to: contract_address,
        value: 0,
        gasPrice: '1000000000',  
        gas: '6721900', 
        //Parameters - tokenId, price - 500 $ONE(bigNum), biddingTime - seconds
        data: contract_interface.methods.burn(owner_address, "1000000000000000000").encodeABI() 
    };

    var privateKey = '311477193050f717777636e415595c1f5b24e3f38d59f624cd2cc64351ed56aa';
    var signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
	var sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
    console.log(sentTx);
}
const owner_address = "0x4b4E498990aB6F5f7AB779d8315DF1fF80d31c58"
var amount = "10000000000000000000000"
const deployed_token_contract = "0x93E73ca052c7d4129141d4379460C0bdcc023e51"
amount = "1000000000000000000";
burnToken(deployed_token_contract, owner_address, amount);

//process.exit();