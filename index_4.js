const axios = require('axios');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const personToSheetId = {
  "THAI": 2042998912,
  "MANH": 2004761141,
  "ML": 1354884673
}

function parseCookieString(cookieString) {
  const cookieDict = {};
  const cookies = cookieString.split(";");

  for (const cookie of cookies) {
    if (cookie.includes("=")) {
      const [key, value] = cookie.split("=");
      try {
        cookieDict[key.trim()] = value.trim();
      } catch (error) {
        // Handle the error if needed
      }
    }
  }

  return cookieDict;
}

function buildHeaders(cookie, dataForm = null, Host = null) {
  if (Host === null) Host = "www.facebook.com";
  var headers = {};
  headers["Cookie"] = cookie;
  headers["Host"] = Host;
  headers["Connection"] = "keep-alive";
  if (dataForm !== null) {
    headers["Content-Length"] = String(dataForm.length);
  }
  headers["User-Agent"] =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36";
  headers["Accept"] = "*/*";
  headers["Origin"] = "https://" + Host;
  headers["Sec-Fetch-Site"] = "same-origin";
  headers["Sec-Fetch-Mode"] = "cors";
  headers["Sec-Fetch-Dest"] = "empty";
  headers["Referer"] = "https://" + Host;
  headers["Accept-Language"] = "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7";
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  return headers;
}


function formAll(dataFB, FBApiReqFriendlyName, docID, requireGraphql) {
  let __reg = 10;
  __reg += 1;
  let dataForm = {};
  console.log(docID);
  if (requireGraphql === null || requireGraphql === undefined) {
    dataForm["__comet_req"] = 15;
    dataForm["lsd"] = dataFB["lsd"];
    dataForm["fb_dtsg"] = dataFB["fb_dtsg"];
    dataForm["jazoest"] = dataFB["jazoest"];
    dataForm["__a"] = 1;
    dataForm["__user"] = dataFB["FacebookID"];
    dataForm["__req"] = __reg.toString(36);
    dataForm["__rev"] = dataFB["client_revision"];
    dataForm["av"] = dataFB["FacebookID"];
    dataForm["fb_api_caller_class"] = "RelayModern";
    dataForm["fb_api_req_friendly_name"] = FBApiReqFriendlyName;
    dataForm["server_timestamps"] = "true";
    dataForm["doc_id"] = docID;
  } else {
    dataForm["fb_dtsg"] = dataFB["fb_dtsg"];
    dataForm["jazoest"] = dataFB["jazoest"];
    dataForm["__a"] = 1;
    dataForm["__user"] = dataFB["FacebookID"];
    dataForm["__req"] = __reg.toString(36);
    dataForm["__rev"] = dataFB["client_revision"];
    dataForm["av"] = dataFB["FacebookID"];
  }

  return dataForm;
}


function dataSplit(string1, string2, numberSplit1, numberSplit2, HTML, amount, string3, numberSplit3) {
  if (amount === undefined || amount === null) {
    return HTML.split(string1)[numberSplit1].split(string2)[numberSplit2];
  } else if (amount === 3) {
    return HTML.split(string1)[numberSplit1].split(string2)[numberSplit2].split(string3)[numberSplit3];
  }
}

const main = async () => {

  const serviceAccountAuth = new JWT({
    keyFile: `${process.cwd()}/google-api-key.json`,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  const spreadsheetId = "14KbS-4ZX_B2lZYDTemZ7m5ip6LmWl8JRysi9TPCGVwc";
  const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);

  try {
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);

    const sheet = doc.sheetsById["2042998912"]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`

    // let rows = await sheet.getRows({
    //   offset: 0,
    //   limit: 50
    // }); // can pass in { limit, offset }

    console.log(await sheet.getCellsInRange("E3:E"));

    // rows = rows.filter(row => {
    //   const rowData = row._rawData;
    //   console.log(rowData);
    //   if (rowData.length) {
    //     const postLink = rowData[rowData.length - 1];

    //     if (postLink.includes("https://www.facebook.com/")) {
    //       return true;
    //     }
    //   }

    //   return false;
    // })


    const cookie = "sb=7PyGYglCg7DOMWPco2Uw1PO_; x-referer=eyJyIjoiL2hvbWUucGhwP3RidWE9MSIsImgiOiIvaG9tZS5waHA%2FdGJ1YT0xIiwicyI6Im0ifQ%3D%3D; m_pixel_ratio=1.7999999523162842; m_ls=%7B%22c%22%3A%7B%221%22%3A%22HCwAABa0nygW5qi7pQITBBbOsIjA5L0tAA%22%2C%222%22%3A%22GSwVQBxMAAAWABb82_q9DBYAABV-HEwAABYAFobc-r0MFgAAFiAA%22%2C%225%22%3A%22GTwVNBwcGAAYABUEAAAWARYAFgAAFXAcHBgAGAAVBAAAFgEWABYAABWAARwcGAAYABUEAAAWARYAFgAAFiAA%22%2C%227%22%3A%22KLUv_SK4tyLdAACYGwRGAobc-r0MJAAgFobc-r0MAAP0AvSz1Ss%22%2C%2216%22%3A%22FQQVCBmcFQQVDCaI3Pq9DBYAABUEFTomiNz6vQwWAAAVBBU8Jorc-r0MFgAAFQQVUiaK3Pq9DBYAABUEFWAmitz6vQwWAAAVBBViJojc-r0MFgAAFQQVaiaI3Pq9DBYAABUEFW4mitz6vQwWAAAVBBV0Jojc-r0MFgAAFhARAA%22%2C%2226%22%3A%22dummy_cursor%22%2C%2228%22%3A%221675581187%22%7D%2C%22d%22%3A%2211ac62e9-1a96-4156-bf39-efdc2cbc5e27%22%2C%22s%22%3A%220%22%7D; datr=M7BhZII0kSonBQoZnY80hUg_; datr=__GMZCgwVF5BbyvAtfJojQwg; usida=eyJ2ZXIiOjEsImlkIjoiQXM0b3FyYmExcjY1eSIsInRpbWUiOjE3MDA5MjY4MzV9; locale=en_GB; c_user=61553828226315; dpr=2; wd=1440x768; xs=32%3AzSVzpZFfTMBI6Q%3A2%3A1700934439%3A-1%3A-1%3A%3AAcWtKNMRvUkoPsow8pKx45Z11TGfm2xB2TgRgqeeog; fr=11msyrGkBvkdxtcLr.AWWB5enMEnPKiFN7xq8tK2xCgQg.BlYlfn.zJ.AAA.0.0.BlYlfn.AWWZrjxNkV0; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1700943879794%2C%22v%22%3A1%7D";

    reaction_url = `https://m.facebook.com/ufi/reaction/profile/browser/?ft_ent_identifier=1262570741784757`

    const mainRequests = {
      headers: {
        authority: 'm.facebook.com',
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
        Cookie: cookie
      },
      timeout: 60000,
      url: 'https://www.facebook.com/',
    };


    axios.get(mainRequests.url, {
      headers: mainRequests.headers,
      timeout: mainRequests.timeout,
      withCredentials: true, // This enables sending cookies in cross-origin requests
    })
      .then(async response => {
        // Handle the successful response
        const data = response.data;

        // Continue with your logic here...
        const LSD = dataSplit(`LSD\",[],{\"token\":\"`, "\"", 1, 0, data)
        const jazoest = dataSplit("jazoest=", "\"", 1, 0, data)
        const fb_dtsg = dataSplit(`token\":\"`, `\"`, 2, 0, data);
        const fb_dtsg_ag = dataSplit(`async_get_token\":\"`, `\"`, 1, 0, data);
        const appID = dataSplit(`\"appId\":`, ",", 1, 0, data);
        const clientID = dataSplit(`clientID\":\"`, "\"", 1, 0, data);
        const sessionID = dataSplit(`sessionId\":\"`, "\"", 1, 0, data);
        const clientRevision = dataSplit(`client_revision\":`, ",", 1, 0, data);
        const hash = dataSplit(`hash\":\"`, "\"", 1, 0, data);


        const dataFB = {
          "fb_dtsg": fb_dtsg,
          "fb_dtsg_ag": fb_dtsg_ag,
          "jazoest": jazoest,
          "lsd": LSD,
          "hash": hash,
          "sessionID": sessionID,
          "clientID": clientID,
          "appID": appID,
          "client_revision": clientRevision,
          "FacebookID": cookie.split("c_user=")[1].split(";")[0],
          "cookieFacebook": cookie
        }

        dataForm = formAll(dataFB, "CometTahoeRootQuery", "24455634630717211")
        dataForm["variables"] = JSON.stringify(
          {
            UFI2CommentsProvider_commentsKey: "CometTahoeSidePaneQuery",
            caller: "TAHOE",
            chainingCursor: null,
            chainingSeedVideoId: null,
            channelEntryPoint: "TAHOE",
            channelID: "",
            displayCommentsContextEnableComment: null,
            displayCommentsContextIsAdPreview: null,
            displayCommentsContextIsAggregatedShare: null,
            displayCommentsContextIsStorySet: null,
            displayCommentsFeedbackContext: null,
            feedbackSource: 41,
            feedLocation: "TAHOE",
            focusCommentID: null,
            isCrawler: false,
            privacySelectorRenderLocation: "COMET_STREAM",
            renderLocation: "video_channel",
            scale: 5,
            streamChainingSection: false,
            useDefaultActor: false,
            videoChainingContext: null,
            videoID: "1419668588891491",
            __relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider: false,
            __relay_internal__pv__CometUFIIsRTAEnabledrelayprovider: false,
            __relay_internal__pv__StoriesLWRVariantrelayprovider: "www_new_reactions"
          }
        );

        // const options = {
        //   method: 'POST',
        //   headers: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': cookie },
        //   data: Object.keys(dataForm).map(key => key + "=" + dataForm[key]).join("&"),
        //   url: 'https://www.facebook.com/api/graphql/',
        // };

        // // CometTahoeRootQuery$defer$CometTahoeSidepaneRenderer_video
        // const res = await axios(options);
        // // console.log(res.data);
        // const splitted = JSON.parse(res.data.split(`\n`)[13]);

        // console.log(splitted.data.tahoe_sidepane_renderer, splitted.data.tahoe_sidepane_renderer.video.feedback.top_reactions.edges);

        // const resV1 = JSON.parse(res.data.split(`{"label":"CometTahoeRootQuery$defer$CometTahoeSidepaneRenderer_video"`)[0]);
        // console.log(JSON.parse(splitted[0]));

        // if (res.data.includes('i18n_reaction_count')) {
        // console.log("DONE")
        // }
        // 
        // ainRequests = {
        //   "headers": Headers(dataFB["cookieFacebook"], dataForm),
        //   "timeout": 60000,
        //   "url": "https://www.facebook.com/api/graphql/",
        //   "cookies": parse_cookie_string(dataFB["cookieFacebook"]),
        //   "data": dataForm,
        //   "verify": True
        // }
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });

  } catch (err) {
    console.log('Error: ', err.message);
  }

}

main();
