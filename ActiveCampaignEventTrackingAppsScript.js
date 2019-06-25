//built by Julian Juenemann @ Measureschool.com

var api_key = ""; //enter your Event Key found under Settings -> Tracking -> Event Tracking -> Event Key http://take.ms/OD0Vu
var actid = 000000; //enter your Account ID found under Settings -> Tracking -> Event Tracking -> Click on the Link "Event Tracking API" http://take.ms/LLXTU


//read incoming data
function doGet(e) {
 return   handleResponse(e);
  }
 
function doPost(e) {
 return handleResponse(e);
}

//handle incoming data
function handleResponse(e){
  var payloadData = [];
  
  //push standard keys
    payloadData.push( 
      ['key' , api_key],  //api_key
      ['actid' , actid]   //ActiveCampaign ID
  );
  
  //parse response into array
  var response = e.parameter;
  for (var key in response){
    if(key === "email"){
      payloadData.push(["visit", JSON.stringify({"email":response[key]})])
    }
    else{payloadData.push([key, response[key]]);
        }

    }
   Logger.log(payloadData)
  
  //map data from array and build payload
    var payload = payloadData.map(function(el){el[1] = encodeURIComponent(el[1]); return el.join('=')}).join('&'); //joing payloadData into a query string
    Logger.log(payload);
  
  //send data to AC
  var options =
        {
          'contentType': 'application/x-www-form-urlencoded',
          'method' : 'POST',
          'payload' : payload
        };
    
 var response = UrlFetchApp.fetch('https://trackcmp.net/event', options); //send data to AC
 Logger.log(response.getContentText());

  //print out response
  return ContentService.createTextOutput(response.getContentText());
  
}; //end handleResponse function
  
//test GET request - call this function to test and see log commands in the script editor
function test() {
  var payload =
      { "parameter": 
      {
      "email": "test@example.com",
      "event": "watched",
      "eventdata": "test"
      }
      }; 
  doGet(payload);
}
