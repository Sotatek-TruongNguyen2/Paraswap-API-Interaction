const ethers = require('ethers');
const { BigNumber } = require('bignumber.js');

const main = async () => {
  let salt = ethers.keccak256(ethers.solidityPacked(
    ["address", "address", "uint", "uint"],
    ["0x5E699389821850Ea35f5A1f99384DF3E1B4C118b", "0x5E699389821850Ea35f5A1f99384DF3E1B4C118b", 1, new Date().getTime()]
  ));

  console.log(salt, new BigNumber(salt).toFixed());
}

main();
