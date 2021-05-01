const TokenBase = artifacts.require('TokenBase.sol');
const BridgeBase = artifacts.require('BridgeBase.sol');

module.exports = async function (deployer, addresses) {
    await deployer.deploy(TokenBase, "AeternityFungibleToken", "POP");
    const tokenEth = await TokenBase.deployed();
    // await tokenEth.mint("0x5d519e11E98Cd230D3e8d18C12E740D449fd05cD", 1000);
    // await deployer.deploy(BridgeBase, tokenEth.address);
    // const bridgeEth = await BridgeBase.deployed();
    // await tokenEth.updateAdmin(bridgeEth.address);
    // console.log("Bridge Eth Address is:", bridgeEth.address);
};