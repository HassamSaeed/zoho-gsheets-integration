function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('GSheets.com')
      .addItem('Post To Zoho', 'postRequest')
      .addToUi();
}

function postRequest(){
//refreshStatus()
SpreadsheetApp.flush();
let data = getData();

var url = "https://flow.zoho.com/741573580/flow/webhook/incoming?zapikey=xxxxxxxxxxxxxxxxxxxx8&isdebug=false";
var options = {
    "method": "post",
    "headers": {
        "Content-Type": "application/json"
    },
    "payload": JSON.stringify(data)
};
var response = UrlFetchApp.fetch(url, options);
  
}

function getData() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  let data = sheet.getDataRange().getValues().filter(x => x[0]!='');
  var header = data.shift();
 
  // var initialAccumulatorValue = {}  // Get rid of this line (see next post comment)
  // Convert each row into an object
  var object = data.map(function(row) {  
    // Create a new object for next row using the header as a key
    var nextRowObject = header.reduce(function(accumulator, currentValue, currentIndex) {
      accumulator[currentValue] = row[currentIndex];      
      return accumulator;
    }, {}) // Use {} here rather than initialAccumulatorValue (see next post comment)
    return nextRowObject;
  });
  
  return object;
}
