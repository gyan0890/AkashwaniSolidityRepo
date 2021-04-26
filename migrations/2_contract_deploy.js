const TokenEth = artifacts.require('TokenEth.sol');
const BridgeEth = artifacts.require('BridgeEth.sol');

module.exports = async function (deployer, addresses) {
    await deployer.deploy(TokenEth);
    const tokenEth = await TokenEth.deployed();
    await tokenEth.mint(addresses[0], 1000);
    await deployer.deploy(BridgeEth, tokenEth.address);
    const bridgeEth = await BridgeEth.deployed();
    await tokenEth.updateAdmin(bridgeEth.address);
};