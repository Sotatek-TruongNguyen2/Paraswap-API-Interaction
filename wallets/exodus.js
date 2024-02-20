const axios = require('axios');



axios.get("https://nfts-proxy.exodus.io/v2/solana/7kgcMiBiiiEGSs5jiKFdxDqc1JSV8gKAmFHypbUucq4E/nfts").then(res => res.data).then(console.log);