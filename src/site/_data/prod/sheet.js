const fetch = require('node-fetch');
const seed = require('../../../utils/save-seed.js');


// Once a google sheet is "published to the web" we can access its JSON
// via a URL of this form. We just need to pass in the ID of the sheet
// which we can find in the URL of the document.
const sheetID = "1DpRZ4IA6Xd_rd4sNnkpuTkp_-6KOEJJWS-VqZxw4oU0";
// You can get YOUR_API_KEY here https://developers.google.com/sheets/api/guides/migration#v3-api_1
const API_KEY = "YOUR_API_KEY";

const googleSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}?fields=sheets.data.rowData.values.formattedValue&key=${API_KEY}`;

module.exports = async function() {
  try {
    let data = await (await fetch(googleSheetUrl)).json()
    data = data.sheets[0].data[0].rowData

    let dataFormated = {
      "content": []
    }

    let i = 0
    data.forEach(item => {
      i += 1
      if(i === 1) return

      let row = []

      item.values.forEach(item => {
        row.push(item.formattedValue)
      })

      dataFormated.content.push({
        "header": row[0],
        "header2": row[1],
        "body": row[2],
        "body2": row[3],
        "body3":  row[4],
        "body4": row[5],
        "body5": row[6],
        "body6":  row[7],
        "body7": row[8],
        "body8": row[9],
        "body9":  row[10],
        "body10": row[11],
        "body11": row[12],
        "body12":  row[13],
        "body13": row[14],
        "body14": row[15],
        "body15":  row[16],
        "body16": row[17],
        "body17": row[18]
      })
    });

    // stash the data locally for developing without
    // needing to hit the API each time.
    seed(JSON.stringify(dataFormated), `${__dirname}/../dev/sheet.json`);
    
    // resolve the promise and return the data
    return dataFormated
  } catch(e) {
    console.log('Error :', e);
    return e
  }
}
