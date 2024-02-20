const axios = require('axios');

// ==================== SOL FLARE ======================

// // 1.1 NFT
// axios.post("https://wallet-api.solflare.com/v2/portfolio/nfts/7kgcMiBiiiEGSs5jiKFdxDqc1JSV8gKAmFHypbUucq4E?network=mainnet&currency=USD", {
//     legitimate: [],
//     suspicious: []
// }).then(res => res.data).then(console.log)

// // 1.2 Activity Transactions
// axios.get("https://activity-api.solflare.com/v1/signatures?address=7kgcMiBiiiEGSs5jiKFdxDqc1JSV8gKAmFHypbUucq4E&network=mainnet").then(res => res.data).then(paragraph => {
//     const regex = /"hash":"([^"]+)"/g;
//     let match;
//     const signatures = [];

//     while ((match = regex.exec(paragraph)) !== null) {
//         signatures.push(match[1]);
//     }

//     axios.post("https://activity-api.solflare.com/v1/transactions?network=mainnet", {
//         address: "7kgcMiBiiiEGSs5jiKFdxDqc1JSV8gKAmFHypbUucq4E",
//         language: "en-US",
//         layout: "mobile",
//         signatures
//     }).then(res => res.data).then(console.log)

// })

// 1.3 Portfolio
axios.get("https://wallet-api.solflare.com/v2/portfolio/tokens/7kgcMiBiiiEGSs5jiKFdxDqc1JSV8gKAmFHypbUucq4E?network=mainnet&currency=USD").then(res => res.data).then(console.log)
