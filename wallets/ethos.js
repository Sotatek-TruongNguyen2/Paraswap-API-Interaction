const axios = require('axios');

// Collectibles

axios.post("https://sui.ethoswallet.xyz/sui", { "jsonrpc": "2.0", "id": "0", "method": "suix_getOwnedObjects", "params": ["0x9132b3abab9a3d58cb3995d663adaa3037ffae899569808337030b7648ceb253", {}, null, null] }).then(res => res.data).then(data => {
    const objectIds = data.result.data.map(data => data.data.objectId);
    console.log(objectIds);

    axios.post("https://sui.ethoswallet.xyz/sui", { "jsonrpc": "2.0", "id": "5", "method": "sui_multiGetObjects", "params": [objectIds, { "showOwner": true, "showContent": true, "showType": true, "showDisplay": true }] }).then(res => res.data).then(data => {
        console.log(data.result);
    })
})

