const sdk = require('api')('@nftgo/v1.1#361dk2dlphzed4j'); const axios = require('axios');
const key = "a45d97f7-eee8-4841-8470-5a9bd2c2f800";
const key2 = "05876750-e6fd-4139-9b82-33fde894ff37";


// const keys = [key, key2];

// const main = async () => {

//   for (let i = 0; i < 1000; i++)  {
//     const res = await axios.post("https://api.phantom.app/collectibles/v1", 
//        {
//         addresses:[{"chainId":"solana:101","address":"7kgcMiBiiiEGSs5jiKFdxDqc1JSV8gKAmFHypbUucq4E"}]
//       }
//     )

//     console.log(res.data);
//   }
// }

// main();
//
//

// axios.post("https://api.phantom.app/history/v2", 
//   {"accounts":[{"chainId":"solana:101","address":"DxYtvDALWkoVTv2aGH9LVH66yFh1SrjKDDmbiadePa8e"}]}
// ).then(res => console.log(res.data.results))

// axios.get("https://ap.isafepal.com/wallet/v1/trx/getBalance/TPKwfhoYXzpFhRnP3UCXCnLDDrtzKs3AuC").then(res => {
//   console.log(res);
// })

// axios.get("https://symbol-search.tradingview.com/symbol_search/v3/?text=UPS&hl=1&search_type=crypto&exchange=&lang=en&search_type=undefined&domain=production&sort_by_country=US").then(res => res.data).then(data => {
//   return data.symbols.filter(symbol => symbol.type === 'spot')
// }).then(data => console.log(data));

// const number = Math.floor(Math.random() * 1000);
// console.log(keys[number % 2]);

// let a = '';

// for (let i = 1; i < 110; i++) {
//     if (i == 1) {
//         a += i;
//     } else {
//         a += `,${i}`
//     }
// }

// console.log(a);

axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=1`, {
    headers: {
        'X-CMC_PRO_API_KEY': keys[1]
    }
}).then(data => data.data.data).then(res => {
    console.log(res);
})

// for (let i = 0; i < 100; i++) {
// axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=USDC`, {
//     headers: {
//         'X-CMC_PRO_API_KEY': keys[1]
//     }
// }).then(data => {
//     return data.data.data
// }).then(res => {
//     console.log(res.USDC);
//     // for (let i of res) {
//     //     if (i.symbol === 'USDC') {
//     //         console.log(i[]);
//     //     }
//     // }
// }).catch(err => {
//     console.log()
// });
// // }

axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?cryptocurrency_type=all&start=1&limit=5000&convert=USD&tag=all&sort=market_cap&sort_dir=desc`, {
    headers: {
        'X-CMC_PRO_API_KEY': keys[1]
    }
}).then(data => data.data.data).then(res => {
    console.log(res[2]);
});


// const coins = res.coins;
// for (let coin of coins) {
// console.log(coin.name, coin.symbol, coin.tags, coin.cmc_rank, coin.name, coin.quote['USD'].price, coin.quote['USD'].percent_change_24h, coin.quote['USD'].volume_24h, coin.quote['USD'].volume_change_24h);


// const categories = res.data;

// for (let category of categories) {
// console.log(category.name, category.id);
// }
// })


const meme_category_id = "6051a82566fc1b42617d6dc6";
const defi_category_id = "5fb62883c9ddcc213ed13308";
const collectible_category_id = "60291fa0db1be76c46298e83";
const gaming_category = "6051a82166fc1b42617d6dc1";
const metaverse = "6053dfb66be1bf5c15e865ee";

// axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/categories`, {
//     headers: {
//         'X-CMC_PRO_API_KEY': key
//     }
// }).then(data => data.data.data).then(res => {
//     for (let category of res) {
//         console.log(category.name, category.id);
//     }
// });

// axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/trending/latest`, {
//     headers: {
//         'X-CMC_PRO_API_KEY': key
//     }
// }).then(data => data.data).then(res => {
//     console.log(res.data.coins);
// });

//   console.log(res['21351'].contract_address[1].platform)
//   // console.log(res)
//   // const coins = res


//   // const coins = res.coins;
//   // for (let coin of coins) {
//   // console.log(coin.name, coin.symbol, coin.tags, coin.cmc_rank, coin.name, coin.quote['USD'].price, coin.quote['USD'].percent_change_24h, coin.quote['USD'].volume_24h, coin.quote['USD'].volume_change_24h);


//   // const categories = res.data;

//   // for (let category of categories) {
//   // console.log(category.name, category.id);
//   // }
// })




// // console.log(sdk.prototype...);
// sdk.auth('091fca96-2af8-4d6b-92f0-12b8115701bc');
// sdk.get_collection_by_name_eth_v1_collection_name__keywords__get({ keywords: 'man' })
//   .then(({ data }) => console.log(data))
//   .catch(err => console.error(err));


// - Polygon
// - Binance Smart Chain
// - Ethereum
// - Celo
// - Klaytn
// - Optimism 
// - Arbitrum
// - Avalanche
// - Aurora
// - Harmony
// - Gnosis Chain
// - Fantom Opera
