const axios = require('axios');

// 1.1 Portfolio

// axios.post("https://wallet-rpc.mainnet.sui.io/", {
//     id: 170,
//     jsonrpc: "2.0",
//     method: "suix_getAllBalances",
//     params: ["0x9132b3abab9a3d58cb3995d663adaa3037ffae899569808337030b7648ceb253", "0x2::sui::SUI"]
// }).then(res => res.data).then(data => {
//     console.log(data);
// })

// 1.2 Activity Transactions


// axios.post("https://wallet-rpc.mainnet.sui.io/", { "jsonrpc": "2.0", "id": 383, "method": "suix_queryTransactionBlocks", "params": [{ "filter": { "ToAddress": "0x9132b3abab9a3d58cb3995d663adaa3037ffae899569808337030b7648ceb253" }, "options": { "showInput": true, "showEffects": true, "showEvents": true } }, null, null, true] }).then(res => res.data).then(data => {
//     // console.log(data.result.data);
//     // console.log(data.result.data[2]);

//     for (let people of data.result.data) {
//         axios.post("https://wallet-rpc.mainnet.sui.io/", { "jsonrpc": "2.0", "id": 21, "method": "sui_getTransactionBlock", "params": [people.digest, { "showBalanceChanges": true, "showObjectChanges": true, "showInput": true, "showEffects": true, "showEvents": true }] }).then(res => res.data).then(data => {
//             console.log(data.result.balanceChanges);
//         })
//     }
// })



// 1.3 NFT Collectible

// axios.post("https://wallet-rpc.mainnet.sui.io/", {"jsonrpc":"2.0","id":5,"method":"suix_getOwnedObjects","params":["0x9132b3abab9a3d58cb3995d663adaa3037ffae899569808337030b7648ceb253",{"filter":{"MatchNone":[{"StructType":"0x2::coin::Coin"}]},"options":{"showType":true,"showContent":true,"showDisplay":true}},null,50]}).then(res => res.data).then(data => {
//   console.log(data.result.data);
// })
