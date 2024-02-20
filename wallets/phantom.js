const axios = require('axios');


// // 1.1 NFT Collectibles
// const main = async () => {

//     for (let i = 0; i < 1000; i++) {
//         const res = await axios.post("https://api.phantom.app/collectibles/v1",
//             {
//                 addresses: [{ "chainId": "solana:101", "address": "7kgcMiBiiiEGSs5jiKFdxDqc1JSV8gKAmFHypbUucq4E" }]
//             }
//         )

//         console.log(res.data);
//     }
// }

// main();

// 1.2 Activity Transactions
axios.post("https://api.phantom.app/history/v2",
    { "accounts": [{ "chainId": "solana:101", "address": "DxYtvDALWkoVTv2aGH9LVH66yFh1SrjKDDmbiadePa8e" }] }
).then(res => console.log(res.data.results))


// 1.3 Portfolio

// axios.post("https://api.phantom.app/tokens/v1?enableToken2022=true", { "addresses": [{ "chainId": "solana:101", "address": "7kgcMiBiiiEGSs5jiKFdxDqc1JSV8gKAmFHypbUucq4E" }] }).then(res => res.data).then(data => {
//     console.log(data.tokens);
// })