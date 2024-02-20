const ethers = require('ethers');

const entropy = ethers.randomBytes(32);
const passPhrase = "Never enough";
// const seed = ethers.Mnemonic.fromEntropy(entropy, passPhrase);
const seed = ethers.Mnemonic.fromPhrase("output forward fan base elegant broom promote lady pledge labor stone stuff output pepper hint memory regular action sword almost punch swift mechanic lion", null);
// ethers.Mnemonic.from
console.log("Original seed: ", seed);

console.log(ethers.HDNodeWallet.fromPhrase(seed.phrase, passPhrase, "m/44'/60'/0'/0/0"));
console.log(ethers.HDNodeWallet.fromPhrase(seed.phrase, passPhrase));
console.log(ethers.HDNodeWallet.fromPhrase(seed.phrase, "passPhrase")); // -> Results in a different address because of wrong passphrase input


// ethers.HDNodeWallet.fromMnemonic(); 
// console.log(seed_phrase, seed_phrase.password);
// // ; console.log(ethers.Mnemonic.fromPhrase(seed_phrase.phrase));

// console.log(ethers.Wallet.fromPhrase(
//   ethers.Mnemonic.fromPhrase(originPhrase, "I love you").
// ));
// console.log(ethers.Wallet.fromPhrase(ethers.Mnemonic.fromPhrase(originPhrase, "")));
