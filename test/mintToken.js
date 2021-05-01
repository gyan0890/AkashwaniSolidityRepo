const Web3 = require('web3');
const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const provider = new HDWalletProvider("311477193050f717777636e415595c1f5b24e3f38d59f624cd2cc64351ed56aa", `https://ropsten.infura.io/v3/e1277a8f34614da78c5fd020c2487a0d`);

const web3 = new Web3(provider);
const mintToken = async (contract_address_token, to_address, amount) => {

    //Need to write the code to deploy the contract, unable to deploy using Infura - can we call truffle migrate and then get the token address??
    //const contract_address_token = "0x93E73ca052c7d4129141d4379460C0bdcc023e51";
    const abi_token = JSON.parse(fs.readFileSync('./TokenBase.abi', 'utf8'));
    var contract_interface_token = await new web3.eth.Contract(abi_token,contract_address_token,{
    from: "0xfFe1426e77CE0F7c0945fCC1f4196CD8dC3f090A",
     gasPrice: '1000000000'   
    });
    console.log(contract_interface_token);


    var tx = {
        from: "0xfFe1426e77CE0F7c0945fCC1f4196CD8dC3f090A",
        to: contract_address_token,
        value: 0,
        gasPrice: '1000000000',  
        gas: '6721900', 
        data: contract_interface_token.methods.mint(to_address, "10000000000000000000").encodeABI() 
    };

    var privateKey = '311477193050f717777636e415595c1f5b24e3f38d59f624cd2cc64351ed56aa';
    var signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
	var sentTx = await web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
    console.log(sentTx);

}
// //In mint token, we need to send the token contract address that we deploy in order to mint the tokens
const to_address = "0x4b4E498990aB6F5f7AB779d8315DF1fF80d31c58"
var amount = "10000000000000000000000"
const deployed_token_contract = "0x93E73ca052c7d4129141d4379460C0bdcc023e51"
mintToken(deployed_token_contract, to_address, amount)

//process.exit()