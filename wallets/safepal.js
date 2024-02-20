const axios = require('axios');

// Portfolio

// axios.post('https://ap.isafepal.com/wallet/v1/solana/balances', {
//     address: "7kgcMiBiiiEGSs5jiKFdxDqc1JSV8gKAmFHypbUucq4E"
// }).then(res => res.data.data).then(data => {
//     console.log(data.balance, data.tokens);
// });


// Activity transactions

axios.get('https://ap.isafepal.com/wallet/v1/solana/confirmedSignatures?address=7kgcMiBiiiEGSs5jiKFdxDqc1JSV8gKAmFHypbUucq4E&limit=50').then(res => res.data.data).then(data => {
    console.log(data);
})